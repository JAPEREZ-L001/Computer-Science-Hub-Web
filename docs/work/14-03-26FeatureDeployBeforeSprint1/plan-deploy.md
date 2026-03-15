---
title: "Plan de feature: deploy main en Vercel"
status: "active"
owner: "@csh"
authors:
  - "@csh"
tracking:
  - "docs/work/14-03-26-PlanficacionSprint1/IssuesSprint1.md"
  - "docs/tutorials/ciclo-vida-desarrollo.md"
  - "CHANGELOG.md"
baseline_commit: ""
created: "2026-03-14"
last_reviewed: "2026-03-14"
---

# Plan de feature: deploy de main en Vercel

**Feature:** Despliegue de la rama `main` a Vercel con comprobaciones previas (lint, build).  
**Ubicación:** [docs/work/14-03-26FeatureDeployBeforeSprint1](.)  
**Issues:** [CSH-8 OPS: Despliegue Vercel](../../14-03-26-PlanficacionSprint1/IssuesSprint1.md#csh-8--ops-despliegue-vercel), [CSH-9 OPS: CI — lint y build en PR](../../14-03-26-PlanficacionSprint1/IssuesSprint1.md#csh-9--ops-ci--lint-y-build-en-pr).

---

## 1. Objetivo

- Desplegar la rama `main` a producción en Vercel usando Vercel CLI.
- Ejecutar comprobaciones previas (lint y build) para no romper el deploy.

---

## 2. Comprobaciones antes de desplegar

| Comprobación | Comando | Propósito |
|--------------|---------|-----------|
| Lint | `npm run lint` | Errores de ESLint. |
| Build Next | `npm run build` | Que la app compile (equivalente al build de Vercel). |
| Build Vercel (opcional) | `vercel build --prod` | Replica exacta del build de Vercel (requiere `vercel link` y `vercel pull` previos). |

**Mínimo recomendado:** `npm run lint` y `npm run build`. Si ambos pasan, el deploy con `vercel --prod` no debería fallar por compilación.

---

## 3. Scripts en package.json

- **`npm run predeploy`** — Ejecuta `lint` y `build` en secuencia.
- **`npm run deploy:prod`** — Ejecuta `predeploy` y luego `vercel --prod`.

Uso: desde la raíz del repo, con proyecto Vercel ya linkeado (`vercel link`), ejecutar:

```bash
git checkout main
git pull origin main
npm run deploy:prod
```

---

## 4. Primer uso de Vercel CLI

1. **Instalar CLI:** El proyecto incluye `vercel` como devDependency; usar `npx vercel` o instalar global: `npm i -g vercel`.
2. **Login (una vez):** `vercel login` (en CI: token en [Vercel Tokens](https://vercel.com/account/tokens) y `vercel --token <TOKEN>`).
3. **Linkear proyecto (una vez):** Desde la raíz, `vercel link`. Elegir equipo y proyecto existente o crear uno. Si el nombre del directorio tiene mayúsculas, usar `vercel link --yes --project <nombre-en-minúsculas>` (ej. `computersciencehub-web`).
4. **Variables de entorno:** Configurar en el dashboard del proyecto (Settings → Environment Variables). Para builds locales: `vercel pull --environment=production`.

---

## 5. Flujo resumido

1. `npm run lint` y `npm run build` (o `npm run predeploy`).
2. Estar en `main` actualizado (`git checkout main && git pull origin main`).
3. `vercel --prod` (o `npm run deploy:prod` que incluye los pasos 1 y 3).

La URL de producción se imprime en stdout; con `vercel --prod --logs` se ven también los logs del build.
