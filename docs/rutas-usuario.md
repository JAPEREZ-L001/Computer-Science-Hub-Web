# Mapa de Rutas de Usuario — Computer Science Hub

> Fecha de mapeo: 20 de marzo de 2026  
> Basado en la estructura `app/` de Next.js + middleware de autenticación

---

## Niveles de Acceso

| Nivel | Descripción |
|-------|-------------|
| 🌐 Público | Cualquier visitante, sin cuenta |
| 👤 Funcionalidad reducida | Visible para todos, acciones interactivas requieren cuenta real |
| 🔒 Requiere sesión | Solo usuarios autenticados con cuenta real |
| 🛡️ Solo admin | Requiere rol de administrador |

---

## Rutas Públicas — Sitio Principal

### `GET /` — Home
- **Acceso:** 🌐 Público
- **Propósito:** Landing page principal del CSH
- **Secciones:** Hero, Filosofía, Ecosistema, Ruta del sitio, Prueba social, Sponsors, Crecimiento, Valores, CTA, Formulario de ingreso
- **Lleva hacia:** `/#join` (formulario), todas las rutas del Header/Footer

---

### `GET /sobre` — Sobre CSH
- **Acceso:** 🌐 Público
- **Propósito:** Quiénes somos, cómo trabajamos, hacia dónde vamos
- **Lleva hacia:** `/programas`, `/oportunidades`

---

### `GET /valores` — Valores y Cultura
- **Acceso:** 🌐 Público
- **Propósito:** Los 7 valores del Hub con animaciones al scroll
- **Lleva hacia:** `/programas`

---

### `GET /programas` — Programas
- **Acceso:** 🌐 Público
- **Propósito:** Líneas de acción académicas, organizativas y profesionales
- **Incluye:** Formulario de interés (`MicroIntakeForm`)
- **Lleva hacia:** `/oportunidades`, `/recursos`

---

### `GET /oportunidades` — Oportunidades
- **Acceso:** 🌐 Público
- **Propósito:** Listado de oportunidades publicadas (empleos, becas, convocatorias)
- **Funcionalidad:** Filtros interactivos por categoría

---

### `GET /recursos` — Recursos
- **Acceso:** 🌐 Público
- **Propósito:** Recursos educativos publicados por el Hub
- **Funcionalidad:** Filtros interactivos

---

### `GET /noticias` — Noticias
- **Acceso:** 🌐 Público
- **Propósito:** Grid de noticias categorizadas (anuncio / logro / evento / update)
- **Lleva hacia:** `/noticias/[slug]` por cada card

---

### `GET /noticias/[slug]` — Artículo individual *(ruta dinámica)*
- **Acceso:** 🌐 Público
- **Propósito:** Vista completa de una noticia con renderizado de Markdown
- **Breadcrumb:** `Inicio → Noticias → [título]`
- **Si slug inválido:** Redirige a `/noticias`
- **Lleva hacia:** `/noticias` (breadcrumb), `/` (breadcrumb)

---

### `GET /eventos` — Eventos
- **Acceso:** 👤 Funcionalidad reducida
- **Propósito:** Lista de eventos próximos y pasados (workshop, charla, hackathon, copa, networking)
- **Sin cuenta:** Puede ver los eventos, no puede inscribirse
- **Con cuenta real:** Puede inscribirse con `EventSubscribeButton`

---

### `GET /miembros` — Directorio de Miembros
- **Acceso:** 🌐 Público
- **Propósito:** Directorio de perfiles activos del Hub
- **Funcionalidad:** Filtros por área, búsqueda por nombre

---

## Rutas Públicas — Comunidad (módulos)

### `GET /comunidad` — Hub de la Comunidad
- **Acceso:** 🌐 Público
- **Propósito:** Página índice con cards de los 8 módulos de comunidad
- **Lleva hacia:**

| Módulo | Ruta |
|--------|------|
| Tutorías entre pares | `/comunidad/tutorias` |
| Documentación | `/comunidad/documentacion` |
| Podcast & Media | `/comunidad/podcast` |
| Investigación | `/comunidad/investigacion` |
| Competencias | `/comunidad/competencias` |
| Ideas en Votación | `/comunidad/ideas` |
| Mentores & Matching | `/comunidad/mentores` |
| Beneficios | `/comunidad/beneficios` |

---

### `GET /comunidad/tutorias` — Tutorías entre pares
- **Acceso:** 👤 Funcionalidad reducida
- **Sin cuenta:** Muestra botón → `/login?redirect=/comunidad/tutorias`
- **Con cuenta real:** Permite enviar solicitudes de tutoría
- **Lleva hacia:** `/comunidad/mentores`

---

### `GET /comunidad/documentacion` — Documentación
- **Acceso:** 🌐 Público
- **Propósito:** Repositorio de guías internas del Hub (Notion, Drive, etc.)

---

### `GET /comunidad/podcast` — Podcast & Media
- **Acceso:** 🌐 Público
- **Propósito:** Lista de episodios con enlaces externos

---

### `GET /comunidad/investigacion` — Investigación
- **Acceso:** 🌐 Público
- **Propósito:** Publicaciones, posters y trabajos del Hub

---

### `GET /comunidad/competencias` — Competencias
- **Acceso:** 🌐 Público
- **Propósito:** Tabla de ranking / leaderboard (modo demo)

---

### `GET /comunidad/ideas` — Ideas en Votación
- **Acceso:** 👤 Funcionalidad reducida
- **Sin cuenta:** Puede ver las ideas, no puede votar
- **Con cuenta real:** Puede votar por ideas

---

### `GET /comunidad/mentores` — Mentores & Matching
- **Acceso:** 👤 Funcionalidad reducida
- **Sin cuenta:** Muestra botón → `/login?redirect=/comunidad/mentores`
- **Con cuenta real:** Accede al directorio de mentores y puede configurar perfil de matching

---

### `GET /comunidad/beneficios` — Beneficios
- **Acceso:** 👤 Funcionalidad reducida
- **Sin cuenta:** Muestra CTA → `/registro` y `/login?redirect=/comunidad/beneficios`
- **Con cuenta real:** Ve la lista completa de beneficios de membresía activa y sponsors activos → link a `/perfil`

---

## Rutas de Autenticación

### `GET /login` — Iniciar Sesión
- **Acceso:** 🌐 Público (middleware redirige a `/` si ya hay sesión real)
- **Propósito:** Formulario de email + contraseña con Supabase Auth
- **Funciones adicionales:** Recuperación de contraseña (envía email con link a `/auth/callback?next=/perfil`)
- **Lleva hacia:** `/registro`
- **Después del login:** redirige a `?redirect=` (por defecto `/`)

---

### `GET /registro` — Registrarse
- **Acceso:** 🌐 Público (middleware redirige a `/` si ya hay sesión real)
- **Propósito:** Formulario de registro (nombre, email, carrera, ciclo, contraseña)
- **Soporta:** Upgrade de cuenta anónima a cuenta real
- **Carreras disponibles:**
  - Ing. Ciencias de la Computación
  - Lic. Ing. de Software
  - Ing. Sistemas Informáticos
  - Lic. Diseño Experiencias Digitales
- **Lleva hacia:** `/login`
- **Después del registro:** redirige a `?redirect=` (por defecto `/perfil`)

---

### `GET /auth/callback` — Handler OAuth / Magic Link *(API Route)*
- **Acceso:** Utility (no es una página)
- **Propósito:** Intercambia el `code` OAuth de Supabase por una sesión activa
- **Parámetro:** `?next=/ruta` (por defecto `/`)
- **Si error:** Redirige a `/auth/auth-code-error`

---

### `GET /auth/auth-code-error` — Error de Autenticación
- **Acceso:** 🌐 Público
- **Propósito:** Informa que el enlace expiró o ya fue utilizado
- **Lleva hacia:** `/login`, `/`

---

## Rutas Protegidas — Usuario Autenticado

### `GET /perfil` — Mi Perfil
- **Acceso:** 🔒 Requiere sesión real
- **Protección:** Middleware + doble verificación server-side → redirige a `/login?redirect=/perfil`
- **Propósito:** Ver y editar el perfil personal (bio, GitHub, LinkedIn, carrera, ciclo, área)
- **Funcionalidad:** Modal `EditProfileDialog` para editar datos
- **Lleva hacia:** `/miembros`

---

## Panel de Administración

> Todas las rutas `/admin/*` requieren rol admin.  
> Protección doble: middleware + `requireAdmin()` en el layout.

### `GET /admin` — Dashboard
- **Acceso:** 🛡️ Solo admin
- **Propósito:** Contadores de: Noticias, Eventos, Oportunidades, Recursos, Sponsors, Miembros
- **Lleva hacia:** Todas las sub-secciones del panel

---

### `GET /admin/noticias` — Gestión de Noticias
- **Acceso:** 🛡️ Solo admin
- **Propósito:** CRUD completo de artículos de noticias

---

### `GET /admin/eventos` — Gestión de Eventos
- **Acceso:** 🛡️ Solo admin
- **Propósito:** CRUD completo de eventos

---

### `GET /admin/oportunidades` — Gestión de Oportunidades
- **Acceso:** 🛡️ Solo admin
- **Propósito:** CRUD completo de oportunidades publicadas

---

### `GET /admin/recursos` — Gestión de Recursos
- **Acceso:** 🛡️ Solo admin
- **Propósito:** CRUD completo de recursos educativos

---

### `GET /admin/sponsors` — Gestión de Sponsors
- **Acceso:** 🛡️ Solo admin
- **Propósito:** CRUD completo de sponsors y aliados

---

### `GET /admin/miembros` — Gestión de Miembros
- **Acceso:** 🛡️ Solo admin (triple verificación: middleware + layout + server component)
- **Propósito:** Vista y gestión de todos los perfiles de miembros

---

## Flujo de Navegación — Árbol Visual

```
/ (Home)
│
├── Header (global)
│   ├── Oportunidades → /oportunidades
│   ├── Programas     → /programas
│   ├── Eventos       → /eventos
│   ├── [Explorar dropdown]
│   │   ├── /sobre
│   │   ├── /valores
│   │   ├── /comunidad
│   │   ├── /recursos
│   │   ├── /noticias
│   │   └── /miembros
│   ├── [Sin sesión]  → /login  |  /#join
│   └── [Con sesión]  → /perfil  |  /admin (solo admins)  |  Salir
│
├── /sobre ──────────────────────→ /programas, /oportunidades
├── /valores ────────────────────→ /programas
├── /programas ──────────────────→ /oportunidades, /recursos
│
├── /noticias ───────────────────→ /noticias/[slug]
│   └── /noticias/[slug] ────────→ /noticias, /
│
├── /eventos
│   ├── [Sin sesión] ver solo
│   └── [Con sesión] inscripción
│
├── /miembros
│
├── /comunidad
│   ├── /comunidad/tutorias
│   │   ├── [Sin sesión] → /login?redirect=/comunidad/tutorias
│   │   └── [Con sesión] → formulario de solicitud → /comunidad/mentores
│   ├── /comunidad/documentacion
│   ├── /comunidad/podcast
│   ├── /comunidad/investigacion
│   ├── /comunidad/competencias
│   ├── /comunidad/ideas
│   │   ├── [Sin sesión] ver solo
│   │   └── [Con sesión] votar
│   ├── /comunidad/mentores
│   │   ├── [Sin sesión] → /login?redirect=/comunidad/mentores
│   │   └── [Con sesión] → directorio + perfil matching
│   └── /comunidad/beneficios
│       ├── [Sin sesión] → /registro | /login?redirect=/comunidad/beneficios
│       └── [Con sesión] → lista completa → /perfil
│
├── /login ◄──────────────────── /registro
│   └── Recuperar contraseña → email → /auth/callback?next=/perfil → /perfil
│
├── /registro ◄─────────────────  /login
│   └── [Después] → /perfil o ?redirect=ruta
│
├── /auth/callback ─────────────→ / (o ?next=ruta)  |  /auth/auth-code-error
└── /auth/auth-code-error ───────→ /login, /
│
🔒 /perfil (requiere sesión)
│   └── → /miembros
│
🛡️ /admin (requiere admin)
    ├── /admin/noticias
    ├── /admin/eventos
    ├── /admin/oportunidades
    ├── /admin/recursos
    ├── /admin/sponsors
    └── /admin/miembros
```

---

## Flujos Clave por Tipo de Usuario

### Usuario nuevo (sin cuenta)
```
/ → /#join (formulario) → /registro → /perfil
/ → /login → /registro → /perfil
/comunidad/beneficios → /registro → /perfil
```

### Usuario que regresa (con cuenta)
```
/ → /login → [redirect destino o /]
/eventos → inscribirse → [requiere /login si no tiene sesión]
/comunidad/tutorias → solicitar tutoría
/comunidad/ideas → votar
/comunidad/mentores → directorio + matching
```

### Recuperación de contraseña
```
/login → "¿Olvidaste tu contraseña?" → email enviado → /auth/callback?next=/perfil → /perfil
```

### Administrador
```
/login → /admin → /admin/[sección] → CRUD de contenido
```

---

## Resumen Rápido

| Tipo | Cantidad | Rutas |
|------|----------|-------|
| Públicas | 13 | `/`, `/sobre`, `/valores`, `/programas`, `/oportunidades`, `/recursos`, `/noticias`, `/noticias/[slug]`, `/miembros`, `/comunidad`, `/comunidad/documentacion`, `/comunidad/podcast`, `/comunidad/investigacion`, `/comunidad/competencias` |
| Func. reducida | 5 | `/eventos`, `/comunidad/ideas`, `/comunidad/tutorias`, `/comunidad/mentores`, `/comunidad/beneficios` |
| Requieren sesión | 1 | `/perfil` |
| Solo admin | 7 | `/admin`, `/admin/noticias`, `/admin/eventos`, `/admin/oportunidades`, `/admin/recursos`, `/admin/sponsors`, `/admin/miembros` |
| Utility / Auth | 2 | `/auth/callback`, `/auth/auth-code-error` |
| **Total** | **28** | |
