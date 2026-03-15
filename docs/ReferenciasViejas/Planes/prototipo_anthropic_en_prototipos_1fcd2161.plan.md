---
name: Prototipo Anthropic en Prototipos
overview: Crear un prototipo HTML/CSS que replique la estructura y el estilo visual del sitio anthropic.com dentro de la carpeta Prototipos, usando la misma guía de diseño (minimalismo editorial, paleta hueso/papel, grid 12 columnas) que el resto de prototipos CSH.
todos: []
isProject: false
---

# Prototipo del sitio Anthropic en Prototipos

## Objetivo

Añadir en [Prototipos](Prototipos) un nuevo prototipo que **recrea la estructura y el diseño** de [anthropic.com](https://www.anthropic.com/), manteniendo la guía común del proyecto (paleta hueso/papel, tipografía serif/sans, grid 12 columnas, tarjetas planas) para que sirva como referencia visual alineada con [Referencias/referenciapaginaweb.md](Referencias/referenciapaginaweb.md).

## Estructura del sitio a replicar

- **Header:** logo “Anthropic” a la izquierda; navegación a la derecha (Research, Commitments, Learn, Company, News, Try Claude).
- **Hero:** título principal “AI research and products that put safety at the frontier” (subrayado grueso en palabra clave, p. ej. “research”); párrafo “AI will have a vast impact on the world. Anthropic is a public benefit corporation…”.
- **Featured:** etiqueta “Featured”; título “Four Hundred Meters on Mars”; subtítulo “The first AI-planned drive on another planet”; enlace “Read the story” / “Read More”.
- **Latest releases:** título de sección “Latest releases”; **3 tarjetas** con:
  - Título del artículo.
  - Fila meta: Date + Category (p. ej. “March 5, 2026” · “Announcements”).
  - Enlace(s): “Read the post” / “Read announcement” / “Model details”.
- **Statement + temas:** frase “At Anthropic, we build AI to serve humanity’s long-term well-being.”; bloque de enlaces temáticos (título + categoría): Core views on AI safety, Responsible Scaling Policy, Anthropic Academy, Economic Index, Claude’s constitution.
- **Footer:** columnas de enlaces (Products, Models, Solutions, Resources, Company, etc.) y copyright “© 2025 Anthropic PBC”.

## Archivos a crear


| Archivo                                     | Descripción                                                                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Prototipos/anthropic-prototipo/index.html` | Maquetado semántico (header, main con secciones, footer) con el contenido representativo de Anthropic.                                                              |
| `Prototipos/anthropic-prototipo/styles.css` | Estilos con variables CSS y grid de 12 columnas reutilizando el patrón de [Prototipos/propuesta-2-hub-vivo/styles.css](Prototipos/propuesta-2-hub-vivo/styles.css). |


## Guía de diseño a aplicar (consistente con el resto de prototipos)

- **Variables CSS:** `--bg: #F5F2ED` o `#F0EFEA`, `--text: #1A1A1A`, `--text-muted: #4A4A4A`, `--font-serif: 'Source Serif 4'`, `--font-sans: 'Inter'`, `--space`, `--radius: 4px`.
- **Grid:** `grid-template-columns: repeat(12, 1fr)`, contenedor `max-width: 1200px`, padding horizontal con `clamp()`.
- **Tipografía:** titulares en serif; palabra clave del hero con `.underline` (border-bottom grueso); cuerpo y meta en sans.
- **Componentes:** tarjetas planas (borde sutil, `border-radius: 4px`); botones/enlaces como bloques sólidos con hover; sin sombras ni degradados.
- **Tipografía fluida:** `clamp()` en tamaños de fuente de títulos y cuerpo.
- **Responsive:** en viewport estrecho, columnas de grid pasan a `span 12` y `col-start-`* se resetea.

## Detalle por sección en HTML/CSS

1. **Header:** `.site-header` con `.grid`; una celda para logo, otra para `.nav` (flex con enlaces). Mismo patrón que propuesta-2.
2. **Hero:** `.hero` con `.grid`; contenido centrado (p. ej. col-8 col-start-3); `h1.hero-title` con `<span class="underline">research</span>`; párrafo `.hero-lead`.
3. **Featured:** sección con título “Featured”, bloque tipo card o banner con título “Four Hundred Meters on Mars”, texto y `.btn` “Read the story”.
4. **Latest releases:** `h2.section-title` + 3 `article.card` en col-4; cada card: `.card-meta` (Date · Category), `h3.card-title`, `.card-text`, enlace “Read the post” etc. Reutilizar clases análogas a [Prototipos/propuesta-2-hub-vivo/index.html](Prototipos/propuesta-2-hub-vivo/index.html) (líneas 42–63).
5. **Statement:** párrafo destacado en serif; luego grid de 2–3 columnas de enlaces temáticos (título + label de categoría).
6. **Footer:** `.site-footer` con grid de varias columnas (col-2 o col-3) para cada grupo de enlaces; línea de copyright.

## Contenido

Usar el **texto y títulos reales** del sitio Anthropic (hero, “Four Hundred Meters on Mars”, títulos de los 3 releases, statement, nombres de secciones del footer) para que el prototipo sea una réplica visual fiel. Los enlaces pueden ser `#` o enlaces externos a anthropic.com si se desea.

## Actualización del README

Añadir en [Prototipos/README.md](Prototipos/README.md) una línea que indique la existencia de `anthropic-prototipo` como referencia del estilo Anthropic (minimalismo editorial, “Latest releases”) para el proyecto CSH.

## Orden de implementación

1. Crear carpeta `Prototipos/anthropic-prototipo`.
2. Crear `styles.css` con variables, reset, grid 12, tipografía, y estilos de header, hero, featured, cards, statement, footer.
3. Crear `index.html` con la estructura descrita y el contenido representativo de Anthropic.
4. Actualizar `Prototipos/README.md` con la nueva entrada.

