---

## title: "Mapeo de rutas y funcionalidades de la aplicación"
status: "draft"
owner: "@csh"
authors:
  - "@csh"
tracking:
  - app/
baseline_commit: "94376f6"
created: "2026-03-23T16:28:07Z"
last_reviewed: "2026-03-23T16:28:07Z"

# Mapeo de rutas y funcionalidades de la aplicación

## Alcance

Este documento mapea la aplicación principal ubicada en `app/` del proyecto `ComputerSciencieHub-Web`, construida con Next.js App Router.

Incluye:

- Rutas públicas, autenticadas y administrativas.
- Endpoints definidos dentro de `app/`.
- Funcionalidades visibles para usuarios y administradores.
- Integraciones externas y comportamiento transversal relevante para betatesting.

No incluye como parte del flujo principal:

- Prototipos antiguos bajo `docs/ReferenciasViejas/`.
- La mini app separada en `cuestionario-betatesters/`, aunque se documenta al final como artefacto adicional del repositorio.

## Resumen funcional

La aplicación ofrece cinco bloques principales de valor:


| Dominio                   | Qué ofrece                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| Sitio institucional       | Presentación de Computer Science Hub, propuesta de valor, sponsors y puntos de entrada a la comunidad. |
| Cuenta y membresía        | Registro, login, onboarding, perfil personal y directorio de miembros.                                 |
| Comunidad                 | Ideas, tutorías, mentores, documentación, podcast, investigación, beneficios y competencias.           |
| Contenido y oportunidades | Noticias, eventos, recursos y oportunidades publicadas desde base de datos.                            |
| Administración            | Paneles CRUD para noticias, eventos, oportunidades, recursos, sponsors y miembros.                     |


## Arquitectura de navegación

### Rutas públicas


| Ruta               | Acceso  | Funcionalidad principal                                                                                     |
| ------------------ | ------- | ----------------------------------------------------------------------------------------------------------- |
| `/`                | Público | Home institucional con hero, propuesta de valor, navegación principal, secciones de crecimiento y sponsors. |
| `/nosotros`        | Público | Explica quién es CSH, su filosofía, evolución del ecosistema y llamada a participar.                        |
| `/miembros`        | Público | Directorio de perfiles activos de la comunidad.                                                             |
| `/eventos`         | Público | Listado de eventos publicados con filtros y opciones de inscripción si el usuario inicia sesión.            |
| `/recursos`        | Público | Catálogo de recursos publicados con filtros por categoría o nivel.                                          |
| `/oportunidades`   | Público | Listado de oportunidades publicadas para crecimiento académico o profesional.                               |
| `/noticias`        | Público | Feed de noticias publicadas.                                                                                |
| `/noticias/[slug]` | Público | Vista detalle de una noticia por `slug`.                                                                    |
| `/feedback`        | Público | Formulario para enviar feedback general de la plataforma.                                                   |
| `/terminos`        | Público | Términos y condiciones.                                                                                     |
| `/privacidad`      | Público | Política de privacidad.                                                                                     |


### Rutas de autenticación y cuenta


| Ruta                    | Acceso          | Funcionalidad principal                                                                                     |
| ----------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- |
| `/login`                | Público         | Inicio de sesión con Supabase Auth y recuperación de contraseña.                                            |
| `/registro`             | Público         | Registro de nuevos usuarios con datos académicos básicos.                                                   |
| `/auth/callback`        | Sistema         | Intercambio del código de autenticación por una sesión válida.                                              |
| `/auth/auth-code-error` | Público         | Página de error cuando falla el callback de autenticación.                                                  |
| `/onboarding`           | Requiere sesión | Completar perfil inicial antes de usar el hub personal.                                                     |
| `/perfil`               | Requiere sesión | Vista del perfil del miembro, edición de datos, redes, actividad y descubrimiento de contenido relacionado. |


### Rutas de comunidad


| Ruta                       | Acceso          | Funcionalidad principal                                                                |
| -------------------------- | --------------- | -------------------------------------------------------------------------------------- |
| `/comunidad`               | Mixto           | Hub principal con navegación a subáreas comunitarias y estados dependientes de sesión. |
| `/comunidad/mentores`      | Mixto           | Directorio de mentores y formulario de matching entre miembros y mentores.             |
| `/comunidad/tutorias`      | Requiere sesión | Gestión y solicitud de tutorías por parte del usuario autenticado.                     |
| `/comunidad/ideas`         | Mixto           | Tablero de ideas comunitarias con creación, voto y eliminación de propuestas propias.  |
| `/comunidad/podcast`       | Público         | Listado de episodios publicados del podcast.                                           |
| `/comunidad/documentacion` | Público         | Acceso a documentos y recursos documentales del hub.                                   |
| `/comunidad/investigacion` | Público         | Publicaciones o referencias de investigación visibles en la comunidad.                 |
| `/comunidad/competencias`  | Público         | Ranking o leaderboard comunitario publicado.                                           |
| `/comunidad/beneficios`    | Mixto           | Beneficios para miembros y sponsors activos, con CTA para autenticarse si aplica.      |


### Rutas administrativas


| Ruta                   | Acceso | Funcionalidad principal                           |
| ---------------------- | ------ | ------------------------------------------------- |
| `/admin`               | Admin  | Dashboard general con métricas y accesos rápidos. |
| `/admin/noticias`      | Admin  | Gestión de noticias.                              |
| `/admin/eventos`       | Admin  | Gestión de eventos.                               |
| `/admin/oportunidades` | Admin  | Gestión de oportunidades.                         |
| `/admin/recursos`      | Admin  | Gestión de recursos.                              |
| `/admin/sponsors`      | Admin  | Gestión de sponsors y aliados.                    |
| `/admin/miembros`      | Admin  | Gestión de perfiles de miembros.                  |


### Rutas técnicas de soporte


| Ruta                     | Tipo             | Función                                                            |
| ------------------------ | ---------------- | ------------------------------------------------------------------ |
| `app/layout.tsx`         | Layout raíz      | Inyecta tipografía, sesión, toaster y analytics.                   |
| `app/admin/layout.tsx`   | Layout protegido | Valida permisos de administrador y monta el shell del panel admin. |
| `app/not-found.tsx`      | Fallback         | 404 global para rutas no encontradas.                              |
| `/recursos/loading`      | Loading UI       | Skeleton para la carga de recursos.                                |
| `/oportunidades/loading` | Loading UI       | Skeleton para la carga de oportunidades.                           |


## Endpoints y handlers


| Método | Ruta             | Funcionalidad                                                                             |
| ------ | ---------------- | ----------------------------------------------------------------------------------------- |
| `GET`  | `/auth/callback` | Finaliza el flujo de autenticación de Supabase, crea sesión y redirige al destino seguro. |


## Funcionalidades por módulo

### 1. Sitio institucional

- Presenta la identidad institucional de CSH.
- Muestra sponsors activos desde base de datos.
- Expone caminos de entrada hacia comunidad, recursos, eventos y participación.
- Incluye páginas legales y formulario de feedback.

### 2. Autenticación y membresía

- Registro e inicio de sesión por email y contraseña.
- Recuperación de contraseña.
- Redirecciones seguras después de autenticar.
- Onboarding obligatorio si el perfil no está completo.
- Perfil editable con bio, enlaces sociales y personalización visual generada.
- Directorio público de miembros activos.

### 3. Comunidad

- Solicitud de tutorías.
- Matching y directorio de mentores.
- Publicación y votación de ideas.
- Acceso a documentos del hub.
- Consumo de episodios de podcast.
- Consulta de publicaciones de investigación.
- Visualización de ranking comunitario.
- Vista de beneficios para miembros y sponsors.

### 4. Noticias, eventos, recursos y oportunidades

- Noticias publicadas con detalle por slug.
- Eventos publicados con filtros y registro de asistencia.
- Recursos publicados con categorización.
- Oportunidades académicas o profesionales.

### 5. Administración

- CRUD de noticias.
- CRUD de eventos.
- CRUD de oportunidades.
- CRUD de recursos.
- CRUD de sponsors.
- CRUD de miembros.
- Dashboard con visión operativa del sistema.

## Acciones de usuario relevantes


| Área       | Acción disponible                                                         |
| ---------- | ------------------------------------------------------------------------- |
| Login      | Iniciar sesión y solicitar recuperación de contraseña.                    |
| Registro   | Crear una cuenta nueva.                                                   |
| Onboarding | Completar datos iniciales del perfil.                                     |
| Perfil     | Editar información personal, académica y enlaces.                         |
| Feedback   | Enviar comentarios sobre la plataforma.                                   |
| Eventos    | Inscribirse o cancelar inscripción.                                       |
| Tutorías   | Crear solicitudes de tutoría.                                             |
| Ideas      | Crear ideas, votar y borrar propuestas propias.                           |
| Mentores   | Registrar o actualizar perfil de mentor/matching.                         |
| Admin      | Crear, editar, publicar o eliminar contenido y registros administrativos. |


## Integraciones externas detectadas


| Integración                   | Uso dentro de la app                                                                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Supabase Auth                 | Registro, login, sesiones, middleware y control de acceso.                                                                                           |
| Supabase Database             | Fuente de datos para perfiles, noticias, eventos, recursos, oportunidades, ideas, tutorías, mentores, podcast, documentos, investigación y sponsors. |
| Resend                        | Envío de notificaciones por correo para feedback y eventos.                                                                                          |
| Vercel Analytics              | Analítica integrada desde el layout global.                                                                                                          |
| Vercel Blob o assets externos | Soporte para imágenes servidas desde almacenamiento público.                                                                                         |


## Comportamiento transversal importante

- Existe `middleware.ts` para actualizar la sesión en la mayoría de rutas.
- La zona `/admin` se protege con validación adicional de rol de administrador.
- La aplicación usa renderizado mixto entre server components y componentes cliente.
- Varias vistas consumen datos publicados desde Supabase y degradan a listas vacías si hay error.
- El detalle de noticias usa `slug` dinámico como identificador de contenido público.

## Hallazgos útiles para betatesting

- Hay módulos claramente activos y conectados a datos reales: login, perfil, miembros, noticias, eventos, recursos, oportunidades, comunidad y admin.
- Existen elementos que aparentan estar en estado parcial o evolutivo, como reputación, algunos mensajes de "próximamente" y componentes no siempre conectados a flujos visibles.
- El repositorio contiene una app adicional de cuestionario de betatesters en `cuestionario-betatesters/`, separada del `app/` principal.

## App adicional en el repositorio

Además de la aplicación principal, existe un proyecto independiente en `cuestionario-betatesters/` con:

- Una ruta principal propia en `cuestionario-betatesters/app/page.tsx`.
- Un endpoint `POST` en `cuestionario-betatesters/app/api/submit/route.ts`.
- Integración separada con Supabase para captura de respuestas de betatesters.

## Conclusión

La aplicación actual ya cubre un ecosistema funcional amplio: presencia institucional, acceso de miembros, hub comunitario, contenidos públicos, eventos y una consola administrativa completa. Para un ciclo de betatesting, las áreas más críticas a validar son autenticación, onboarding, perfil, navegación comunitaria, registros en eventos, consistencia del contenido publicado y permisos de administración.

## Archivos base revisados

- `app/`
- `middleware.ts`
- `src/lib/supabase/queries.ts`
- `src/lib/supabase/community-queries.ts`
- `app/actions/`
- `app/admin/actions/`
- `app/comunidad/actions.ts`

