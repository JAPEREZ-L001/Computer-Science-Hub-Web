#!/usr/bin/env python3
from __future__ import annotations

import argparse
import subprocess
from datetime import datetime, timezone
from pathlib import Path


def iso_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def git_short_head(repo_root: Path) -> str:
    try:
        out = subprocess.check_output(["git", "rev-parse", "--short", "HEAD"], cwd=repo_root, text=True)
        return out.strip()
    except Exception:
        return ""


def main() -> int:
    parser = argparse.ArgumentParser(description="Create a markdown doc with standard frontmatter.")
    parser.add_argument("path", help="Target path, e.g. docs/handbook/module/doc.md")
    parser.add_argument("--title", required=True)
    parser.add_argument("--owner", required=True)
    parser.add_argument("--status", default="draft", choices=["draft", "active"])
    parser.add_argument("--author", action="append", default=[])
    parser.add_argument("--track", action="append", default=[])
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args()

    repo_root = Path.cwd()
    target = repo_root / args.path
    if not str(target).endswith(".md"):
        raise SystemExit("Path must end with .md")

    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists() and not args.overwrite:
        raise SystemExit(f"File exists: {args.path}. Use --overwrite to replace.")

    now = iso_now()
    authors = args.author if args.author else [args.owner]
    tracking = args.track if args.track else ["app/"]
    baseline = git_short_head(repo_root)

    frontmatter = [
        "---",
        f'title: "{args.title}"',
        f'status: "{args.status}"',
        f'owner: "{args.owner}"',
        "authors:",
    ]
    frontmatter.extend([f'  - "{a}"' for a in authors])
    frontmatter.append("tracking:")
    frontmatter.extend([f"  - {t}" for t in tracking])
    frontmatter.extend(
        [
            f'baseline_commit: "{baseline}"',
            f'created: "{now}"',
            f'last_reviewed: "{now}"',
            "---",
            "",
            "# Context",
            "",
            "# Changes",
            "",
            "# Impact",
            "",
        ]
    )

    target.write_text("\n".join(frontmatter), encoding="utf-8", newline="\n")
    print(f"Created: {args.path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
