---
title: "Plan de feature: identidad institucional y logos"
status: "active"
owner: "@csh"
authors:
  - "@csh"
tracking:
  - "docs/work/14-03-26FeatureBeforeSprint1/analisis.md"
  - "docs/tutorials/ciclo-vida-desarrollo.md"
  - "CHANGELOG.md"
baseline_commit: ""
created: "2026-03-14"
last_reviewed: "2026-03-14"
---

# Plan de feature: identidad institucional y logos

**Feature:** Identidad institucional y logos (antes / integración con Sprint 1).  
**Ubicación:** [docs/work/14-03-26FeatureBeforeSprint1](.)  
**Flujo:** Según [Ciclo de vida de desarrollo](../../tutorials/ciclo-vida-desarrollo.md) y [Ejemplo de flujo de trabajo](../../tutorials/ejemplo-flujo-trabajo.md).

---

## 1. Título y alcance

- **Título:** Identidad institucional y logos.
- **Alcance:** Acoplar el contenido de [Identidad-Institucional-CSH](../../ReferenciasViejas/Referencias/ReferenciasEscritas/Identidad-Institucional-CSH.md) e [Idea Principal CSH](../../ReferenciasViejas/Referencias/ReferenciasEscritas/Idea Principal CSH.md) a la home actual, y sustituir los logos externos por los SVGs de [docs/BrandingVectorizado](../../BrandingVectorizado/), con jerarquía clara y sin saturar la página. Se alinea con los objetivos de Sprint 1 (identidad, logotipos, UX/UI) y puede ejecutarse como parte de CSH-1 / CSH-2 o como feature previa cuyos resultados se integren en el sprint.

---

## 2. Criterios de aceptación (resumidos)

- Contenido de Identidad e Idea Principal reflejado en hero, filosofía, ecosistema y valores, con textos concisos y sin saturar (sin volcar metas/objetivos completos en la home).
- Los 7 valores institucionales visibles (layout compacto o expansión suave).
- Logos vectorizados integrados: assets locales en `public/logo/` (o equivalente), uso en header, footer y hero; variantes claro/oscuro según tema (FondoBlanco / FondoNegro).
- Jerarquía visual de logotipos clara (Delta en header cuando aplique, Completo o Delta en footer; criterio documentado).
- Sitio estable y responsivo; misma estructura de página y componentes; sin roturas de layout ni accesibilidad (alt, contraste).
- Validación documental en verde y CHANGELOG actualizado al cerrar la rama.

---

## 3. Flujo según tutorials

### 3.1 Rama y planificación

- **Rama:** `feature/csh-XX-identidad-logos` (XX = número del issue en Linear cuando exista; si se hace antes de asignar issue, usar por ejemplo `feature/identidad-logos` de forma temporal y renombrar al vincular a CSH-XX).
- **Planificación:** Este análisis y plan viven en `docs/work/14-03-26FeatureBeforeSprint1/` y sirven de base. Si se usa una rama por issue, copiar o enlazar este contenido en `docs/work/<rama>/` según convención del equipo.
- Comandos sugeridos (con `develop` actualizado):

```bash
git checkout develop
git pull
git checkout -b feature/csh-XX-identidad-logos
```

### 3.2 Implementación por fases

**Fase 1 – Logos locales y sustitución en header / footer / hero**

- Crear `public/logo/` y copiar o enlazar los SVGs desde `docs/BrandingVectorizado/` con nombres estables (p. ej. `logo-delta-light.svg`, `logo-delta-dark.svg`, `logo-completo-light.svg`, `logo-completo-dark.svg`).
- Opcional: componente reutilizable `<Logo>` que reciba variante (delta/completo) y tema (light/dark) y renderice el SVG adecuado.
- Sustituir en [Header](../../components/header.tsx), [Footer](../../components/footer.tsx) y [HeroSection](../../components/hero-section.tsx) las URLs externas por rutas locales; respetar tamaños y `alt` actuales. Aplicar variante FondoBlanco en fondos claros y FondoNegro en fondos oscuros.
- Favicon: derivar desde LogoDelta (ej. 32×32) y configurar en `app/` o `public/` según el proyecto.

**Fase 2 – Microcopy y textos desde Identidad / Idea Principal**

- **Hero:** Tagline y/o descripción corta a partir de Misión o Idea Principal; mantener lema "La disrupción provoca innovación"; opcional "Ingeniería que impulsa futuro" en CTA o badge.
- **PhilosophySection:** Reemplazar textos de los 3 pilares por versiones fieles a la Filosofía de Identidad (disruptiva, operativa, autónoma); mantener longitud similar para no saturar.
- **EcosystemSection:** Ajustar descripciones de las 4 etapas al relato de Idea Principal (comunidad educativa → administrativa → profesional → mesa de ingeniería).
- **ValuesSection:** Incluir los 7 valores (añadir Respeto y empatía, Liderazgo con sentido social); mantener una línea por valor; elegir layout (grid 3+2+2, o 5+2, o expansión) según [analisis.md](analisis.md).

**Fase 3 – Ajustes de jerarquía visual y tema**

- Revisar contraste y legibilidad con los nuevos logos y textos.
- Si el sitio usa `theme-provider`, asegurar que el componente de logo elija FondoBlanco vs FondoNegro según tema. Ajustar posición/tamaño de logos en header y footer si hace falta para jerarquía clara.

### 3.3 Validación y cierre documental

- Ejecutar validación documental:  
  `python .cursor/skills/docs-governor/scripts/check_doc_validation.py --root .`
- Actualizar [CHANGELOG.md](../../CHANGELOG.md) con la entrada correspondiente (ej. `FE: Identidad institucional y logos (Identidad + Idea Principal + BrandingVectorizado).`).
- Pruebas manuales: navegación, responsive, tema claro/oscuro si aplica, y comprobación de que no se haya roto ninguna sección.

### 3.4 Pull Request

- Abrir PR hacia `develop` con la [plantilla de PR](../../tutorials/pull-request-template.md): descripción, issue (CSH-XX si aplica), tipo de cambio, pasos para probar y checklist (rama, pruebas, validación doc, CHANGELOG).
- Asignar revisor según criterio del equipo.

---

## 4. Desglose de tareas (checklist)

- [ ] Crear `public/logo/` y copiar/enlazar SVGs desde BrandingVectorizado con nombres estables.
- [ ] Implementar uso de logos locales en Header (Delta según tema).
- [ ] Implementar uso de logos locales en Footer (Completo o Delta según tema).
- [ ] Implementar uso de logo en HeroSection (Delta o Completo según diseño).
- [ ] Configurar favicon desde LogoDelta.
- [ ] Actualizar tagline/descripción del Hero con contenido de Misión/Idea Principal.
- [ ] Actualizar textos de PhilosophySection con Filosofía de Identidad.
- [ ] Actualizar textos de EcosystemSection con Idea Principal.
- [ ] Incluir 7 valores en ValuesSection con layout compacto.
- [ ] Revisar jerarquía visual y contraste (logos y texto).
- [ ] Ajustar tema claro/oscuro para logos (FondoBlanco / FondoNegro) si aplica.
- [ ] Ejecutar `check_doc_validation.py` y corregir si hace falta.
- [ ] Actualizar CHANGELOG.
- [ ] Abrir PR a `develop` con plantilla cumplimentada.

---

## 5. Referencias

- [Sprint 1 – Planificación](../14-03-26-PlanficacionSprint1/Sprint1.md)
- [Identidad-Institucional-CSH](../../ReferenciasViejas/Referencias/ReferenciasEscritas/Identidad-Institucional-CSH.md)
- [Idea Principal CSH](../../ReferenciasViejas/Referencias/ReferenciasEscritas/Idea Principal CSH.md)
- [BrandingVectorizado](../../BrandingVectorizado/)
- [Ciclo de vida de desarrollo](../../tutorials/ciclo-vida-desarrollo.md)
- [Ejemplo de flujo de trabajo](../../tutorials/ejemplo-flujo-trabajo.md)
- [Plantilla para Pull Request](../../tutorials/pull-request-template.md)
- [Análisis de la feature](analisis.md)
