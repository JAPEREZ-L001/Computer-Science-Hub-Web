# Informe de Auditoría de Seguridad y QA — ComputerSciencieHub-Web

**Fecha**: 2026-03-20  
**Stack**: Next.js 16 App Router · Supabase (Auth + Postgres + RLS) · TypeScript · Vercel  
**Alcance**: Código fuente completo — auth, middleware, server actions, RLS, config, componentes

---

## Resumen ejecutivo

| Severidad | Cant. | Estado |
|-----------|-------|--------|
| Crítico   | 3     | Resuelto |
| Alto      | 6     | Resuelto (H-02 y H-06 documentados — requieren infra externa) |
| Medio     | 9     | Resuelto |
| Bajo      | 6     | Resuelto (L-01, L-02, L-04 fuera de alcance de código) |

---

## CRÍTICOS

### C-01. Race Condition en conteo de votos — `voteCommunityIdea`

- **Archivo**: `app/comunidad/actions.ts`
- **Problema**: TOCTOU — `SELECT vote_count` seguido de `UPDATE vote_count = next`. Dos votos simultáneos leen el mismo valor y uno se pierde.
- **Fix aplicado**: Reemplazado por RPC `increment_idea_vote_count` con `vote_count = vote_count + 1` atómico. Creada migración `csh_s2_25_rpc_increment_vote.sql`.

### C-02. RLS permite a usuarios anónimos escribir en tablas de comunidad

- **Archivos**: `supabase/migrations/csh_s2_24_community.sql`
- **Problema**: Las políticas INSERT solo verifican `auth.uid() IS NOT NULL`. Los usuarios anónimos (creados por `signInAnonymously()`) tienen uid válido y pueden escribir directamente via API REST de Supabase, saltando `requireUser()`.
- **Fix aplicado**: Migración `csh_s2_26_rls_block_anon.sql` — reescribe las 4 políticas INSERT de comunidad añadiendo `AND (auth.jwt()->>'is_anonymous')::boolean IS NOT TRUE`.

### C-03. `ignoreBuildErrors: true` oculta errores de tipo en producción

- **Archivo**: `next.config.mjs`
- **Problema**: Errores TS llegan a producción silenciosamente.
- **Fix aplicado**: Cambiado a `false`. Errores TS existentes corregidos.

---

## ALTOS

### H-01. No hay validación de protocolo en URLs renderizadas como `href`

- **Archivos**: server actions de admin, `app/comunidad/actions.ts`
- **Problema**: Stored XSS via `javascript:` en URLs controladas por admin.
- **Fix aplicado**: Helper `isSafeUrl()` en `src/lib/url-validation.ts`. Todas las server actions que guardan URLs ahora validan protocolo `http(s)://`.

### H-02. No hay rate limiting en Server Actions

- **Problema**: Brute force en login, spam en comunidad.
- **Estado**: Documentado — requiere infraestructura externa (Upstash, Vercel KV). Supabase Auth tiene rate limiting propio para login. Las server actions de comunidad bloquean anónimos con `requireUser()` + RLS actualizado (C-02).

### H-03. No hay security headers configurados

- **Archivo**: `next.config.mjs`
- **Fix aplicado**: Agregados `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`, `Permissions-Policy`.

### H-04. ESLint no está instalado

- **Archivo**: `package.json`
- **Fix aplicado**: ESLint añadido a `devDependencies` con `eslint-config-next`.

### H-05. Falta política DELETE en la tabla `profiles`

- **Fix aplicado**: Migración `csh_s2_26_rls_block_anon.sql` añade política DELETE para admin.

### H-06. Sesiones anónimas automáticas inflan `auth.users` y `profiles`

- **Estado**: Documentado — requiere decisión de producto (desactivar anónimos o implementar cron de limpieza). El RLS actualizado (C-02) mitiga el riesgo de abuso.

---

## MEDIOS

### M-01. Registro ignora parámetro `redirect`

- **Archivo**: `app/registro/page.tsx`
- **Fix aplicado**: Lee `searchParams.get('redirect')` con `safeRedirectPath()` y redirige allí tras registro.

### M-02. Recuperación de contraseña no implementada

- **Archivo**: `app/login/page.tsx`
- **Fix aplicado**: Implementado flujo con `supabase.auth.resetPasswordForEmail()`.

### M-03. `getSession()` en cliente no valida JWT

- **Archivo**: `components/providers/auth-session-provider.tsx`
- **Fix aplicado**: Reemplazado `getSession()` por `getUser()` como fuente primaria.

### M-04. Doble `getUser()` en flujo admin fallido

- **Archivo**: `src/lib/supabase/admin-auth.ts`
- **Fix aplicado**: Refactorizado `requireAdmin()` y `assertAdminAction()` para reutilizar usuario/supabase de `getAdminSession()`.

### M-05. Conversión anónimo→registrado puede dejar profile desactualizado

- **Archivo**: `app/registro/page.tsx`
- **Fix aplicado**: Agregado manejo de error del upsert con toast informativo.

### M-06. `NEXT_PUBLIC_SITE_URL` sin valor causa emails con enlace a localhost

- **Archivo**: `src/lib/site-url.ts`
- **Fix aplicado**: Agregado `console.warn` en servidor cuando falta la variable. Log visible en deploy.

### M-07. Sin paginación en consultas de listado

- **Archivos**: `src/lib/supabase/queries.ts`, `community-queries.ts`
- **Fix aplicado**: Agregado `.limit()` razonable a todas las consultas de listado.

### M-08. No hay validación de UUID en `ideaId`

- **Archivo**: `app/comunidad/actions.ts`
- **Fix aplicado**: Helper `isValidUUID()` en `src/lib/url-validation.ts`. Validación en `voteCommunityIdea` y `deleteNews/Event/etc.`

### M-09. Mensajes de error de Supabase expuestos al usuario

- **Archivos**: Todas las server actions
- **Fix aplicado**: Errores de BD logueados con `console.error` y mensaje genérico retornado al frontend.

---

## BAJOS

### L-01. Migración base ausente (`csh_s2_18`)

- **Estado**: Fuera de alcance de código — documentar en `supabase/README.md`.

### L-02. Seed data con URLs de `example.com`

- **Estado**: Fuera de alcance — datos de demo. Documentado para reemplazar antes de producción.

### L-03. Sin índices en columnas frecuentemente filtradas

- **Fix aplicado**: Migración `csh_s2_27_indexes.sql` con índices en `profiles.status`, `news.published`, `events.published`, `community_ideas.status`.

### L-04. Sin CI/CD pipeline ni tests automatizados

- **Estado**: Fuera de alcance de esta auditoría — requiere decisión de equipo.

### L-05. `vote_count` sin constraint `CHECK >= 0`

- **Fix aplicado**: Incluido en migración `csh_s2_25_rpc_increment_vote.sql`.

### L-06. Protección de "último admin" incompleta

- **Archivo**: `app/admin/actions/members.ts`
- **Fix aplicado**: Verificación de conteo de admins antes de permitir demotion.

---

## Archivos creados / modificados

| Archivo | Cambio |
|---------|--------|
| `supabase/migrations/csh_s2_25_rpc_increment_vote.sql` | **Nuevo** — RPC atómico + CHECK constraint |
| `supabase/migrations/csh_s2_26_rls_block_anon.sql` | **Nuevo** — RLS anti-anónimos + DELETE profiles |
| `supabase/migrations/csh_s2_27_indexes.sql` | **Nuevo** — Índices de rendimiento |
| `src/lib/url-validation.ts` | **Nuevo** — `isSafeUrl()`, `isValidUUID()` |
| `app/comunidad/actions.ts` | Modificado — voto atómico, UUID validation, errores genéricos |
| `app/admin/actions/*.ts` | Modificados — URL validation, error sanitization |
| `app/admin/actions/members.ts` | Modificado — protección último admin |
| `app/login/page.tsx` | Modificado — recuperación de contraseña |
| `app/registro/page.tsx` | Modificado — redirect, error handling upsert |
| `components/providers/auth-session-provider.tsx` | Modificado — getUser() |
| `src/lib/supabase/admin-auth.ts` | Modificado — eliminar doble getUser |
| `src/lib/supabase/queries.ts` | Modificado — limits |
| `src/lib/supabase/community-queries.ts` | Modificado — limits |
| `src/lib/site-url.ts` | Modificado — warning |
| `next.config.mjs` | Modificado — headers, ignoreBuildErrors: false |
| `package.json` | Modificado — eslint deps |

---

*Informe generado el 2026-03-20. Actualizar cuando cambien hallazgos o se apliquen fixes adicionales.*
