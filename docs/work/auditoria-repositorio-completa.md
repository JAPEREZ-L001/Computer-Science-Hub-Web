# Auditoría — cobertura posible en este repositorio

Documento de referencia: **qué se puede auditar**, **dónde está en el repo** y **cómo aproximarlo**. No sustituye un informe de auditoría ejecutado; sirve como checklist y mapa.

---

## 1. Resumen ejecutivo

| Área | En este repo | Prioridad típica |
|------|----------------|------------------|
| Aplicación Next.js (App Router) | `app/`, `components/`, `src/` | Alta |
| Seguridad web y sesión (Supabase) | `middleware.ts`, `src/lib/supabase/`, `app/auth/` | Crítica |
| Base de datos y RLS | `supabase/migrations/` | Crítica |
| Calidad de código y tipos | `tsconfig.json`, `next.config.mjs` | Alta |
| Dependencias npm | `package.json`, lockfile | Alta |
| Despliegue (Vercel) | `vercel.json`, script `deploy:prod` | Media |
| Documentación gobernada | `docs/handbook/`, `docs/tutorials/`, `docs/docs-config.yaml` | Media |
| Subproyectos aislados | `cuestionario-betatesters/`, prototipos en `docs/` | Baja (alcance aparte) |
| Flujos de usuario y reglas de negocio | Rutas en `app/`, acciones en `app/admin/actions/`, `app/comunidad/actions.ts` | Alta |

---

## 2. Flujos de usuario y lógica de negocio

Auditoría **funcional**: qué puede hacer cada persona, en qué orden, con qué datos, y qué reglas deben cumplirse más allá de la seguridad técnica (RLS). Complementa las secciones de código y de base de datos.

### 2.1 Qué auditar en flujos

- **Recorridos completos (E2E conceptuales)**: punto de entrada, pasos intermedios, estado final y datos persistidos o visibles.
- **Precondiciones y postcondiciones**: p. ej. “solo con sesión”, “solo admin”, “perfil creado tras registro”, “listado coherente tras crear/editar/borrar”.
- **Roles y permisos de negocio**: visitante anónimo vs usuario autenticado vs administrador; alineación entre UI (botones, enlaces a `/admin`) y comprobaciones en servidor (acciones) y en BD (RLS).
- **Reglas explícitas vs implícitas**: campos obligatorios, formatos, límites (longitud, fechas), estados (borrador/publicado si existieran), quién puede ver qué contenido.
- **Consistencia multicanal**: mismo dato mostrado en listado, detalle y panel admin; invalidación o refresco tras mutaciones.
- **Errores y vacíos**: mensajes comprensibles, páginas de error (`app/auth/auth-code-error/`), datos ausentes o seed inconsistente.
- **Integración auth ↔ perfil**: trigger `handle_new_user` y campos de metadata (`registro`) vs lo que muestra `/perfil`.

### 2.2 Mapa de flujos por área (referencia en este repo)

| Rol / contexto | Rutas o piezas típicas | Qué validar en auditoría |
|----------------|-------------------------|---------------------------|
| **Visitante** | `app/page.tsx`, `sobre`, `valores`, `programas`, `miembros`, `noticias`, `noticias/[slug]`, `eventos`, `recursos`, `oportunidades`, secciones bajo `comunidad/*` | Contenido correcto por ruta; enlaces; listados y detalle; SEO básico; sin fugas de datos restringidos. |
| **Alta de cuenta** | `app/registro/page.tsx` | Validación de formulario; metadata enviada a Supabase; correo/redirect según config; creación de fila en `profiles` (negocio + trigger). |
| **Sesión** | `app/login/page.tsx`, `app/auth/callback/route.ts`, `app/auth/auth-code-error/page.tsx` | Login, callback, recuperación de sesión en middleware, mensajes de error; URL de retorno segura. |
| **Área privada usuario** | `app/perfil/page.tsx` | Lectura/actualización de perfil acorde a columnas y RLS; coherencia con rol. |
| **Administración** | `app/admin/*`, `app/admin/actions/*.ts` | Cada CRUD (noticias, eventos, sponsors, oportunidades, recursos, miembros): solo admin; datos guardados reflejados en vistas públicas cuando corresponda. |
| **Comunidad (si aplica lógica servidor)** | `app/comunidad/actions.ts`, páginas bajo `comunidad/` | Acciones que mutan estado o lean datos sensibles; límites de uso. |

No es una lista cerrada: cualquier nueva ruta o `action` debe añadirse al mapa de flujos cuando entre en alcance.

### 2.3 Lógica de negocio en el código: qué revisar

- **Server Actions** (`app/admin/actions/*.ts`, etc.): validación de entrada (Zod u otra), comprobación de rol antes de operar, manejo de errores de Supabase, mensajes al usuario.
- **Duplicidad de reglas**: si una regla solo está en el cliente, puede eludirse; lo deseable es que **RLS + servidor** coincidan con el producto esperado.
- **Invariantes de datos**: p. ej. un evento con fecha fin &lt; inicio; slugs únicos; relaciones FK respetadas; coherencia con migraciones.
- **Idempotencia y reintentos**: doble clic en “guardar”, refresco tras error — evitar duplicados o estados rotos si la operación no es idempotente.
- **Reglas de visibilidad**: contenido “solo logueados” o “solo ciertos perfiles” — comprobar en UI y en consultas.

### 2.4 Cómo ejecutar esta auditoría

- **Matriz rol × flujo**: tabla con casos “visitante / usuario / admin” × cada flujo crítico (lectura, crear, editar, borrar).
- **Pruebas manuales guiadas**: scripts cortos tipo checklist (no sustituyen E2E automatizado pero cubren negocio).
- **Casos borde**: sin sesión, sesión expirada, usuario sin permiso intentando URL directa (`/admin/...`), datos vacíos en BD, caracteres especiales en títulos.
- **Trazabilidad**: enlazar hallazgos a issues o a secciones de `docs/work/Issues/` cuando exista política de seguimiento.

---

## 3. Código de aplicación (frontend y servidor)

### Qué auditar

- **Arquitectura de rutas**: coherencia App Router, layouts anidados, grupos de rutas, rutas dinámicas (`[slug]`).
- **Server vs client**: uso correcto de `"use client"`, límites de datos sensibles en el cliente.
- **Formularios y validación**: esquemas Zod alineados con lo que envía/recibe el servidor y Supabase.
- **Acciones de administración**: `app/admin/actions/*.ts` — autorización, validación de entrada, manejo de errores.
- **Componentes UI**: Radix + Tailwind — consistencia, estados vacíos/error, i18n futuro.

### Dónde mirar

- `app/` — páginas, layouts, rutas API/route handlers (`app/auth/callback/route.ts`, etc.).
- `components/` — UI reutilizable.
- `src/lib/` — utilidades y clientes (p. ej. Supabase).

### Cómo

- Revisión manual dirigida por flujos críticos: login, registro, perfil, admin (lista ampliada y criterios de negocio en **§2**).
- `npm run build` — fallos de compilación y advertencias de Next/React.

---

## 4. TypeScript y build

### Qué auditar

- **Errores de tipo silenciados**: en `next.config.mjs`, `typescript.ignoreBuildErrors: true` **permite desplegar con errores TS**; es un riesgo de calidad y seguridad.
- **Strict mode** en `tsconfig.json` y coherencia con el código.

### Dónde mirar

- `next.config.mjs`
- `tsconfig.json`

### Cómo

- `npx tsc --noEmit` (si está configurado) o confiar en el IDE; revisar política de `ignoreBuildErrors`.

---

## 5. Lint y estilo

### Qué auditar

- Reglas ESLint, accesibilidad (`eslint-plugin-jsx-a11y` si se añade), hooks de React, imports.

### Estado del repo

- `package.json` define `"lint": "eslint ."` pero **no hay `eslint` en `devDependencies` ni archivo de configuración ESLint visible en la raíz**; conviene verificar que `npm run lint` funcione en CI/local o documentar la excepción.

### Cómo

- `npm run lint`
- Añadir/ajustar `eslint.config.*` y dependencias si se quiere auditoría automatizada estable.

---

## 6. Seguridad — autenticación y Supabase

### Qué auditar

- **Middleware**: qué rutas refrescan sesión, exclusiones del `matcher`, coste en edge.
- **Callback OAuth / magic links**: `app/auth/callback/route.ts` — validación de `code`, redirecciones abiertas, origen.
- **Claves**: solo claves **publicables** en cliente (`NEXT_PUBLIC_*`); nunca service role en frontend.
- **Sesiones anónimas**: si están habilitadas en Supabase, políticas RLS deben asumir ese rol.

### Dónde mirar

- `middleware.ts`, `src/lib/supabase/middleware.ts`
- `app/auth/`
- `.env.example` (plantilla; **no** commitear `.env` real)

### Cómo

- Revisión de código de rutas auth + pruebas manuales de flujos.
- Comprobar que `.env` y secretos estén en `.gitignore` y no en historial.

---

## 7. Base de datos — migraciones, RLS y datos

### Qué auditar

- **Orden y reproducibilidad** de migraciones en `supabase/migrations/`.
- **RLS**: políticas por tabla/rol; función `public.is_admin()` y uso coherente en políticas (ver `csh_s2_19_rls.sql` y migraciones posteriores).
- **Triggers**: p. ej. `handle_new_user` — inserción en `public.profiles`, campos desde metadata.
- **Seed**: idempotencia (`ON CONFLICT`, `WHERE NOT EXISTS`) — documentado en `supabase/README.md`.
- **Nuevas tablas** (p. ej. comunidad): revisar índices, FKs y RLS en `csh_s2_24_community.sql` (nombre según repo).

### Dónde mirar

- `supabase/migrations/*.sql`
- `supabase/README.md`

### Cómo

- Revisión SQL línea a línea en PRs.
- En proyecto Supabase: pestaña Security Advisor / logs si está disponible.
- Pruebas con rol `anon`, `authenticated` y usuario admin.

---

## 8. Variables de entorno y secretos

### Qué auditar

- Paridad entre `.env.example` y variables realmente leídas en código.
- `NEXT_PUBLIC_SITE_URL` alineada con URLs de Auth en Supabase.
- Ausencia de secretos en repo, issues, capturas.

### Dónde mirar

- `.env.example`
- Búsqueda en código: `process.env`, `NEXT_PUBLIC_`

### Cómo

- `git grep` / búsqueda de patrones tipo `eyJ` (JWT), `service_role`.

---

## 9. Rendimiento y UX web

### Qué auditar

- **Imágenes**: `next.config.mjs` tiene `images.unoptimized: true` — útil en algunos despliegues, pero **pierde optimización** de Next Image; auditar impacto en LCP.
- **Bundle**: imports pesados (Recharts, icon packs), code splitting.
- **Core Web Vitals**: LCP, INP, CLS en rutas principales.

### Cómo

- Lighthouse (Chrome) o Vercel Analytics (`@vercel/analytics` en dependencias).
- Revisión de `loading.tsx` / Suspense si existen.

---

## 10. Accesibilidad (a11y)

### Qué auditar

- Contraste, foco teclado, etiquetas en formularios, roles ARIA (Radix ayuda, no lo sustituye).
- Navegación solo teclado en flujos críticos.

### Cómo

- axe DevTools, Lighthouse a11y, prueba manual.

---

## 11. SEO y metadatos

### Qué auditar

- `metadata` / `generateMetadata` en `app/layout.tsx` y páginas clave.
- `robots.txt`, `sitemap` (si aplica).
- URLs canónicas y Open Graph para compartir.

### Dónde mirar

- `app/layout.tsx`, layouts por sección.

---

## 12. Dependencias npm

### Qué auditar

- Versiones fijadas vs rangos; vulnerabilidades conocidas.
- Duplicación de subproyectos con su propio `package.json`.

### Cómo

- `npm audit` / `npm outdated`
- Revisión de dependencias grandes (Next, React, Supabase).

---

## 13. Infraestructura y despliegue

### Qué auditar

- **`vercel.json`**: actualmente define `installCommand`; revisar headers de seguridad (CSP, HSTS, X-Frame-Options) si se añaden.
- **Script** `predeploy` / `deploy:prod`: lint + build antes de `vercel --prod`.
- **Branch protection** y previews en Vercel (fuera del repo; configuración en panel).

### Dónde mirar

- `vercel.json`
- `package.json` scripts

---

## 14. Documentación del proyecto (Docs Governor)

### Qué auditar

- Frontmatter y `tracking` en docs activas (`docs/handbook/`, `docs/tutorials/`).
- Ejecución de validación: script `check_doc_validation.py` (skill docs-governor).
- Coherencia con `docs/docs-config.yaml` (rutas ignoradas / untrack).

### Dónde mirar

- `docs/README.md`, `docs/docs-config.yaml`
- `.cursor/skills/docs-governor/scripts/check_doc_validation.py`

### Cómo

```bash
python .cursor/skills/docs-governor/scripts/check_doc_validation.py --limit-undocumented 1
```

---

## 15. Proceso, issues y trazabilidad

### Qué auditar

- Alineación código ↔ issues (p. ej. `docs/work/Issues/`).
- Linear / Scrum si el equipo los usa — trazabilidad de cambios.

### Dónde mirar

- `docs/work/Issues/issues-pendientes.md`, `issues-linear.md`
- `docs/handbook/process/` (si existe documentación de proceso)

---

## 16. Subproyectos y carpetas colaterales

| Ruta | Notas de auditoría |
|------|---------------------|
| `cuestionario-betatesters/` | App Next propia + API (`app/api/submit/route.ts`); auditar aparte: CORS, rate limiting, validación de payload, almacenamiento de respuestas. |
| `docs/ReferenciasViejas/`, prototipos | Contenido histórico; normalmente fuera del alcance del producto principal salvo cumplimiento/licencias. |

---

## 17. Checklist rápido (una pasada)

- [ ] `npm run build` sin sorpresas; decidir qué hacer con `ignoreBuildErrors`.
- [ ] `npm run lint` y política ESLint clara.
- [ ] Revisar RLS y políticas admin en SQL.
- [ ] Flujos auth (login, registro, callback, error).
- [ ] **Flujos de negocio**: matriz rol × flujo (§2); contenidos públicos coherentes tras CRUD admin; perfil y reglas de visibilidad.
- [ ] Sin secretos en git; `.env` solo local/CI secrets.
- [ ] Migraciones ordenadas y documentadas en `supabase/README.md`.
- [ ] Docs activas validadas con docs-governor si aplica.
- [ ] Lighthouse en `/`, `/login`, una ruta autenticada y una de admin.

---

## 18. Mejoras habituales no presentes (huecos a considerar)

- **CI** (GitHub Actions u otro): lint, build, audit, validación de docs — no hay workflows en `.github/` en el estado revisado.
- **Tests automatizados** (Playwright, Vitest, etc.) — no hay suite clara en la raíz del producto principal; un E2E mínimo por flujo crítico (§2) reduce regresiones de negocio.
- **Observabilidad**: logging estructurado y errores del cliente (p. ej. Sentry) si el producto lo requiere.

---

*Generado como mapa de auditoría del repositorio ComputerSciencieHub-Web. Actualizar cuando cambie el stack o la estructura de carpetas.*
