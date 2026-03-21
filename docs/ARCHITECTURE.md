# Arquitectura de Computer Science Hub (CSH) – Web

Este documento detalla la estructura técnica, decisiones de arquitectura y el stack tecnológico utilizado en el proyecto **Computer Science Hub (CSH) – Web**.

## 🚀 Resumen del Stack Tecnológico

La aplicación está construida con las tecnologías más modernas del ecosistema React/Next.js para garantizar rendimiento, accesibilidad y mantenibilidad.

| Capa | Tecnología |
|------|------------|
| **Core Framework** | Next.js 16 (App Router, Turbopack) |
| **UI Framework** | React 19 |
| **Lenguaje** | TypeScript 5.7 |
| **Estilos** | Tailwind CSS 4 + PostCSS |
| **Componentes Base** | Radix UI (Primitives) + Shadcn UI (Patrón) |
| **Validación / Forms**| Zod + React Hook Form |
| **Iconografía** | Lucide React |
| **Gestión de Temas** | Next Themes (Dark/Light Mode) |
| **Despliegue** | Vercel |

---

## 📁 Estructura del Proyecto

El proyecto sigue una estructura modular basada en las convenciones de Next.js App Router, con separaciones claras para lógica, componentes y documentación.

```
/
├── app/                  # Rutas y páginas de la aplicación
│   ├── (rutas)/          # Carpetas por página (ej: sobre, valores, programas)
│   ├── layout.tsx        # Layout raíz (Navbar, Footer, Providers)
│   ├── page.tsx          # Home Page (/)
│   └── globals.css       # Estilos globales y tokens de Tailwind 4
├── components/           # Componentes de la interfaz
│   ├── ui/               # Componentes atómicos/primitivos (Radix)
│   └── *.tsx             # Componentes de sección y funcionales (Header, Hero, etc.)
├── docs/                 # Documentación técnica, planes y assets
├── hooks/                # Hooks personalizados de React
├── lib/                  # Utilidades compartidas (utils.ts, cn helper)
├── public/               # Assets estáticos (imágenes, logos, fuentes)
├── src/                  # Capa de datos y tipos
│   ├── data/             # Archivos JSON o constantes de contenido
│   └── types/            # Definiciones de interfaces TypeScript
├── styles/               # Configuraciones adicionales de estilos
└── tsconfig.json         # Configuración de TypeScript
```

---

## 🏗️ Patrones de Diseño

### 1. **Componentes Atómicos y de Dominio**
- **UI Components (`components/ui`)**: Componentes puros, sin lógica de negocio, basados en Radix UI. Son altamente reutilizables y accesibles.
- **Section Components (`components/`)**: Componentes de nivel superior que representan secciones de la página (ej: `hero-section.tsx`, `philosophy-section.tsx`). Orquestan componentes UI y contenido.

### 2. **Gestión de Rutas (App Router)**
Se utiliza el sistema de archivos de Next.js para definir rutas. Cada subfolder en `/app` representa una ruta pública (ej: `/sobre`, `/programa`). El uso de `layout.tsx` permite envolver las páginas con elementos persistentes como el Header y Footer.

### 3. **Validación de Datos (Schema-First)**
Se utiliza **Zod** para definir esquemas de datos tanto para formularios como para props de componentes. Esto garantiza que los datos en la aplicación sean consistentes y reduce errores en tiempo de ejecución.

### 4. **Estilizado (Utility-First)**
Con **Tailwind CSS 4**, los estilos se gestionan directamente en el HTML/TSX. Se utilizan variables CSS en `globals.css` para el sistema de diseño (colores primarios, espaciado, radios), lo que permite una edición centralizada del branding.

---

## 🔄 Flujo de Desarrollo

1. **Diseño y Documentación**: Los planes de acción se encuentran en `docs/work/` y la identidad en `docs/ReferenciasViejas/`.
2. **Componentes UI**: Se añaden/modifican primitivos en `components/ui`.
3. **Ensamblado**: Se crean secciones en `components/` y se inyectan en las rutas de `app/`.
4. **Validación**: Uso de `npm run lint` y `npm run build` (Turbopack) para asegurar la integridad del código.

---

## ☁️ Despliegue e Infraestructura

- **Hosting**: El sitio está optimizado para ser desplegado en **Vercel**, aprovechando el Edge Runtime y la optimización de imágenes nativa de Next.js.
- **Analytics**: Integración con `@vercel/analytics` para monitorear el rendimiento y uso.
- **Integración Continua**: Se recomienda el uso de Git hooks para linting y chequeo de tipos antes de cada push.

---

> [!NOTE]
> Este documento es dinámico y debe actualizarse a medida que el sistema evoluciona (ej: integración de bases de datos, APIs externas o nuevos servicios).
