# Issues — Computer Science Hub (Linear)

> Generado: 20-03-2026 | Fuente: Linear (equipo: Computer Science Hub)
> Comparación realizada contra el estado actual del repositorio.

---

## Leyenda

| Símbolo | Significado |
|---------|-------------|
| ✅ | Implementado en el codebase |
| ⚠️ | Parcialmente implementado |
| ❌ | Pendiente / No implementado |

---

## Sprint 1 — Frontend: Páginas UI con datos mock

| ID | Issue | Prioridad | Etiqueta | Estado Linear | Implementado |
|----|-------|-----------|----------|---------------|--------------|
| CSH-5 | [S1-01] Crear tipos TypeScript base del proyecto | High | Fundamentos | Todo | ✅ `src/types/index.ts` existe |
| CSH-6 | [S1-02] Crear archivos de mock data | High | Fundamentos | Todo | ✅ `mock-events.ts`, `mock-members.ts`, `mock-news.ts` y `mock-sponsors.ts` existen |
| CSH-7 | [S1-03] Crear página /login | High | Auth UI | Todo | ✅ `app/login/page.tsx` existe |
| CSH-8 | [S1-04] Crear página /registro | High | Auth UI | Todo | ✅ `app/registro/page.tsx` existe |
| CSH-9 | [S1-05] Crear página /perfil | High | Perfil UI | Todo | ✅ `app/perfil/page.tsx` existe |
| CSH-10 | [S1-06] Crear página /miembros | Medium | Directorio UI | Todo | ✅ `app/miembros/page.tsx` existe |
| CSH-11 | [S1-07] Crear página /noticias | Medium | Noticias UI | Todo | ✅ `app/noticias/page.tsx` existe |
| CSH-12 | [S1-08] Crear página /noticias/[slug] | Medium | Noticias UI | Todo | ✅ `app/noticias/[slug]/page.tsx` existe |
| CSH-13 | [S1-09] Crear página /eventos | Medium | Eventos UI | Todo | ✅ `app/eventos/page.tsx` existe |
| CSH-14 | [S1-10] Agregar sección de patrocinadores a la landing | Low | Sponsors UI | Todo | ✅ `SponsorsSection` integrada en `app/page.tsx` |
| CSH-15 | [S1-11] Actualizar navegación del Header | High | Fundamentos | Todo | ✅ Header incluye links a Noticias, Eventos, Miembros y Login |
| CSH-16 | [S1-12] Verificación final de DoD y responsive | High | Fundamentos | Todo | ✅ Verificación registrada en `docs/work/Issues/sprint1-dod-verificacion.md` |

---

## Sprint 2 — Backend: Supabase, Auth y Comunidad

### Épica: Infraestructura

| ID | Issue | Prioridad | Estado Linear | Implementado |
|----|-------|-----------|---------------|--------------|
| CSH-17 | [S2-01] Setup de Supabase — proyecto, cliente y variables de entorno | Urgent | Todo | ✅ `src/lib/supabase/*`, `middleware.ts`, `.env.example` |
| CSH-18 | [S2-02] Crear schema de base de datos (SQL + migraciones) | Urgent | Todo | ✅ Migraciones en `supabase/migrations/` + tablas en proyecto Supabase |
| CSH-19 | [S2-03] Configurar Row Level Security (RLS) | Urgent | Todo | ✅ `csh_s2_19_rls.sql` + RLS en tablas CSH (sin tocar betatesters) |
| CSH-20 | [S2-04] Crear seed inicial de datos | Medium | Todo | ✅ `csh_s2_20_seed.sql` aplicado en DB (sin `profiles` hasta auth) |

### Épica: Auth Real

| ID | Issue | Prioridad | Estado Linear | Implementado |
|----|-------|-----------|---------------|--------------|
| CSH-21 | [S2-05] Implementar registro con Supabase Auth | Urgent | Todo | ✅ `app/registro/page.tsx` + `signUp` + trigger `csh_s2_21_handle_new_user` |
| CSH-22 | [S2-06] Implementar login y logout | Urgent | Todo | ✅ `app/login/page.tsx` + `signInWithPassword`; logout en `components/header.tsx` |
| CSH-23 | [S2-07] Implementar callback de confirmación de email | Urgent | Todo | ✅ `app/auth/callback/route.ts` + `app/auth/auth-code-error/page.tsx` |
| CSH-24 | [S2-08] Proteger rutas privadas con middleware | Urgent | Todo | ✅ `src/lib/supabase/middleware.ts` (`/perfil` protegida; auth pages con sesión → `/perfil`) |

### Épica: Conectar UI a DB

| ID | Issue | Prioridad | Estado Linear | Implementado |
|----|-------|-----------|---------------|--------------|
| CSH-25 | [S2-09] Conectar /perfil a Supabase | Urgent | Todo | ❌ `/perfil` existe, pero aún usa mock data |
| CSH-26 | [S2-10] Conectar /miembros a Supabase | Medium | Todo | ❌ Usa mock data aún |
| CSH-27 | [S2-11] Conectar /noticias y /noticias/[slug] a Supabase | Medium | Todo | ❌ Usa mock data aún |
| CSH-28 | [S2-12] Conectar /eventos, /oportunidades y /recursos a Supabase | Medium | Todo | ❌ Usa mock data aún |
| CSH-29 | [S2-13] Conectar sponsors de la landing a Supabase | Low | Todo | ❌ Sponsors no implementados |

### Épica: Panel Admin

| ID | Issue | Prioridad | Estado Linear | Implementado |
|----|-------|-----------|---------------|--------------|
| CSH-30 | [S2-14] Crear dashboard del panel admin (/admin) | Urgent | Todo | ❌ Ruta `/admin` no existe |
| CSH-31 | [S2-15] CRUD de Noticias en el panel admin | Urgent | Todo | ❌ Panel admin no existe |
| CSH-32 | [S2-16] CRUD de Eventos, Oportunidades, Recursos y Sponsors en admin | Urgent | Todo | ❌ Panel admin no existe |
| CSH-33 | [S2-17] Gestión de miembros en el panel admin | Medium | Todo | ❌ Panel admin no existe |

### Épica: Comunidad

| ID | Issue | Prioridad | Estado Linear | Implementado |
|----|-------|-----------|---------------|--------------|
| CSH-34 | [S2-18] Módulo de Tutorías | Medium | Todo | ❌ No implementado |
| CSH-35 | [S2-19] Repositorio de Documentación del Hub | Medium | Todo | ❌ No implementado |
| CSH-36 | [S2-20] Sección de Podcast / Media | Low | Todo | ❌ No implementado |
| CSH-37 | [S2-21] Investigación y Publicaciones | Low | Todo | ❌ No implementado |
| CSH-38 | [S2-22] Competencias y Ranking | Low | Todo | ❌ No implementado |
| CSH-39 | [S2-23] Votación Comunitaria (Licitaciones de Ideas) | Low | Todo | ❌ No implementado |
| CSH-40 | [S2-24] Matching Mentor-Estudiante | Low | Todo | ❌ No implementado |
| CSH-41 | [S2-25] Dashboard de Beneficios de Afiliación | Low | Todo | ❌ No implementado |

---

## Issues completados en Linear (onboarding)

| ID | Issue | Estado Linear |
|----|-------|---------------|
| CSH-1 | Get familiar with Linear | ✅ Done |
| CSH-2 | Set up your teams | ✅ Done |
| CSH-3 | Connect your tools | ✅ Done |
| CSH-4 | Import your data | ✅ Done |

---

## Resumen

| Estado | Cantidad |
|--------|----------|
| ✅ Implementado | 15 |
| ⚠️ Parcial | 1 |
| ❌ Pendiente | 20 |
| ✅ Done (Linear onboarding) | 4 |
| **Total** | **41** |
