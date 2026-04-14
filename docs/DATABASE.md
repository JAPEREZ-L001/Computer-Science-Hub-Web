# DATABASE.md — Schema de Supabase

> Ultima actualizacion: 2026-03-26
> Para el contexto completo → `CONTEXT.md`

---

## Tablas del Sistema

### `profiles`
Perfil de cada usuario autenticado. Se crea automaticamente al registrarse.

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | uuid (PK) | Mismo ID que `auth.users` |
| `full_name` | text | Nombre completo |
| `email` | text | Email del usuario |
| `career` | text | Carrera universitaria |
| `cycle` | int | Ciclo academico actual |
| `area` | text | Area tecnica: `frontend \| backend \| diseño \| devops \| ia \| seguridad \| general` |
| `status` | text | `activo \| inactivo` |
| `role` | text | `member \| agent \| fellow \| admin` |
| `bio` | text | Descripcion personal |
| `github_url` | text | URL de GitHub |
| `linkedin_url` | text | URL de LinkedIn |
| `onboarding_completed` | bool | Si completo el flujo de bienvenida |
| `reputation_score` | int | Puntos de reputacion (default 0) |
| `avatar_palette_index` | int | Indice de paleta de avatar generativo |
| `banner_palette_index` | int | Indice de paleta de banner |
| `created_at` | timestamptz | Fecha de registro |

---

### `events`
Eventos publicos del hub.

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | uuid (PK) | |
| `title` | text | Titulo del evento |
| `description` | text | Descripcion detallada |
| `event_date` | date | Fecha del evento |
| `event_time` | time | Hora del evento |
| `speaker` | text | Nombre del ponente (opcional) |
| `type` | text | `workshop \| charla \| hackathon \| copa \| networking \| otro` |
| `location` | text | Lugar (fisico o URL online) |
| `registration_url` | text | Link externo de registro (opcional) |
| `published` | bool | Visible publicamente |
| `created_by` | uuid (FK → profiles) | Quien lo creo |

### `event_registrations`
| Campo | Tipo |
|---|---|
| `user_id` | uuid (FK → profiles) |
| `event_id` | uuid (FK → events) |
| `registered_at` | timestamptz |
> Clave primaria compuesta: `(user_id, event_id)`

---

### `news`
Noticias/anuncios del hub.

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | uuid | |
| `slug` | text | URL amigable unico |
| `title` | text | |
| `excerpt` | text | Resumen corto |
| `content` | text | Contenido completo (Markdown o HTML) |
| `category` | text | `anuncio \| logro \| evento \| update` |
| `published` | bool | |
| `published_at` | timestamptz | |

---

### `resources`
Recursos academicos y tecnicos.

| Campo | Tipo |
|---|---|
| `id` | uuid |
| `title` | text |
| `description` | text |
| `url` | text |
| `category` | text |
| `tags` | text[] |
| `published` | bool |

---

### `opportunities`
Oportunidades laborales y academicas.

| Campo | Tipo |
|---|---|
| `id` | uuid |
| `title` | text |
| `organization` | text |
| `description` | text |
| `url` | text |
| `type` | text |
| `published` | bool |

---

### `sponsors`
Patrocinadores del hub.

| Campo | Tipo |
|---|---|
| `id` | uuid |
| `name` | text |
| `logo_url` | text |
| `website_url` | text |
| `tier` | text | `principal \| colaborador \| aliado` |
| `active` | bool |

---

### Tablas de Comunidad

#### `community_ideas`
| Campo | Tipo |
|---|---|
| `id` | uuid |
| `title` | text |
| `description` | text |
| `vote_count` | int |
| `status` | text | `open \| closed` |
| `author_id` | uuid (FK → profiles) |
| `created_at` | timestamptz |

#### `community_idea_votes`
| Campo | Tipo |
|---|---|
| `idea_id` | uuid (FK → community_ideas) |
| `user_id` | uuid (FK → profiles) |
> PK compuesta: `(user_id, idea_id)`

#### `hub_documents` | `podcast_episodes` | `research_publications`
Tablas de contenido institucional con `published` + `sort_order`.

#### `community_leaderboard`
| `id` | `display_name` | `points` | `badge` | `area` | `sort_order` |

---

### Tablas de Mentoria

#### `tutoring_requests`
| Campo | Tipo |
|---|---|
| `id` | uuid |
| `user_id` | uuid (FK → profiles) |
| `topic` | text |
| `details` | text |
| `preferred_schedule` | text |
| `status` | text | `pending \| matched \| closed` |
| `created_at` | timestamptz |

#### `mentor_matching_profiles`
| Campo | Tipo |
|---|---|
| `user_id` | uuid (FK → profiles) |
| `role` | text | `mentor \| mentee \| both` |
| `topics` | text |
| `availability` | text |
| `bio_short` | text |
| `active` | bool |

---

## Clientes Supabase

```typescript
// Solo en 'use client' (browser):
import { createClient } from '@/src/lib/supabase/client'

// En Server Components y Server Actions:
import { createClient } from '@/src/lib/supabase/server'

// En middleware:
import { updateSession } from '@/src/lib/supabase/middleware'
```

---

## Notas sobre RLS

- Todas las tablas tienen RLS habilitado en Supabase
- Los usuarios autenticados solo pueden leer/escribir sus propios registros
- El panel admin usa `SUPABASE_SERVICE_ROLE_KEY` para bypass de RLS
- `admin-auth.ts` verifica el rol `admin` en `profiles.role` antes de ejecutar queries admin

---

## Variables de entorno

```env
NEXT_PUBLIC_SUPABASE_URL=          # URL del proyecto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # Anon key (segura para el browser)
SUPABASE_SERVICE_ROLE_KEY=         # Service role KEY (solo servidor, NUNCA al cliente)
```
