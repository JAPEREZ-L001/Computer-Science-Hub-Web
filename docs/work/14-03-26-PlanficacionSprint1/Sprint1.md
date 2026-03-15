---
title: "Sprint 1 – Planificación"
status: "active"
owner: "@csh"
authors:
  - "@csh"
tracking:
  - "docs/work/14-03-26-PlanficacionSprint1/IssuesSprint1.md"
  - "CHANGELOG.md"
baseline_commit: ""
created: "2026-03-14"
last_reviewed: "2026-03-14"
---

# Sprint 1 – Planificación

**Fecha de planificación:** 14-03-26  
**Foco:** UX/UI, Frontend, CI/CD y Documentación.

---

## Propuesta inicial

Propuesta para un sprint de desarrollo frontend enfocado en la **optimización de la experiencia de usuario (UX)**. El objetivo principal es alinear la identidad institucional con el contenido del sitio, corregir la jerarquía visual y posición de los logotipos, y asegurar que el diseño sea completamente responsivo. Además, el sprint contempla la integración del flujo de despliegue mediante **Vercel**, con el fin de mejorar sustancialmente la plataforma existente.

---

## Objetivos del Sprint 1


| #   | Objetivo                                                   | Notas                                      |
| --- | ---------------------------------------------------------- | ------------------------------------------ |
| 1   | Alinear identidad institucional con el contenido del sitio | Mensaje, tono y valores visibles en la UI. |
| 2   | Corregir jerarquía visual y posición de logotipos          | Header, footer y páginas internas.         |
| 3   | Diseño completamente responsivo                            | Móvil, tablet y escritorio.                |
| 4   | Integrar flujo de despliegue con Vercel                    | CI/CD desde rama o PR.                     |
| 5   | Consolidar documentación del proyecto                     | README, handbook, tutorials y proceso.     |


---

## Ideas adicionales para Sprint 1

Ideas que se pueden incluir en el mismo sprint sin desviar el foco: **UX/UI**, **Frontend**, **CI/CD** y **Documentación**.

### UI (interfaz y diseño visual)

- **Sistema de espaciado:** Unificar márgenes y paddings (escala consistente, p. ej. 4/8/16/24/32) en secciones y componentes.
- **Tipografía:** Definir escala de tamaños (h1–h6, body, small) y aplicar de forma consistente; revisar line-height y legibilidad.
- **Componentes UI:** Revisar botones, cards, acordeones y CTAs para que sigan la misma línea visual (bordes, sombras, radios).
- **Iconografía:** Uso coherente de Lucide (tamaños, peso, color) en navegación, listas y acciones.
- **Colores y temas:** Revisar modo claro/oscuro (theme-provider); asegurar que primarios y neutros respeten la identidad.
- **Layout y grid:** Comprobar alineación, columnas y gutters en distintas secciones (hero, filosofía, valores) para coherencia.
- **Feedback visual:** Hover, focus y active en enlaces y botones; transiciones suaves donde aporten claridad.

### Identidad y contenido

- **Guía de estilo en handbook:** Documentar paleta, tipografías y uso de logotipos en `docs/handbook/` para que futuros cambios respeten la identidad.
- **Textos y microcopy:** Revisar titulares, CTAs y mensajes de las secciones (hero, filosofía, ecosistema, valores) para coherencia con la identidad.
- **Favicon y Open Graph:** Añadir favicon del CSH y meta tags (og:image, description) para redes y enlaces compartidos.

### UX y accesibilidad

- **Contraste y legibilidad:** Revisar ratios de contraste (WCAG AA) en textos y botones; ajustar colores si hace falta.
- **Navegación por teclado y foco:** Comprobar que header, footer y componentes interactivos sean navegables por teclado y que el foco sea visible.
- **Etiquetas y roles ARIA:** Revisar landmarks (header, main, footer) y etiquetas en formularios o componentes complejos.
- **Estados de carga y error:** Definir y aplicar estados consistentes (spinner, mensajes de error) en zonas que lo requieran.

### Responsividad y rendimiento

- **Breakpoints y componentes:** Revisar todos los breakpoints (Tailwind) y asegurar que no haya overflow horizontal ni elementos cortados en móvil.
- **Imágenes responsivas:** Usar `next/image` con tamaños y `sizes` adecuados para reducir peso y mejorar LCP.
- **Core Web Vitals:** Medir LCP, FID/INP y CLS en producción (Vercel Analytics o PageSpeed) y fijar metas para el sprint.

### CI/CD (despliegue y calidad)

- **Vercel:** Proyecto conectado al repo; despliegue automático desde `main` o `develop` (según convención del equipo).
- **Rama de producción:** Definir qué rama despliega a producción (p. ej. `main`) y cuál a preview (`develop` o cada PR).
- **Variables de entorno:** Documentar en README o handbook qué variables se usan en build (ej. `NEXT_PUBLIC_*`) y cómo configurarlas en Vercel.
- **Preview deployments:** Usar previews por PR para revisar cambios antes de merge.
- **Lint y build en CI:** En cada PR ejecutar `npm run lint` y `npm run build` (GitHub Actions o checks de Vercel); bloquear merge si fallan.
- **Status checks:** Configurar en GitHub que el PR requiera build y lint en verde antes de merge.
- **Dominio y SSL:** Si aplica, configurar dominio custom en Vercel y verificar certificado.

### Documentación

- **README “Contribuir”:** Añadir sección que enlace a docs (tutoriales, ciclo de vida, PR a `develop`) — alineado con el [ejemplo de flujo](../../tutorials/ejemplo-flujo-trabajo.md).
- **Índice de tutorials:** En `docs/tutorials/` o en `docs/README.md`, listar los tutoriales (commit, levantar proyecto, ciclo de vida, PR template, ejemplo de flujo) con una línea de descripción.
- **Handbook de identidad/estilo:** Documentar en `docs/handbook/` paleta, tipografías, logotipos y uso de componentes para futuros cambios.
- **CHANGELOG:** Mantener CHANGELOG actualizado con los cambios del sprint; convención de entradas (tipo, descripción, issue si aplica).
- **Design tokens:** Si se definen colores/fuentes en un solo lugar (CSS variables o tema), documentarlo en handbook.
- **Proceso y Linear:** Dejar claro en docs cómo se usan Linear, ramas y PR (referencia a [Scrum y Linear](../../handbook/process/scrum.md) y [ciclo de vida](../../tutorials/ciclo-vida-desarrollo.md)).

---

## Posible agrupación en tareas (Linear)

Para convertir esto en issues en Linear (team CSH), se puede agrupar por **UX/UI**, **Frontend**, **CI/CD** y **Documentación**:

**UX/UI**
1. **Identidad y logotipos** – Jerarquía visual, posición, guía de estilo (doc).
2. **UI: espaciado, tipografía y componentes** – Escala de espaciado, tipos, botones/cards y coherencia visual.
3. **UI: colores, temas e iconografía** – Modo claro/oscuro, Lucide consistente, feedback hover/focus.
4. **Responsividad** – Breakpoints, overflow, imágenes, layout en móvil/tablet.
5. **Accesibilidad básica** – Contraste, teclado, ARIA, foco visible.
6. **Meta y favicon** – Favicon, og:image, meta description.
7. **UX y estados** – Estados de carga/error y microcopy.

**CI/CD**
8. **Despliegue Vercel** – Proyecto, rama de producción, variables, previews, dominio si aplica.
9. **CI: lint y build** – Lint y build en cada PR; status checks obligatorios antes de merge.

**Documentación**
10. **README y contribuir** – Sección Contribuir, enlaces a tutorials y proceso.
11. **Índice de tutorials y handbook** – Listado de tutoriales; doc de identidad/estilo en handbook.
12. **CHANGELOG y proceso** – Convención de CHANGELOG; referencia clara a Linear y ciclo de vida.

---

## Criterios de éxito del Sprint 1

**UX/UI y Frontend**
- [ ] Identidad institucional reflejada en el sitio (contenido y estilo).
- [ ] Logotipos con jerarquía y posición correctas en todas las vistas.
- [ ] UI coherente: espaciado, tipografía y componentes alineados con la identidad.
- [ ] Sitio responsivo sin fallos visibles en móvil, tablet y escritorio.
- [ ] Al menos una mejora clara en accesibilidad (contraste, teclado o ARIA).

**CI/CD**
- [ ] Despliegue automático en Vercel desde la rama acordada.
- [ ] Lint y build ejecutados en cada PR; merge bloqueado si fallan.

**Documentación**
- [ ] README con sección Contribuir y enlaces a docs.
- [ ] CHANGELOG y, si aplica, handbook (identidad/estilo o índice de tutorials) actualizados.

---

## Referencias

- [Ciclo de vida de desarrollo](../../tutorials/ciclo-vida-desarrollo.md)
- [Scrum y Linear](../../handbook/process/scrum.md)
- [Ejemplo de flujo de trabajo](../../tutorials/ejemplo-flujo-trabajo.md)

