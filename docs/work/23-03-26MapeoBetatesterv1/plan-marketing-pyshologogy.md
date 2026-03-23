---
title: "Plan de optimización con marketing psychology sobre rutas y funcionalidades"
status: "draft"
owner: "@csh"
authors:
  - "@csh"
tracking:
  - app/
  - docs/work/23-03-26MapeoBetatesterv1/mapeo-rutas-funcionalidades.md
baseline_commit: "94376f6"
created: "2026-03-23T16:33:34Z"
last_reviewed: "2026-03-23T16:33:34Z"
---

# Plan de optimización con marketing psychology sobre rutas y funcionalidades

## Objetivo

Traducir el mapa funcional actual de la aplicación a un plan de mejoras de producto, UX y conversión usando principios de psicología del marketing aplicados de forma ética.

El objetivo no es "vender más" en un sentido comercial clásico, sino aumentar estos comportamientos clave dentro de la plataforma:

- que un visitante entienda rápido qué es CSH y por qué le sirve
- que un visitante pase a registro o login con menos fricción
- que un miembro complete onboarding y use más módulos del hub
- que la comunidad genere más interacción útil en ideas, mentorías, tutorías y eventos
- que el contenido público funcione como puerta de entrada recurrente al ecosistema

## Principios psicológicos priorizados

Se priorizan los modelos más útiles para esta aplicación:

| Modelo | Aplicación en CSH |
| --- | --- |
| Jobs to Be Done | Explicar qué trabajo concreto resuelve la plataforma para estudiantes y miembros. |
| Hick's Law | Reducir saturación de opciones en navegación, homepage y comunidad. |
| AIDA | Ordenar las páginas clave para llevar de atención a acción. |
| Authority Bias | Reforzar credibilidad institucional y académica. |
| Social Proof / Bandwagon | Mostrar actividad real de comunidad, miembros, eventos y sponsors. |
| Goal-Gradient Effect | Hacer visible el progreso en onboarding y participación. |
| Zeigarnik Effect | Mantener abiertos loops positivos para completar acciones iniciadas. |
| Commitment & Consistency | Conseguir microcompromisos antes de pedir acciones mayores. |
| BJ Fogg / COM-B | Diseñar conductas simples, posibles y accionables. |
| Loss Aversion | Comunicar el costo de no participar o no completar una acción valiosa. |
| Mere Exposure | Generar recordación con recorridos y puntos de retorno claros. |
| Paradox of Choice | Curar caminos recomendados en vez de mostrar demasiadas alternativas. |

## Diagnóstico general a partir del mapeo

La aplicación ya tiene buen alcance funcional, pero desde la psicología del comportamiento aparecen cuatro brechas principales:

1. La oferta de valor está distribuida en muchas rutas, pero no siempre priorizada en una secuencia clara.
2. El usuario puede explorar mucho contenido, pero no siempre recibe el siguiente paso más obvio.
3. Existen módulos potentes de comunidad, pero su valor no siempre está enmarcado con suficiente prueba social, urgencia o progreso.
4. La consola administrativa existe, pero falta pensar qué señales visibles desde el lado público aumentan confianza, recurrencia y participación.

## North Star y métricas sugeridas

### North Star propuesta

- `usuarios que completan onboarding y realizan una segunda acción relevante dentro de 7 días`

### Métricas secundarias

- CTR del hero principal en `/`
- porcentaje de paso de `/` a `/registro` o `/login`
- porcentaje de usuarios que completan `/onboarding`
- porcentaje de usuarios autenticados que visitan `/perfil` y luego una ruta de comunidad
- ratio de inscripción en `/eventos`
- ratio de creación o voto en `/comunidad/ideas`
- ratio de creación de solicitudes en `/comunidad/tutorias`
- recurrencia hacia `/noticias`, `/recursos` y `/oportunidades`

## Plan por etapa del funnel

### Etapa 1. Descubrimiento

Rutas clave:

- `/`
- `/nosotros`
- `/miembros`
- `/noticias`
- `/eventos`
- `/recursos`
- `/oportunidades`

Problema principal:

- Hay suficiente contenido y oferta, pero falta empaquetarlo de forma más directa alrededor de las necesidades concretas del usuario.

Recomendaciones:

- Reescribir el hero de `/` con un framing centrado en resultado, no solo en identidad.
- Reducir el número de CTAs principales en home a un CTA primario y un CTA secundario.
- Mostrar prueba social visible arriba del fold o muy cerca de él.
- Convertir `/nosotros` en una página de credibilidad y pertenencia, no solo explicativa.
- Usar `/noticias`, `/eventos`, `/recursos` y `/oportunidades` como puertas de entrada a registro o comunidad.

### Etapa 2. Activación

Rutas clave:

- `/login`
- `/registro`
- `/auth/callback`
- `/onboarding`

Problema principal:

- El usuario que ya mostró interés todavía puede abandonar si el registro o el onboarding se sienten como trabajo extra sin recompensa inmediata.

Recomendaciones:

- Reducir el esfuerzo percibido del registro con copy de bajo compromiso.
- Añadir señales de progreso más claras en onboarding.
- Explicar mejor qué desbloquea completar el perfil.
- Mantener un "siguiente paso recomendado" apenas termina el onboarding.

### Etapa 3. Engagement

Rutas clave:

- `/perfil`
- `/comunidad`
- `/comunidad/ideas`
- `/comunidad/tutorias`
- `/comunidad/mentores`
- `/comunidad/beneficios`

Problema principal:

- La app ofrece acciones valiosas, pero no siempre las organiza como una secuencia natural de participación.

Recomendaciones:

- Transformar `/perfil` en un hub de progreso y próxima acción.
- Destacar avances, acciones pendientes y beneficios por participar.
- Añadir nudges sociales dentro de ideas, mentorías y tutorías.
- Conectar mejor los módulos entre sí para crear un flywheel comunitario.

### Etapa 4. Retención

Rutas clave:

- `/noticias/[slug]`
- `/eventos`
- `/recursos`
- `/oportunidades`
- `/comunidad/podcast`
- `/comunidad/documentacion`
- `/comunidad/investigacion`

Problema principal:

- Existen muchos activos de valor, pero hace falta enlazarlos mejor para fomentar visitas repetidas.

Recomendaciones:

- Implementar más enlaces contextuales de "siguiente mejor acción".
- Usar series, colecciones y agrupaciones temáticas.
- Diseñar loops de retorno: nuevo evento, nuevo recurso, nueva noticia, nueva oportunidad.

## Recomendaciones concretas por ruta

### 1. Home `/`

Modelos aplicados:

- Jobs to Be Done
- AIDA
- Hick's Law
- Social Proof
- Authority Bias

Cambios recomendados:

- Reescribir el mensaje principal para responder en menos de 5 segundos:
  - qué es CSH
  - para quién es
  - qué gana el usuario si participa
- Dejar un CTA principal:
  - `Unirme a la comunidad`
- Dejar un CTA secundario:
  - `Explorar recursos`
- Añadir bloque de prueba social con métricas reales o semireales verificables:
  - miembros activos
  - eventos publicados
  - recursos disponibles
  - aliados o sponsors
- Añadir una sección "elige tu camino" con tres rutas máximas:
  - aprender
  - participar
  - crecer profesionalmente

Modificaciones sugeridas:

- Ajustar copy del hero.
- Reducir dispersión de enlaces iniciales.
- Subir visibilidad de sponsors, actividad y comunidad.

Hipótesis:

- Si la home presenta una promesa más concreta y menos opciones simultáneas, aumentará el paso a registro, login y exploración profunda.

### 2. Nosotros `/nosotros`

Modelos aplicados:

- Authority Bias
- Unity Principle
- Liking
- Pratfall Effect

Cambios recomendados:

- Reenfocar la página a "por qué confiar" y "por qué pertenecer".
- Mostrar narrativa institucional con una estructura más persuasiva:
  - origen
  - propósito
  - cómo trabajamos
  - impacto esperado
- Incluir una pequeña limitación honesta del proyecto y cómo se está resolviendo.
- Añadir CTA contextual hacia registro o exploración de comunidad.

Hipótesis:

- Si `/nosotros` refuerza autoridad y pertenencia, mejorará la confianza antes de registrarse o unirse a módulos comunitarios.

### 3. Login `/login` y Registro `/registro`

Modelos aplicados:

- Activation Energy
- BJ Fogg
- Commitment & Consistency
- Status-Quo Bias

Cambios recomendados:

- Simplificar copy de acceso:
  - explicar en una línea qué se desbloquea al tener cuenta
- Añadir beneficios visibles del registro:
  - inscribirte a eventos
  - participar en ideas
  - pedir tutorías
  - conectar con mentores
- Reducir ansiedad con microcopy:
  - `Te toma menos de un minuto`
  - `Luego podrás completar tu perfil paso a paso`
- Mostrar redirección post-login más explícita cuando el usuario viene de una intención concreta.

Hipótesis:

- Si el registro explica valor inmediato y reduce el costo mental inicial, subirá la tasa de creación de cuenta.

### 4. Onboarding `/onboarding`

Modelos aplicados:

- Goal-Gradient Effect
- Zeigarnik Effect
- IKEA Effect
- COM-B

Cambios recomendados:

- Mostrar progreso explícito y recompensa al final.
- Dividir el proceso en pasos pequeños con mensajes de avance.
- Explicar para qué sirve cada dato pedido.
- Añadir vista final con "ya puedes hacer esto ahora":
  - completar perfil
  - pedir tutoría
  - explorar mentores
  - votar ideas

Modificaciones sugeridas:

- Barra de progreso o pasos numerados.
- Mensajes tipo `Ya casi terminas`.
- Pantalla de cierre con CTA a la siguiente mejor acción.

Hipótesis:

- Si el onboarding hace visible el progreso y el beneficio de completarlo, aumentará la finalización y la activación posterior.

### 5. Perfil `/perfil`

Modelos aplicados:

- Goal-Gradient
- Commitment & Consistency
- Endowment Effect
- Zeigarnik Effect

Cambios recomendados:

- Convertir el perfil en tablero de progreso personal.
- Mostrar porcentaje de perfil completado si aún no existe.
- Mostrar acciones sugeridas según estado del usuario:
  - completa tu bio
  - conéctate con un mentor
  - inscríbete a un evento
  - publica una idea
- Reforzar la sensación de pertenencia con señales de actividad y logros.

Hipótesis:

- Si el perfil deja de ser solo informativo y se vuelve un centro de avance personal, aumentará el uso repetido del hub.

### 6. Comunidad `/comunidad`

Modelos aplicados:

- Paradox of Choice
- Nudge Theory
- Flywheel Effect
- Unity Principle

Cambios recomendados:

- Reordenar la página para priorizar tres módulos más importantes y dejar los demás como secundarios.
- Añadir explicación breve de qué gana el usuario en cada módulo.
- Mostrar actividad reciente o highlights para inducir entrada.
- Recomendar una acción distinta según si el usuario está autenticado o no.

Hipótesis:

- Si `/comunidad` se comporta como una puerta guiada y no como índice plano, aumentará el clic hacia submódulos clave.

### 7. Ideas `/comunidad/ideas`

Modelos aplicados:

- Social Proof
- Bandwagon
- Commitment & Consistency
- Loss Aversion

Cambios recomendados:

- Destacar ideas más votadas y más recientes con etiquetas claras.
- Mostrar quiénes ya apoyaron una idea cuando sea posible.
- Usar copy que enmarque el costo de no participar:
  - `Si no proponemos mejoras, la comunidad evoluciona más lento`
- Reforzar CTA de aportar o votar con mensajes de impacto comunitario.

Hipótesis:

- Si el módulo muestra mejor la validación social y el impacto de participar, crecerán votos y nuevas ideas.

### 8. Tutorías `/comunidad/tutorias`

Modelos aplicados:

- Regret Aversion
- Activation Energy
- BJ Fogg
- Reciprocity

Cambios recomendados:

- Explicar que pedir ayuda es una acción válida y de bajo costo.
- Simplificar al máximo el formulario inicial.
- Añadir ejemplos de temas que sí se pueden pedir.
- Enfatizar beneficio inmediato:
  - salir del bloqueo académico
  - recibir orientación más rápido

Hipótesis:

- Si la tutoría se presenta como ayuda simple, segura y accionable, aumentarán las solicitudes iniciadas.

### 9. Mentores `/comunidad/mentores`

Modelos aplicados:

- Authority Bias
- Similarity Bias
- Unity Principle
- Social Proof

Cambios recomendados:

- Enfatizar afinidad:
  - mentores de tu misma área
  - temas donde pueden ayudarte
- Mostrar señales de legitimidad:
  - áreas
  - disponibilidad
  - experiencia breve
- Añadir CTA claro tanto para buscar mentoría como para registrarse como mentor.

Hipótesis:

- Si el matching se comunica con cercanía y autoridad, aumentará tanto el interés por buscar mentor como por ofrecerse.

### 10. Beneficios `/comunidad/beneficios`

Modelos aplicados:

- Loss Aversion
- Zero-Price Effect
- Social Proof

Cambios recomendados:

- Hacer más tangible qué se gana al pertenecer.
- Ordenar beneficios por valor percibido inmediato.
- Añadir mensajes tipo:
  - `Esto ya está disponible para miembros`
  - `Activa tu perfil para acceder`
- Mostrar sponsors o aliados como validadores externos.

Hipótesis:

- Si los beneficios se presentan como concretos, cercanos y disponibles, mejorará la conversión desde usuario visitante a usuario registrado.

### 11. Eventos `/eventos`

Modelos aplicados:

- Scarcity
- Social Proof
- Timely prompts
- Loss Aversion

Cambios recomendados:

- Destacar próximo evento con mayor visibilidad.
- Añadir señales temporales:
  - pronto
  - esta semana
  - cupos limitados, solo si es real
- Mostrar quién debería asistir y qué gana.
- Reforzar inscripción con CTA contextual y beneficios concretos.

Hipótesis:

- Si el evento se presenta con urgencia real y valor específico, subirá la tasa de inscripción.

### 12. Recursos `/recursos` y Oportunidades `/oportunidades`

Modelos aplicados:

- Hick's Law
- Paradox of Choice
- Anchoring
- Mere Exposure

Cambios recomendados:

- Curar contenido destacado antes de mostrar todo el catálogo.
- Agrupar por objetivos claros y no solo por taxonomía interna.
- Añadir etiquetas tipo:
  - recomendado para empezar
  - alta demanda
  - oportunidad destacada
- Incluir CTA de guardado, seguimiento o siguiente paso si luego se implementa.

Hipótesis:

- Si el usuario ve primero una selección guiada y no un inventario plano, aumentará el consumo de contenido útil.

### 13. Noticias `/noticias` y `/noticias/[slug]`

Modelos aplicados:

- Mere Exposure
- Authority
- Zeigarnik
- Rule of 7

Cambios recomendados:

- Usar noticias como mecanismo de retorno y credibilidad.
- Añadir al final del detalle de noticia:
  - noticia relacionada
  - evento relacionado
  - recurso relacionado
  - CTA a comunidad o registro
- Potenciar bloques de continuidad:
  - `Sigue explorando`
  - `Esto también te puede interesar`

Hipótesis:

- Si cada noticia empuja a una siguiente acción relevante, aumentará la profundidad de sesión y la recurrencia.

### 14. Feedback `/feedback`

Modelos aplicados:

- Reciprocity
- Commitment & Consistency
- Pratfall Effect

Cambios recomendados:

- Enmarcar el feedback como cocreación del proyecto.
- Explicar que CSH sigue mejorando con aportes reales.
- Añadir mensaje final que invite a otra acción:
  - registrarte
  - explorar comunidad
  - ver próximos eventos

Hipótesis:

- Si dar feedback se siente como una contribución significativa y no como un formulario aislado, aumentará la participación cualitativa.

## Prioridades de implementación

### Prioridad alta

- optimizar copy y CTAs de `/`
- mejorar propuesta de valor en `/login` y `/registro`
- rediseñar la experiencia de `/onboarding` con progreso visible
- convertir `/perfil` en hub de progreso y siguiente acción
- reforzar `/eventos` con valor específico y urgencia real

### Prioridad media

- reordenar `/comunidad`
- fortalecer `/comunidad/ideas`, `/comunidad/tutorias` y `/comunidad/mentores`
- conectar mejor `/noticias/[slug]` con acciones siguientes
- curar mejor `/recursos` y `/oportunidades`

### Prioridad baja

- mejorar framing de `/feedback`
- fortalecer `/nosotros` como página de autoridad y pertenencia
- añadir más loops de retorno en podcast, documentación e investigación

## Plan de implementación por sprints

### Sprint 1. Claridad y activación

- redefinir copy y CTA principal de `/`
- añadir bloque de prueba social en home
- mejorar beneficios visibles en `/login` y `/registro`
- añadir progreso y cierre accionable a `/onboarding`

Resultado esperado:

- más usuarios pasando de visita a cuenta creada y onboarding completado

### Sprint 2. Engagement y comunidad

- convertir `/perfil` en panel de progreso
- reordenar `/comunidad`
- mejorar nudges en ideas, tutorías y mentores
- reforzar beneficios y conexión entre módulos

Resultado esperado:

- más acciones posteriores al onboarding y mayor uso de comunidad

### Sprint 3. Retención y loops de retorno

- mejorar enlaces contextuales entre noticias, eventos, recursos y oportunidades
- destacar contenido recomendado o siguiente paso
- reforzar retornos con series, relacionados y highlights

Resultado esperado:

- mayor profundidad de sesión y más visitas repetidas

## Experimentos recomendados

### Experimento 1

- Variable: hero actual vs hero centrado en resultado
- Medida: CTR al CTA principal

### Experimento 2

- Variable: onboarding sin progreso vs onboarding con progreso visible
- Medida: tasa de finalización

### Experimento 3

- Variable: eventos con copy descriptivo vs eventos con valor + urgencia
- Medida: tasa de inscripción

### Experimento 4

- Variable: comunidad como índice vs comunidad con rutas recomendadas
- Medida: clic hacia ideas, tutorías y mentores

## Checklist de ejecución

- [ ] redefinir propuesta de valor principal de la home
- [ ] definir CTA primario y secundario por ruta clave
- [ ] añadir prueba social verificable en home y páginas de confianza
- [ ] mejorar microcopy de login y registro
- [ ] rediseñar onboarding con progreso y cierre útil
- [ ] introducir recomendaciones personalizadas en perfil
- [ ] priorizar módulos en comunidad
- [ ] reforzar señales sociales en ideas, mentores y beneficios
- [ ] optimizar framing de eventos, recursos, oportunidades y noticias
- [ ] definir métricas y eventos a medir

## Criterios de aceptación del plan

- existe una secuencia más clara entre descubrimiento, activación y engagement
- cada ruta principal tiene un CTA dominante y un siguiente paso explícito
- el onboarding comunica progreso y beneficio
- el perfil muestra estado, avance y acciones recomendadas
- comunidad deja de sentirse como listado plano y pasa a ser un hub guiado
- noticias, recursos, eventos y oportunidades generan más navegación cruzada
- las mejoras pueden medirse con métricas concretas

## Referencias base

- `docs/work/23-03-26MapeoBetatesterv1/mapeo-rutas-funcionalidades.md`
- `.cursor/skills/marketing-psychology/SKILL.md`
- `app/`

## Impacto esperado

Si se implementa este plan, la aplicación debería comunicar mejor su valor, reducir fricción en los puntos de entrada, activar más usuarios nuevos y convertir los módulos comunitarios en un sistema de participación más visible, más guiado y más recurrente.
