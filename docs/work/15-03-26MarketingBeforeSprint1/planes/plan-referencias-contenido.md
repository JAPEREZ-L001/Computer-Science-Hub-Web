## Plan de mejora de contenido y estructura

Este plan usa la skill `marketing-psychology` para analizar:

- Las referencias escritas actuales (`Idea Principal CSH`, `Identidad-Institucional-CSH`, `referenciapaginaweb.md`).
- El `README.md` del proyecto.

Objetivo: traducir la identidad institucional compleja del CSH a un mensaje web claro, persuasivo y estructurado, que conecte rápido con nuevos visitantes y apoye los objetivos de comunidad, gobernanza y proyección profesional.

---

## 1. Claridad de propuesta de valor (First Principles, Jobs to Be Done, Curse of Knowledge)

### Hallazgos

- Los textos institucionales describen muy bien la **evolución organizativa** del CSH (de comunidad educativa a mesa formal de ingeniería con proyección nacional).
- Sin embargo, para un visitante nuevo (estudiante, posible aliado, empresa) la redacción es:
  - Muy larga y densa (bloques de texto extensos).
  - Altamente institucional y académica.
  - Centrada en la **estructura interna** más que en el **beneficio inmediato** para la persona que llega al sitio.
- Esto es un caso claro de **Curse of Knowledge**: quienes escriben dominan el contexto, pero el lector externo no.

### Recomendaciones

- **Definir 2–3 “Jobs to Be Done” principales para el sitio web**:
  - *Job 1 (estudiante)*: “Quiero mejorar mi nivel en ciencias de la computación y sentir que avanzo hacia ser un profesional sólido”.
  - *Job 2 (miembro/organizador)*: “Quiero un espacio donde participar, liderar y construir comunidad”.
  - *Job 3 (aliado externo)*: “Quiero entender rápidamente qué es CSH y si tiene sentido colaborar, apoyar o contratar talento de ahí”.
- **Crear una versión “web” de la identidad**:
  - Mantener la esencia de misión/visión, pero reescrita en lenguaje más directo, con frases cortas y foco en beneficios.
  - Ejemplo de framing:  
    - “Somos la comunidad de estudiantes de computación que convierte la teoría en práctica, la organización en oportunidades y la disrupción en innovación real.”

---

## 2. Estructura de contenidos para la web (Hick’s Law, AIDA, Paradox of Choice)

### Hallazgos

- Los documentos actuales mezclan misión, visión, filosofía, valores, metas y objetivos en bloques largos.
- En la web, esto puede romper **AIDA** (Atención, Interés, Deseo, Acción) porque el usuario se pierde antes de llegar a la parte que le motiva actuar.

### Recomendaciones

- **Homepage con narrativa AIDA**:
  - **Attention**: Héroe con frase corta y fuerte (1–2 líneas) que resuma la propuesta del CSH.
  - **Interest**: 3 bloques claros:
    - Aprendizaje y acompañamiento académico.
    - Comunidad y organización estudiantil.
    - Proyección profesional y redes.
  - **Desire**: mencionar beneficios concretos: “más claridad académica”, “red de apoyo”, “acceso a proyectos y mentores”, “visibilidad frente a industria”.
  - **Action**: 1–2 CTAs máximos (unirse a la comunidad, explorar recursos, suscribirse).
- **Subpáginas derivadas**:
  - `Sobre CSH`: usar aquí una versión resumida de misión, visión, filosofía y metas, con secciones plegables o tarjetas.
  - `Valores y cultura`: lista escaneable, cada valor con 1 frase de ejemplo práctico.
  - `Líneas de acción / Programas`: mostrar en qué se traduce todo eso en actividades reales.

---

## 3. Tono y legibilidad (Mere Exposure, Fluency, Peak-End Rule)

### Hallazgos

- El tono actual es muy formal y denso, lo cual puede generar **baja fluidez cognitiva** (el texto requiere esfuerzo alto).
- Los bloques largos sin descansos visuales reducen el deseo de seguir leyendo, lo que atenta contra el **Peak-End Rule**: el usuario puede abandonar con una impresión de “es demasiado largo/teórico”.

### Recomendaciones

- **Reescritura orientada a fluidez**:
  - Dividir párrafos grandes en bloques de 2–3 líneas.
  - Usar subtítulos y bullets para cada idea principal.
  - Combinar lenguaje institucional con ejemplos concretos (“¿Qué significa esto para ti como estudiante?”).
- **Diseñar picos positivos en el contenido (Peak-End)**:
  - Insertar historias cortas o ejemplos inspiradores a mitad y al final de las páginas largas.
  - Cerrar las secciones con una invitación clara (“¿Qué puedes hacer ahora?”), no solo con definiciones.

---

## 4. Cohesión entre README y contenido web (Framing, Consistency, Authority)

### Hallazgos

- El `README.md` actual se enfoca en la **parte técnica del proyecto** (stack, scripts, estructura de carpetas), lo cual es excelente para desarrolladores.
- Falta puente claro entre:
  - El **proyecto técnico** (sitio Next.js moderno).
  - La **misión institucional** descrita en las referencias.

### Recomendaciones

- **Añadir al README una sección “Contexto e identidad del proyecto”**:
  - 1–2 párrafos que resuman la identidad institucional de CSH en lenguaje accesible.
  - Explicar que este repo implementa la plataforma web que materializa esa misión (framing: “este no es solo un sitio, es la infraestructura digital de la comunidad”).
- **Conectar con marketing psychology**:
  - Explicar de forma breve que el contenido y diseño se apoyan en principios de experiencia de usuario, psicología del aprendizaje y marketing ético para:
    - Aumentar claridad.
    - Facilitar el compromiso.
    - Potenciar la recurrencia.

---

## 5. Mensajes clave para la página principal (Influencing Behavior, Social Proof, Unity, Authority)

### Propuesta de bloques clave

- **Quiénes somos (Unity + Authority)**:
  - “Somos la comunidad de Ingeniería en Ciencias de la Computación de la UDB que convierte el aula en un laboratorio vivo de aprendizaje, organización y proyección profesional.”
- **Qué te ofrecemos (Jobs to Be Done)**:
  - Acompañamiento académico entre pares.
  - Espacios de organización y liderazgo estudiantil.
  - Puente hacia el mundo profesional y la industria.
- **Por qué confiar (Social Proof + Authority)**:
  - Mencionar:
    - Reconocimiento interno en el campus.
    - Número de estudiantes activos/actividades realizadas.
    - Vinculación con docentes, autoridades o empresas (según se vaya logrando).
- **Cómo empezar (Commitment & Consistency)**:
  - Hacer que el primer paso sea pequeño: suscribirse, unirse a un canal de comunicación, asistir a una primera actividad, explorar una guía de estudio.

---

## 6. Organización interna del contenido institucional (Theory of Constraints, 80/20)

### Hallazgos

- La documentación actual cubre muchos aspectos (metas por plazo, objetivos, valores, lemas).
- Para la web, no todo requiere el mismo nivel de detalle visible en primera capa.

### Recomendaciones

- **Aplicar 80/20 a la visibilidad**:
  - Priorizar en la web:
    - Quiénes somos.
    - Qué te ofrecemos.
    - Cómo participar.
  - Dejar el resto (estructura de gobernanza detallada, metas por plazos) en secciones de “documentación extendida” o blocs internos.
- **Reducir el cuello de botella psicológico (Theory of Constraints)**:
  - El mayor freno a la conversión no es la falta de información, sino el exceso de texto difícil de procesar.
  - Optimizar primero los textos que están en la homepage, secciones de entrada y página “Sobre CSH”.

---

## 7. Plan específico de mejora del README

**Acciones sugeridas**:

1. **Agregar una sección “Sobre el proyecto” al inicio o después del stack**:
   - Resumen de 4–6 líneas de qué es CSH y cómo este repo/web lo apoya.
2. **Enlazar a la identidad institucional web**:
   - Agregar links a las páginas dentro del sitio donde se explican misión, visión y valores (cuando estén implementadas).
3. **Conectar con la audiencia técnica**:
   - Explicar que el proyecto también sirve de plataforma para aprender buenas prácticas modernas de frontend (Next.js 16, React 19, Tailwind 4, etc.), lo que aporta valor añadido a estudiantes devs.
4. **Breve nota de filosofía**:
   - Una frase que traiga el lema “La disrupción provoca innovación” al README, conectándolo con decisiones técnicas y organizativas.

---

## 8. Próximos pasos accionables

1. Redactar versión resumida “web” de misión, visión y filosofía a partir de `Identidad-Institucional-CSH.md`.
2. Rediseñar los textos de homepage siguiendo AIDA y Jobs to Be Done.
3. Crear estructura de páginas: `Sobre CSH`, `Programas`, `Cómo participar`, `Valores y cultura`.
4. Reescribir `README.md` con una sección de contexto institucional y enlaces al contenido web.
5. Revisar todo el contenido para:
   - Párrafos más cortos.
   - Mayor uso de bullets.
   - Ejemplos concretos por cada valor o concepto.
6. Iterar con feedback de 3–5 estudiantes (test de comprensión rápida): preguntar qué entienden en 30 segundos y qué los motiva a quedarse.

