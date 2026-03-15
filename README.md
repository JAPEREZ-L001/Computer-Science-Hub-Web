# Computer Science Hub – Web

Sitio web del **Computer Science Hub (CSH)**: plataforma de referencia para ciencias de la computación y espacio digital donde la comunidad estudiantil organiza su aprendizaje, su vida comunitaria y su proyección profesional.

## Sobre Computer Science Hub

El **Computer Science Hub (CSH)** es una iniciativa estudiantil autónoma de la carrera de Ingeniería en Ciencias de la Computación de la Universidad Don Bosco (Campus Antiguo Cuscatlán). Nace como un proyecto creado por y para estudiantes, con la meta de convertirse en un ecosistema evolutivo donde la comunidad fortalece su formación académica, su organización colectiva y su proyección profesional.

Este repositorio implementa la plataforma web que materializa esa misión: un sitio construido con stack moderno que sirve como punto de encuentro para el acompañamiento académico entre pares, la organización estudiantil y la conexión con el mundo profesional. Bajo la convicción de que **la disrupción provoca innovación**, el proyecto combina buenas prácticas de ingeniería de software con la construcción de una comunidad de ingeniería que impulsa futuro.

## Stack

- **Next.js** 16 (App Router, Turbopack)
- **React** 19
- **TypeScript** 5.7
- **Tailwind CSS** 4
- **Radix UI** (componentes accesibles)
- **React Hook Form** + **Zod**
- **Lucide React**, **Recharts**, **date-fns**, **sonner**, **cmdk**, **vaul**, entre otros

## Requisitos

- **Node.js** 18 o superior (recomendado 20+)

## Instalación

```bash
npm install
```

Alternativamente, si usas pnpm:

```bash
pnpm install
```

## Scripts

| Comando        | Descripción                    |
|----------------|--------------------------------|
| `npm run dev`  | Servidor de desarrollo (Turbopack) |
| `npm run build`| Build de producción            |
| `npm run start`| Servidor de producción         |
| `npm run lint` | ESLint                         |

## Estructura principal

- `app/` – Rutas y páginas (App Router)
- `components/` – Componentes reutilizables (incl. UI con Radix)
- `docs/` – Documentación y referencias
- `public/` – Assets estáticos

## Documentación

Los planes de trabajo y prototipos del proyecto se documentan en [docs/Planes](docs/Planes). Proceso de trabajo (Scrum, Linear) y versionado: [docs/handbook/process](docs/handbook/process).

La identidad institucional completa, así como los textos de referencia para la versión web, se encuentran en:

- Identidad institucional base: `docs/ReferenciasViejas/Referencias/ReferenciasEscritas/Identidad-Institucional-CSH.md`
- Identidad institucional resumida: `docs/ReferenciasViejas/Referencias/ReferenciasEscritas/Identidad-Institucional-CSH-Resumida.md`
- Versión orientada a web: `docs/work/15-03-26MarketingBeforeSprint1/contenido/Identidad-Institucional-CSH-Web.md`

En la aplicación, esta identidad se proyecta en:

- Página principal (`/`) con secciones de héroe, filosofía, evolución del ecosistema, valores y llamado a la acción.
- Página [`/sobre`](./app/sobre/page.tsx) — contexto completo sobre quiénes somos, cómo trabajamos y hacia dónde vamos.
- Página [`/valores`](./app/valores/page.tsx) — valores y cultura en acción.
- Página [`/programas`](./app/programas/page.tsx) — programas académicos, organizativos y profesionales donde los estudiantes pueden involucrarse.

## Repositorio

[https://github.com/JAPEREZ-L001/Computer-Science-Hub-Web](https://github.com/JAPEREZ-L001/Computer-Science-Hub-Web)
