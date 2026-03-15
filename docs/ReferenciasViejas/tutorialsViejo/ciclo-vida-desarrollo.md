---
title: "Ciclo de Vida de Desarrollo"
status: "active"
owner: "@team"
authors: ["@team"]
tracking:
  - README.md
  - AGENTS.md
  - .github/pull_request_template.md
  - CHANGELOG.md
baseline_commit: ""
created: "2026-02-07"
last_reviewed: "2026-02-07"
---

# Objetivo

Este documento define el flujo obligatorio por tarea, desde asignacion en Linear hasta PR a `develop`.

# Alcance

- Aplica a todo desarrollo individual durante el sprint.
- Aplica a tasks e issues gestionadas en Linear.
- E2E es obligatorio; unit/integration no se exigen por ahora.

# Contexto operativo

- Cada developer trabaja sobre tareas asignadas.
- Cada tarea usa una rama dedicada.
- Si un PR no cumple este flujo, se **rechaza**.

# Modelo de ramas (obligatorio)

- Rama base de inicio: `develop`.
- Formato de rama: `tipo/YY-MM-SS-descripcion_de_la_rama`.
- Tipos permitidos: `feature`, `fix`, `docs`, `refactor`.
- No se permiten commits directos en `main`, `master` o `develop`.
- Todo cambio se integra via PR hacia `develop`.

Comandos sugeridos:

```bash
git checkout develop
git pull
git checkout -b tipo/YY-MM-SS-descripcion_de_la_rama
```

# Flujo especifico del ciclo de vida

## 0) Inicio de tarea

- Validar en Linear: alcance, contexto y criterio de aceptacion.
- Confirmar restricciones técnicas antes de codificar.

Salida esperada:
- Alcance claro y accionable.

## 1) Planificacion / analisis / diseño

- Crear carpeta de trabajo en `docs/work/<rama>/`.
- Puede usarse para guardar plan, diseño, notas y borradores de implementación.
- Tratar estos archivos como soporte **durante la implementación**, no como fuente documental a largo plazo, para eso se usa `docs\handbook`.
- Cualquier registro adicional de documentación debe seguir el flujo documental actual del skill `docs-governor`.

Salida esperada:
- Borradores listos para ejecutar implementación.

## 2) Implementación

- Implementar solo dentro del alcance de la tarea.
- Registrar commits incrementales y trazables según `docs\tutorials\commit.md`.
- Evitar cambios fuera del dominio asignado.

Salida esperada:
- Implementación completa en la rama de trabajo.

## 3) Testing obligatorio

- Ejecutar pruebas E2E para validar comportamiento final.
- Documentar pasos de prueba y resultado para el PR.

## 4) Cierre documental post-implementacion

- Ejecutar auditoria documental (`audit_docs`).
- Actualizar documentacion viva impactada (`handbook`, `tutorials`, etc.).
- Ejecutar validacion documental obligatoria:

```bash
py .agent\skills\docs-governor\scripts\check_doc_validation.py
```

- Actualizar `CHANGELOG.md` con cambios reales de la rama.

Salida esperada:
- Docs vivas alineadas + validacion en verde + changelog actualizado.

## 5) Pull Request a develop

- Abrir PR con base `develop`.
- Usar formato obligatorio de `.github/pull_request_template.md`.
- Incluir "Como probar" con pasos E2E.
- Mencionar a `@RoderickGrc` para revision y notificarle por mensaje.

Salida esperada:
- PR listo para revision final.

Formato obligatorio de PR disponible en 
# Reglas de desarrollo individual

- No crear modulos nuevos; solo actualizar modulos existentes.
- No modificar estilos base salvo correcciones o manejo de errores.
- No cambiar schema de BD ni contratos backend/frontend, salvo que el task lo pida explicitamente.
- No commitear secretos ni contenido `.env`.
-  Se exhorta a usar codificación asistida con IA, **siguiendo el flujo de trabajo actual o bien, entregando los resultados exigidos por este flujo**. 
- Para contextualizar secretos a modelos IA, usar skill `env-context`.

# Definition of Done (obligatorio)

- [ ] Rama creada desde `develop` con formato correcto.
- [ ] Implementacion completada segun alcance de Linear.
- [ ] Testing E2E ejecutado y documentado.
- [ ] `py .agent\skills\docs-governor\scripts\check_doc_validation.py` en verde.
- [ ] `CHANGELOG.md` actualizado.
- [ ] PR abierto hacia `develop` con plantilla oficial.
- [ ] Mensaje enviado a `@RoderickGrc` para revision.
