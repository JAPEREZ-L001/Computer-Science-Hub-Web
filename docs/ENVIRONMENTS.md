# 🌐 ENVIRONMENTS.md — Entornos de Desarrollo

> **Para la IA:** Este archivo describe cómo configurar y sincronizar los 3 entornos del proyecto.  
> Última actualización: 2026-04-13

---

## Entornos del Proyecto

| Entorno | URL | Proyecto Supabase | Branch |
|---|---|---|---|
| **Local** | `http://localhost:3000` | Supabase local (CLI) | Cualquier rama feature |
| **Staging** | `https://csh-staging.vercel.app` | Proyecto Supabase separado | `develop` (futuro) |
| **Producción** | `https://cshdevs.org` | Proyecto Supabase actual | `main` |

---

## 🔧 Setup Local

### Prerrequisitos

- Node.js 20+
- npm 10+
- [Supabase CLI](https://supabase.com/docs/guides/cli) — `npm install -g supabase`
- Docker Desktop (requerido para Supabase local)

### Configurar variables de entorno

```bash
# Copiar el example a .env local
cp .env.example .env
```

Editar `.env` con las credenciales del proyecto Supabase de desarrollo:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key local de supabase start>
SUPABASE_SERVICE_ROLE_KEY=<service role key local de supabase start>
RESEND_API_KEY=<tu API key de Resend>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Iniciar Supabase local

```bash
# Iniciar la instancia local de Supabase
supabase start

# Output esperado:
# API URL: http://127.0.0.1:54321
# DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
# Studio URL: http://127.0.0.1:54323
# Anon key: eyJ...
# Service role key: eyJ...
```

### Aplicar migraciones

```bash
# Aplicar todas las migraciones al entorno local
supabase db reset

# O aplicar migraciones pendientes sin resetear
supabase db push --local
```

### Iniciar el dev server

```bash
npm run dev
```

---

## 🧪 Entorno Staging (futuro)

> Pendiente de configurar. Se requiere crear un segundo proyecto en Supabase.

### Pasos para configurar staging

1. Crear proyecto nuevo en [supabase.com](https://supabase.com) → "CSH Staging"
2. Agregar las variables de entorno de staging en Vercel (environment: Preview)
3. Ejecutar migraciones: `supabase db push --project-ref <ref-staging>`
4. Configurar Vercel para deploy automático de PRs al entorno staging

---

## 🔴 Producción

> **⚠️ Máxima precaución.** Los cambios en producción afectan a usuarios reales.

### Variables de entorno en Vercel (Production)

Configuradas en el panel de Vercel → Settings → Environment Variables:

| Variable | Entorno |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | Production (secret) |
| `RESEND_API_KEY` | Production (secret) |
| `NEXT_PUBLIC_SITE_URL` | Production → `https://cshdevs.org` |

### Aplicar migraciones a producción

```bash
# Conectar al proyecto de producción
supabase link --project-ref <ref-produccion>

# Verificar migraciones pendientes
supabase db diff --use-migra

# Aplicar
supabase db push
```

> **Siempre hacer backup antes de aplicar migraciones en producción.**

---

## 📋 Workflow de Migraciones

```
1. Crear archivo SQL en supabase/migrations/
   → Nombrado: csh_s<sprint>_<num>_<descripcion>.sql
   → Ejemplos: csh_s0_01_feedback_anon.sql

2. Probar localmente:
   supabase db reset        ← reset completo
   supabase db push --local ← solo pendientes

3. Hacer commit con el archivo de migración incluido

4. Al mergear a main:
   supabase db push         ← aplica a producción
```

---

## 🛠️ Comandos Útiles

```bash
# Ver estado de migraciones
supabase migration list

# Generar migración nueva desde diff
supabase db diff -f nombre_migracion

# Acceder a Supabase Studio local
open http://127.0.0.1:54323

# Ver logs del servidor local
supabase logs

# Detener Supabase local
supabase stop
```

---

*Para contexto técnico completo → `CONTEXT.md`*  
*Para workflow del equipo → `docs/WORKFLOW.md`*
