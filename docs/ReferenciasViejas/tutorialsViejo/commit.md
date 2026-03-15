---
title: "Commit current work"
status: "active"
owner: "@team"
authors: ["@team"]
tracking:
  - AGENTS.md
baseline_commit: ""
created: "2026-02-07"
last_reviewed: "2026-02-07"
---

# Goal

Define how to create a clean commit for the current work only.

# Important

- Use your working memory to determine what changed.
- Commit only when explicitly instructed.
- Do not commit subsequent work unless explicitly instructed again.

# Commit message format

Use this exact structure in English:

```text
type:Short title description (< 80 characters) include Issue code if fixing one

- 2~5 bullet points (< 80 characters) with quick description
Reason: quick explanation why this implementation was done.
```

Example:

```text
docs:Update local setup tutorial and metadata

- Rewrite tutorial with clear local setup steps
- Add troubleshooting and validation checklist
Reason: New contributors need a reliable onboarding flow.
```

# Procedure

1. Inspect current changes.
   - Run `git status`.
   - Run `git diff` (staged and unstaged).

2. Review each changed file individually.
   - Confirm each file is related to the task you just completed.
   - Exclude unrelated, temporary, or accidental changes.

3. Stage only related files.
   - Use `git add <file>` per file when possible.

4. Write the commit message using the required template.
   - Keep title and bullets under 80 characters.
   - Add issue code in title when applicable.

5. Create commit and verify.
    - First `-m` argument: title only (type:Short description)
    - Second `-m` argument: bullets + reason (multiline body)
    - Example command:
      ```bash
      git commit -m "feat:Add user authentication flow" -m "- Add login form with validation
      - Add OAuth providers configuration
      Reason: Enable users to authenticate via email or social providers."
      ```
    - Run `git status` to confirm clean staged state.

6. Optional push prompt.
   - If current branch is not `main`, ask:
     `Would you like me to push this commit?`

# Rules for commit type

Commit types:

- `feat`: new behavior or capability
- `fix`: bug fix
- `docs`: documentation only
- `refactor`: code restructure without behavior change
- `test`: tests added or updated
- `chore`: maintenance, tooling, or housekeeping

# Anti-patterns to avoid

- Ambiguous titles like `fix`, `changes`, `update`.
- Mixing unrelated files in a single commit.
- Committing temporary, generated, or secret files.
- Skipping per-file review before staging.
