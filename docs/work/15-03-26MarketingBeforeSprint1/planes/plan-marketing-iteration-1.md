## Plan de iteración con marketing psychology (versión actual reestructurada)

Este plan aplica la skill de `marketing-psychology` sobre la **versión actual** de la web (rama `feature/marketing-content-review`) para identificar mejoras finas en mensaje, flujo, engagement y conversión.

### 1. Propuesta de valor y segmentación (Jobs to Be Done, Framing, Unity)

**Situación actual**

- El héroe explica bien la identidad global del CSH.
- Las páginas `/sobre`, `/valores` y `/programas` desarrollan el relato institucional con buen tono editorial.

**Mejoras sugeridas**

- **Aterrizar mejor los “Jobs to Be Done” por segmento**:
  - Estudiante preocupado por materias → “Te ayudamos a no ir solo/a: rutas claras y tutorías”.
  - Estudiante que quiere liderazgo → “Te damos espacio para organizar, proponer y decidir”.
  - Estudiante que piensa en empleo → “Te damos proyectos, charlas y rutas que acercan a la industria”.
- Propuesta: añadir una **sección de “Perfiles”** en la homepage o en `/programas` donde cada bloque responda a:
  - “Si estás en X situación, este es tu camino dentro del Hub”.
  - Modelos: Jobs to Be Done + Unity (que sientan que “esto es para gente como yo”).

### 2. CTAs y micro-conversiones (BJ Fogg, Commitment & Consistency)

**Situación actual**

- CTA principal: “Sumate al Hub” (ancla a `#join`).
- No existe todavía una acción clara de baja fricción (formulario, canal directo, etc.) integrada en la UI.

**Mejoras sugeridas**

- Definir una **micro-conversión concreta**:
  - Ejemplos: formulario de “interés en tutorías”, registro a newsletter, formulario para unirse a grupos de trabajo.
- Aplicar **BJ Fogg**:
  - Reducir fricción del primer paso (formulario corto, 3 campos máximo).
  - Colocar el CTA también en `/sobre` y `/programas` con copy contextual:
    - En `/sobre`: “Quiero formar parte del Hub”.
    - En `/programas`: “Quiero unirme a este programa”.
- Modelo: Commitment & Consistency → un pequeño compromiso inicial aumenta probabilidad de compromisos más grandes después.

### 3. Social proof y evidencia (Social Proof, Authority, Pratfall Effect)

**Situación actual**

- La narrativa transmite autoridad conceptual, pero falta evidencia visible (testimonios, números, casos).

**Mejoras sugeridas**

- Añadir **un bloque de social proof** en la homepage y/o `/sobre`:
  - Pequeños testimonios (1–2 frases) de estudiantes.
  - Métricas iniciales (aunque sean modestas): “X tutorías realizadas”, “Y actividades organizadas”.
- Aplicar **Pratfall Effect** de forma controlada:
  - Reconocer una limitación real (“Estamos en fase inicial, pero ya…”) para dar credibilidad al resto de claims.

### 4. Claridad de rutas dentro del sitio (Hick’s Law, Goal-Gradient, Zeigarnik)

**Situación actual**

- Navegación principal clara (`/sobre`, `/valores`, `/programas`), pero el “camino sugerido” no está explicitado.

**Mejoras sugeridas**

- Diseñar una **“ruta sugerida”** en la homepage:
  - Paso 1: Leer `/sobre` para entender el Hub.
  - Paso 2: Revisar `/valores` para identificar afinidad.
  - Paso 3: Explorar `/programas` y escoger uno.
  - Paso 4: Completar micro-conversión (formulario/inscripción).
- Representar esta ruta como **barra de progreso** o lista numerada con estados (Goal-Gradient + Zeigarnik Effect):
  - Mostrar que completar el paso 1/4, 2/4, etc., da sensación de avance.

### 5. Profundidad de contenido vs. scanability (Fluency, Peak-End Rule)

**Situación actual**

- Los textos tienen buen tono editorial, pero algunos bloques (especialmente en `/sobre`) siguen siendo relativamente densos.

**Mejoras sugeridas**

- Identificar los 2–3 párrafos más largos por página (`/sobre`, `/valores`, `/programas`) y:
  - Dividirlos en frases más cortas.
  - Resaltar frases clave con énfasis tipográfico limitado (negritas) para apoyar la lectura en diagonal.
- Crear **picos positivos** intencionales (Peak-End Rule):
  - Incluir frases inspiradoras o “promesas claras” al cierre de cada página (no solo información).
  - Ej.: terminar `/programas` con un enunciado tipo “Tu próximo paso es elegir un lugar donde empezar, el resto lo construimos juntos”.

### 6. Preparación para experimentos (AB Testing, 80/20, Metrics)

**Situación actual**

- Ya existe una arquitectura visual y de contenido rica; falta un plan de testeo progresivo.

**Mejoras sugeridas**

- Definir **métricas de éxito mínimas**:
  - Clics en CTAs principales (homepage, `/sobre`, `/programas`).
  - Tiempo en página para `/programas` y `/sobre`.
  - Conversiones a la micro-conversión elegida (cuando exista).
- Plan de A/B tests simples (uno por vez):
  - **Test 1**: Variar el titular del héroe (más aspiracional vs. más funcional).
  - **Test 2**: Posición del bloque de social proof (homepage vs. `/sobre`).
  - **Test 3**: Copy del CTA principal (“Sumate al Hub” vs. “Quiero formar parte del Hub”).
- Aplicar 80/20:
  - Enfocar los primeros tests y mejoras en homepage y `/programas`, que concentran más intención de acción.

### 7. Próximos pasos de implementación

1. Definir y maquetar una micro-conversión clara (formulario corto) y conectarla con el CTA principal.
2. Diseñar y colocar una sección de social proof ligera (testimonios + métrica simple) en homepage y/o `/sobre`.
3. Añadir un bloque de “ruta sugerida” en la homepage con 3–4 pasos y feedback visual de avance.
4. Refactorizar textos largos en `/sobre` y `/programas` para mejorar scanability (frases cortas + énfasis selectivo).
5. Configurar analítica básica para medir clics en CTAs, vistas de páginas clave y conversiones a la micro-conversión.
6. Definir la prioridad y calendario de 2–3 A/B tests iniciales centrados en héroe, CTAs y social proof.

