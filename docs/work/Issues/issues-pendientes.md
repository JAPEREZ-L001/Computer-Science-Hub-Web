# Issues Pendientes — Computer Science Hub

> Actualizado: 20-03-2026
> Lista filtrada de `issues-linear.md` — solo issues sin implementar en el codebase.

---

## Sprint 1 — Pendientes (0)

Sprint 1 quedó completado en esta rama:

- ✅ CSH-6: `src/data/mock-sponsors.ts` creado
- ✅ CSH-9: `app/perfil/page.tsx` implementada
- ✅ CSH-14: `components/sponsors-section.tsx` integrada en `app/page.tsx`
- ✅ CSH-16: verificación registrada en `docs/work/Issues/sprint1-dod-verificacion.md`

---

## Sprint 2 — Pendientes (0)

### Épica: Infraestructura

| ID | Issue | Prioridad | Depende de |
|----|-------|-----------|------------|
| — | *Ninguno pendiente* (CSH-17 … CSH-20 listos) | — | — |

### Épica: Auth Real

| ID | Issue | Prioridad | Depende de |
|----|-------|-----------|------------|
| — | *Épica completada* | — | — |

- ✅ CSH-21: `app/registro/page.tsx` + `signUp` + metadata + trigger `csh_s2_21_handle_new_user.sql`
- ✅ CSH-22: `app/login/page.tsx` + `signInWithPassword`; logout en `components/header.tsx`
- ✅ CSH-23: `app/auth/callback/route.ts` + `app/auth/auth-code-error/page.tsx`
- ✅ CSH-24: `src/lib/supabase/middleware.ts` protege `/perfil`; redirige sesión activa fuera de `/login` y `/registro`

### Épica: Conectar UI a DB

| ID | Issue | Prioridad | Depende de |
|----|-------|-----------|------------|
| — | *Épica completada* | — | — |

- ✅ CSH-25: `/perfil` — `createClient` + `fetchProfileByUserId` + `fetchRelatedMembers` (`app/perfil/page.tsx`)
- ✅ CSH-26: `/miembros` — `fetchActiveProfiles` + `components/miembros-directory.tsx`
- ✅ CSH-27: `/noticias`, `/noticias/[slug]` — `fetchPublishedNews`, `fetchNewsBySlug`
- ✅ CSH-28: `/eventos`, `/oportunidades`, `/recursos` — consultas en `src/lib/supabase/queries.ts` + páginas server + clientes donde hacía falta interactividad
- ✅ CSH-29: landing — `fetchActiveSponsors` en `components/sponsors-section.tsx` (async)
- Migración opcional columnas perfil / `created_at`: `supabase/migrations/csh_s2_22_ui_profile_news_columns.sql`

### Épica: Panel Admin

| ID | Issue | Prioridad | Depende de |
|----|-------|-----------|------------|
| — | *Épica completada* | — | — |

- ✅ CSH-30: `/admin` — layout + sidebar + resumen con conteos (`app/admin/layout.tsx`, `app/admin/page.tsx`, `admin-queries.adminCounts`)
- ✅ CSH-31: CRUD noticias — `app/admin/noticias` + `app/admin/actions/news.ts` + `components/admin/news-admin-panel.tsx`
- ✅ CSH-32: CRUD eventos, oportunidades, recursos, sponsors — rutas bajo `app/admin/*` + acciones en `app/admin/actions/`
- ✅ CSH-33: Miembros — `app/admin/miembros` + `actions/members.ts` + `members-admin-panel.tsx` (edición; no auto-quitar admin propio)
- Auth: `getAdminSession` / `requireAdmin` (`src/lib/supabase/admin-auth.ts`); middleware exige sesión en `/admin`
- Rol: migración `supabase/migrations/csh_s2_23_profiles_role_default.sql` (`role` en `profiles`; primer admin: `UPDATE public.profiles SET role = 'admin' WHERE email = '…'`)
- Header: enlace **Admin** si `profiles.role = 'admin'` (`AuthSessionProvider` + `header.tsx`)

### Épica: Comunidad

| ID | Issue | Prioridad | Depende de |
|----|-------|-----------|------------|
| — | *Épica completada* | — | — |

- ✅ CSH-34 **Tutorías**: `/comunidad/tutorias` + tabla `tutoring_requests` + `submitTutoringRequest` (`app/comunidad/actions.ts`)
- ✅ CSH-35 **Documentación**: `/comunidad/documentacion` + `hub_documents` (seed en migración)
- ✅ CSH-36 **Podcast / media**: `/comunidad/podcast` + `podcast_episodes`
- ✅ CSH-37 **Investigación**: `/comunidad/investigacion` + `research_publications`
- ✅ CSH-38 **Competencias / ranking**: `/comunidad/competencias` + `community_leaderboard` (datos demo)
- ✅ CSH-39 **Votación de ideas**: `/comunidad/ideas` + `community_ideas` / `community_idea_votes` + votar / proponer
- ✅ CSH-40 **Matching mentor–estudiante**: `/comunidad/mentores` + `mentor_matching_profiles` + directorio (sesión requerida) + formulario de perfil
- ✅ CSH-41 **Beneficios de afiliación**: `/comunidad/beneficios` + aliados vía `fetchActiveSponsors` + CTA según sesión
- Hub índice: `/comunidad` · consultas: `src/lib/supabase/community-queries.ts` · UI: `components/comunidad/*` · migración: `supabase/migrations/csh_s2_24_community.sql`
- Navegación: enlace **Comunidad** en menú Explorar del `header.tsx`

### Avance aplicado en esta rama

- ✅ CSH-34..41 completado (comunidad): ver bloque épica arriba
- ✅ CSH-30..33 completado (panel admin): `app/admin/**`, `src/lib/supabase/admin-auth.ts`, `admin-queries.ts`
- ✅ CSH-25..29 completado (UI pública ↔ Supabase): `src/lib/supabase/queries.ts`
- ✅ CSH-17 completado:
  - Dependencias instaladas: `@supabase/supabase-js`, `@supabase/ssr`
  - Cliente browser: `src/lib/supabase/client.ts`
  - Cliente server: `src/lib/supabase/server.ts`
  - Middleware de refresh de sesion: `src/lib/supabase/middleware.ts` + `middleware.ts`
  - Variables base: `.env.example`
- ✅ CSH-18 completado (MCP Supabase, sin tocar tabla de betatesters):
  - Tabla preservada: `public.respuestas_betatesters`
  - Tablas creadas: `public.profiles`, `public.news`, `public.events`,
    `public.opportunities`, `public.resources`, `public.sponsors`
  - Indices base creados para listados y filtros publicos
- ✅ CSH-19 completado (MCP Supabase):
  - Función `public.is_admin()` (security definer)
  - RLS en: `profiles`, `news`, `events`, `opportunities`, `resources`, `sponsors`
  - Lectura pública: contenido `published` / sponsors `active` / perfiles `activo`
  - Escritura admin en tablas de contenido; perfil: dueño o admin
  - SQL en repo: `supabase/migrations/csh_s2_19_rls.sql`
- ✅ CSH-20 completado (MCP Supabase `execute_sql` + script en repo):
  - Seed idempotente: `supabase/migrations/csh_s2_20_seed.sql`
  - Datos: 5 noticias, 5 eventos, 5 oportunidades, 9 recursos, 4 sponsors
  - `profiles`: no hay seed SQL; filas creadas por registro + trigger (`csh_s2_21_handle_new_user`)
- ✅ CSH-21..24 completado (Auth real):
  - Migración: `supabase/migrations/csh_s2_21_handle_new_user.sql` (trigger perfil)
  - Rutas: `app/auth/callback/route.ts`, `app/auth/auth-code-error/page.tsx`
  - `NEXT_PUBLIC_SITE_URL` en `.env.example` (redirect email)

---

## Orden de ataque recomendado (por dependencias)

```
CSH-9   → perfil page (Sprint 1 bloqueante)
CSH-6   → mock-sponsors.ts (Sprint 1 bloqueante)
CSH-14  → sección sponsors landing
CSH-16  → verificación DoD

CSH-17  → Setup Supabase (base de todo Sprint 2)
CSH-18  → Schema SQL
CSH-19  → RLS
CSH-20  → Seed
CSH-21..24 → Auth completo ✅
CSH-25..29 → Conectar UI a DB ✅
CSH-30..33 → Panel Admin ✅
CSH-34..41 → Módulos de comunidad ✅
```

---

## Totales pendientes

| Sprint | Pendientes |
|--------|-----------|
| Sprint 1 | 0 |
| Sprint 2 | 0 |
| **Total** | **0** |

> **Nota:** Contenido curado de comunidad (docs, podcast, publicaciones, ranking) tiene CRUD solo vía SQL o futuro panel admin; la migración `csh_s2_24_community.sql` incluye seed inicial.
