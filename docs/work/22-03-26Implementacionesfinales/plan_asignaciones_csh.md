# Plan de Trabajo: Asignaciones CSH — Contextualización con Feedback

Cada punto del backlog ha sido mapeado contra los archivos reales del proyecto e integra los **comentarios específicos del usuario** para asegurar que la implementación cumple con la visión técnica y estética deseada.

---

## 1. Contextualización por Módulo

### 🔐 Autenticación y Registro


| #   | Tarea                                   | Dónde vive                                                                                                                           | Estado actual         | Solución técnica                         | Comentario del Usuario                             |
| --- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ---------------------------------------- | -------------------------------------------------- |
| 1   | Mejorar HTML del correo de confirmación | Resend Dashboard                                                                                                                     | Template default      | Editar en Resend. Dominio en Cloudflare. | "Esto vive dentro de Resend no dentro de supabase" |
| 2   | `full_name` solo acepta strings         | [registro/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/registro/page.tsx) L35                     | Regex letras/espacios | ✅ **Implementado**.                      | —                                                  |
| 3   | Limpiar campos tras registro exitoso    | [registro/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/registro/page.tsx) L116-126                | Llama `reset()`       | ✅ **Implementado**.                      | —                                                  |
| 4   | Condensar formulario de registro        | [registro/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/registro/page.tsx)                         | Grid 2-col            | ✅ **Implementado**.                      | "Priorizar la estética del form"                   |
| 5   | "Salir" → "Cerrar sesión"               | [header.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/components/header.tsx) L173, L248                     | ✅ **Implementado**.   | Cambiado en desktop y mobile.            | —                                                  |
| 6   | Correo institucional → personal         | [micro-intake-form.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/components/micro-intake-form.tsx) L120-130 | ✅ **Implementado**.   | Label y placeholder actualizados.        | —                                                  |


---

### 📧 Notificaciones y Correos


| #   | Tarea                            | Dónde vive                                                                                                         | Estado actual    | Solución técnica                        | Comentario del Usuario                                                                           |
| --- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 7   | Notificar admin de inscripciones | `actions`                                                                                                          | Solo insert      | Invocación Resend (Cloudflare Domain)   | "Considerar que se hace con resend y el dominio es de cloudflare aunque el cliente sea supabase" |
| 8   | Limitar envío de intereses 1 vez | [actions/interests.ts](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/actions/interests.ts) | Permite múltiple | Check `EXISTS` en DB antes de insertar. | —                                                                                                |


---

### 🎨 UI / UX General


| #     | Tarea                              | Dónde vive                                                                                                        | Estado actual  | Solución técnica             | Comentario del Usuario                                         |
| ----- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------- | -------------------------------------------------------------- |
| 11    | Arreglar scroll general            | [globals.css](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/globals.css)                  | Overflow hero  | ✅ **Parcialmente resuelto**. | "Hablando del elemento scroll que aparece en el hero actual"   |
| 12    | Twitter → "X"                      | [footer.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/components/footer.tsx)             | SVG Inline     | ✅ **Implementado**.          | "Mantener la misma estética que los otros iconos"              |
| 13    | Fondo de login                     | [login/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/login/page.tsx)            | Ambient Orbs   | ✅ **Implementado**.          | "No usar imágenes sino fondos o transiciones que se vean bien" |
| 14/15 | Hero Effects                       | [hero-section.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/components/hero-section.tsx) | Zoom + Shimmer | ✅ **Implementado**.          | "Shimmer que diga Computer Science Hub"                        |
| 16    | Eliminar "Comunidad en Movimiento" | [app/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/page.tsx)                    | Removido       | ✅ **Implementado**.          | —                                                              |


---

### 📅 /eventos


| #   | Tarea                                 | Dónde vive                                                                                                 | Estado actual   | Solución técnica                     | Comentario del Usuario                                      |
| --- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------ | ----------------------------------------------------------- |
| 17  | Calendario con etiquetas              | [eventos/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/eventos/page.tsx) | Vista lista     | Crear `<EventCalendar />`            | —                                                           |
| 18  | Ordenar por fecha                     | [eventos/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/eventos/page.tsx) | Solución actual | ✅ **Implementado**.                  | —                                                           |
| 19  | Filtro de eventos                     | [eventos/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/eventos/page.tsx) | Filtro Tipo/Mes | ✅ **Implementado**.                  | —                                                           |
| 20  | Botón eliminar evento                 | [eventos/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/eventos/page.tsx) | Solo admin      | Botón condicional: Admin OR Creator. | "Botón que permita borrar evento si sos admin o el creador" |
| 21  | Salones reales desde DB               | Tabla `events`                                                                                             | Pendiente       | Dejar en backlog.                    | "Dejar esto en el backlog"                                  |
| 22  | Ruta → `/principal/comunidad/eventos` | `/eventos`                                                                                                 | URL actual      | Map/Redirect según conveniencia.     | "Mapear a lo más conveniente a nivel técnico"               |


---

### 💡 /ideas


| #   | Tarea                     | Dónde vive                                                                                                                | Estado actual  | Solución técnica                                                                                                                                | Comentario del Usuario                  |
| --- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| 23  | Mostrar miembros votantes | [ideas/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/comunidad/ideas/page.tsx)          | Solo count     | Join con `profiles`.                                                                                                                            | "Hacerlo como en la página de miembros" |
| 24  | Más campos descriptivos   | Tabla `community_ideas`                                                                                                   | Title/Desc     | Agregar `tags`, [category](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/noticias/%5Bslug%5D/page.tsx#19-27), `impact`. | —                                       |
| 25  | Botón borrar propia idea  | [ideas-board.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/components/comunidad/ideas-board.tsx) | Botón papelera | ✅ **Implementado**.                                                                                                                             | Solo autor puede ver y ejecutar.        |
| 26  | Filtro ideas              | [ideas/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/comunidad/ideas/page.tsx)          | Sin filtros    | Crear `<IdeaFilters />`.                                                                                                                        | —                                       |


---

### 🎓 /tutorías


| #   | Tarea                          | Dónde vive                                                                                                             | Estado actual   | Solución técnica                     | Comentario del Usuario                           |
| --- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------ | ------------------------------------------------ |
| 27  | Mejorar UI                     | [tutorias/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/comunidad/tutorias/page.tsx) | Form básico     | Rediseño con Stepper y Cards.        | —                                                |
| 28  | Sistema de tracking (status)   | Tabla `tutoring_requests`                                                                                              | pending/matched | Migración a 4 estados técnicos.      | —                                                |
| 29  | Disponible → Evento            | Server Action                                                                                                          | No existe       | Trigger auto-creación de evento.     | "Al estar disponible debe crear un nuevo evento" |
| 30  | Encuesta de horarios           | UI/DB                                                                                                                  | No existe       | Tabla `tutoring_schedule_polls`.     | —                                                |
| 31  | Mín 3, Máx 5 personas          | Lógica                                                                                                                 | No existe       | Check en el conteo de inscripciones. | "Mín 3 y Máx 5"                                  |
| 32  | Mostrar tutores aprobados      | [tutorias/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/comunidad/tutorias/page.tsx) | No muestra      | Cards de mentores activos.           | —                                                |
| 33  | Unificar /mentores y /tutorias | Rutas                                                                                                                  | Separadas       | Integrar como Tab en Tutorías.       | —                                                |


---

### 👤 Mentores y Perfiles


| #   | Tarea                       | Dónde vive                                                                                               | Estado actual | Solución técnica                               | Comentario del Usuario                                                               |
| --- | --------------------------- | -------------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| 34  | Limpiar campos mentores     | `mentores/`                                                                                              | Sin reset     | `reset()` tras éxito.                          | —                                                                                    |
| 35  | Info extra perfil mentores  | Tabla `mentor_profiles`                                                                                  | Básico        | Agregar experiencia, especialidades, LinkedIn. | —                                                                                    |
| 36  | SCRUD completo mentores     | [actions.ts](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/comunidad/actions.ts) | Solo C        | Implementar RUD completo.                      | —                                                                                    |
| 37  | Avatar y banner dinámicos   | [perfil/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/perfil/page.tsx) | URL fijos     | Generación procedimental (Color + Formas).     | "No usar storage. Generar combinaciones de colores + figuras geométricas aleatorias" |
| 38  | Roles: Fellow/Agent/Sponsor | `miembros.tsx`                                                                                           | Genérico      | Badges por tipo de miembro.                    | —                                                                                    |


---

### 🗂️ /nosotros y Hub


| #   | Tarea                        | Dónde vive                                                                                                                    | Estado actual       | Solución técnica                     | Comentario del Usuario                             |
| --- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------ | -------------------------------------------------- |
| 41  | Reducir contenido            | [nosotros/page.tsx](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/app/nosotros/page.tsx)                  | 6 secciones         | Condensar secciones.                 | "No borrar solo reducir sin que pierdan la gracia" |
| 42  | Conceptos breves (3 bloques) | [QuienesSomos](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/components/nosotros-sections.tsx#61-107)     | ✅ **Implementado**. | Fundación, Proceso, Construcción.    | —                                                  |
| 43  | Placeholder próximamente     | [EcosystemSection](file:///c:/Users/japer/Desktop/2026/A.R.K/ComputerSciencieHub-Web/components/ecosystem-section.tsx#74-118) | ✅ **Implementado**. | Link con descripción "Próximamente". | —                                                  |


---

## 2. Plan de Trabajo Actualizado

### Fase 1: Backend & Arquitectura (Siguiente sesión)

- **3.1** Implementar Resend para notificaciones de eventos (Resend + Cloudflare context).
- **3.2** Crear tabla y flujo de `feedback` (vinculado al link del footer).
- **3.3** Migrar estados de tutorías (check 3-5 personas).
- **3.4** Sistema de generación de Avatares/Banners (sin Storage).

### Fase 2: Expansión de Perfiles y Comunidad

- **4.1** SCRUD completo de mentores.
- **4.2** Unificación de Tutorías y Mentores en una sola vista.
- **4.3** Votantes en Ideas (estilo directorio de miembros).
- **4.4** Badges diferenciadores para Fellows, Agents y Sponsors.

### Fase 3: Pulido Final y Backlog

- **5.1** Calendario visual de eventos.
- **5.2** Filtros avanzados en Ideas y Miembros.
- **5.3** Auditoría final de scroll y performance.

---

## 3. Decisiones Técnicas Clave

1. **Infraestructura de Email**: Se usará **Resend** para todo el flujo de transaccionales y notificaciones, aprovechando la configuración de dominio en **Cloudflare**.
2. **Identidad Visual**: Los avatares y banners serán generados dinámicamente mediante combinaciones de colores/formas para evitar la dependencia de Supabase Storage.
3. **Flujo de Tutorías**: El estado "Disponible" disparará la creación de un evento en la agenda general para centralizar la asistencia.

