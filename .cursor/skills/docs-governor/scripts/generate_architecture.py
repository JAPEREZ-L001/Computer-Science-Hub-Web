#!/usr/bin/env python3
from __future__ import annotations

import argparse
import subprocess
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List


@dataclass
class DocMeta:
    path: str
    title: str
    status: str
    owner: str
    baseline_commit: str
    last_reviewed: str
    tracking_count: int


@dataclass
class ModuleMeta:
    module_id: str
    name: str
    description: str
    functions: List[str]
    depends_on: List[str]
    tracking: List[str]
    docs: List[DocMeta]


def iso_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def git_short_head(repo_root: Path) -> str:
    try:
        out = subprocess.check_output(["git", "rev-parse", "--short", "HEAD"], cwd=repo_root, text=True)
        return out.strip()
    except Exception:
        return ""


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


def parse_module_yaml(module_yaml_path: Path) -> Dict[str, object]:
    text = module_yaml_path.read_text(encoding="utf-8")
    lines = text.splitlines()

    data: Dict[str, object] = {}
    current_list_key: str | None = None
    i = 0
    while i < len(lines):
        raw = lines[i]
        stripped = raw.strip()
        if not stripped or stripped.startswith("#"):
            i += 1
            continue

        if stripped.startswith("- "):
            if current_list_key is not None:
                arr = data.setdefault(current_list_key, [])
                if isinstance(arr, list):
                    arr.append(stripped[2:].strip().strip('"').strip("'"))
            i += 1
            continue

        if ":" not in stripped:
            i += 1
            continue

        key, value = stripped.split(":", 1)
        key = key.strip()
        value = value.strip()
        current_list_key = None

        if value == "|":
            desc_lines: List[str] = []
            i += 1
            while i < len(lines):
                next_raw = lines[i]
                if next_raw.startswith("  "):
                    desc_lines.append(next_raw[2:])
                    i += 1
                    continue
                break
            data[key] = "\n".join(desc_lines).strip()
            continue

        if value == "":
            data[key] = []
            current_list_key = key
            i += 1
            continue

        data[key] = value.strip('"').strip("'")
        i += 1

    return data


def rel(path: Path, root: Path) -> str:
    return path.relative_to(root).as_posix()


def collect_module_docs(root: Path, module_dir: Path) -> List[DocMeta]:
    docs: List[DocMeta] = []
    for md_path in sorted(module_dir.glob("*.md")):
        fm = parse_frontmatter(md_path.read_text(encoding="utf-8"))
        if not fm:
            continue
        tracking_raw = fm.get("tracking")
        tracking = tracking_raw if isinstance(tracking_raw, list) else []
        docs.append(
            DocMeta(
                path=rel(md_path, root),
                title=str(fm.get("title", "")).strip(),
                status=str(fm.get("status", "")).strip(),
                owner=str(fm.get("owner", "")).strip(),
                baseline_commit=str(fm.get("baseline_commit", "")).strip(),
                last_reviewed=str(fm.get("last_reviewed", "")).strip(),
                tracking_count=len(tracking),
            )
        )
    return docs


def collect_modules(root: Path) -> List[ModuleMeta]:
    handbook_dir = root / "docs" / "handbook"
    modules: List[ModuleMeta] = []
    for module_yaml in sorted(handbook_dir.glob("*/module.yaml")):
        if module_yaml.parent.name == "module-template":
            continue
        parsed = parse_module_yaml(module_yaml)
        module_id = str(parsed.get("id", module_yaml.parent.name)).strip()
        name = str(parsed.get("name", module_id)).strip()
        description = str(parsed.get("description", "")).replace("\n", " ").strip()
        functions_raw = parsed.get("functions")
        depends_on_raw = parsed.get("depends_on")
        tracking_raw = parsed.get("tracking")
        functions = functions_raw if isinstance(functions_raw, list) else []
        depends_on = depends_on_raw if isinstance(depends_on_raw, list) else []
        tracking = tracking_raw if isinstance(tracking_raw, list) else []
        docs = collect_module_docs(root, module_yaml.parent)
        modules.append(
            ModuleMeta(
                module_id=module_id,
                name=name,
                description=description,
                functions=[str(x).strip() for x in functions if str(x).strip()],
                depends_on=[str(x).strip() for x in depends_on if str(x).strip()],
                tracking=[str(x).strip() for x in tracking if str(x).strip()],
                docs=docs,
            )
        )
    modules.sort(key=lambda m: m.module_id)
    return modules


def build_mermaid(modules: List[ModuleMeta]) -> List[str]:
    lines = ["graph LR"]
    module_ids = {m.module_id for m in modules}
    for module in modules:
        node_id = module.module_id.replace("-", "_")
        lines.append(f'  {node_id}["{module.module_id}"]')
    has_edge = False
    for module in modules:
        target = module.module_id.replace("-", "_")
        for dep in module.depends_on:
            if dep not in module_ids:
                continue
            source = dep.replace("-", "_")
            lines.append(f"  {source} --> {target}")
            has_edge = True
    if not has_edge:
        lines.append('  no_dependencies["No module dependencies declared"]')
    return lines


def render_architecture(
    modules: List[ModuleMeta],
    owner: str,
    authors: List[str],
    status: str,
    created: str,
    baseline_commit: str,
    generated_at: str,
) -> str:
    lines: List[str] = [
        "---",
        'title: "Architecture"',
        f'status: "{status}"',
        f'owner: "{owner}"',
        "authors:",
    ]
    for author in authors:
        lines.append(f'  - "{author}"')
    lines.extend(
        [
            "tracking:",
            "  - docs/handbook/*/module.yaml",
            "  - docs/handbook/*/*.md",
            f'baseline_commit: "{baseline_commit}"',
            f'created: "{created}"',
            f'last_reviewed: "{generated_at}"',
            "---",
            "",
            "# Architecture",
            "",
            "Este documento se genera automaticamente a partir de los `module.yaml` y frontmatter de los documentos por modulo en `docs/handbook/*/`. Su objetivo es mantener una vista de arquitectura actualizada sin edicion manual del contenido tecnico principal.",
            "",
        ]
    )

    total_docs = sum(len(module.docs) for module in modules)
    lines.extend(
        [
            "## System Snapshot",
            "",
            f"- generated_at: `{generated_at}`",
            f"- modules: `{len(modules)}`",
            f"- module_docs: `{total_docs}`",
            "",
            "## Module Dependency Graph",
            "",
            "```mermaid",
        ]
    )
    lines.extend(build_mermaid(modules))
    lines.extend(["```", "", "## Module Index", ""])

    for module in modules:
        depends = ", ".join(f"`{dep}`" for dep in module.depends_on) if module.depends_on else "None"
        lines.extend(
            [
                f"### {module.name} (`{module.module_id}`)",
                "",
                f"- description: {module.description or 'N/A'}",
                f"- functions: `{len(module.functions)}`",
                f"- depends_on: {depends}",
                f"- tracking_entries: `{len(module.tracking)}`",
                f"- docs: `{len(module.docs)}`",
            ]
        )

        if module.functions:
            for func in module.functions:
                lines.append(f"  - function: {func}")

        if module.docs:
            for doc in module.docs:
                lines.append(
                    "  - doc: "
                    + f"`{doc.path}`"
                    + f", title=`{doc.title or 'N/A'}`"
                    + f", status=`{doc.status or 'N/A'}`"
                    + f", owner=`{doc.owner or 'N/A'}`"
                    + f", baseline=`{doc.baseline_commit or 'N/A'}`"
                    + f", last_reviewed=`{doc.last_reviewed or 'N/A'}`"
                    + f", tracking_entries=`{doc.tracking_count}`"
                )

        lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate docs/handbook/architecture.md from module metadata.")
    parser.add_argument("--root", default=".", help="Repository root path")
    parser.add_argument("--output", default="docs/handbook/architecture.md", help="Output architecture markdown path")
    parser.add_argument("--owner", default="", help="Owner override for frontmatter")
    parser.add_argument("--status", default="", choices=["", "draft", "active"], help="Status override for frontmatter")
    parser.add_argument("--dry-run", action="store_true", help="Print output path and do not write file")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    output_path = root / args.output

    modules = collect_modules(root)
    if not modules:
        raise SystemExit("No modules found in docs/handbook/*/module.yaml")

    existing_frontmatter = {}
    if output_path.exists():
        existing_frontmatter = parse_frontmatter(output_path.read_text(encoding="utf-8")) or {}

    generated_at = iso_now()
    baseline_commit = git_short_head(root)
    owner = args.owner or str(existing_frontmatter.get("owner", "@csh")).strip() or "@csh"
    status = args.status or str(existing_frontmatter.get("status", "active")).strip() or "active"
    created = str(existing_frontmatter.get("created", generated_at)).strip() or generated_at
    authors_raw = existing_frontmatter.get("authors")
    if isinstance(authors_raw, list) and authors_raw:
        authors = [str(a).strip() for a in authors_raw if str(a).strip()]
    else:
        authors = [owner]

    content = render_architecture(
        modules=modules,
        owner=owner,
        authors=authors,
        status=status,
        created=created,
        baseline_commit=baseline_commit,
        generated_at=generated_at,
    )

    if args.dry_run:
        print(f"Dry run OK. Would write: {output_path.as_posix()}")
        return 0

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content, encoding="utf-8", newline="\n")
    print(f"Generated: {output_path.as_posix()}")
    print(f"Modules: {len(modules)}")
    print(f"Module docs: {sum(len(m.docs) for m in modules)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
