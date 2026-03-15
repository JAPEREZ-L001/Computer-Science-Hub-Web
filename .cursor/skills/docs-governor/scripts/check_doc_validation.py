#!/usr/bin/env python3
from __future__ import annotations

import argparse
import fnmatch
import importlib.util
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Sequence, Tuple


REQUIRED_DOCS_STRUCTURE = [
    "docs",
    "docs/work",
    "docs/handbook",
    "docs/tutorials",
    "docs/_archive",
]

REQUIRED_CONFIG_FILES = [
    "docs/README.md",
    "docs/docs-config.yaml",
]

FRONTMATTER_REQUIRED_KEYS = {
    "title",
    "status",
    "owner",
    "authors",
    "tracking",
    "baseline_commit",
    "created",
    "last_reviewed",
}

STATUS_ALLOWED = {"draft", "active"}


@dataclass
class Config:
    inherit_gitignore: bool
    ignore: List[str]
    untrack: List[str]


@dataclass
class ModuleDefinition:
    module_id: str
    module_dir: Path
    tracking_patterns: List[str]


@dataclass
class ModuleDoc:
    path: Path
    baseline_commit: str
    tracking_patterns: List[str]


def to_posix(path: Path, root: Path) -> str:
    return path.relative_to(root).as_posix()


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def parse_docs_config(path: Path) -> Config:
    """
    Minimal parser for docs/docs-config.yaml with expected shape only.
    Supported keys:
      inherit_gitignore: true|false
      ignore:
        - "..."
      untrack:
        - "..."
    """
    if not path.exists():
        raise ValueError(f"Missing config file: {path.as_posix()}")

    inherit_gitignore = False
    ignore: List[str] = []
    untrack: List[str] = []
    current_list: str | None = None

    for raw in read_text(path).splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue

        if line.startswith("inherit_gitignore:"):
            value = line.split(":", 1)[1].strip().lower()
            if value not in {"true", "false"}:
                raise ValueError("inherit_gitignore must be true|false")
            inherit_gitignore = value == "true"
            current_list = None
            continue

        if line == "ignore:":
            current_list = "ignore"
            continue

        if line == "untrack:":
            current_list = "untrack"
            continue

        if line.startswith("-"):
            if current_list is None:
                raise ValueError(f"List item outside list block: {raw}")
            item = line[1:].strip().strip('"').strip("'")
            if not item:
                raise ValueError("Empty list item in docs-config.yaml")
            if current_list == "ignore":
                ignore.append(item)
            else:
                untrack.append(item)
            continue

        # Accept inline comments and unknown keys as invalid for strictness.
        key_match = re.match(r"^([A-Za-z_][A-Za-z0-9_]*)\s*:", line)
        if key_match:
            key = key_match.group(1)
            if key not in {"inherit_gitignore", "ignore", "untrack"}:
                raise ValueError(f"Unknown key in docs-config.yaml: {key}")
            continue

        raise ValueError(f"Invalid line in docs-config.yaml: {raw}")

    return Config(inherit_gitignore=inherit_gitignore, ignore=ignore, untrack=untrack)


def parse_gitignore_patterns(root: Path) -> List[str]:
    gitignore = root / ".gitignore"
    if not gitignore.exists():
        return []
    patterns: List[str] = []
    for raw in read_text(gitignore).splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("!"):
            # Re-inclusion rules are intentionally ignored in this first version.
            continue
        patterns.append(line)
    return patterns


def parse_frontmatter(markdown_text: str) -> Dict[str, object] | None:
    if not markdown_text.startswith("---\n"):
        return None

    end = markdown_text.find("\n---\n", 4)
    if end == -1:
        return None

    block = markdown_text[4:end]
    lines = block.splitlines()
    result: Dict[str, object] = {}
    current_list_key: str | None = None

    for raw in lines:
        if not raw.strip():
            continue
        if raw.lstrip().startswith("#"):
            continue

        if raw.startswith("  - "):
            if current_list_key is None:
                continue
            arr = result.setdefault(current_list_key, [])
            if isinstance(arr, list):
                arr.append(raw[4:].strip().strip('"').strip("'"))
            continue

        current_list_key = None
        if ":" not in raw:
            continue
        key, value = raw.split(":", 1)
        key = key.strip()
        value = value.strip()

        if not value:
            # Start of list block
            result[key] = []
            current_list_key = key
            continue

        # Inline list support: authors: ["@a", "@b"]
        if value.startswith("[") and value.endswith("]"):
            inner = value[1:-1].strip()
            if not inner:
                result[key] = []
            else:
                parts = [p.strip().strip('"').strip("'") for p in inner.split(",")]
                result[key] = [p for p in parts if p]
            continue

        # Scalar
        result[key] = value.strip('"').strip("'")

    return result


def pattern_matches(path: str, pattern: str) -> bool:
    p = pattern.strip()
    if not p:
        return False

    # Directory shorthand
    if p.endswith("/"):
        return path.startswith(p)

    # Root-relative exact file or wildcard
    if fnmatch.fnmatch(path, p):
        return True

    # Support gitignore-style bare names like "dist" or "node_modules"
    if "/" not in p and path.split("/")[0] == p:
        return True

    # Support gitignore-style suffix patterns like "*.log"
    if p.startswith("*") and fnmatch.fnmatch(path, p):
        return True

    return False


def is_any_match(path: str, patterns: Sequence[str]) -> bool:
    return any(pattern_matches(path, patt) for patt in patterns)


def tracking_pattern_resolves(pattern: str, root: Path, repo_file_paths: Sequence[str]) -> bool:
    normalized = pattern.strip()
    if not normalized:
        return False

    if any(pattern_matches(rel, normalized) for rel in repo_file_paths):
        return True

    # If pattern is literal path (not wildcard), also validate directory/file existence.
    has_wildcards = any(ch in normalized for ch in "*?[]")
    if has_wildcards:
        return False

    literal = normalized.rstrip("/")
    if not literal:
        return False

    return (root / literal).exists()


def list_repo_files(root: Path) -> List[Path]:
    out: List[Path] = []
    for p in root.rglob("*"):
        if p.is_file():
            out.append(p)
    return out


def run_git(root: Path, args: List[str]) -> Tuple[int, str, str]:
    proc = subprocess.run(
        ["git", *args],
        cwd=root,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    return proc.returncode, proc.stdout.strip(), proc.stderr.strip()


def git_commit_exists(root: Path, sha: str) -> bool:
    if not sha:
        return False
    code, _out, _err = run_git(root, ["cat-file", "-e", f"{sha}^{{commit}}"])
    return code == 0


def git_file_exists_at_commit(root: Path, sha: str, rel_path: str) -> bool:
    code, _out, _err = run_git(root, ["cat-file", "-e", f"{sha}:{rel_path}"])
    return code == 0


def git_file_changed_since_commit(root: Path, sha: str, rel_path: str) -> bool:
    code, out, _err = run_git(root, ["diff", "--name-only", sha, "--", rel_path])
    if code != 0:
        return False
    return bool(out)


def git_is_untracked(root: Path, rel_path: str) -> bool:
    code, out, _err = run_git(root, ["ls-files", "--others", "--exclude-standard", "--", rel_path])
    if code != 0:
        return False
    return bool(out)


def git_last_commit_for_file(root: Path, rel_path: str) -> str:
    code, out, _err = run_git(root, ["log", "-n", "1", "--format=%h", "--", rel_path])
    if code != 0 or not out:
        return ""
    return out


def parse_module_id(module_yaml_path: Path) -> str:
    for raw in read_text(module_yaml_path).splitlines():
        line = raw.strip()
        if line.startswith("id:"):
            return line.split(":", 1)[1].strip().strip('"').strip("'")
    return ""


def validate_structure(root: Path) -> List[str]:
    errors: List[str] = []
    for rel in REQUIRED_DOCS_STRUCTURE:
        p = root / rel
        if not p.exists() or not p.is_dir():
            errors.append(f"Missing required directory: {rel}")
    for rel in REQUIRED_CONFIG_FILES:
        p = root / rel
        if not p.exists() or not p.is_file():
            errors.append(f"Missing required file: {rel}")
    return errors


def validate_config_semantics(config: Config) -> List[str]:
    errors: List[str] = []
    if not isinstance(config.inherit_gitignore, bool):
        errors.append("inherit_gitignore must be boolean")
    if not isinstance(config.ignore, list):
        errors.append("ignore must be a list")
    if not isinstance(config.untrack, list):
        errors.append("untrack must be a list")
    if not config.ignore:
        errors.append("ignore should not be empty")
    for patt in config.untrack:
        if not isinstance(patt, str) or not patt.strip():
            errors.append(f"untrack contains invalid pattern: {patt}")
    return errors


def collect_trackable_docs(root: Path, config: Config) -> Tuple[List[Path], List[str]]:
    docs_dir = root / "docs"
    warnings: List[str] = []
    files: List[Path] = []
    if not docs_dir.exists():
        return files, warnings

    for p in docs_dir.rglob("*.md"):
        rel = to_posix(p, root)
        if is_any_match(rel, config.ignore):
            continue
        if is_any_match(rel, config.untrack):
            continue
        files.append(p)
    return files, warnings


def validate_doc_frontmatter(paths: Iterable[Path], root: Path) -> List[str]:
    errors: List[str] = []
    for p in paths:
        rel = to_posix(p, root)
        if rel == "docs/README.md":
            # Docs index is allowed without frontmatter.
            continue
        fm = parse_frontmatter(read_text(p))
        if fm is None:
            errors.append(f"Missing or invalid frontmatter: {rel}")
            continue

        missing = sorted(FRONTMATTER_REQUIRED_KEYS.difference(fm.keys()))
        if missing:
            errors.append(f"Missing frontmatter keys in {rel}: {', '.join(missing)}")
            continue

        status = str(fm.get("status", "")).strip()
        if status not in STATUS_ALLOWED:
            errors.append(f"Invalid status in {rel}: {status}")

        authors = fm.get("authors")
        if not isinstance(authors, list) or not authors:
            errors.append(f"authors must be non-empty list in {rel}")

        tracking = fm.get("tracking")
        if not isinstance(tracking, list) or not tracking:
            errors.append(f"tracking must be non-empty list in {rel}")
    return errors


def validate_tracking_references(
    paths: Iterable[Path],
    root: Path,
    repo_file_paths: Sequence[str],
) -> List[str]:
    warnings: List[str] = []
    for p in paths:
        rel = to_posix(p, root)
        if rel == "docs/README.md":
            continue

        fm = parse_frontmatter(read_text(p))
        if not fm:
            continue

        tracking = fm.get("tracking")
        if not isinstance(tracking, list):
            continue

        for entry in tracking:
            pattern = str(entry).strip()
            if not pattern:
                continue
            if not tracking_pattern_resolves(pattern, root, repo_file_paths):
                warnings.append(f"Tracking target not found in {rel}: {pattern}")

    return warnings


def validate_module_tracking_references(
    modules: Sequence[ModuleDefinition],
    root: Path,
    repo_file_paths: Sequence[str],
) -> List[str]:
    warnings: List[str] = []
    for module in modules:
        module_yaml_rel = to_posix(module.module_dir / "module.yaml", root)
        for pattern in module.tracking_patterns:
            if not tracking_pattern_resolves(pattern, root, repo_file_paths):
                warnings.append(
                    f"Tracking target not found in {module_yaml_rel}: {pattern}"
                )
    return warnings


def collect_tracking_patterns(paths: Iterable[Path], include_draft: bool = False) -> List[str]:
    patterns: List[str] = []
    for p in paths:
        fm = parse_frontmatter(read_text(p))
        if not fm:
            continue
        status = str(fm.get("status", "")).strip()
        if status == "draft" and not include_draft:
            continue
        tr = fm.get("tracking")
        if isinstance(tr, list):
            for entry in tr:
                s = str(entry).strip()
                if s:
                    patterns.append(s)
    # de-duplicate preserving order
    seen = set()
    out = []
    for patt in patterns:
        if patt in seen:
            continue
        seen.add(patt)
        out.append(patt)
    return out


def parse_module_tracking_patterns(module_yaml_path: Path) -> List[str]:
    """
    Minimal parser for docs/handbook/<module>/module.yaml tracking list.
    Expected shape:
      tracking:
        - src/foo.ts
        - src/bar/
    """
    patterns: List[str] = []
    in_tracking = False

    for raw in read_text(module_yaml_path).splitlines():
        line = raw.rstrip()
        stripped = line.strip()

        if not stripped or stripped.startswith("#"):
            continue

        if stripped == "tracking:":
            in_tracking = True
            continue

        if in_tracking:
            if stripped.startswith("-"):
                item = stripped[1:].strip().strip('"').strip("'")
                if item:
                    patterns.append(item)
                continue

            # End of tracking block when another key appears
            if re.match(r"^[A-Za-z_][A-Za-z0-9_]*\s*:", stripped):
                in_tracking = False

    return patterns


def collect_module_tracking_patterns(root: Path) -> Tuple[List[str], List[str]]:
    """
    Collect tracking patterns declared in docs/handbook/*/module.yaml.
    Skips docs/handbook/module-template/module.yaml.
    Returns (patterns, warnings).
    """
    handbook_dir = root / "docs" / "handbook"
    if not handbook_dir.exists():
        return [], ["Missing docs/handbook directory for module validation"]

    warnings: List[str] = []
    module_patterns: List[str] = []

    module_yaml_files = sorted(handbook_dir.glob("*/module.yaml"))
    module_yaml_files = [
        p for p in module_yaml_files if p.parent.name != "module-template"
    ]

    for module_yaml in module_yaml_files:
        try:
            patterns = parse_module_tracking_patterns(module_yaml)
        except Exception as exc:
            warnings.append(
                f"Could not parse module tracking in {to_posix(module_yaml, root)}: {exc}"
            )
            continue

        if not patterns:
            warnings.append(
                f"No tracking entries in {to_posix(module_yaml, root)}"
            )
            continue

        module_patterns.extend(patterns)

    # de-duplicate preserving order
    seen = set()
    out: List[str] = []
    for patt in module_patterns:
        if patt in seen:
            continue
        seen.add(patt)
        out.append(patt)

    return out, warnings


def collect_module_definitions(root: Path) -> Tuple[List[ModuleDefinition], List[str]]:
    handbook_dir = root / "docs" / "handbook"
    if not handbook_dir.exists():
        return [], ["Missing docs/handbook directory for module definition scan"]

    warnings: List[str] = []
    modules: List[ModuleDefinition] = []

    module_yaml_files = sorted(handbook_dir.glob("*/module.yaml"))
    module_yaml_files = [
        p for p in module_yaml_files if p.parent.name != "module-template"
    ]

    for module_yaml in module_yaml_files:
        module_id = parse_module_id(module_yaml)
        if not module_id:
            warnings.append(f"Missing id in {to_posix(module_yaml, root)}")
            module_id = module_yaml.parent.name

        tracking_patterns = parse_module_tracking_patterns(module_yaml)
        if not tracking_patterns:
            warnings.append(f"No tracking entries in {to_posix(module_yaml, root)}")

        modules.append(
            ModuleDefinition(
                module_id=module_id,
                module_dir=module_yaml.parent,
                tracking_patterns=tracking_patterns,
            )
        )

    modules.sort(key=lambda m: m.module_id)
    return modules, warnings


def collect_module_docs(module_dir: Path) -> List[Path]:
    return sorted(p for p in module_dir.glob("*.md") if p.is_file())


def parse_module_doc(path: Path) -> ModuleDoc | None:
    fm = parse_frontmatter(read_text(path))
    if not fm:
        return None

    baseline_commit = str(fm.get("baseline_commit", "")).strip()
    tracking_raw = fm.get("tracking")
    tracking_patterns: List[str] = []
    if isinstance(tracking_raw, list):
        tracking_patterns = [str(x).strip() for x in tracking_raw if str(x).strip()]

    return ModuleDoc(
        path=path,
        baseline_commit=baseline_commit,
        tracking_patterns=tracking_patterns,
    )


def normalize_architecture_content(markdown_text: str) -> str:
    """
    Normalize architecture markdown by ignoring volatile timestamp/baseline fields,
    so we can detect meaningful architecture changes.
    """
    lines = markdown_text.splitlines()
    normalized: List[str] = []

    in_frontmatter = False
    frontmatter_started = False

    for line in lines:
        stripped = line.strip()

        if not frontmatter_started and stripped == "---":
            frontmatter_started = True
            in_frontmatter = True
            normalized.append(line)
            continue

        if in_frontmatter and stripped == "---":
            in_frontmatter = False
            normalized.append(line)
            continue

        if in_frontmatter and (
            stripped.startswith("baseline_commit:")
            or stripped.startswith("last_reviewed:")
        ):
            continue

        if stripped.startswith("- generated_at: `"):
            continue

        normalized.append(line)

    return "\n".join(normalized).rstrip() + "\n"


def build_architecture_preview(root: Path, generator_script: Path) -> str:
    """
    Render the architecture content in-process using the generator module,
    without executing the generator script as a subprocess.
    """
    spec = importlib.util.spec_from_file_location(
        "docs_governor_generate_architecture", generator_script
    )
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load architecture generator: {generator_script.as_posix()}")

    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)

    output_path = root / "docs" / "handbook" / "architecture.md"
    existing_frontmatter = {}
    if output_path.exists():
        existing_frontmatter = (
            module.parse_frontmatter(output_path.read_text(encoding="utf-8")) or {}
        )

    generated_at = module.iso_now()
    baseline_commit = module.git_short_head(root)
    owner = str(existing_frontmatter.get("owner", "@rod")).strip() or "@rod"
    status = str(existing_frontmatter.get("status", "active")).strip() or "active"
    created = str(existing_frontmatter.get("created", generated_at)).strip() or generated_at

    authors_raw = existing_frontmatter.get("authors")
    if isinstance(authors_raw, list) and authors_raw:
        authors = [str(a).strip() for a in authors_raw if str(a).strip()]
    else:
        authors = [owner]

    modules = module.collect_modules(root)
    if not modules:
        raise RuntimeError("No modules found in docs/handbook/*/module.yaml")

    return module.render_architecture(
        modules=modules,
        owner=owner,
        authors=authors,
        status=status,
        created=created,
        baseline_commit=baseline_commit,
        generated_at=generated_at,
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate documentation system and coverage.")
    parser.add_argument("--root", default=".", help="Repository root path")
    parser.add_argument("--config", default="docs/docs-config.yaml", help="Path to docs config")
    parser.add_argument(
        "--limit-undocumented",
        type=int,
        default=0,
        help="Optional limit to print undocumented files (0 means print all)",
    )
    parser.add_argument(
        "--include-draft-tracking",
        action="store_true",
        help="Include tracking entries from draft docs (default: false).",
    )
    parser.add_argument(
        "--show-success",
        action="store_true",
        help="Show successful checks and verbose progress output.",
    )
    args = parser.parse_args()

    root = Path(args.root).resolve()
    config_path = root / args.config

    if args.show_success:
        print("[1/3] Validating documentation structure...")
    structure_errors = validate_structure(root)
    if structure_errors:
        print("Structure errors:")
        for e in structure_errors:
            print(f"- {e}")
    elif args.show_success:
        print("OK: structure is valid")

    if args.show_success:
        print("[2/3] Validating configuration integrity...")
    config_errors: List[str] = []
    config: Config | None = None
    try:
        config = parse_docs_config(config_path)
        config_errors.extend(validate_config_semantics(config))
    except Exception as exc:
        config_errors.append(str(exc))

    if config_errors:
        print("Configuration errors:")
        for e in config_errors:
            print(f"- {e}")
    elif args.show_success:
        print("OK: config is valid")

    if args.show_success:
        print("[3/3] Running validation flow...")
    if structure_errors or config_errors or config is None:
        if args.show_success:
            print("Aborted validation flow because structure/config has errors.")
        print("Please solve all findings by updating the documentation before closing this task.")
        return 1

    doc_paths, _warnings = collect_trackable_docs(root, config)
    frontmatter_errors = validate_doc_frontmatter(doc_paths, root)

    ignore_patterns = list(config.ignore)
    if config.inherit_gitignore:
        ignore_patterns.extend(parse_gitignore_patterns(root))

    repo_files = list_repo_files(root)
    repo_file_paths = [to_posix(p, root) for p in repo_files]

    module_tracking_patterns, module_warnings = collect_module_tracking_patterns(root)
    module_definitions, module_definition_warnings = collect_module_definitions(root)
    tracking_reference_warnings = validate_tracking_references(doc_paths, root, repo_file_paths)
    module_tracking_reference_warnings = validate_module_tracking_references(
        module_definitions,
        root,
        repo_file_paths,
    )

    files_without_defined_module: List[str] = []
    for file_path in repo_files:
        rel = to_posix(file_path, root)

        # Never audit .git internals
        if rel.startswith(".git/"):
            continue

        # Ignore configured excluded paths
        if is_any_match(rel, ignore_patterns):
            continue

        # Exclude configured untracked paths from module coverage checks.
        if is_any_match(rel, config.untrack):
            continue

        # Exclude docs from "undocumented code file" coverage list
        if rel.startswith("docs/"):
            continue

        # Module assignment validation comes first.
        # Files with no module assignment are reported separately and excluded
        # from undocumented coverage to avoid mixing concerns.
        if not is_any_match(rel, module_tracking_patterns):
            files_without_defined_module.append(rel)
            continue

    if frontmatter_errors:
        print(f"Frontmatter errors: {len(frontmatter_errors)}")
        for e in frontmatter_errors:
            print(f"- {e}")
    elif args.show_success:
        print("Frontmatter errors: 0")

    if module_warnings:
        print(f"Module validation warnings: {len(module_warnings)}")
        for warning in module_warnings:
            print(f"- {warning}")

    if module_definition_warnings:
        print(f"Module definition warnings: {len(module_definition_warnings)}")
        for warning in module_definition_warnings:
            print(f"- {warning}")

    if tracking_reference_warnings:
        print(f"Tracking reference warnings: {len(tracking_reference_warnings)}")
        for warning in tracking_reference_warnings:
            print(f"- {warning}")

    if module_tracking_reference_warnings:
        print(
            "Module tracking reference warnings: "
            + str(len(module_tracking_reference_warnings))
        )
        for warning in module_tracking_reference_warnings:
            print(f"- {warning}")

    module_rows: List[Tuple[ModuleDefinition, int, int, float, List[str], List[ModuleDoc], List[str]]] = []
    file_paths_set = {to_posix(p, root) for p in repo_files}
    has_uncovered_module_files = False
    for module in module_definitions:
        module_files = sorted(
            rel
            for rel in file_paths_set
            if is_any_match(rel, module.tracking_patterns)
            and not is_any_match(rel, config.untrack)
        )

        parsed_docs: List[ModuleDoc] = []
        for module_doc_path in collect_module_docs(module.module_dir):
            parsed = parse_module_doc(module_doc_path)
            if parsed is not None:
                parsed_docs.append(parsed)

        file_to_docs_count: Dict[str, int] = {rel: 0 for rel in module_files}
        for doc in parsed_docs:
            for rel in module_files:
                if is_any_match(rel, doc.tracking_patterns):
                    file_to_docs_count[rel] += 1

        covered_count = sum(1 for rel in module_files if file_to_docs_count.get(rel, 0) > 0)
        total_count = len(module_files)
        percent = (covered_count / total_count * 100.0) if total_count > 0 else 100.0
        files_without_doc = [rel for rel in module_files if file_to_docs_count.get(rel, 0) == 0]
        if files_without_doc:
            has_uncovered_module_files = True

        module_rows.append(
            (
                module,
                covered_count,
                total_count,
                percent,
                files_without_doc,
                parsed_docs,
                module_files,
            )
        )

    if args.show_success:
        print("Module doc state:")
    if has_uncovered_module_files:
        print("Module coverage alerts:")
        print("- Files listed directly under a module are not covered by any derived module .md yet.")

    baseline_alerts: List[str] = []
    for module, covered_count, total_count, percent, files_without_doc, parsed_docs, module_files in module_rows:
        if args.show_success:
            print(f"- Module {module.module_id} [{covered_count}/{total_count}] ({percent:.1f}%)")

        for rel in files_without_doc:
            if git_is_untracked(root, rel):
                if args.show_success:
                    print("  - " + rel + " - new")
                else:
                    print(f"- {module.module_id}: {rel} - new")
            else:
                last_sha = git_last_commit_for_file(root, rel) or "unknown"
                if args.show_success:
                    print("  - " + rel + f" - changed from commit {last_sha}")
                else:
                    print(f"- {module.module_id}: {rel} - changed from commit {last_sha}")

        for doc in parsed_docs:
            doc_rel = to_posix(doc.path, root)
            if args.show_success:
                print(f"  - {doc_rel}")

            tracked_by_doc = [
                rel for rel in module_files if is_any_match(rel, doc.tracking_patterns)
            ]
            if not tracked_by_doc:
                if args.show_success:
                    print("    - no module files linked by this doc")
                continue

            baseline = doc.baseline_commit
            baseline_valid = git_commit_exists(root, baseline)
            changed_entries: List[str] = []

            if not baseline_valid:
                for rel in tracked_by_doc:
                    if git_is_untracked(root, rel):
                        changed_entries.append(f"    - {rel} - new")
                    else:
                        changed_entries.append(
                            f"    - {rel} - changed from commit {baseline or 'missing-baseline'}"
                        )
            else:
                for rel in tracked_by_doc:
                    if not git_file_exists_at_commit(root, baseline, rel):
                        changed_entries.append(f"    - {rel} - new")
                        continue
                    if git_file_changed_since_commit(root, baseline, rel):
                        changed_entries.append(f"    - {rel} - changed from commit {baseline}")

            if changed_entries:
                for entry in changed_entries:
                    baseline_alerts.append(f"- {doc_rel} {entry.strip()}")
            elif args.show_success:
                print("    - no changed files since baseline_commit")

    if baseline_alerts:
        print(f"Baseline tracking alerts: {len(baseline_alerts)}")
        for alert in baseline_alerts:
            print(alert)

    if files_without_defined_module:
        print(f"Files without defined module: {len(files_without_defined_module)}")
    elif args.show_success:
        print("Files without defined module: 0")
    if args.limit_undocumented > 0:
        to_print_without_module = files_without_defined_module[: args.limit_undocumented]
    else:
        to_print_without_module = files_without_defined_module
    for rel in to_print_without_module:
        print(f"- {rel}")

    if args.show_success:
        print("Validation finished.")

    has_pending_findings = bool(
        module_warnings
        or module_definition_warnings
        or tracking_reference_warnings
        or module_tracking_reference_warnings
        or files_without_defined_module
        or has_uncovered_module_files
        or baseline_alerts
    )

    if frontmatter_errors or has_pending_findings:
        print("Please solve all findings by updating the documentation before closing this task.")

    if not frontmatter_errors and not has_pending_findings:
        generator_script = (
            root
            / ".cursor"
            / "skills"
            / "docs-governor"
            / "scripts"
            / "generate_architecture.py"
        )
        if generator_script.exists():
            architecture_path = root / "docs" / "handbook" / "architecture.md"
            existing_content = ""
            if architecture_path.exists():
                existing_content = architecture_path.read_text(encoding="utf-8")

            preview_content = ""
            preview_failed = False
            try:
                preview_content = build_architecture_preview(root, generator_script)
            except Exception as exc:
                preview_failed = True
                print(f"Architecture pre-check failed: {exc}")

            should_run_generator = preview_failed
            if not preview_failed:
                existing_normalized = normalize_architecture_content(existing_content)
                preview_normalized = normalize_architecture_content(preview_content)
                should_run_generator = existing_normalized != preview_normalized

            if should_run_generator:
                proc = subprocess.run(
                    ["py", generator_script.as_posix(), "--root", root.as_posix()],
                    cwd=root,
                    capture_output=True,
                    text=True,
                    encoding="utf-8",
                )
                if proc.returncode != 0:
                    print("Architecture generation failed.")
                    if proc.stdout.strip():
                        print(proc.stdout.strip())
                    if proc.stderr.strip():
                        print(proc.stderr.strip())
                    return 1
                if proc.stdout.strip():
                    print(proc.stdout.strip())
                if proc.stderr.strip():
                    print(proc.stderr.strip())
            elif args.show_success:
                print("Architecture unchanged; generation skipped.")
        else:
            print(
                "Architecture generator script not found: "
                + to_posix(generator_script, root)
            )
            return 1

    # Return non-zero only for structural/config/frontmatter issues.
    # Undocumented files are expected during onboarding and are reported as findings.
    return 0 if not frontmatter_errors else 1


if __name__ == "__main__":
    raise SystemExit(main())
