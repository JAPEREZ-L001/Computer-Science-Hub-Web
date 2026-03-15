---
name: Propuestas creativas CSH Web
overview: Tres propuestas creativas para la página web del Computer Science Hub, basadas en la identidad institucional y la idea principal del CSH (Referencias), con entregable en Planes/ como documento .md.
todos: []
isProject: false
---

# Tres propuestas creativas para la página web de Computer Science Hub

## Fuentes de referencia utilizadas

- **[Referencias/Identidad-Institucional-CSH.md](Referencias/Identidad-Institucional-CSH.md)**: Misión, visión, filosofía (cultura disruptiva, operativa, autónoma), valores (solidaridad, respeto, transparencia, corresponsabilidad, excelencia, rigor técnico, liderazgo social), metas y objetivos por plazo, lemas (*La disrupción provoca innovación*, *Ingeniería que impulsa futuro*).
- **[Referencias/Idea Principal CSH.md](Referencias/Idea Principal CSH.md)**: CSH como ecosistema evolutivo; recorrido de comunidad educativa → administrativa → profesional → mesa formal de ingeniería; UDB Campus Antiguo Cuscatlán; acompañamiento entre pares, mediación, proyección nacional.
- **[referenciapaginaweb.md](referenciapaginaweb.md)**: Guía de diseño y front-end (minimalismo editorial/suizo, paleta, tipografía, componentes de comunidad, sistema de grillas y rendimiento). **Todas las propuestas deben aplicar esta guía común.**

---

## Guía de diseño común (referencia de página web)

Las tres propuestas comparten esta base estética y técnica, inspirada en una “biblioteca moderna” y en minimalismo editorial (no minimalismo vacío):

**Concepto creativo**

- Minimalismo editorial/suizo: reducción de ruido (sin sombras ni degradados complejos); la función dicta la forma.
- Jerarquía tipográfica agresiva: el tamaño y peso de la tipografía definen la importancia, no los iconos ni el color.
- Espacio negativo amplio: márgenes generosos para que el contenido “respire”; calma y orden.

**Paleta**

- Fondo tipo “hueso” o “papel” (ej. `#F5F2ED`, `#F0EFEA`), no blanco puro.
- Texto: negro suave o gris muy oscuro (ej. `#1A1A1A`) para reducir fatiga visual.

**Tipografía**

- Titulares: serif de alto contraste y elegante (estilo GS Serif o Chronicle Text); subrayado grueso para enfatizar palabras clave (estilo Anthropic “research”).
- Cuerpo y navegación: sans-serif geométrica y limpia (Inter, Satoshi o Roboto Mono para toques técnicos).

**Componentes de comunidad**

- Equivalente a “Latest releases”: “Actividad Reciente” o “Hilos Destacados”.
- Tarjetas planas, sin bordes redondeados excesivos (agrupación de temas o perfiles de miembros).
- Botones: bloques sólidos que cambien de color en hover, manteniendo sobriedad.

**Front-end (programador)**

- Grid estricto de 12 columnas; alineación precisa (errores de pocos píxeles se notan).
- Tipografía fluida con `clamp()` en CSS para titulares que escalen sin perder impacto.
- Imágenes: lazy loading y formato WebP; alta calidad sin sacrificar velocidad.
- Contenedores: `border-radius: 0` o máximo 4px; sensación arquitectónica y angular.

---

## Propuesta 1 — «Ecosistema en evolución»

**Idea central:** La web como **relato visual del recorrido** del CSH. El usuario vive la evolución: comunidad educativa → administrativa → profesional → mesa de ingeniería.

**Enfoque creativo (dentro de la guía común):**

- **Scroll narrativo** con la paleta hueso/papel y texto `#1A1A1A`; las secciones cambian de **densidad y jerarquía tipográfica** (no de color) según la etapa: educativa (más aire, titulares serif); profesional (más contenido, serif + sans); mesa (más institucional, bloques sólidos).
- **Metáfora visual sutil:** líneas o flujos que sugieren redes/nodos sin degradados ni sombras; sensación de “sistema que crece” mediante tipografía y espaciado.
- **Lemas integrados:** “La disrupción provoca innovación” y “Ingeniería que impulsa futuro” con **subrayado grueso** en palabras clave (estilo referencia).
- **Visual:** fondo papel, serif en titulares, sans en cuerpo; grid 12 columnas; contenedores angulares (radius 0–4px).

**Secciones sugeridas:** Inicio (hero con evolución) → El recorrido (timeline/etapas) → Misión y visión → Valores (frases cortas, jerarquía tipográfica) → Llamado a unirse / contacto.

**Alineación con referencias:** Refleja la idea principal del ecosistema evolutivo y las metas a corto, mediano y largo plazo; refuerza identidad institucional y proyección nacional.

---

## Propuesta 2 — «Hub vivo»

**Idea central:** La página como **centro de actividad** del CSH: no solo informar, sino mostrar el Hub en movimiento (actividades, eventos, tutorías, hackatones).

**Enfoque creativo (dentro de la guía común):**

- **Layout tipo hub:** módulos o “células” con **tarjetas planas** (sin bordes redondeados excesivos), sobre fondo papel; sensación de nodo central mediante grid estricto y alineación, no mediante color ni iconos pesados.
- **“Actividad Reciente” / “Hilos Destacados”:** equivalente a “Latest releases” de la referencia: bloques para eventos, talleres, tutorías o convocatorias; integración futura con API/CMS si aplica.
- **Cultura operativa visible:** líneas de tiempo (metas 6 meses / 1 año / 1.5 años) y pilares (disruptiva, operativa, autónoma) con **jerarquía tipográfica** (serif para títulos, sans para cuerpo); sin decoración superflua.
- **Estética:** paleta hueso/papel + texto oscuro; botones bloques sólidos con cambio de color en hover; transparencia y claridad como valor reflejado en la estructura y el contenido.

**Secciones sugeridas:** Hero (qué es el CSH en una frase) → Actividad Reciente / Próximos eventos → Pilares (filosofía) → Metas y plazos → Cómo participar / canales → Contacto y redes.

**Alineación con referencias:** Refuerza cultura operativa, transparencia y objetivos por plazo; conecta con acompañamiento académico, talleres y proyección profesional.

---

## Propuesta 3 — «Ingeniería con rostro»

**Idea central:** Poner **a las personas y a la comunidad** en el centro: romper la imagen “fría” de la informática y mostrar solidaridad, empatía y liderazgo con sentido social.

**Enfoque creativo (dentro de la guía común):**

- **Human-first:** testimonios, fotos de comunidad o momentos de talleres en **tarjetas planas** sobre fondo papel; sección “Quiénes somos” con perfiles de miembros (estilo referencia: tarjetas para agrupar temas o perfiles). Imágenes en alta calidad con lazy loading y WebP.
- **Valores como eje:** solidaridad activa, respeto y empatía, liderazgo con sentido social destacados con **jerarquía tipográfica** (serif + subrayado grueso en palabras clave), no con color ni iconos.
- **Diseño:** misma paleta hueso/papel y texto `#1A1A1A`; la calidez viene del **espacio negativo**, del tono del copy y de la fotografía, no de una paleta colorida; tipografía serif/sans según guía común.
- **Tono:** cercano, inclusivo; CTAs como bloques sólidos (“Únete”, “Conoce las actividades”) con hover sobrio.

**Secciones sugeridas:** Hero (comunidad que transforma) → Valores (microcopy con serif y énfasis) → Nuestro camino (versión breve del ecosistema) → Actividad Reciente y comunidad → Testimonios o “Por qué el CSH” → Únete / Contacto.

**Alineación con referencias:** Refleja valores (solidaridad, respeto, empatía, liderazgo social) y la dimensión de comunidad educativa y de acompañamiento entre pares.

---

## Resumen comparativo

**Base común (todas):** Minimalismo editorial; paleta hueso/papel + texto `#1A1A1A`; serif en titulares (subrayado para énfasis), sans en cuerpo; grid 12 columnas; tarjetas planas, radius 0–4px; botones sólidos con hover sobrio; lazy loading y WebP. Ver [referenciapaginaweb.md](referenciapaginaweb.md).


| Criterio          | Propuesta 1 (Ecosistema)                 | Propuesta 2 (Hub vivo)              | Propuesta 3 (Con rostro)              |
| ----------------- | ---------------------------------------- | ----------------------------------- | ------------------------------------- |
| **Narrativa**     | Evolución en el tiempo                   | Actividad y operatividad            | Comunidad y personas                  |
| **Fuerza visual** | Scroll narrativo, jerarquía por etapa    | Actividad Reciente, tarjetas planas | Fotografía, valores con serif/énfasis |
| **Ideal si…**     | Quieren destacar trayectoria e identidad | Quieren mostrar dinamismo y planes  | Quieren atraer por cercanía y valores |


---

## Entregable

- **Documento:** Un archivo Markdown (por ejemplo `Propuestas-Creativas-CSH-Web.md`) en la carpeta **Planes**.
- **Contenido:** Este mismo plan (referencias incluyendo [referenciapaginaweb.md](referenciapaginaweb.md) + guía de diseño común + las 3 propuestas adaptadas + tabla comparativa) para que sirva como base de decisión y briefing para diseño/desarrollo.
- **Implementación:** Diseñador y desarrollador deben aplicar la guía de [referenciapaginaweb.md](referenciapaginaweb.md) (grid, tipografía fluida con `clamp()`, imágenes lazy/WebP, contenedores angulares) en la propuesta elegida.

Si no existe la carpeta **Planes**, crearla y guardar ahí el `.md`.