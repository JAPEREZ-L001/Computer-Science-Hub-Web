# ✅ To-Do, Criterios de Aceptación y Deliverables — CSH
> Basado en requerimientos extraídos de beta testers · Marzo 2026

---

## 🔴 Esenciales

---

### REQ-01 · Responsive / Mobile

**To-Do**
- [ ] Auditar todos los breakpoints en Chrome DevTools (360px, 375px, 414px, 768px)
- [ ] Identificar y cerrar todos los `div` sin cierre correcto
- [ ] Corregir centrado de íconos con Flexbox/Grid
- [ ] Revisar overflow horizontal en móvil
- [ ] Probar en dispositivo físico Android e iOS

**Criterios de aceptación**
- Ningún elemento se desborda horizontalmente en resoluciones ≤ 768px
- Los íconos están centrados en todos los breakpoints probados
- No hay `div` sin cerrar detectados por el validador HTML
- La página es funcional y visualmente correcta en Chrome mobile, Safari iOS y Chrome Android

**Deliverable**
Reporte de auditoría responsive con capturas antes/después + lista de fixes aplicados.

---

### REQ-02 · Eliminar repetición de contenido

**To-Do**
- [ ] Mapear qué bloques de texto aparecen en más de una sección/página
- [ ] Definir regla editorial: la Home es resumen, las secciones internas son detalle
- [ ] Reescribir o eliminar los bloques duplicados según esa regla
- [ ] Validar que cada sección aporte información nueva respecto a la anterior

**Criterios de aceptación**
- Ningún párrafo o bloque de contenido es idéntico o casi idéntico en dos lugares distintos
- Un usuario que lee la Home y luego entra a una sección interna encuentra información adicional, no la misma
- El mapeo de contenido (inventario) está documentado

**Deliverable**
Inventario de contenido con duplicados marcados + versión actualizada del copy por sección.

---

### REQ-03 · Navegación y redirecciones

**To-Do**
- [ ] Listar todos los CTAs y enlaces internos del sitio con su destino actual
- [ ] Identificar cuáles redirigen a secciones ya visitadas o generan loops
- [ ] Redefinir el destino correcto para cada enlace
- [ ] Implementar correcciones de rutas
- [ ] Evaluar si breadcrumbs o indicadores de progreso aplican en alguna sección

**Criterios de aceptación**
- Ningún CTA o enlace lleva a una sección que el usuario ya vio en el flujo principal
- El recorrido Home → Sección → Subsección es lineal y predecible
- No existen enlaces rotos (404) ni loops de navegación
- Si hay breadcrumbs implementados, reflejan correctamente la ubicación del usuario

**Deliverable**
Mapa de navegación actualizado (puede ser un diagrama simple) + changelog de rutas corregidas.

---

### REQ-04 · CTAs claros

**To-Do**
- [ ] Listar todos los CTAs actuales con su copy exacto
- [ ] Evaluar cada uno: ¿comunica acción + destino?
- [ ] Reescribir los que no superen esa evaluación
- [ ] Verificar contraste y visibilidad visual de cada botón (WCAG AA mínimo)
- [ ] Validar con al menos 2 personas que lean el CTA y digan correctamente qué hará al hacer clic

**Criterios de aceptación**
- Cada CTA contiene un verbo de acción claro (ej. "Únete", "Explorar", "Ver ruta")
- Ningún CTA dice únicamente "Click aquí", "Ver más" o equivalentes ambiguos sin contexto
- El contraste de texto sobre fondo del botón cumple ratio ≥ 4.5:1
- En una prueba informal con 2 personas, ambas identifican correctamente qué hará el botón

**Deliverable**
Tabla de CTAs: copy anterior → copy nuevo + justificación del cambio.

---

## 🟡 Funcionales

---

### REQ-05 · Ruta Sugerida como stepper secuencial

**To-Do**
- [ ] Definir cuántos pasos tiene la ruta y su nombre/descripción
- [ ] Diseñar el componente stepper (wireframe o boceto)
- [ ] Implementar el componente con navegación paso a paso o scroll guiado
- [ ] Asegurar que el estado activo/completado de cada paso sea visualmente distinguible
- [ ] Probar en móvil y desktop

**Criterios de aceptación**
- El usuario puede ver todos los pasos de la ruta de un vistazo
- Puede navegar entre pasos de forma secuencial sin regresar a la Home
- El paso activo está visualmente diferenciado del resto
- En móvil el componente no rompe el layout

**Deliverable**
Componente de stepper implementado y funcional en el sitio, con diseño documentado.

---

### REQ-06 · Acordeones / contenido expandible en la Home

**To-Do**
- [ ] Identificar qué bloques de la Home son candidatos a colapsar (los de mayor densidad textual)
- [ ] Implementar componente acordeón o sección colapsable
- [ ] Definir qué texto queda visible por defecto (resumen/título) y qué se oculta
- [ ] Asegurar que la animación de apertura/cierre sea fluida
- [ ] Probar accesibilidad básica (teclado, aria-expanded)

**Criterios de aceptación**
- Al cargar la Home, el contenido denso está colapsado por defecto
- El usuario puede expandir y colapsar cada sección sin recargar la página
- El estado abierto/cerrado es visualmente claro con ícono o indicador
- Funciona correctamente con teclado (Enter/Space para toggle)

**Deliverable**
Secciones de Home rediseñadas con acordeones implementados + evidencia de prueba en móvil y desktop.

---

### REQ-07 · Selección múltiple de intereses

**To-Do**
- [ ] Ubicar el componente de selección de intereses en el código
- [ ] Cambiar el input de `radio` a `checkbox`
- [ ] Actualizar el modelo de datos para recibir un array de selecciones
- [ ] Actualizar la validación del formulario (mínimo 1 selección requerida)
- [ ] Verificar que el backend o destino de los datos reciba correctamente el array

**Criterios de aceptación**
- El usuario puede seleccionar más de un área de interés simultáneamente
- El formulario no permite enviarse con 0 selecciones
- Los datos llegan correctamente al destino (backend, hoja, formulario externo)
- El diseño visual distingue claramente los items seleccionados de los no seleccionados

**Deliverable**
Componente actualizado en producción + confirmación de que el backend recibe el array correctamente.

---

### REQ-08 · Sección de oportunidades laborales

**To-Do**
- [ ] Definir el alcance MVP: ¿listado estático o con gestión dinámica?
- [ ] Diseñar la estructura de una tarjeta de oportunidad (empresa, rol, área, link)
- [ ] Implementar la sección con al menos 3–5 entradas de ejemplo o reales
- [ ] Agregar enlace a la sección desde el menú o desde la sección de Programas
- [ ] Definir quién será responsable de mantener el contenido actualizado

**Criterios de aceptación**
- La sección existe y es accesible desde al menos un punto de navegación del sitio
- Cada entrada muestra: nombre de empresa/organización, tipo de oportunidad, área y cómo aplicar
- La sección es legible en móvil y desktop
- Si es estática, hay un proceso documentado para actualizarla

**Deliverable**
Sección de oportunidades en el sitio (MVP estático) + documento de proceso para mantenerla actualizada.

---

### REQ-09 · Módulo de cursos y recursos de aprendizaje

**To-Do**
- [ ] Curar una lista inicial de recursos externos relevantes por área (computación, diseño, industrial)
- [ ] Definir estructura de cada recurso: nombre, área, nivel, fuente, link
- [ ] Implementar la sección con filtrado por área o nivel
- [ ] Agregar enlace desde el menú o desde la sección académica
- [ ] Definir criterio de curaduría y responsable de actualización

**Criterios de aceptación**
- Existe una sección de recursos con al menos 6 entradas iniciales
- El usuario puede filtrar por área o nivel sin recargar la página
- Cada recurso tiene título, descripción breve, área y enlace externo funcional
- Los filtros funcionan en móvil

**Deliverable**
Sección de recursos implementada con filtros funcionales + documento de criterios de curaduría.

---

## 🟢 No Esenciales

---

### REQ-10 · Ajuste de paleta de colores

**To-Do**
- [ ] Identificar los tokens de color actuales del sitio (variables CSS o design tokens)
- [ ] Proponer 2–3 variantes de ajuste: acentos más vivos, mayor contraste
- [ ] Validar que los colores propuestos sigan cumpliendo WCAG AA
- [ ] Aplicar el ajuste seleccionado a los tokens y verificar en todas las secciones
- [ ] Obtener validación visual de al menos un miembro del equipo de diseño

**Criterios de aceptación**
- El ajuste no rompe la identidad visual actual (no es un rediseño)
- Los colores de acción (botones, links, highlights) tienen mayor contraste o saturación que antes
- Todo el texto sobre fondo sigue cumpliendo ratio ≥ 4.5:1
- El cambio está aplicado globalmente vía tokens/variables, no con valores hardcodeados

**Deliverable**
Design tokens actualizados + capturas comparativas antes/después en las secciones principales.

---

### REQ-11 · Onboarding para nuevos usuarios

**To-Do**
- [ ] Definir el formato: tooltip, modal de bienvenida o recorrido guiado (tour)
- [ ] Escribir el copy de cada paso del onboarding (máximo 3–5 pasos)
- [ ] Implementar el componente con opción de omitir
- [ ] Guardar en `localStorage` si el usuario ya completó el onboarding (no mostrarlo dos veces)
- [ ] Probar que no bloquea ni interrumpe el uso normal del sitio

**Criterios de aceptación**
- El onboarding aparece solo en la primera visita del usuario
- Tiene opción clara de omitir en cualquier momento
- No bloquea el acceso al contenido
- En móvil no cubre elementos esenciales de navegación

**Deliverable**
Flujo de onboarding implementado + decisión documentada sobre el formato elegido y por qué.

---

### REQ-12 · Micro-interacciones adicionales

**To-Do**
- [ ] Identificar los 3–5 elementos que más se beneficiarían de interacción (tarjetas, contadores, filtros)
- [ ] Definir el comportamiento esperado por elemento (hover, click, scroll trigger)
- [ ] Implementar las micro-interacciones priorizando las que más impacto visual tienen
- [ ] Verificar que no afecten el rendimiento (sin jank ni layout shift)
- [ ] Probar en dispositivos táctiles donde hover no aplica

**Criterios de aceptación**
- Las micro-interacciones implementadas no generan CLS (Cumulative Layout Shift) medible
- En dispositivos táctiles hay un estado alternativo equivalente al hover
- Las animaciones no superan 300ms para no percibirse lentas
- No se añaden librerías pesadas innecesariamente para este fin

**Deliverable**
Lista de micro-interacciones implementadas con descripción de comportamiento por elemento.

---

### REQ-13 · Coherencia estética con el tema CS/tech

**To-Do**
- [ ] Auditar todos los elementos visuales actuales: íconos, ilustraciones, imágenes
- [ ] Identificar cuáles no comunican tecnología/computación de forma directa
- [ ] Proponer reemplazos: íconos de sets tech-oriented, ilustraciones alineadas al tema
- [ ] Aplicar los cambios priorizando las secciones más visibles (Hero, Sobre CSH)
- [ ] Validar con un usuario sin contexto que los nuevos elementos comunican CS/tech

**Criterios de aceptación**
- Un usuario sin contexto previo puede inferir que el sitio es de tecnología solo con los elementos visuales
- Los íconos usados pertenecen a un set consistente (no mezcla de estilos)
- No hay ilustraciones o imágenes que generen disonancia con el tema

**Deliverable**
Inventario visual actualizado (antes/después) + guía mínima de criterios para futuros elementos gráficos.

---

## 📌 Resumen de Priorización

| ID | Requerimiento | Prioridad | Esfuerzo estimado | Tipo |
|---|---|---|---|---|
| REQ-01 | Responsive / Mobile | 🔴 Alta | Medio | Frontend |
| REQ-02 | Eliminar contenido repetido | 🔴 Alta | Bajo | Contenido |
| REQ-03 | Navegación y redirecciones | 🔴 Alta | Bajo-Medio | Frontend |
| REQ-04 | CTAs claros | 🔴 Alta | Bajo | Contenido / Frontend |
| REQ-05 | Stepper ruta sugerida | 🟡 Media | Medio | Frontend |
| REQ-06 | Acordeones en Home | 🟡 Media | Bajo-Medio | Frontend |
| REQ-07 | Selección múltiple intereses | 🟡 Media | Bajo | Frontend / Backend |
| REQ-08 | Sección oportunidades laborales | 🟡 Media | Medio | Contenido / Frontend |
| REQ-09 | Módulo de cursos/recursos | 🟡 Media | Medio-Alto | Frontend / Backend |
| REQ-10 | Ajuste de paleta | 🟢 Baja | Bajo | Diseño / Frontend |
| REQ-11 | Onboarding nuevos usuarios | 🟢 Baja | Medio | Frontend |
| REQ-12 | Micro-interacciones | 🟢 Baja | Medio | Frontend |
| REQ-13 | Coherencia estética CS/tech | 🟢 Baja | Bajo-Medio | Diseño |

---

*Documento de gestión técnica — CSH · Marzo 2026*
