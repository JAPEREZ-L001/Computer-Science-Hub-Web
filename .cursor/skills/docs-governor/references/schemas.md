# Documentation schemas

## Frontmatter required fields

Every active markdown document in `docs/handbook/**` or `docs/tutorials/**` should include:

- `title`
- `status` (`draft` or `active`)
- `owner`
- `authors` (array)
- `tracking` (array of file paths/globs)
- `baseline_commit`
- `created`
- `last_reviewed`

## docs-config.yaml

Expected keys:

- `ignore`: list of doc globs excluded from documentation audit scope.
- `untrack`: list of code globs excluded from tracking alerts during baseline diff checks.

## module.yaml

Expected keys:

- `id`
- `name`
- `description`
- `functions` (array)
- `depends_on` (array)
- `tracking` (array)
