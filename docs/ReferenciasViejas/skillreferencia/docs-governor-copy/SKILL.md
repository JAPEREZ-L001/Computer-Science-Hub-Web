---
name: docs-governor
description: Manage project documentation lifecycle for this repository. Use when a request involves a concrete documentation action (create, validate, audit, archive, promote from docs/work to docs/handbook), documentation planning for a new branch, or post-implementation documentation updates after coding/testing.
---

# Docs Governor

Manage documentation using the repository rules in `docs/`.

## Required context before acting

Read these files first:

1. `AGENTS.md`
2. `README.md`
3. `docs/handbook/architecture.md`
4. `docs/docs-config.yaml`

## Canonical flow

1. Identify request type: `action`, `planning`, or `implementation`.
2. Run the matching script from `scripts/`.
3. Validate result consistency (frontmatter, structure, tracking/baseline).
4. If validation finishes clean with no pending findings, `check_doc_validation.py` auto-runs architecture generation.
5. Return concise output: changes made, issues found, next step.

This flow follows the documented lifecycle in `docs/work/26-01-27-sections/propuesta-de-gestion-doc.md`.

## Request mapping

- Create document -> `scripts/create_doc.py`
- Validate documentation system and module coverage -> `scripts/check_doc_validation.py`
- Generate handbook architecture from modules/docs metadata -> `scripts/generate_architecture.py`
- Find docs that reference a specific file -> `scripts/find_docs_for_file.py`
- Audit docs after code changes -> `scripts/audit_docs.py`
- Promote work doc to handbook -> `scripts/promote_work_doc.py`
- Archive doc -> `scripts/archive_doc.py`
- Register implementation doc after coding -> `scripts/register_implementation_doc.py`

## Script functions

- `create_doc.py`: Creates a markdown doc with standard frontmatter (`created`, `last_reviewed`, `baseline_commit`).
- `check_doc_validation.py`: Validates structure/config/frontmatter, validates module assignment + module-doc state, and auto-runs `generate_architecture.py` when the validation result has no pending findings.
- `generate_architecture.py`: Rebuilds `docs/handbook/architecture.md` from `docs/handbook/*/module.yaml` and frontmatter metadata from module docs.
- `find_docs_for_file.py`: Receives a file path and returns, ordered by module, the list of docs whose `tracking` references that file.
- `audit_docs.py`: Audits docs after implementation changes.
- `promote_work_doc.py`: Promotes a work doc to handbook.
- `archive_doc.py`: Archives a doc under `_archive` lifecycle.
- `register_implementation_doc.py`: Registers implementation-side documentation updates post-coding.

## Lifecycle policy

- `docs/work/**` is temporary support content and is excluded from active tracking.
- Source of truth lives in `docs/handbook/**` and `docs/tutorials/**`.
- Active states are only `draft` and `active`.
- Archive/deprecated content belongs in `docs/_archive/**` or is removed.

## Command examples (copia local, no trackeada)

```bash
py .agents/skills/docs-governor-copy/scripts/check_doc_validation.py --limit-undocumented 1
py .agents/skills/docs-governor-copy/scripts/generate_architecture.py
py .agents/skills/docs-governor-copy/scripts/find_docs_for_file.py src/hooks/useModelChat.ts --root .
py .agents/skills/docs-governor-copy/scripts/create_doc.py docs/handbook/auth/session-timeout.md --title "Session Timeout" --owner "@rod"
```
