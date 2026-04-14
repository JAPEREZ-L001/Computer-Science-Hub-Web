# Arquitectura — Computer Science Hub (CSH) Web

> Última actualización: 2026-03-26  
> Para el contexto completo de IA → ver `CONTEXT.md` en la raíz del repo.

---

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router + Turbopack) |
| UI | React 19 + TypeScript 5.7 |
| Estilos | Tailwind CSS 4 + PostCSS |
| Componentes | Radix UI primitives + shadcn/ui |
| Formularios | React Hook Form + Zod |
| Iconos | Lucide React |
| Tema | Next Themes (dark mode) |
| Base de datos | Supabase (PostgreSQL + Auth + RLS + Vault) |
| Email | Resend (dominio: `send.cshdevs.org`) |
| Despliegue | Vercel |
| Analytics | @vercel/analytics |

---

## 📁 Estructura del Proyecto

```
/
├── app/                    # Rutas Next.js (App Router)
│   ├── actions/            # Server Actions ('use server')
│   ├── admin/              # Panel administrativo
│   ├── auth/               # Callback de autenticación Supabase
│   ├── comunidad/          # Comunidad: ideas, mentors, documentos, podcast
│   ├── eventos/            # Listado y detalle de eventos
│   ├── feedback/           # Formulario de feedback
│   ├── login/ + registro/  # Autenticación
│   ├── miembros/           # Directorio de miembros
│   ├── noticias/           # Blog de noticias
│   ├── onboarding/         # Flujo de bienvenida (nuevo usuario)
│   ├── oportunidades/      # Oportunidades laborales/académicas
│   ├── perfil/             # Perfil del usuario autenticado
│   ├── recursos/           # Recursos académicos
│   └── layout.tsx / globals.css
├── components/
│   ├── ui/                 # Primitivos atómicos (shadcn/Radix)
│   ├── admin/              # Componentes del panel admin
│   ├── comunidad/          # Componentes de la sección comunidad
│   └── *.tsx               # Componentes de sección (Header, Hero, Footer…)
├── src/
│   ├── lib/
│   │   ├── supabase/       # Clientes y queries
│   │   │   ├── client.ts         # Cliente browser
│   │   │   ├── server.ts         # Cliente servidor
│   │   │   ├── middleware.ts     # updateSession para JWT
│   │   │   ├── queries.ts        # Queries principales
│   │   │   ├── community-queries.ts  # Queries de comunidad
│   │   │   ├── admin-queries.ts  # Queries del panel admin
│   │   │   └── admin-auth.ts     # Verificación de rol admin
│   │   ├── resend.ts       # Email transaccional
│   │   ├── avatar-generator.ts
│   │   ├── slugify.ts
│   │   └── site-url.ts
│   ├── types/index.ts      # Interfaces TypeScript globales
│   └── data/               # Mocks de datos (desarrollo)
├── lib/utils.ts            # Helper cn() de shadcn
├── hooks/                  # Custom hooks de React
├── middleware.ts            # Refresh de sesión Supabase (todas las rutas)
├── docs/                   # Documentación del proyecto
├── scripts/                # Scripts de utilidad (.ps1)
├── resources/              # Assets y referencias externas
└── public/                 # Assets estáticos
```

---

## 🗄️ Base de Datos — Supabase

### Tablas Principales

| Tabla | Descripción | Campos clave |
|---|---|---|
| `profiles` | Perfil del miembro | `full_name`, `area`, `career`, `cycle`, `status`, `reputation_score`, `onboarding_completed` |
| `events` | Eventos del hub | `title`, `type`, `event_date`, `published`, `created_by` |
| `event_registrations` | Inscripciones | `user_id`, `event_id` |
| `news` | Noticias | `slug`, `title`, `category`, `published` |
| `resources` | Recursos académicos | `title`, `url`, `category`, `tags`, `published` |
| `opportunities` | Oportunidades | `title`, `organization`, `type`, `published` |
| `sponsors` | Patrocinadores | `name`, `tier` (principal/colaborador/aliado), `active` |
| `community_ideas` | Ideas comunitarias | `title`, `vote_count`, `status`, `author_id` |
| `community_idea_votes` | Votos de ideas | `user_id`, `idea_id` |
| `hub_documents` | Documentos oficiales | `title`, `url`, `category`, `published`, `sort_order` |
| `podcast_episodes` | Podcast | `title`, `episode_url`, `platform`, `published` |
| `research_publications` | Investigación | `title`, `authors`, `venue`, `year` |
| `community_leaderboard` | Ranking | `display_name`, `points`, `badge`, `area` |
| `tutoring_requests` | Tutorías solicitadas | `user_id`, `topic`, `status` |
| `mentor_matching_profiles` | Mentores/mentees | `user_id`, `role` (mentor/mentee/both), `active` |

### Tipos principales (`src/types/index.ts`)

- `MemberArea`: `frontend | backend | diseño | devops | ia | seguridad | general`
- `MemberStatus`: `activo | inactivo`
- `HubEventType`: `workshop | charla | hackathon | copa | networking | otro`
- `NewsCategory`: `anuncio | logro | evento | update`
- `SponsorTier`: `principal | colaborador | aliado`

---

## 🔐 Autenticación

```
Browser → middleware.ts → updateSession() → Supabase JWT refresh
                 ↓
        Server Component verifica sesión
                 ↓
        Si no autenticado: redirect /login
        Si onboarding_completed = false: redirect /onboarding
```

- Supabase Auth (email + password)
- Middleware aplica a todas las rutas excepto assets estáticos
- El cliente browser (`client.ts`) se usa en componentes `'use client'`
- El cliente servidor (`server.ts`) se usa en RSC y Server Actions

---

## ✉️ Email — Resend

- **From:** `noreply@send.cshdevs.org`
- **Admin:** `admin@cshdevs.org`
- **Triggers:** inscripción a evento, envío de feedback
- **Variable:** `RESEND_API_KEY` (guardada en Supabase Vault + Vercel env)

---

## 🏗️ Patrones de Arquitectura

### 1. Server Actions para mutaciones
Toda mutación va en `app/actions/*.ts` con `'use server'`. No se usan API Routes para lógica de negocio.

### 2. RSC para fetch de datos
Los Server Components fetchean datos directamente con `await` usando las funciones de `src/lib/supabase/queries.ts`.

### 3. Separación cliente/servidor
`src/lib/supabase/client.ts` → solo en `'use client'`  
`src/lib/supabase/server.ts` → solo en Server Components y Actions

### 4. Alias `@/`
Todo import usa `@/` que mapea a la raíz del proyecto (configurado en `tsconfig.json`).

---

## ☁️ Infraestructura

- **Hosting:** Vercel (Edge + Image Optimization)
- **DB + Auth:** Supabase
- **Email:** Resend (dominio verificado `send.cshdevs.org`)
- **Dominio:** `cshdevs.org` (configurado en Vercel)
- **CI:** lint + build manual antes de deploy (`npm run predeploy`)
