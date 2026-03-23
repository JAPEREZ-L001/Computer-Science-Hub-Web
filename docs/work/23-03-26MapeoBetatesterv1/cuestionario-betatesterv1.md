---
title: "Cuestionario betatester v1"
status: "draft"
owner: "@csh"
authors:
  - "@csh"
tracking:
  - app/
  - docs/work/23-03-26MapeoBetatesterv1/plan-nuevas-encuestas-betatesters.md
baseline_commit: "94376f6"
created: "2026-03-23T16:54:52Z"
last_reviewed: "2026-03-23T16:54:52Z"
---

# Cuestionario betatester v1

Este documento contiene el cuestionario operativo para la siguiente ronda de betatesting.

Incluye dos versiones:

- Encuesta A: usuarios nuevos
- Encuesta B: usuarios recurrentes (ya participaron en rondas previas)

## Instrucciones de aplicacion

- Tiempo recomendado Encuesta A: 5 a 7 minutos.
- Tiempo recomendado Encuesta B: 7 a 10 minutos.
- Usar logica condicional: si la persona no probo un flujo, omitir preguntas de detalle de ese flujo.
- Escala sugerida para preguntas 1-5:
  - 1 Muy baja / Muy dificil
  - 2 Baja / Dificil
  - 3 Media / Neutral
  - 4 Alta / Facil
  - 5 Muy alta / Muy facil

## Encuesta A - Usuarios nuevos

### Bloque A1 - Perfil y contexto

1. Rol principal:
   - Estudiante de computacion
   - Profesional tecnico
   - Perfil no tecnico
   - Otro
2. Dispositivo principal:
   - Laptop/Desktop
   - Telefono
   - Tablet
3. Familiaridad previa con CSH:
   - No lo conocia
   - Solo de nombre
   - Conocimiento general
   - Conocimiento alto

### Bloque A2 - Descubrimiento (Home `/`)

4. En una frase, que entendiste que ofrece CSH?
5. Claridad de la propuesta de valor en la home (1-5).
6. Claridad del siguiente paso despues de ver la home (1-5).
7. Cual fue tu siguiente accion natural?
   - Registrarme / iniciar sesion
   - Ver recursos
   - Ver eventos
   - Explorar comunidad
   - No supe que hacer
8. Que tan visible y util fue la ruta sugerida? (1-5)
9. Si la ruta sugerida no fue clara, que la haria mas util?

### Bloque A3 - Relevancia de contenido publico

10. Cual ruta publica visitaste primero?
    - `/eventos`
    - `/recursos`
    - `/oportunidades`
    - `/noticias`
    - `/nosotros`
11. Utilidad percibida de esa ruta (1-5).
12. Confianza que te genero para seguir explorando (1-5).
13. Que te falto para confiar mas en la plataforma?

### Bloque A4 - Activacion

14. Probabilidad de crear cuenta hoy (1-5).
15. Principal barrera para registrarte:
    - No vi valor suficiente
    - No entendi beneficios
    - No tengo tiempo ahora
    - Desconfianza
    - Otro
16. Beneficio que mas te motivaria a registrarte:
    - Tutorias
    - Mentorias
    - Eventos
    - Recursos curados
    - Networking/comunidad
    - Otro
17. Si solo pudieramos mejorar 1 cosa para usuarios nuevos, cual seria?

## Encuesta B - Usuarios recurrentes

### Bloque B1 - Comparacion antes vs ahora

1. Comparando con la ronda anterior, la experiencia actual te parece:
   - Mucho mejor
   - Mejor
   - Igual
   - Peor
2. Que mejoro mas?
   - Claridad del mensaje
   - Navegacion
   - Diseno visual
   - Rendimiento/responsive
   - No note cambios relevantes
3. Que sigue pendiente o igual?

### Bloque B2 - Cuenta y activacion

4. Probaste login/registro en esta ronda?
   - Si
   - No
5. [Si] Facilidad para completar acceso (1-5).
6. [Si] Resultado del acceso:
   - Completado
   - Parcial
   - No completado
7. Probaste onboarding en esta ronda?
   - Si
   - No
8. [Si] Claridad de progreso en onboarding (1-5).
9. [Si] Principal friccion en onboarding/perfil:
   - No entendi que hacer
   - Flujo largo
   - Problemas tecnicos
   - Falta de valor percibido
   - Otro

### Bloque B3 - Comunidad

10. Entraste a `/comunidad`?
    - Si
    - No
11. [Si] Modulo mas usado:
    - `/comunidad/ideas`
    - `/comunidad/tutorias`
    - `/comunidad/mentores`
    - `/comunidad/beneficios`
12. [Si] Accion completada:
    - Crear idea
    - Votar idea
    - Solicitar tutoria
    - Revisar mentores
    - Ninguna
13. [Si] Claridad del siguiente paso en comunidad (1-5).
14. [Si] Principal bloqueo para usar mas comunidad:
    - Falta de tiempo
    - No entendi que hacer despues
    - Poco contenido/actividad
    - No vi beneficio claro
    - Otro

### Bloque B4 - Contenido y retorno

15. Que rutas visitaste en esta ronda? (seleccion multiple)
    - `/eventos`
    - `/recursos`
    - `/oportunidades`
    - `/noticias`
16. Cual te motivo mas a volver?
17. Realizaste una accion concreta de valor (inscribirte, guardar, compartir)?
    - Si
    - Parcial
    - No
18. Probabilidad de volver semanalmente (1-5).

### Bloque B5 - Priorizacion

19. Selecciona maximo 3 mejoras para el siguiente sprint:
    - Simplificar home
    - Mejorar onboarding
    - Mejorar perfil como hub personal
    - Mas actividad en comunidad
    - Mejorar eventos y conversion
    - Mejorar recursos y oportunidades
    - Mejoras mobile/responsive
20. Si fueras Product Owner por una semana, que cambiarias primero y por que?

## Criterios de lectura rapida de resultados

- Home clara: objetivo >= 70% de respuestas 4-5 en claridad.
- Activacion saludable: objetivo >= 3.8/5 en probabilidad de registro.
- Acceso funcional: objetivo >= 85% en acceso completado.
- Comunidad util: objetivo >= 50% con al menos 1 accion completada.
- Retorno: objetivo >= 3.5/5 en intencion de volver semanalmente.

## Entregables sugeridos al cerrar la ronda

- Resumen ejecutivo de 1 pagina.
- Tabla de hallazgos por severidad (alta, media, baja).
- Top acciones UX/producto priorizadas.
- Comparativo antes vs ahora con la ronda anterior.
