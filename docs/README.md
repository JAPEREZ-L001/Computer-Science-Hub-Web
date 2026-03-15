# Documentación — Computer Science Hub Web

Índice de la documentación del proyecto y ciclo de vida de los documentos.

## Estructura

| Carpeta | Uso |
|--------|-----|
| [handbook](handbook/) | Manual del proyecto: arquitectura, decisiones, guías. **Origen de verdad** para doc activa. |
| [work](work/) | Borradores y documentación en progreso. Contenido temporal; se promueve a handbook o se archiva. |
| [tutorials](tutorials/) | Tutoriales y guías paso a paso (origen de verdad cuando publicados). |
| [_archive](_archive/) | Documentos archivados o deprecados. |
| [Planes](Planes/) | Planes de trabajo (`.plan.md`). Los planes creados por el asistente se guardan aquí. |
| [Prototipos](Prototipos/) | Prototipos HTML/CSS y referencias de diseño. |
| [Referencias](Referencias/) | Referencias escritas y branding. |

## Ciclo de vida

- **work/** → contenido temporal; no se trackea activamente en auditorías.
- **handbook/** y **tutorials/** → fuente de verdad; los documentos deben tener frontmatter estándar (title, status, owner, authors, tracking, baseline_commit, created, last_reviewed).
- Estados activos: solo `draft` y `active`.
- Contenido archivado o deprecado → **docs/_archive/** o eliminación.

## Configuración

La gobernanza se define en [docs-config.yaml](docs-config.yaml) (ignore, untrack). Los esquemas de frontmatter y module.yaml están en la skill docs-governor (`.cursor/skills/docs-governor/references/schemas.md` o en `docs/skillreferencia/docs-governor-copy/references/schemas.md`).
