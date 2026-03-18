# Cuestionario Betatesters – Computer Science Hub

Mini-app Next.js independiente para la encuesta de betatesters del CSH. Vive en este repo bajo `/cuestionario-betatesters/` pero se despliega en un **proyecto Vercel separado** del sitio principal.

Las respuestas se almacenan en **Supabase** (proyecto `cuestionario-betatesters-csh`).

---

## Desarrollo local

```bash
cd cuestionario-betatesters
npm install
cp .env.local.example .env.local   # ya configurado con la URL del proyecto
npm run dev                         # corre en http://localhost:3001
```

---

## Supabase

### Proyecto

| Campo | Valor |
|---|---|
| Nombre | `cuestionario-betatesters-csh` |
| Project ID | `lijihfnrcjuooaoftyel` |
| URL | `https://lijihfnrcjuooaoftyel.supabase.co` |
| Región | `us-east-1` |

### Tabla

`respuestas_betatesters` — creada vía migración. Columnas:

- `id` (uuid, PK)
- `created_at` (timestamptz)
- Una columna `text` por cada campo del formulario (secciones 1–7)

### Seguridad (RLS)

- **INSERT**: permitido para cualquiera (el formulario es público).
- **SELECT / UPDATE / DELETE**: bloqueado para anon. Solo accesible con service_role desde el dashboard de Supabase.

### Ver respuestas

Ir a [supabase.com/dashboard/project/lijihfnrcjuooaoftyel/editor](https://supabase.com/dashboard/project/lijihfnrcjuooaoftyel/editor) → Table Editor → `respuestas_betatesters`.

---

## Variables de entorno

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://lijihfnrcjuooaoftyel.supabase.co` |
| `SUPABASE_ANON_KEY` | anon key del proyecto (ver `.env.local.example`) |

Para obtener la anon key: Supabase Dashboard → Project Settings → API → `anon` / `public`.

---

## Despliegue en Vercel (proyecto independiente)

Este cuestionario **no** usa el mismo proyecto Vercel que el sitio Computer Science Hub.

### Pasos

1. Ve a [vercel.com](https://vercel.com) → **Add New Project**.
2. Importa el **mismo repositorio** `Computer-Science-Hub-Web`.
3. En **Root Directory** escribe: `cuestionario-betatesters`
4. Framework preset: **Next.js** (se detecta automático).
5. En **Environment Variables** añade:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://lijihfnrcjuooaoftyel.supabase.co`
   - `SUPABASE_ANON_KEY` = (la anon key del proyecto)
6. Haz clic en **Deploy**.

---

## Estructura del proyecto

```
cuestionario-betatesters/
├── app/
│   ├── api/
│   │   └── submit/
│   │       └── route.ts       # POST → Supabase
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── encuesta-form.tsx      # Formulario completo (cliente)
├── .env.local.example
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## Tecnologías usadas

- **Next.js 15** (App Router)
- **react-hook-form** + **zod** (validación)
- **@supabase/supabase-js** (almacenamiento)
- **Tailwind CSS v4**
