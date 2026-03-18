# 📋 Requerimientos CSH — Análisis de Encuestas Beta Testers

> Basado en **13 respuestas** recolectadas entre el 15–17 de marzo de 2026.  
> Perfiles: mayoritariamente desarrolladores (`dev`) y usuarios no técnicos (`no_tecnico`).  
> Dispositivos: teléfono, laptop/desktop y tablet.

---

## 🔴 Requerimientos Esenciales
*Problemas que afectan la experiencia de usuario de forma directa y deben resolverse antes de cualquier lanzamiento público.*

### 1. Corregir problemas de responsive / mobile
Varios testers desde teléfono reportaron desajustes visuales: cierre incorrecto de `div`s, iconos descentrados y elementos que no se adaptan correctamente a pantallas pequeñas. Paradójicamente, un tester destacó el buen responsive como punto positivo, lo que indica inconsistencia entre vistas.

**Acción:** Auditar el layout en breakpoints móviles (≤ 768 px). Revisar el cierre correcto de contenedores y el centrado de íconos con Flexbox/Grid.

---

### 2. Eliminar la repetición de información entre secciones
Múltiples usuarios (especialmente devs) señalaron que al navegar entre secciones encontraban el mismo contenido que ya habían leído en la página de inicio, generando sensación de redundancia y confusión.

**Acción:** Auditar el contenido de cada sección y consolidar o diferenciar claramente la información. Considerar que la Home sirva de *resumen* y las secciones internas de *detalle*.

---

### 3. Mejorar la navegación y redirecciones entre secciones
Algunos usuarios se confundieron al seguir enlaces que los llevaban a secciones ya visitadas, tanto en móvil como en escritorio. La estructura de navegación no siempre resultó secuencial ni predecible.

**Acción:** Revisar el flujo de navegación. Asegurarse de que cada CTA lleve a una sección nueva y con valor diferenciado. Agregar breadcrumbs o indicadores de progreso donde aplique.

---

### 4. Clarificar los CTAs (Call to Action)
Al menos un tester con perfil dev cuestionó directamente: *"CTA???"*, indicando que no quedó claro qué acción debía tomar. Otros marcaron los CTAs como "más o menos" claros.

**Acción:** Revisar el copy y la visibilidad de los botones principales. Cada CTA debe comunicar con claridad qué hace y hacia dónde lleva (ej. "Únete a la comunidad", "Ver ruta sugerida", "Explorar programas").

---

## 🟡 Requerimientos Funcionales
*Funcionalidades concretas que los usuarios esperan o que mejorarían directamente la utilidad del sitio.*

### 5. Rediseñar la sección "Ruta Sugerida" con vista secuencial
Varios testers señalaron que la ruta sugerida es una buena idea pero su presentación actual es confusa. Se sugirió que los pasos se muestren de forma progresiva o que haya un botón para ir paso a paso.

**Acción:** Implementar un componente tipo *stepper* o *wizard* que muestre la ruta de forma secuencial, ya sea en una sola página con scroll guiado o con navegación paso a paso.

---

### 6. Reducir la densidad de información en la Home con elementos expandibles
La página de inicio fue descrita como con "mucha información". Se sugirió explícitamente usar campos expandibles (accordions) para mostrar solo lo esencial y permitir que el usuario profundice si quiere.

**Acción:** Implementar componentes de acordeón o secciones colapsables en la Home para reducir la carga cognitiva inicial sin perder el contenido.

---

### 7. Permitir selección múltiple de intereses/áreas
Un tester señaló que el selector de áreas de interés no permite elegir más de una opción a la vez, cuando muchos usuarios tienen interés en lo académico **y** lo profesional al mismo tiempo.

**Acción:** Cambiar el input de selección de intereses de `radio` / `single select` a `checkbox` / `multi-select`.

---

### 8. Sección de oportunidades laborales o empresas donde aplicar
Varios usuarios (técnicos y no técnicos) solicitaron un espacio donde puedan ver empresas del sector o convocatorias laborales a las que puedan postular. Esto refuerza el pilar de "proyección profesional".

**Acción:** Crear una sección o módulo de *Job Board* o directorio de empresas aliadas, aunque sea en versión mínima con información estática en una primera iteración.

---

### 9. Sección o módulo de cursos / materias de interés
Un tester no técnico solicitó explícitamente una sección con cursos en materias innovadoras. Otro sugirió un filtro por tipo de carrera o materia de interés dentro de la plataforma.

**Acción:** Planificar una sección de recursos de aprendizaje (cursos, tutoriales, materiales) con filtrado por área o nivel. Puede iniciar como contenido curado de fuentes externas.

---

## 🟢 Requerimientos No Esenciales
*Mejoras de experiencia, estética o contenido que enriquecen el producto pero no bloquean su funcionamiento.*

### 10. Agregar más color / paleta menos oscura
Dos testers mencionaron que el sitio se percibe muy oscuro o con colores poco vivos. Uno solicitó directamente colores "UN POQUITO más vivos" y otro indicó que el color es "muy oscuro".

**Acción:** Evaluar ajustes en la paleta de colores: añadir acentos o colores de acción más saturados sin romper la identidad visual actual. No es un rediseño, sino un ajuste de contraste y energía visual.

---

### 11. Onboarding / tutorial para nuevos usuarios
Un tester no técnico sugirió agregar algún tutorial para personas que se les dificulta entender el sitio al primer vistazo, especialmente quienes no tienen contexto técnico.

**Acción:** Implementar un pequeño flujo de onboarding (ej. tooltips de bienvenida, un modal introductorio o un recorrido guiado opcional) para usuarios que visitan el sitio por primera vez.

---

### 12. Mayor interactividad en el sitio
Un par de usuarios pidieron "un poco más de interactividad". Las animaciones actuales fueron bien recibidas, pero se espera que el sitio tenga más elementos con los que el usuario pueda interactuar más allá de hacer scroll.

**Acción:** Explorar micro-interacciones adicionales: hover effects en tarjetas, filtros dinámicos en secciones de contenido, contadores animados, etc.

---

### 13. Mejorar la coherencia estética con el tema del sitio
Un tester mencionó que sin contexto previo, la estética no comunica del todo a qué se dedica el sitio. La identidad visual podría reforzar mejor el vínculo con ciencias de la computación / tecnología.

**Acción:** Revisar si los elementos visuales (ilustraciones, iconografía, imágenes) refuerzan el tema tecnológico-estudiantil. Considerar iconos o recursos que comuniquen CS/tech de forma más directa.

---

## 📊 Resumen General de Feedback

| Aspecto | Positivo | Negativo / Mejorable |
|---|---|---|
| Diseño visual | Profesional, cuidado, ordenado | Muy oscuro, poca variedad de color |
| Animaciones | Muy bien recibidas | — |
| Responsive / Mobile | Bueno en general | Inconsistencias en algunos dispositivos |
| Navegación | Intuitiva y fácil | Redirecciones confusas, info repetitiva |
| Propuesta de valor | Clara y atractiva | Podría comunicarse más rápido |
| Ruta sugerida | Buena idea | Confusa en su presentación actual |
| CTAs | Bien posicionados | No siempre queda claro qué hacen |
| Contenido Home | Completo | Demasiado denso, repetitivo |

---

*Documento generado a partir del análisis de encuestas de betatesters — CSH · Marzo 2026*
