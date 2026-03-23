---
title: "Plan de nuevas encuestas para betatesters"
status: "draft"
owner: "@csh"
authors:
  - "@csh"
tracking:
  - app/
  - docs/work/15-03-26MarketingBeforeSprint1/16-03-26SprintPlanning/planes/encuesta-betatesters.md
  - docs/work/15-03-26MarketingBeforeSprint1/16-03-26SprintPlanning/respuestas_betatesters_rows (1).csv
  - docs/work/23-03-26MapeoBetatesterv1/mapeo-rutas-funcionalidades.md
baseline_commit: "94376f6"
created: "2026-03-23T16:42:38Z"
last_reviewed: "2026-03-23T16:42:38Z"
---

# Evaluacion UX de la encuesta y plan de refinamiento

## Objetivo

Refinar la estrategia de encuestas para que cada respuesta sea util para decision de producto, UX y contenido, separando:

- `Encuesta A`: usuarios nuevos (primera visita)
- `Encuesta B`: usuarios recurrentes (ya evaluaron una ronda previa)

## Contexto y hallazgos base

Base revisada:

- encuesta previa de betatesters
- resultados del CSV (`12` respuestas)
- mapeo funcional actual de la aplicacion (`/`, `/login`, `/registro`, `/onboarding`, `/perfil`, `/comunidad`, `/eventos`, `/recursos`, `/oportunidades`, `/noticias`)

Hallazgos sintetizados:

- percepcion general positiva de claridad inicial y diseno
- fricciones repetidas: contenido largo/repetitivo en home, ruta sugerida mejorable, comentarios puntuales de mobile/responsive
- vacio de medicion en flujos de activacion y engagement reales

## Auditoria UX de la encuesta actual (pregunta por pregunta)

### Hallazgos de calidad metodologica

- **Fortaleza**: buena separacion por segmento (nuevo vs recurrente).
- **Riesgo**: algunas preguntas mezclan percepcion y comportamiento.
- **Riesgo**: escalas no estandarizadas dificultan comparar rondas.
- **Riesgo**: faltan compuertas condicionales, lo que introduce ruido.
- **Riesgo**: varias preguntas son descriptivas, pero no accionables para priorizar backlog.

### Criterio de evaluacion aplicado

Se audita cada bloque con enfoque UX senior:

- claridad de redaccion
- ausencia de sesgo o ambiguedad
- trazabilidad a ruta/modulo
- capacidad de derivar accion concreta
- comparabilidad entre rondas

## Estandar de escalas y compuertas (normalizacion)

### Escalas recomendadas

Usar estas escalas base en toda la bateria:

- **Likert 5 puntos (calidad percibida)**:
  - Muy facil / Facil / Neutral / Dificil / Muy dificil
- **Likert 5 puntos (claridad/confianza/intencion)**:
  - Muy alta / Alta / Media / Baja / Muy baja
- **Resultado de tarea (binaria o ternaria)**:
  - Completado / Parcial / No completado
- **Pregunta de causa principal (seleccion unica)**:
  - para identificar bloqueo dominante
- **Pregunta abierta corta (1 linea)**:
  - solo al cierre de cada bloque para contexto cualitativo

### Compuertas condicionales obligatorias

- Si no probo una ruta/modulo, saltar preguntas de detalle de ese modulo.
- Si no creo cuenta, no evaluar onboarding/perfil en profundidad.
- Si no entro a comunidad, no evaluar acciones de ideas/tutorias/mentores.

## Estructura refinada de encuesta A (usuarios nuevos)

Duracion objetivo: 5-7 minutos.

### Bloque A1. Perfil y contexto

1. Rol principal.
2. Dispositivo principal.
3. Familiaridad previa con CSH.

### Bloque A2. Descubrimiento (`/`)

4. En 15 segundos, que entiendes que ofrece CSH? (abierta corta)
5. Claridad de propuesta de valor en home (Likert 5).
6. Claridad del siguiente paso a realizar (Likert 5).
7. Cual fue tu siguiente accion natural? (seleccion unica)
8. La ruta sugerida fue visible y util? (Likert 5 + abierta corta)

### Bloque A3. Relevancia del contenido publico

9. Que ruta publica visitaste primero? (`/eventos`, `/recursos`, `/oportunidades`, `/noticias`, `/nosotros`)
10. Utilidad percibida de la ruta visitada (Likert 5).
11. Confianza que te genero esa ruta para seguir explorando (Likert 5).
12. Que te falto para confiar mas? (abierta corta)

### Bloque A4. Intencion de activacion

13. Probabilidad de registro (Likert 5).
14. Principal barrera para crear cuenta (seleccion unica).
15. Beneficio que mas te motivaria a registrarte hoy (seleccion unica).
16. Si mejoraramos 1 cosa para nuevos, cual seria? (abierta corta)

## Estructura refinada de encuesta B (usuarios recurrentes)

Duracion objetivo: 7-10 minutos.

### Bloque B1. Comparacion antes vs ahora

1. Percepcion global respecto a ronda anterior (Mucho mejor -> Mucho peor).
2. Dimension mas mejorada (seleccion unica).
3. Principal aspecto pendiente (abierta corta).

### Bloque B2. Activacion (`/login`, `/registro`, `/onboarding`, `/perfil`)

4. Probaste login/registro esta ronda? (Si/No)
5. [Si] Facilidad de acceso (Likert 5).
6. [Si] Resultado de acceso (Completado/Parcial/No).
7. Probaste onboarding? (Si/No)
8. [Si] Claridad del progreso en onboarding (Likert 5).
9. [Si] Principal friccion en onboarding/perfil (seleccion unica + abierta corta).

### Bloque B3. Engagement en comunidad

10. Entraste a `/comunidad` esta ronda? (Si/No)
11. [Si] Modulo principal usado (`ideas`, `tutorias`, `mentores`, `beneficios`).
12. [Si] Accion concreta completada (crear/votar/solicitar/revisar/ninguna).
13. [Si] Claridad de "que hacer despues" (Likert 5).
14. [Si] Principal bloqueo para usar mas comunidad (seleccion unica).

### Bloque B4. Contenido y retorno

15. Que rutas de contenido visitaste (`/eventos`, `/recursos`, `/oportunidades`, `/noticias`)?
16. Cual te motivo mas a volver? (seleccion unica)
17. Hiciste una accion concreta de valor? (inscribirse, guardar, compartir, etc.)
18. Probabilidad de volver semanalmente (Likert 5).

### Bloque B5. Priorizacion de mejoras

19. Selecciona maximo 3 mejoras prioritarias para el siguiente sprint.
20. Si fueras Product Owner por una semana, que cambiarias primero y por que? (abierta corta)

## Banco final de preguntas listo para uso

### Encuesta A (lista operativa)

1. Rol principal.
2. Dispositivo principal.
3. Familiaridad previa con CSH.
4. En una frase: que ofrece CSH?
5. Claridad de propuesta de valor en home (1-5).
6. Claridad del siguiente paso (1-5).
7. Siguiente accion natural tras home.
8. Utilidad de ruta sugerida (1-5).
9. Primera ruta publica visitada.
10. Utilidad percibida de esa ruta (1-5).
11. Confianza para seguir explorando (1-5).
12. Principal barrera para registrarte hoy.
13. Probabilidad de registro (1-5).
14. Beneficio que mas te motiva a registrarte.
15. Una mejora clave para nuevos usuarios.

### Encuesta B (lista operativa)

1. Comparacion global vs ronda anterior.
2. Aspecto que mas mejoro.
3. Aspecto mas pendiente.
4. Probo login/registro (Si/No).
5. [Si] Facilidad de acceso (1-5).
6. [Si] Resultado de acceso.
7. Probo onboarding (Si/No).
8. [Si] Claridad de progreso en onboarding (1-5).
9. [Si] Friccion principal onboarding/perfil.
10. Entro a comunidad (Si/No).
11. [Si] Modulo mas usado.
12. [Si] Accion concreta completada.
13. [Si] Claridad de siguiente paso en comunidad (1-5).
14. Rutas de contenido visitadas.
15. Ruta que mas motiva retorno.
16. Probabilidad de volver semanalmente (1-5).
17. Top 3 mejoras prioritarias.
18. Cambio numero 1 recomendado como PO.

## Guia de interpretacion UX para toma de decisiones

### Mapeo pregunta -> metrica -> decision

- **Claridad home (A5)** -> `% 4-5` -> si <70%, iterar copy/jerarquia hero.
- **Siguiente paso claro (A6)** -> `% 4-5` -> si <65%, redisenar CTA principal y ruta sugerida.
- **Probabilidad de registro (A13)** -> promedio -> si <3.8/5, trabajar propuesta de valor y friccion de activacion.
- **Resultado de acceso (B6)** -> `% completado` -> si <85%, auditar flujo login/registro.
- **Claridad onboarding (B8)** -> `% 4-5` -> si <70%, mejorar feedback/progreso.
- **Accion comunidad completada (B12)** -> `% con accion` -> si <50%, simplificar CTAs y arquitectura de comunidad.
- **Retorno semanal (B16)** -> promedio -> si <3.5/5, mejorar loops de contenido y valor recurrente.

### Semaforo de severidad

- **Verde**: KPI >= objetivo.
- **Amarillo**: KPI hasta 10 puntos por debajo del objetivo.
- **Rojo**: KPI >10 puntos por debajo del objetivo o bloqueo recurrente cualitativo.

### Regla de priorizacion del backlog

1. Atender primero bloqueos rojos de activacion (`/login`, `/registro`, `/onboarding`).
2. Luego bloqueos rojos de engagement (`/perfil`, `/comunidad`).
3. Luego optimizacion de retorno (`/eventos`, `/recursos`, `/oportunidades`, `/noticias`).

## Recomendaciones de aplicacion en campo

- Encuesta A: aplicar tras primera sesion exploratoria sin login forzado.
- Encuesta B: aplicar tras set de tareas guiadas (acceso, onboarding, comunidad, contenido).
- Muestra sugerida:
  - A: 20-30 respuestas.
  - B: 12-20 respuestas de panel recurrente.
- Distribucion ideal de preguntas:
  - 75% cerradas comparables.
  - 25% abiertas accionables.

## Entrega de resultados esperada (despues de aplicar encuestas)

- resumen ejecutivo de 1 pagina
- tabla de hallazgos por severidad
- lista priorizada de acciones UX/producto
- comparativo before/after contra la ronda previa

## Resultado esperado del refinamiento

Este refinamiento convierte la encuesta en un instrumento mas robusto para:

- medir experiencia real por flujo, no solo percepcion general
- comparar rondas de forma consistente
- traducir resultados en decisiones concretas de roadmap
