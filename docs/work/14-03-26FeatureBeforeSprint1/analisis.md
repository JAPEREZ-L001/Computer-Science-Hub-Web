---
title: "Análisis: identidad institucional y logos"
status: "active"
owner: "@csh"
authors:
  - "@csh"
tracking:
  - "docs/work/14-03-26FeatureBeforeSprint1/plan-feature.md"
  - "CHANGELOG.md"
baseline_commit: ""
created: "2026-03-14"
last_reviewed: "2026-03-14"
---

# Análisis: identidad institucional y logos

**Feature:** Acoplar contenido (Identidad + Idea Principal) y logos vectorizados al sitio sin romper la UI ni saturar la página.  
**Ubicación:** [docs/work/14-03-26FeatureBeforeSprint1](.)

---

## 1. Fuentes de verdad

### 1.1 Branding vectorizado (`docs/BrandingVectorizado/`)


| Archivo                       | Uso recomendado en el sitio                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| `LogoDeltaFondoBlanco.svg`    | Header/footer en tema claro; icono compacto cuando el espacio es limitado (móvil).   |
| `LogoDeltaFondoNegro.svg`     | Header/footer en tema oscuro; hero sobre fondo oscuro (símbolo central).             |
| `LogoLetrasFondoBlanco.svg`   | Footer o hero cuando se prioriza el nombre "Computer Science Hub" sobre fondo claro. |
| `LogoCompletoFondoBlanco.svg` | Footer (bloque identidad) en tema claro; variante completa con delta + letras.       |
| `LogoCompletoFondoNegro.svg`  | Footer en tema oscuro; hero secundario o secciones oscuras con logo completo.        |


**Recomendación:** Disponer los SVGs en `public/logo/` (copia o symlink desde `docs/BrandingVectorizado`) para que Next.js los sirva; usar `Image` o import directo de SVG según convención del proyecto. Favicon: derivar desde LogoDelta (p. ej. 32x32).

### 1.2 Referencias escritas


| Documento                                                                                                                | Secciones relevantes para la UI                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Identidad-Institucional-CSH.md](../../ReferenciasViejas/Referencias/ReferenciasEscritas/Identidad-Institucional-CSH.md) | **Misión:** resumen para hero o tagline. **Filosofía:** 3 culturas (disruptiva, operativa, autónoma) → PhilosophySection. **Valores:** 7 valores → ValuesSection (actualmente 5; ver mapeo). **Lemas:** "La disrupción provoca innovación" (ya usado), "Ingeniería que impulsa futuro" (CTA o footer). **Metas/Objetivos:** no volcar en home; enlace a página "Sobre nosotros" o doc si se añade después. |
| [Idea Principal CSH](../../ReferenciasViejas/Referencias/ReferenciasEscritas/Idea Principal CSH.md)                      | Párrafo de evolución (comunidad educativa → administrativa → profesional → mesa de ingeniería) → EcosystemSection; ya existe estructura de 4 etapas, alinear textos con esta narrativa.                                                                                                                                                                                                                    |


---

## 2. Mapeo contenido → UI


| Sección del sitio | Fuente de contenido                | Estado actual                                                                                          | Acción propuesta                                                                                                                                                                                                                        |
| ----------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero**          | Misión (resumen), Lemas            | Tagline en inglés; lema "La disrupción provoca innovación" presente                                    | Sustituir tagline por resumen corto de misión o Idea Principal; mantener lema; opcional segundo lema "Ingeniería que impulsa futuro" en CTA o badge.                                                                                    |
| **Philosophy**    | Identidad > Filosofía (3 culturas) | 3 pilares (Disruptive, Operative, Autonomous) alineados; textos en inglés                              | Mantener estructura; reemplazar microcopy por versiones fieles a Identidad (español o bilingüe según criterio); mismo largo aproximado para no saturar.                                                                                 |
| **Ecosystem**     | Idea Principal (4 etapas)          | 4 etapas (Community, Representation, Professional Network, Engineering Table)                          | Ajustar descripciones para reflejar literalmente la evolución: comunidad educativa → administrativa/representación → profesional → mesa de ingeniería.                                                                                  |
| **Values**        | Identidad > Valores (7)            | 5 valores mostrados (Solidarity, Transparency, Co-responsibility, Ethical Excellence, Technical Rigor) | Incluir los 7: añadir **Respeto y empatía** y **Liderazgo con sentido social**. Opciones: grid 3+2+2, o 5 en grid + 2 en una línea/row, o "Conoce más" que expanda/enlace a doc con los 7. Evitar párrafos largos; una línea por valor. |
| **Header**        | Nombre + logo                      | Logo externo (Vercel Blob); "Computer Science Hub"                                                     | Sustituir por logos locales (Delta según tema); mantener nombre.                                                                                                                                                                        |
| **Footer**        | Lema + logo + nombre               | Logo externo; "La disrupción provoca innovación"                                                       | Logo local (Completo o Delta según tema); opcional "Ingeniería que impulsa futuro"; mantener enlaces y estructura.                                                                                                                      |


**Resumen:** La alineación conceptual ya existe (filosofía 3 pilares, ecosistema 4 etapas). Falta: (1) sustituir URLs de logo por SVGs locales y definir jerarquía (Delta vs Completo, claro/oscuro); (2) reemplazar microcopy por texto fiel a Identidad/Idea Principal sin alargar bloques; (3) pasar de 5 a 7 valores sin saturar (layout compacto o expansión suave).

---

## 3. Riesgos y restricciones

### 3.1 No romper nada

- **Cambios incrementales:** Misma estructura de página (`app/page.tsx`: Header, Hero, Philosophy, Ecosystem, Values, CTA, Footer); mismos componentes por sección. No eliminar ni reordenar secciones en esta feature.
- **Misma API de componentes:** Si un componente recibe `title` y `description` por props o datos locales, limitarse a cambiar esos datos y, si hace falta, añadir una prop opcional (ej. `secondaryLema`) sin cambiar la firma existente de forma breaking.
- **Logos:** Sustituir `src` de `<Image>` por ruta local; asegurar que `alt`, `width`, `height` y clases se mantengan para no afectar layout ni accesibilidad. Si se introduce un componente `<Logo>`, que sea drop-in donde hoy hay `<Image>`.

### 3.2 No saturar la página

- **Metas y objetivos (Identidad):** No volcar las listas de metas/objetivos (corto/mediano/largo plazo) en la home. Opciones: omitir en esta feature; o un solo CTA "Conoce nuestras metas" que enlace a una página futura o a `docs/` donde esté el documento completo.
- **Misión/visión completas:** No pegar los párrafos largos en hero. Usar una oración o dos como tagline; el resto en "Sobre nosotros" o doc si se implementa después.
- **Valores (7):** Mostrar los 7 en poco espacio: títulos cortos + una línea de descripción cada uno; mismo estilo visual que los 5 actuales (cards o lista compacta). Evitar párrafos por valor.
- **Idioma:** Decidir si la home es solo español, solo inglés o bilingüe; si se cambia a español, hacerlo de forma uniforme en todas las secciones tocadas para no dar sensación de mezcla caótica.

### 3.3 Logos

- **Sustitución de URLs externas:** Dejar de depender de Vercel Blob para el logo; usar solo assets en repo (`public/logo/` o equivalente) para evitar roturas si el blob cambia o se elimina.
- **Jerarquía:** En header (espacio limitado): preferir Delta. En footer: Delta o Completo según espacio y criterio visual. En hero: Delta o Completo según diseño actual (hoy es símbolo).
- **Tema claro/oscuro:** Usar FondoBlanco en fondos claros y FondoNegro en fondos oscuros para contraste. Si el sitio usa `theme-provider`, el componente Logo puede recibir `variant: "light" | "dark"` y elegir el SVG correspondiente.

---

## 4. Ubicación recomendada de logos

- **Carpeta:** `public/logo/` (estándar Next.js para assets estáticos).
- **Archivos:** Copiar o enlazar desde `docs/BrandingVectorizado/` los 5 SVGs con nombres estables, por ejemplo:
  - `logo-delta-light.svg` (Delta fondo blanco)
  - `logo-delta-dark.svg` (Delta fondo negro)
  - `logo-letras-light.svg`
  - `logo-completo-light.svg`
  - `logo-completo-dark.svg`
- **Favicon:** Generar desde LogoDelta (por ejemplo 32×32) y colocar en `app/` o `public/` según convención Next.js del proyecto.
- **Documentación:** En `docs/handbook/` (o en el plan de Sprint 1) documentar qué logo usar en cada contexto (header, footer, hero, favicon) y la regla claro/oscuro.

---

## Referencias

- [Identidad-Institucional-CSH.md](../../ReferenciasViejas/Referencias/ReferenciasEscritas/Identidad-Institucional-CSH.md)
- [Idea Principal CSH](../../ReferenciasViejas/Referencias/ReferenciasEscritas/Idea Principal CSH.md)
- [BrandingVectorizado](../../BrandingVectorizado/) (SVGs)
- [Sprint1.md](../14-03-26-PlanficacionSprint1/Sprint1.md)
- [Plan de la feature](plan-feature.md)

