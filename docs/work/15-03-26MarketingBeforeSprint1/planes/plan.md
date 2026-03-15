## Plan de mejora con psicología del marketing

Este plan aplica modelos de la skill `marketing-psychology` al proyecto **Computer Science Hub – Web** para aumentar claridad de propuesta de valor, relevancia percibida y conversión a acciones clave (suscripción, exploración de contenido, contacto).

- **Objetivo principal**: convertir el sitio en la referencia clara y memorable para aprender/comprender ciencias de la computación (North Star: visitas que llegan a contenido profundo y vuelven al menos 2 veces por semana).
- **Comportamiento a influir**: que un visitante nuevo pase de “echar un vistazo rápido” a “guardar el sitio, suscribirse y volver de forma recurrente”.

---

## 1. Propuesta de valor y mensaje principal (First Principles, Jobs to Be Done, Framing)

**Problema**: El README indica que es un “sitio web de referencia”, pero en la experiencia real del usuario final necesitamos que la homepage responda de inmediato:

- ¿Quién eres / qué es Computer Science Hub?
- ¿Qué trabajo concreto le resuelves al visitante (Jobs to Be Done)?
- ¿Qué hace que este sitio sea distinto de otros recursos de programación?

**Acciones propuestas**:

- **Clarificar el “job to be done” principal**:
  - Definir 1–2 trabajos clave: p. ej. “Convertirte en desarrollador sólido de base científica” o “Conectar teoría de CS con proyectos prácticos modernos”.
  - Redactar un titular con enfoque en resultado: “Aprende ciencias de la computación aplicadas al mundo real, sin perder el rigor técnico”.
- **Aplicar Framing & Anchoring**:
  - Comparar explícitamente con alternativas: “Mejor que tutoriales sueltos: rutas guiadas, explicaciones profundas y ejemplos con stack moderno (Next.js, React 19, etc.)”.
  - Anclar la percepción de calidad mostrando la sofisticación del stack y el enfoque sistemático (procesos en `docs/`).

---

## 2. Arquitectura de contenido y navegación (Hick’s Law, AIDA, Paradox of Choice)

**Problema**: Un sitio de referencia puede volverse caótico si el usuario se enfrenta de golpe a demasiadas rutas, categorías o tipos de contenido.

**Acciones propuestas**:

- **Diseñar la homepage como un funnel AIDA**:
  - **Attention**: héroe claro con promesa fuerte y visual limpio.
  - **Interest**: 2–3 bloques que muestren tipos de contenido (guías, referencias, labs/proyectos).
  - **Desire**: testimonios o “razones para confiar” (ver sección de social proof).
  - **Action**: 1 CTA principal (p. ej. “Explorar roadmap de aprendizaje” o “Ver guía de fundamentos”).
- **Reducir fricción cognitiva (Hick’s Law)**:
  - Limitar opciones principales del menú (3–5 ítems máximo).
  - Usar sub-navegación dentro de secciones profundas en vez de poner todo en la barra superior.
- **Evitar Paradox of Choice**:
  - Curar “rutas recomendadas”: principiante, intermedio, avanzado.
  - Para cada ruta, mostrar un recorrido lineal en vez de una lista plana interminable.

---

## 3. Percepción de autoridad y confianza (Authority, Social Proof, Pratfall Effect)

**Problema**: Un nuevo visitante no sabe todavía si debe confiar en Computer Science Hub frente a otros sitios / cursos.

**Acciones propuestas**:

- **Authority**:
  - Página “Sobre el proyecto” que explique background, experiencia y por qué se creó la plataforma (Authority + Unity).
  - Mostrar credenciales relevantes (años de experiencia, proyectos, contribuciones open source, comunidad, etc.).
- **Social Proof**:
  - Añadir métricas sociales: “+X artículos”, “+Y estudiantes/comunidad”, visitas mensuales, newsletter, etc.
  - Integrar testimonios cortos de usuarios, o al inicio usar “testimonios aspiracionales” (“Este tipo de plataforma existe porque…”).
- **Pratfall Effect**:
  - Reconocer abiertamente una limitación real (ej. “No cubrimos todavía X tema, pero…”), lo que hace más creíble el resto del mensaje.

---

## 4. Engagement y recurrencia (Mere Exposure, Rule of 7, Goal-Gradient, Zeigarnik Effect)

**Problema**: La mayoría de la gente no se convierte en “usuario fiel” en la primera visita; hace falta exposición repetida y sensación de progreso.

**Acciones propuestas**:

- **Newsletter / lista de correo o notificaciones**:
  - CTA claro para “Recibir nuevas guías y rutas” (Reciprocity + Mere Exposure + Rule of 7).
- **Progreso visible (Goal-Gradient)**:
  - Implementar barras de progreso o checklists en rutas de estudio (“Has completado 3/10 módulos de Fundamentos”).
  - Mostrar “paso siguiente recomendado” al final de cada artículo.
- **Uso de Zeigarnik Effect**:
  - Dejar “loops abiertos” positivos: pequeñas series de artículos que se anuncian en el primero (“Parte 1 de 3”).
  - Recordatorios (email o dentro del sitio) de rutas incompletas.

---

## 5. Estructura de pricing / monetización futura (si aplica) (Anchoring, Loss Aversion, Good-Better-Best)

Aunque el repo actual no muestra planes de monetización explícita, es útil preparar la psicología para posibles productos (cursos, membresía, etc.).

**Acciones propuestas**:

- **Definir desde ahora una arquitectura de valor**:
  - Contenido abierto (blog, referencias) como capa de exposición (Mere Exposure, Reciprocity).
  - Productos estructurados (roadmaps premium, cohortes, mentoring) como capa de monetización.
- **Aplicar Good-Better-Best y Anchoring**:
  - En el futuro, diseñar 3 niveles de oferta (ej. Básico / Pro / Mentoría).
  - Anclar con un plan alto bien descrito para que el intermedio parezca razonable.
- **Loss Aversion**:
  - Mensajería tipo “No pierdas meses saltando entre recursos inconexos; sigue una ruta probada”.

---

## 6. Experiencia de onboarding y primera sesión (BJ Fogg, Activation Energy, COM-B, Status-Quo Bias)

**Problema**: Cambiar el hábito del usuario (de no tener una referencia clara a usar Computer Science Hub) choca con Status-Quo Bias.

**Acciones propuestas**:

- **Reducir Activation Energy**:
  - Página de inicio que ofrezca 1–2 caminos ultra sencillos: “Responde 3 preguntas y te damos un plan de estudio personalizado”.
- **Aplicar BJ Fogg y COM-B**:
  - **Capabilidad (Capability)**: explicar términos complejos con ejemplos y visuales.
  - **Oportunidad (Opportunity)**: navegación clara, sin fricción técnica (velocidad, mobile-friendly).
  - **Motivación (Motivation)**: mostrar beneficios tangibles (empleo, claridad conceptual, proyectos reales).
- **Status-Quo Bias**:
  - Destacar que el esfuerzo inicial es bajo (“Empieza con una guía de 10 minutos”) y el retorno alto.

---

## 7. Branding, narrativa y comunidad (Unity, Liking, Mimetic Desire)

**Problema**: En un espacio saturado, la identidad del proyecto debe resonar con una tribu específica.

**Acciones propuestas**:

- **Unity & Liking**:
  - Posicionar el proyecto como “hecho por y para desarrolladores que aman entender el porqué de las cosas, no solo copiar código”.
  - Usar un tono cercano pero experto, con ejemplos de la vida real.
- **Mimetic Desire**:
  - Mostrar el tipo de persona que usa el sitio: estudiantes ambiciosos, devs autodidactas que quieren nivel senior, etc.
  - Destacar historias tipo “Antes / Después” de usuarios que ordenaron su aprendizaje gracias al sitio.

---

## 8. Métricas y experimentación (Theory of Constraints, 80/20, AB Testing)

**Problema**: Sin métricas claras, es difícil saber qué cambios psicológicos realmente funcionan.

**Acciones propuestas**:

- **Definir North Star Metric y métricas auxiliares**:
  - North Star: nº de usuarios que completan una ruta base de aprendizaje en X días.
  - Auxiliares: CTR de CTAs clave, tiempo de lectura, repetición de visitas, suscripciones.
- **Aplicar Pareto (80/20)**:
  - Identificar qué 20% de páginas traen la mayor parte del tráfico y empezar la optimización psicológica por ahí.
- **Ciclo de mejora continua**:
  - Plantear pequeños experimentos (cambio de framing en titulares, social proof diferente, CTAs más claros) y medir.

---

## 9. Próximos pasos concretos

1. Definir y redactar una propuesta de valor central basada en Jobs to Be Done.
2. Rediseñar la estructura de la homepage siguiendo AIDA y reduciendo opciones (Hick’s Law).
3. Añadir secciones básicas de autoridad y social proof (Sobre, métricas, testimonios iniciales).
4. Diseñar 1 ruta de aprendizaje prioritaria con progreso visible.
5. Implementar al menos un mecanismo de recurrencia (newsletter o similar).
6. Definir métricas clave y empezar a registrar datos (aunque sea de forma manual al principio).

