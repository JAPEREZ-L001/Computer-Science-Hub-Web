---
title: "Issues Sprint 1"
status: "active"
owner: "@csh"
authors:
  - "@csh"
tracking:
  - "docs/work/14-03-26-PlanficacionSprint1/Sprint1.md"
  - "CHANGELOG.md"
baseline_commit: ""
created: "2026-03-14"
last_reviewed: "2026-03-14"
---

# Issues Sprint 1

Issues derivados de [Sprint1.md](Sprint1.md) para crear en Linear (team CSH). Usar prefijo de área: `FE:` (frontend/UX/UI), `DOC:` (documentación), `OPS:` (CI/CD).

---

## UX/UI

### CSH-1 — FE: Identidad y logotipos

**Objetivo**  
Alinear la identidad institucional con el contenido del sitio y corregir la jerarquía visual y posición de los logotipos en header, footer y páginas internas.

**Criterios de aceptación**
- [ ] Logotipos con jerarquía y posición correctas en todas las vistas (header, footer, páginas).
- [ ] Mensaje, tono y valores institucionales visibles en la UI.
- [ ] Guía de estilo (paleta, tipografías, uso de logotipos) documentada en `docs/handbook/` o referenciada.

**Deliverables**
- Ajustes de layout y posición de logotipos.
- Documentación de identidad/estilo en handbook (o issue dedicado).

---

### CSH-2 — FE: UI — espaciado, tipografía y componentes

**Objetivo**  
Unificar espaciado, tipografía y componentes UI (botones, cards, CTAs) para coherencia visual en todo el sitio.

**Criterios de aceptación**
- [ ] Escala de espaciado consistente (márgenes/paddings) en secciones y componentes.
- [ ] Escala de tamaños tipográficos (h1–h6, body, small) aplicada de forma uniforme.
- [ ] Botones, cards, acordeones y CTAs con misma línea visual (bordes, sombras, radios).

**Deliverables**
- Ajustes en Tailwind/componentes; documentación de design tokens si aplica.

---

### CSH-3 — FE: UI — colores, temas e iconografía

**Objetivo**  
Asegurar que colores, modo claro/oscuro e iconografía (Lucide) sean coherentes y respeten la identidad; mejorar feedback visual (hover, focus, active).

**Criterios de aceptación**
- [ ] Modo claro/oscuro (theme-provider) con primarios y neutros alineados a la identidad.
- [ ] Uso coherente de Lucide (tamaños, peso, color) en navegación, listas y acciones.
- [ ] Hover, focus y active definidos en enlaces y botones; transiciones suaves donde aporten claridad.

**Deliverables**
- Ajustes en tema e iconografía; revisión de estados interactivos.

---

### CSH-4 — FE: Responsividad

**Objetivo**  
Garantizar diseño completamente responsivo en móvil, tablet y escritorio: sin overflow horizontal, sin elementos cortados y con imágenes optimizadas.

**Criterios de aceptación**
- [ ] Breakpoints (Tailwind) revisados; sin overflow horizontal ni elementos cortados en móvil/tablet.
- [ ] Imágenes con `next/image` y `sizes` adecuados para mejorar LCP.
- [ ] Layout y grid coherentes en hero, filosofía, valores y resto de secciones.

**Deliverables**
- Ajustes de breakpoints y componentes; uso de `next/image` donde aplique.

---

### CSH-5 — FE: Accesibilidad básica

**Objetivo**  
Mejorar accesibilidad: contraste (WCAG AA), navegación por teclado, foco visible y roles/etiquetas ARIA.

**Criterios de aceptación**
- [ ] Ratios de contraste WCAG AA revisados en textos y botones.
- [ ] Header, footer y componentes interactivos navegables por teclado; foco visible.
- [ ] Landmarks (header, main, footer) y etiquetas en formularios o componentes complejos revisados.

**Deliverables**
- Ajustes de contraste y estilos de foco; revisión ARIA en componentes clave.

---

### CSH-6 — FE: Meta y favicon

**Objetivo**  
Añadir favicon del CSH y meta tags (Open Graph, description) para correcta visualización en pestañas, redes y enlaces compartidos.

**Criterios de aceptación**
- [ ] Favicon del CSH en `app/` o `public/`.
- [ ] Meta description y og:image (y og:title) configurados en layout o metadata de Next.js.

**Deliverables**
- Favicon; metadata en `app/layout.tsx` o equivalente.

---

### CSH-7 — FE: UX y estados (carga, error, microcopy)

**Objetivo**  
Definir y aplicar estados consistentes de carga y error, y revisar microcopy (titulares, CTAs) para coherencia con la identidad.

**Criterios de aceptación**
- [ ] Estados de carga (spinner/skeleton) y error aplicados de forma consistente donde aplique.
- [ ] Titulares, CTAs y mensajes de secciones (hero, filosofía, ecosistema, valores) revisados para coherencia.

**Deliverables**
- Componentes o patrones de estados; ajustes de textos si aplica.

---

## CI/CD

### CSH-8 — OPS: Despliegue Vercel

**Objetivo**  
Integrar el flujo de despliegue con Vercel: proyecto conectado al repo, rama de producción definida, variables de entorno y previews por PR.

**Criterios de aceptación**
- [ ] Proyecto Vercel conectado al repositorio; despliegue automático desde la rama acordada (p. ej. `main`).
- [ ] Previews por PR funcionando.
- [ ] Variables de entorno documentadas (README o handbook) y configuradas en Vercel si aplica.
- [ ] Dominio custom y SSL configurados en Vercel si aplica.

**Deliverables**
- Proyecto Vercel configurado; documentación de variables y ramas.

---

### CSH-9 — OPS: CI — lint y build en PR

**Objetivo**  
Asegurar que en cada PR se ejecuten `npm run lint` y `npm run build`, y que el merge esté bloqueado si fallan (status checks en GitHub).

**Criterios de aceptación**
- [ ] Lint y build ejecutados en cada push/PR (GitHub Actions o integración Vercel).
- [ ] Branch protection o status checks configurados para requerir lint y build en verde antes de merge.

**Deliverables**
- Workflow de CI o configuración de checks; documentación en README o handbook si aplica.

---

## Documentación

### CSH-10 — DOC: README y sección Contribuir

**Objetivo**  
Añadir al README una sección "Contribuir" que enlace a documentación (tutoriales, ciclo de vida, PR a `develop`).

**Criterios de aceptación**
- [ ] README incluye sección "Contribuir" (o equivalente).
- [ ] Enlaces a docs/tutorials y proceso (ciclo de vida, PR); mención de rama `develop`.

**Deliverables**
- Edición de README; enlaces a [ejemplo de flujo](../../tutorials/ejemplo-flujo-trabajo.md) y [ciclo de vida](../../tutorials/ciclo-vida-desarrollo.md).

---

### CSH-11 — DOC: Índice de tutorials y handbook de identidad/estilo

**Objetivo**  
Disponer un índice de tutoriales en `docs/` y documentar identidad/estilo (paleta, tipografías, logotipos, componentes) en handbook.

**Criterios de aceptación**
- [ ] En `docs/README.md` o `docs/tutorials/` existe un listado de tutoriales con una línea de descripción (commit, levantar proyecto, ciclo de vida, PR template, ejemplo de flujo).
- [ ] En `docs/handbook/` está documentada la identidad/estilo (paleta, tipografías, logotipos, uso de componentes) o enlazada desde el índice.

**Deliverables**
- Índice en docs; documento de identidad/estilo en handbook.

---

### CSH-12 — DOC: CHANGELOG y proceso (Linear, ramas, PR)

**Objetivo**  
Mantener CHANGELOG actualizado con convención clara y dejar documentado el proceso (Linear, ramas, PR) en docs.

**Criterios de aceptación**
- [ ] CHANGELOG actualizado con los cambios del sprint; convención de entradas (tipo, descripción, issue si aplica) documentada o visible.
- [ ] En docs queda claro el uso de Linear, ramas (`feature/csh-XX-descripcion`) y PR a `develop` (referencia a [Scrum y Linear](../../handbook/process/scrum.md) y [ciclo de vida](../../tutorials/ciclo-vida-desarrollo.md)).

**Deliverables**
- Entradas en CHANGELOG; actualización o enlaces en docs de proceso.

---

## Resumen

| Issue   | Título corto                          | Área   |
|--------|----------------------------------------|--------|
| CSH-1  | Identidad y logotipos                  | FE     |
| CSH-2  | UI: espaciado, tipografía, componentes | FE     |
| CSH-3  | UI: colores, temas, iconografía        | FE     |
| CSH-4  | Responsividad                          | FE     |
| CSH-5  | Accesibilidad básica                   | FE     |
| CSH-6  | Meta y favicon                         | FE     |
| CSH-7  | UX y estados / microcopy               | FE     |
| CSH-8  | Despliegue Vercel                      | OPS    |
| CSH-9  | CI: lint y build en PR                 | OPS    |
| CSH-10 | README y Contribuir                    | DOC    |
| CSH-11 | Índice tutorials y handbook estilo    | DOC    |
| CSH-12 | CHANGELOG y proceso                    | DOC    |

Referencia: [Sprint1.md](Sprint1.md) · [Scrum y Linear](../../handbook/process/scrum.md)
