# 🗺️ Plan de Acción — Sprint de Correcciones Post-Beta · CSH
> Basado en `requerimientos_csh.md` y `todo-criterios-deliverables-csh.md`  
> Fecha: 17 de marzo de 2026 · Estado: **En planificación**

---

## 🎯 Objetivo del Sprint

Corregir los problemas detectados por los 13 betatesters para llevar el sitio a un estado listo para lanzamiento público. Se agrupan las tareas en 3 fases ordenadas por impacto y dependencia técnica.

---

## 📁 Mapa de archivos relevantes del proyecto

| Archivo | Qué contiene |
|---|---|
| `app/page.tsx` | Página Home (root) — orquesta las secciones |
| `app/globals.css` | CSS global, variables de color, tipografía base |
| `styles/globals.css` | CSS de soporte / tokens adicionales |
| `components/header.tsx` | Navegación principal y menú |
| `components/hero-section.tsx` | Sección Hero (CTA principal) |
| `components/cta-section.tsx` | Botones de llamada a la acción secundarios |
| `components/site-path.tsx` | **Ruta sugerida** — candidata a stepper (REQ-05) |
| `components/micro-intake-form.tsx` | Formulario con selector de intereses (REQ-07) |
| `components/ecosystem-section.tsx` | Sección ecosistema / comunidad |
| `components/philosophy-section.tsx` | Sección filosofía / propuesta de valor |
| `components/social-proof.tsx` | Testimonios / prueba social |
| `components/values-section.tsx` | Sección de valores — posible contenido repetido |
| `app/programas/page.tsx` | Página de Programas (REQ-08 / REQ-09) |
| `app/sobre/page.tsx` | Página Sobre CSH |
| `app/valores/page.tsx` | Página de Valores |

---

## 🚦 Fase 1 — Correcciones Bloqueantes (REQ-01 a REQ-04)
> **Criterio de entrada al lanzamiento.** Deben estar resueltas ANTES de cualquier publicación.  
> Esfuerzo estimado: **3–4 días**

---

### ✅ TAREA 1.1 · Auditoría y corrección Responsive (REQ-01)

**Archivos a tocar:** todos los componentes + `app/globals.css` + `styles/globals.css`

**Pasos:**
1. Abrir Chrome DevTools en los siguientes breakpoints: `360px`, `375px`, `414px`, `768px`.
2. Recorrer sección por sección e identificar:
   - Elementos que se desbordan horizontalmente (`overflow-x`)
   - `div`s sin cierre correcto (validar con [W3C Validator](https://validator.w3.org/))
   - Íconos descentrados (revisar uso de `flex` vs `inline-block`)
3. Priorizar fixes en: `header.tsx`, `hero-section.tsx`, `site-path.tsx`.
4. Probar en dispositivo físico o BrowserStack (Android Chrome + iOS Safari).

**Criterio de cierre:** ningún overflow horizontal en ≤ 768 px. Validador HTML sin errores de structure.

**Deliverable:** Capturas antes/después por sección en carpeta `/docs/work/17-03-26Fix-UI-feedback/responsive-report/`.

---

### ✅ TAREA 1.2 · Eliminar contenido repetido (REQ-02)

**Archivos a revisar:** `app/page.tsx`, `app/programas/page.tsx`, `app/sobre/page.tsx`, `app/valores/page.tsx`

**Pasos:**
1. Listar todos los bloques de copy en cada página (Copy-Paste a una hoja de trabajo).
2. Marcar los párrafos que aparecen en ≥ 2 lugares.
3. Aplicar regla: **Home = resumen**, **páginas internas = detalle exclusivo**.
4. Reescribir los bloques duplicados: reducirlos a un titular + 1 línea en Home, expandirlos en la sección interna correspondiente.

**Criterio de cierre:** ningún párrafo idéntico en dos páginas distintas.

**Deliverable:** Inventario de contenido en `/docs/work/17-03-26Fix-UI-feedback/content-map.md`.

---

### ✅ TAREA 1.3 · Corrección de navegación y redirecciones (REQ-03)

**Archivos a tocar:** `components/header.tsx`, `components/cta-section.tsx`, `components/hero-section.tsx`, `app/page.tsx`

**Pasos:**
1. Listar TODOS los `<Link>` y `<a href>` del proyecto con su destino:
   ```bash
   grep -rn "href=" components/ app/ --include="*.tsx"
   ```
2. Marcar los que apuntan hacia la misma página desde la que el usuario viene.
3. Redefinir destinos: cada CTA debe llevar a **contenido nuevo**.
4. Evaluar si añadir `<nav aria-label="breadcrumb">` en `/programas`, `/sobre`, `/valores`.

**Criterio de cierre:** flujo Home → sección → subsección lineal, sin loops. Sin 404s.

**Deliverable:** Mapa de navegación en `/docs/work/17-03-26Fix-UI-feedback/nav-map.md`.

---

### ✅ TAREA 1.4 · Reescritura de CTAs (REQ-04)

**Archivos a tocar:** `components/cta-section.tsx`, `components/hero-section.tsx`, `components/site-path.tsx`

**Pasos:**
1. Extraer el copy exacto de cada botón en el sitio.
2. Evaluar con la regla: **verbo de acción + destino implícito** (ej. "Explorar programas", "Unirme a la comunidad", "Ver mi ruta").
3. Reescribir los que no pasen. Prohibir: "Ver más", "Click aquí", "Saber más" sin contexto.
4. Verificar contraste con [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — mínimo **4.5:1**.

**Criterio de cierre:** todos los CTAs tienen verbo + contexto. Ratio de contraste ≥ 4.5:1.

**Deliverable:** Tabla `CTA anterior → CTA nuevo` en `/docs/work/17-03-26Fix-UI-feedback/cta-table.md`.

---

## 🟡 Fase 2 — Mejoras Funcionales (REQ-05 a REQ-09)
> Añaden valor real al usuario. Implementar en la semana posterior a cerrar Fase 1.  
> Esfuerzo estimado: **5–7 días**

---

### 🔧 TAREA 2.1 · Stepper en Ruta Sugerida (REQ-05)

**Archivo principal:** `components/site-path.tsx`

**Pasos:**
1. Definir los N pasos de la ruta (nombres + descripción corta).
2. Diseñar el componente stepper con estado `active` / `completed` / `pending`.
3. Implementar navegación con botones "Anterior / Siguiente" o scroll guiado.
4. Aplicar estilos: paso activo resaltado con color de acento primario.
5. Probar en móvil: stepper en orientación vertical para ≤ 768 px.

**Stack sugerido:** React state (`useState`) para el índice activo — sin librerías externas.

---

### 🔧 TAREA 2.2 · Acordeones en Home (REQ-06)

**Archivo principal:** `app/page.tsx` + los componentes de sección correspondientes

**Pasos:**
1. Identificar los 2–3 bloques más densos de la Home (candidatos: `philosophy-section`, `values-section`, `ecosystem-section`).
2. Implementar componente `<Accordion>` reutilizable en `/components/ui/accordion.tsx`.
3. Estado por defecto: **colapsado**. Título siempre visible.
4. Animación CSS: `max-height` transition o `details/summary` nativo.
5. Añadir `aria-expanded` y soporte de teclado (Enter / Space).

---

### 🔧 TAREA 2.3 · Multi-select de intereses (REQ-07)

**Archivo principal:** `components/micro-intake-form.tsx`

**Pasos:**
1. Localizar el input/grupo de radio buttons de áreas de interés.
2. Cambiar `type="radio"` → `type="checkbox"`.
3. Actualizar el estado del formulario: `selected: string` → `selected: string[]`.
4. Validación: al menos 1 checkbox marcado para habilitar el botón de envío.
5. Verificar el endpoint/destino recibe `string[]` correctamente.

---

### 🔧 TAREA 2.4 · Sección Oportunidades Laborales — MVP estático (REQ-08)

**Archivo nuevo:** `app/oportunidades/page.tsx`  
**Componente nuevo:** `components/job-board.tsx`

**Pasos:**
1. Crear la ruta `/oportunidades` en Next.js App Router.
2. Diseñar tarjeta de oportunidad: empresa, rol, área, modalidad, link.
3. Añadir 3–5 entradas de ejemplo/reales.
4. Agregar enlace en `header.tsx` y desde `app/programas/page.tsx`.
5. Documentar proceso de actualización de contenido.

---

### 🔧 TAREA 2.5 · Módulo de Cursos y Recursos (REQ-09)

**Archivo nuevo:** `app/recursos/page.tsx`  
**Componente nuevo:** `components/resource-card.tsx`

**Pasos:**
1. Curar lista inicial: mínimo 6 recursos por área (Computación, Diseño, Industrial).
2. Estructura de dato: `{ nombre, descripción, área, nivel, fuente, url }`.
3. Implementar filtro por `área` o `nivel` con `useState` (sin recarga).
4. Añadir enlace en header y desde sección académica.

---

## 🟢 Fase 3 — Mejoras de Experiencia (REQ-10 a REQ-13)
> Enriquecen el producto. Hacer en paralelo o como siguiente iteración.  
> Esfuerzo estimado: **3–4 días**

---

### ✨ TAREA 3.1 · Ajuste de Paleta de Color (REQ-10)

**Archivos:** `app/globals.css`, `styles/globals.css`

**Pasos:**
1. Listar variables CSS actuales (`--color-*`, `--background`, `--foreground`, etc.).
2. Proponer 2 variantes de acento más saturado manteniendo la identidad oscura.
3. Validar contraste WCAG AA para cada variante.
4. Aplicar la variante aprobada via tokens, **no hardcodeando valores**.

> 💡 Referencia: no es un rediseño. Solo ajustar `--accent` / `--primary` para más energía visual.

---

### ✨ TAREA 3.2 · Onboarding para primera visita (REQ-11)

**Archivo nuevo:** `components/onboarding-modal.tsx`

**Pasos:**
1. Elegir formato: modal de bienvenida (recomendado por simplicidad).
2. Copy: máximo 3 slides con propuesta de valor del sitio.
3. Botón "Omitir" siempre visible.
4. Persistencia: `localStorage.setItem("csh_onboarded", "true")` — no mostrar dos veces.
5. Renderizar desde `app/layout.tsx` solo si `!localStorage["csh_onboarded"]`.

---

### ✨ TAREA 3.3 · Micro-interacciones adicionales (REQ-12)

**Archivos:** componentes de tarjetas, secciones con contadores

**Candidatos prioritarios:**
- Hover en tarjetas de programas (`app/programas/page.tsx`) → `transform: translateY(-4px)` + `box-shadow`.
- Contadores animados (número de carreras / recursos) → Intersection Observer + counter animation.
- Feedback visual en botones → `active:scale-95` + ripple efecto.

> ⚠️ Regla: animaciones ≤ 300ms. No añadir librerías pesadas. CSS puro o pequeñas utils.

---

### ✨ TAREA 3.4 · Coherencia estética CS/tech (REQ-13)

**Archivos:** componentes con íconos y assets visuales

**Pasos:**
1. Auditar íconos actuales — ¿son de un set consistente?
2. Reemplazar íconos genéricos por equivalentes tech: `<Code>`, `<Terminal>`, `<Cpu>`, `<Network>` (Lucide ya está en el proyecto).
3. Revisar Hero y sección "Sobre CSH": ¿la imagen/ilustración comunica tecnología?
4. Validar con usuario externo sin contexto.

---

## 📅 Cronograma Sugerido

```
Semana 1 (17–21 Mar)
├── Día 1: TAREA 1.1 Responsive Audit (setup + fixes críticos)
├── Día 2: TAREA 1.1 (cierre) + TAREA 1.2 (content map)
├── Día 3: TAREA 1.3 (navegación) + TAREA 1.4 (CTAs)
├── Día 4: Buffer / revisión Fase 1
└── Día 5: QA Fase 1 + merge

Semana 2 (24–28 Mar)
├── Día 1–2: TAREA 2.1 Stepper + TAREA 2.2 Acordeones
├── Día 3:   TAREA 2.3 Multi-select
├── Día 4–5: TAREA 2.4 Oportunidades + TAREA 2.5 Recursos (MVP)

Semana 3 (31 Mar–4 Abr) — si aplica
├── TAREA 3.1 Paleta
├── TAREA 3.2 Onboarding
├── TAREA 3.3 Micro-interacciones
└── TAREA 3.4 Coherencia visual
```

---

## 📊 Resumen de Priorización con Esfuerzo

| Tarea | REQ | Fase | Prioridad | Esfuerzo | Archivo principal |
|---|---|---|---|---|---|
| Responsive / Mobile | REQ-01 | 1 | 🔴 Bloqueante | Medio | todos los componentes |
| Contenido duplicado | REQ-02 | 1 | 🔴 Bloqueante | Bajo | `app/*/page.tsx` |
| Navegación / rutas | REQ-03 | 1 | 🔴 Bloqueante | Bajo | `header.tsx`, CTAs |
| CTAs claros | REQ-04 | 1 | 🔴 Bloqueante | Bajo | `cta-section.tsx`, `hero-section.tsx` |
| Stepper ruta sugerida | REQ-05 | 2 | 🟡 Funcional | Medio | `site-path.tsx` |
| Acordeones en Home | REQ-06 | 2 | 🟡 Funcional | Bajo-Medio | `app/page.tsx` |
| Multi-select intereses | REQ-07 | 2 | 🟡 Funcional | Bajo | `micro-intake-form.tsx` |
| Oportunidades laborales | REQ-08 | 2 | 🟡 Funcional | Medio | `app/oportunidades/` (nuevo) |
| Módulo de recursos | REQ-09 | 2 | 🟡 Funcional | Medio-Alto | `app/recursos/` (nuevo) |
| Paleta de color | REQ-10 | 3 | 🟢 Mejora | Bajo | `globals.css` |
| Onboarding modal | REQ-11 | 3 | 🟢 Mejora | Medio | `components/onboarding-modal.tsx` (nuevo) |
| Micro-interacciones | REQ-12 | 3 | 🟢 Mejora | Medio | componentes de tarjetas |
| Coherencia CS/tech | REQ-13 | 3 | 🟢 Mejora | Bajo-Medio | íconos y assets |

---

## 🔒 Criterio de Definition of Done (DoD) por Tarea

- [ ] El código está en rama `fix/[req-id]-descripcion` y mergeado a `main`
- [ ] Se adjunta captura o evidencia del deliverable definido en `todo-criterios-deliverables-csh.md`
- [ ] Los criterios de aceptación del REQ correspondiente están marcados como cumplidos
- [ ] No hay errores en consola del browser en el flujo afectado
- [ ] Probado en al menos 1 viewport móvil (375px) y desktop (1280px)

---

*Plan generado por análisis de requerimientos beta — CSH · 17 de marzo de 2026*
