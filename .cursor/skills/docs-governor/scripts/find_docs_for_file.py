#!/usr/bin/env python3
from __future__ import annotations

import argparse
import fnmatch
import json
from pathlib import Path
from typing import Dict, List, Sequence


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def to_posix(path: Path, root: Path) -> str:
    return path.relative_to(root).as_posix()


def normalize_input_path(input_path: str, root: Path) -> str:
    raw = input_path.strip().replace("\\", "/")
    p = Path(raw)
    if p.is_absolute():
        resolved = p.resolve()
        try:
            return resolved.relative_to(root).as_posix()
        except ValueError as exc:
            raise ValueError(f"Path is outside repository root: {input_path}") from exc
    return Path(raw).as_posix()


def pattern_matches(path: str, pattern: str) -> bool:
    p = pattern.strip()
    if not p:
        return False

    if p.endswith("/"):
        return path.startswith(p)

    if fnmatch.fnmatch(path, p):
        return True

    if "/" not in p and path.split("/")[0] == p:
        return True

    if p.startswith("*") and fnmatch.fnmatch(path, p):
        return True

    return False


def is_any_match(path: str, patterns: Sequence[str]) -> bool:
    return any(pattern_matches(path, patt) for patt in patterns)


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
        if not raw.strip() or raw.lstrip().startswith("#"):
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
            result[key] = []
            current_list_key = key
            continue

        if value.startswith("[") and value.endswith("]"):
            inner = value[1:-1].strip()
            if not inner:
                result[key] = []
            else:
                parts = [p.strip().strip('"').strip("'") for p in inner.split(",")]
                result[key] = [p for p in parts if p]
            continue

        result[key] = value.strip('"').strip("'")

    return result


def parse_module_id(module_yaml_path: Path) -> str:
    for raw in read_text(module_yaml_path).splitlines():
        line = raw.strip()
        if line.startswith("id:"):
            return line.split(":", 1)[1].strip().strip('"').strip("'")
    return module_yaml_path.parent.name


def parse_module_tracking_patterns(module_yaml_path: Path) -> List[str]:
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

            if ":" in stripped and not stripped.startswith("-"):
                in_tracking = False

    return patterns


def collect_module_docs_for_file(
    root: Path,
    rel_file_path: str,
    include_empty_modules: bool,
) -> Dict[str, Dict[str, object]]:
    handbook_dir = root / "docs" / "handbook"
    out: Dict[str, Dict[str, object]] = {}

    if not handbook_dir.exists():
        return out

    module_yaml_files = sorted(handbook_dir.glob("*/module.yaml"))
    module_yaml_files = [p for p in module_yaml_files if p.parent.name != "module-template"]

    for module_yaml in module_yaml_files:
        module_id = parse_module_id(module_yaml)
        module_dir = module_yaml.parent
        module_tracking = parse_module_tracking_patterns(module_yaml)
        module_tracking_match = is_any_match(rel_file_path, module_tracking)
        matching_docs: List[str] = []

        for doc_path in sorted(module_dir.glob("*.md")):
            fm = parse_frontmatter(read_text(doc_path))
            if not fm:
                continue
            tracking_raw = fm.get("tracking")
            tracking = tracking_raw if isinstance(tracking_raw, list) else []
            tracking_patterns = [str(x).strip() for x in tracking if str(x).strip()]
            if not tracking_patterns:
                continue

            if is_any_match(rel_file_path, tracking_patterns):
                matching_docs.append(to_posix(doc_path, root))

        if matching_docs or (include_empty_modules and module_tracking_match):
            out[module_id] = {
                "module_tracking_match": module_tracking_match,
                "docs": matching_docs,
            }

    return out


def main() -> int:
    parser = argparse.ArgumentParser(
        description="List module docs that reference a file via frontmatter tracking."
    )
    parser.add_argument("file", help="Target file path (absolute or repo-relative)")
    parser.add_argument("--root", default=".", help="Repository root path")
    parser.add_argument(
        "--include-empty-modules",
        action="store_true",
        help="Include modules where module.yaml tracking matches but no module docs reference the file.",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print machine-readable JSON output.",
    )
    args = parser.parse_args()

    root = Path(args.root).resolve()
    rel_file_path = normalize_input_path(args.file, root)

    module_to_docs = collect_module_docs_for_file(
        root,
        rel_file_path,
        include_empty_modules=args.include_empty_modules,
    )

    if args.json:
        print(
            json.dumps(
                {
                    "target_file": rel_file_path,
                    "modules_with_matches": len(module_to_docs),
                    "modules": module_to_docs,
                },
                ensure_ascii=True,
                indent=2,
            )
        )
        return 0

    print(f"Target file: {rel_file_path}")
    print(f"Modules with matching docs: {len(module_to_docs)}")

    for module_id in sorted(module_to_docs.keys()):
        module_hit = module_to_docs[module_id]
        docs_raw = module_hit.get("docs")
        docs = [str(x) for x in docs_raw] if isinstance(docs_raw, list) else []
        has_module_match = bool(module_hit.get("module_tracking_match"))
        print(f"- Module {module_id}")
        print(f"  - module_tracking_match: {'yes' if has_module_match else 'no'}")
        for doc in docs:
            print(f"  - {doc}")
        if not docs:
            print("  - no matching docs")

    if not module_to_docs:
        print("No module docs reference this file.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
