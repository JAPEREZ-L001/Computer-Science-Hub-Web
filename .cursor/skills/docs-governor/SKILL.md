---
name: docs-governor
description: Manage project documentation lifecycle for this repository. Use when a request involves a concrete documentation action (create, validate, audit, archive, promote from docs/work to docs/handbook), documentation planning for a new branch, or post-implementation documentation updates after coding/testing.
---

# Docs Governor

Manage documentation using the repository rules in `docs/`.

## Required context before acting

Read these files first:

1. `README.md`
2. `docs/README.md`
3. `docs/handbook/architecture.md`
4. `docs/docs-config.yaml`

If `AGENTS.md` exists, read it as well. Otherwise README and docs/README are sufficient.

## Canonical flow

1. Identify request type: `action`, `planning`, or `implementation`.
2. Run the matching script from `scripts/`.
3. Validate result consistency (frontmatter, structure, tracking/baseline).
4. If validation finishes clean with no pending findings, `check_doc_validation.py` auto-runs architecture generation.
5. Return concise output: changes made, issues found, next step.

## Request mapping

- Create document -> `scripts/create_doc.py`
- Validate documentation system and module coverage -> `scripts/check_doc_validation.py`
- Generate handbook architecture from modules/docs metadata -> `scripts/generate_architecture.py`
- Find docs that reference a specific file -> `scripts/find_docs_for_file.py`
- Audit docs after code changes -> `scripts/audit_docs.py` (see reference in docs/skillreferencia)
- Promote work doc to handbook -> `scripts/promote_work_doc.py` (see reference)
- Archive doc -> `scripts/archive_doc.py` (see reference)
- Register implementation doc after coding -> `scripts/register_implementation_doc.py` (see reference)

## Script functions

- `create_doc.py`: Creates a markdown doc with standard frontmatter (`created`, `last_reviewed`, `baseline_commit`).
- `check_doc_validation.py`: Validates structure/config/frontmatter, validates module assignment + module-doc state, and auto-runs `generate_architecture.py` when the validation result has no pending findings.
- `generate_architecture.py`: Rebuilds `docs/handbook/architecture.md` from `docs/handbook/*/module.yaml` and frontmatter metadata from module docs.
- `find_docs_for_file.py`: Receives a file path and returns, ordered by module, the list of docs whose `tracking` references that file.

## Lifecycle policy

- `docs/work/**` is temporary support content and is excluded from active tracking.
- Source of truth lives in `docs/handbook/**` and `docs/tutorials/**`.
- Active states are only `draft` and `active`.
- Archive/deprecated content belongs in `docs/_archive/**` or is removed.

## Command examples

Run from repository root. Scripts live in `.cursor/skills/docs-governor/scripts/`.

```bash
python .cursor/skills/docs-governor/scripts/check_doc_validation.py --limit-undocumented 1
python .cursor/skills/docs-governor/scripts/generate_architecture.py --root .
python .cursor/skills/docs-governor/scripts/find_docs_for_file.py app/page.tsx --root .
python .cursor/skills/docs-governor/scripts/create_doc.py docs/handbook/core/decision-x.md --title "Decision X" --owner "@csh"
```
