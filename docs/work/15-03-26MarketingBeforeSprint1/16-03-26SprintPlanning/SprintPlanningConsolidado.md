# Sprint Planning (Sprint 1) — Consolidación Betatest + Backlog

Fecha: 2026-03-16  
Fuente: betatest (12 respuestas), `IssuesPropuestos.md`, comentarios de Jennifer (audios transcritos)

## 1) Contexto y conclusión
Se realizó un betatest inicial con 12 personas (dev y no-técnicos). El resultado general indica que **la idea se valida**: la mayoría entiende el propósito, percibe el sitio como profesional, agradable y fluido, y reporta ganas de participar.

El mayor valor a capturar en el sprint es: **mejoras de claridad/UX (menos repetición, ruta más secuencial)** y **ajustes visuales/branding (contraste, logo, tipografía/responsive)**, además de completar features ya propuestos (footer, i18n, themes, formularios, etc.).

## 2) Resumen ejecutivo del betatest (patrones)

### Señales fuertes (positivo)
- **Comprensión del propósito**: la mayoría reporta claridad en qué es CSH y para qué sirve.
- **Sensación visual/animaciones**: se describe como “muy agradable”, “fluida”, “profesional”.
- **Mobile**: al menos una respuesta destaca que “se ve bien en celular”.

### Oportunidades (mejoras recurrentes)
- **Visual/contraste**: varias respuestas + Jennifer reportan que el sitio se ve “apagado”/muy gris/oscuro. Sugerencias: subir contraste, acercar grises a blanco, o usar estados hover/active que lleven texto a blanco.
- **Branding**: Jennifer recomienda **logo en blanco** (logo negro sobre barra oscura “casi no se nota”).
- **Repetición y densidad**: se repite que hay **mucha información en home** y cierta repetición entre secciones; proponen simplificar o usar **secciones expandibles/colapsables**.
- **Navegación/ruta sugerida**: se menciona confusión en redirecciones y en “ruta sugerida”; se sugiere un flujo más secuencial (paso a paso) en una sola vista o un componente tipo wizard.
- **Bugs/UI debt**:
  - Elemento residual que dice **“scroll”**.
  - Letras “cortadas”/overflow en ciertos textos (ej. “Ingeniería”).
  - Ajustes responsive/centrado/cierre de divs.
- **CTA y formularios**:
  - Al menos una respuesta marca “CTA???” y otra pide **elegir múltiples intereses** a la vez.
  - Idea de onboarding: tutorial/guía corta para no técnicos.
- **Contenido deseado**: “cursos”, “empresas donde aplicar”, y más interactividad.

## 3) Backlog deduplicado (CSV + Issues Propuestos)

Convenciones:
- Tipo: `fix` o `feature`
- Área: Frontend / Backend / Admin
- Fuente: `CSV#<id>` (fila del CSV), “Jennifer”, o “IssuesPropuestos”

> Nota: algunos items ya existen en `IssuesPropuestos.md`; aquí se reescriben con criterios de aceptación para ejecución.

### A) Frontend — UX/UI/Branding

#### SP1-FE-01 — fix: Quitar botón “Conocer el ecosistema” y realinear CTA principal
- **Fuente**: IssuesPropuestos
- **Prioridad**: Alta
- **Criterios de aceptación**:
  - El botón “Conocer el ecosistema” desaparece del hero.
  - “Súmate hub” se vuelve más grande y queda centrado, ocupando el espacio liberado.
  - No se rompen layout ni responsive (mobile/tablet/desktop).

#### SP1-FE-02 — fix: Transición suave al navegar a sections (scroll/anchor)
- **Fuente**: IssuesPropuestos, CSV (percepción de fluidez)
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Navegación navbar → sección hace scroll suave (sin salto brusco).
  - Respeta offsets (si hay header fijo).

#### SP1-FE-03 — fix: Remover elemento residual “scroll”
- **Fuente**: Jennifer
- **Prioridad**: Alta
- **Criterios de aceptación**:
  - Ya no aparece ningún texto/elemento “scroll” en ninguna vista.
  - Se identifica el origen (componente/estilo) y se elimina sin efectos secundarios.

#### SP1-FE-04 — fix: Tipografía/overflow (letras cortadas)
- **Fuente**: Jennifer
- **Prioridad**: Alta
- **Criterios de aceptación**:
  - Textos que hoy se cortan (ej. “Ingeniería”) dejan de cortarse en resoluciones comunes.
  - No hay clipping en headings/labels con hover/animaciones.

#### SP1-FE-05 — feature: Ajuste de contraste y estados de texto (menos “apagado”)
- **Fuente**: Jennifer, CSV#01a7…, CSV#1b3a…, CSV#9956…, CSV#f3d5…
- **Prioridad**: Media
- **Criterios de aceptación**:
  - En secciones de lectura (Sobre/Valores/Programas), el texto base mejora legibilidad (contraste).
  - En hover/focus (y/o al entrar en viewport), textos pasan a blanco/alto contraste de forma consistente.
  - Se mantiene estética sobria (sin colores vibrantes por defecto).

#### SP1-FE-06 — fix: Logo con contraste correcto en navbar (logo blanco)
- **Fuente**: Jennifer
- **Prioridad**: Alta
- **Criterios de aceptación**:
  - Logo se percibe claramente sobre el fondo de la navbar.
  - No se pierde nitidez (SVG/asset correcto).

#### SP1-FE-07 — feature: Secciones colapsables o simplificación para reducir repetición en Home
- **Fuente**: CSV#48e0…, CSV#a6ee…, CSV#b5f6…
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Se reduce repetición de contenido entre secciones (sin perder información clave).
  - O bien se implementa UI expandible (accordion) para “leer más”.
  - Métrica cualitativa: home se siente más “ligero” y escaneable.

#### SP1-FE-08 — feature: “Ruta sugerida” secuencial (paso a paso)
- **Fuente**: CSV#b5f6… (confusión), CSV#48e0…
- **Prioridad**: Media
- **Criterios de aceptación**:
  - “Ruta sugerida” se presenta como pasos claros (Step 1/2/3) sin redirecciones confusas.
  - En mobile, el flujo es entendible y navegable.

#### SP1-FE-09 — fix: CTA clarificados (copy/ubicación) en secciones clave
- **Fuente**: CSV#48e0… (“CTA???”), general
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Los CTA principales se entienden sin ambigüedad (qué pasa al hacer click).
  - Consistencia de labels entre navbar/secciones.

#### SP1-FE-10 — feature: Permitir seleccionar múltiples intereses en opciones (si aplica)
- **Fuente**: CSV#b5f6…
- **Prioridad**: Baja/Media
- **Criterios de aceptación**:
  - En el selector de intereses (si existe en UI/form), se permite multi-selección (hasta 3 o ilimitado).
  - Se guarda/propaga correctamente la selección.

#### SP1-FE-11 — feature: Footer con iconos de redes + sponsors
- **Fuente**: IssuesPropuestos
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Footer incluye iconos: X (logo actualizado), TikTok, Instagram, Discord, WhatsApp, Gmail.
  - Footer incluye sponsors: Obelysk, Universidad Don Bosco.
  - Enlaces correctos y accesibles (aria-label).

#### SP1-FE-12 — feature: Botón ES/EN (i18n mínima)
- **Fuente**: IssuesPropuestos
- **Prioridad**: Baja/Media
- **Criterios de aceptación**:
  - Toggle ES/EN visible y funcional.
  - Al menos home + páginas principales traducibles (definir alcance en implementación).

#### SP1-FE-13 — feature: Toggle de tema (white/dark)
- **Fuente**: IssuesPropuestos
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Toggle cambia theme sin “flash” desagradable.
  - Se conserva preferencia (storage) y respeta system preference si aplica.

#### SP1-FE-14 — feature: Efecto “streaming” en título “Computer Science Hub”
- **Fuente**: IssuesPropuestos
- **Prioridad**: Baja
- **Criterios de aceptación**:
  - Efecto no afecta performance perceptible.
  - Degradación correcta en dispositivos lentos.

#### SP1-FE-15 — fix: Title “Computer Science Hub | CSH” → “CSH”
- **Fuente**: IssuesPropuestos
- **Prioridad**: Baja
- **Criterios de aceptación**:
  - `<title>` correcto en todas las rutas relevantes.

#### SP1-FE-16 — fix: Eliminar carta “Corresponsabilidad” de valores principales
- **Fuente**: IssuesPropuestos
- **Prioridad**: Baja
- **Criterios de aceptación**:
  - Layout se mantiene balanceado sin esa carta.

#### SP1-FE-17 — feature: Sección “Sobre nosotros” (origen, CEO/Founder, mesa, logo)
- **Fuente**: IssuesPropuestos
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Contenido claro y estructurado (historia, quiénes somos, explicación logo).
  - No duplicar innecesariamente contenido de home.

#### SP1-FE-18 — feature: Sección de proyectos (ideas y descripción)
- **Fuente**: IssuesPropuestos
- **Prioridad**: Baja/Media
- **Criterios de aceptación**:
  - Lista de proyectos con descripción breve y CTA (ver más / proponer).

#### SP1-FE-19 — feature: Sistema de tickets (build in public)
- **Fuente**: IssuesPropuestos
- **Prioridad**: Baja (definir alcance)
- **Criterios de aceptación**:
  - Existe un flujo mínimo: crear/ver tickets o integración con herramienta externa.

#### SP1-FE-20 — feature: Chatbot IA para FAQ (Gemini Flash 2.5 + contexto)
- **Fuente**: IssuesPropuestos
- **Prioridad**: Baja/Media (definir alcance MVP)
- **Criterios de aceptación**:
  - UI tipo chat accesible desde la web.
  - Respuestas basadas en contexto curado (FAQ + contenido del sitio).
  - Manejo de estados: cargando/error/reintento.

### B) Backend / Data / Integraciones

#### SP1-BE-01 — feature: Integración WhatsApp (redirigir a grupo/comunidad)
- **Fuente**: IssuesPropuestos
- **Prioridad**: Baja/Media
- **Criterios de aceptación**:
  - CTA abre enlace correcto (wa.me o invitación) con fallback si no hay app.

#### SP1-BE-02 — feature: Lógica formulario “inscripción miembros del hub”
- **Fuente**: IssuesPropuestos
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Validación de campos, envío, y confirmación visible.
  - Persistencia definida (DB/Sheet/email) según implementación.

#### SP1-BE-03 — feature: Formulario de inscripción a la mesa (campos definidos)
- **Fuente**: IssuesPropuestos
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Campos: nombre, correo, carrera/ciclo|campus, motivo.
  - Validaciones y feedback de envío.

#### SP1-BE-04 — feature: Inscripción a eventos (Google Calendar o Luma)
- **Fuente**: IssuesPropuestos
- **Prioridad**: Media (depende de decisión)
- **Criterios de aceptación**:
  - Seleccionar integración (Calendar vs Luma) y documentar decisión.
  - Flujo crea/inscribe evento y confirma al usuario.

#### SP1-BE-05 — feature: Dashboard métricas de formularios (1w/1m/3m/6m/1y + filtros)
- **Fuente**: IssuesPropuestos
- **Prioridad**: Baja/Media
- **Criterios de aceptación**:
  - Vista con métricas básicas y filtros por rango.
  - Export o reportes personalizados (MVP: filtros + totales).

#### SP1-BE-06 — feature: Sesiones anónimas + autenticadas (gating de acciones)
- **Fuente**: IssuesPropuestos
- **Prioridad**: Media/Alta (si se decide en sprint)
- **Criterios de aceptación**:
  - Anónimos pueden leer; autenticados pueden inscribirse (eventos/mesa) según reglas.

#### SP1-BE-07 — feature: Blog con Supabase Realtime (auth write, anon read)
- **Fuente**: IssuesPropuestos
- **Prioridad**: Baja/Media
- **Criterios de aceptación**:
  - Lectura pública, escritura restringida.
  - Realtime actualizado sin recargar (MVP).

#### SP1-BE-08 — feature: Esquema de base de datos en Supabase
- **Fuente**: IssuesPropuestos
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Tablas mínimas para: usuarios/perfiles, inscripciones (mesa), inscripciones (eventos), posts (si blog).
  - RLS definido para anon vs auth.

### C) Admin / Legal / Contenido

#### SP1-AD-01 — feature: Términos de privacidad y uso
- **Fuente**: IssuesPropuestos
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Página(s) con textos de privacidad/uso.
  - Link visible en footer.
  - Revisión con Jennifer + ajuste final.

#### SP1-AD-02 — feature: Onboarding corto / tutorial para no técnicos (si aplica)
- **Fuente**: CSV#81dd…
- **Prioridad**: Baja/Media
- **Criterios de aceptación**:
  - Micro guía: “qué hago primero” (2–4 pasos) accesible desde home o ruta sugerida.

#### SP1-AD-03 — feature: Contenido “cursos” / “empresas donde aplicar”
- **Fuente**: CSV#81dd…
- **Prioridad**: Baja
- **Criterios de aceptación**:
  - Sección o listado mínimo (curado) con enlaces y disclaimers.

## 4) Pendientes de grooming (decisiones)
- Alcance de i18n (qué páginas se traducen en Sprint 1).
- Eventos: **Google Calendar vs Luma** (criterios: esfuerzo, control, credenciales, UX).
- Tickets: MVP interno vs integración externa.

## 5) Trazabilidad (issues creados en Linear)
Proyecto Linear: **Sprint 1: UX/UI, Frontend, CI/CD y Documentación**

- **SP1-FE-01** → `CSH-13` (`[FE][Bug] Quitar botón “Conocer el ecosistema” y realinear CTA principal`)
- **SP1-FE-02** → `CSH-14` (`[FE][Improvement] Transición suave al navegar a sections (scroll/anchor)`)
- **SP1-FE-03** → `CSH-15` (`[FE][Bug] Remover elemento residual “scroll” en UI`)
- **SP1-FE-04** → `CSH-16` (`[FE][Bug] Arreglar overflow/clipping (letras cortadas) en textos`)
- **SP1-FE-05** → `CSH-18` (`[FE][Improvement] Mejorar contraste/legibilidad (menos “apagado”)`)
- **SP1-FE-06** → `CSH-17` (`[FE][Bug] Ajustar logo para contraste correcto en navbar`)
- **SP1-FE-07** → `CSH-19` (`[FE][Feature] Reducir repetición en Home (simplificar o usar secciones colapsables)`)
- **SP1-FE-08** → `CSH-20` (`[FE][Improvement] “Ruta sugerida” como flujo secuencial (paso a paso)`)
- **SP1-FE-09** → `CSH-21` (`[FE][Improvement] Clarificar CTAs (copy/ubicación) para evitar “CTA???”`)
- **SP1-FE-10** → `CSH-41` (`[FE][Feature] Permitir seleccionar múltiples intereses (multi-select)`)
- **SP1-FE-11** → `CSH-22` (`[FE][Feature] Footer: iconos redes sociales + sponsors`)
- **SP1-FE-12** → `CSH-25` (`[FE][Feature] Toggle ES/EN (alcance mínimo Sprint 1)`)
- **SP1-FE-13** → `CSH-26` (`[FE][Feature] Toggle de tema (Light/Dark)`)
- **SP1-FE-15** → `CSH-24` (`[FE][Bug] Cambiar title del sitio a “CSH”`)
- **SP1-FE-14** → `CSH-28` (`[FE][Feature] Efecto “streaming” en título “Computer Science Hub”`)
- **SP1-FE-16** → `CSH-29` (`[FE][Bug] Eliminar carta “Corresponsabilidad” de valores principales`)
- **SP1-AD-01** → `CSH-23` (`[AD][Feature] Términos de privacidad y uso + link en footer`)
- **SP1-BE-01** → `CSH-30` (`[FE][Feature] Botón/acción para WhatsApp (redirigir a grupo/comunidad)`)
- **SP1-BE-02** → `CSH-31` (`[BE][Feature] Formulario: inscripción miembros del hub (lógica + persistencia)`)
- **SP1-BE-03** → `CSH-27` (`[BE][Feature] Formulario: inscripción a la mesa (campos definidos)`)
- **SP1-BE-04** → `CSH-32` (`[BE][Feature] Inscripción eventos (Google Calendar vs Luma) + plantilla`)
- **SP1-BE-05** → `CSH-34` (`[BE][Feature] Dashboard métricas de formularios (rangos + filtros)`)
- **SP1-BE-06** → `CSH-36` (`[BE][Feature] Sesiones anónimas + autenticadas (gating de acciones)`)
- **SP1-BE-07** → `CSH-39` (`[BE][Feature] Blog con Supabase Realtime (auth write, anon read)`)
- **SP1-BE-08** → `CSH-33` (`[BE][Feature] Definir esquema DB en Supabase + RLS`)
- **SP1-FE-20** → `CSH-35` (`[FE][Feature] Chatbot IA para FAQ (Gemini Flash 2.5 + contexto)`)
- **SP1-FE-17** → `CSH-37` (`[FE][Feature] Sección “Sobre nosotros” (origen, CEO/Founder, mesa, logo)`)
- **SP1-FE-18** → `CSH-43` (`[FE][Feature] Sección de proyectos (ideas + descripción)`)
- **SP1-FE-19** → `CSH-38` (`[FE][Feature] Sistema de tickets (build in public) — definir MVP`)
- **SP1-AD-02** → `CSH-40` (`[AD][Feature] Onboarding corto / tutorial para no técnicos`)
- **SP1-AD-03** → `CSH-42` (`[AD][Feature] Contenido: cursos + empresas donde aplicar (MVP)`)

