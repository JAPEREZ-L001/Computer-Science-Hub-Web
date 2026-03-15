# Changelog

Todos los cambios notables del proyecto se documentan en este archivo. El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [Unreleased]

### Added

- FE: Identidad institucional y logos. Contenido de Identidad-Institucional-CSH e Idea Principal CSH integrado en hero, filosofía, ecosistema y valores (7 valores). Logos vectorizados en `public/logo/` (Delta y Completo, variantes claro/oscuro); Header, Footer y Hero usan logos locales. Favicon desde LogoDelta. Microcopy en español; lemas «La disrupción provoca innovación» e «Ingeniería que impulsa futuro» en footer.
- OPS: Deploy Vercel (CLI, skill, npm). Scripts `predeploy` (lint + build) y `deploy:prod` (predeploy + vercel --prod) en package.json; devDependency vercel ^50.0.0. Skill `.cursor/skills/vercel-deploy/` (SKILL.md, reference.md) para guiar deploy, login OAuth, link con `--project` y deploy on push. Plan en `docs/work/14-03-26FeatureDeployBeforeSprint1/plan-deploy.md`. `vercel.json` con `installCommand` para forzar npm en el build de Vercel.

### Fixed

- Build en Vercel: `package-lock.json` actualizado con vercel@50.32.5 y dependencias; eliminado `pnpm-lock.yaml` para que Vercel use solo npm; `installCommand: "npm install"` en vercel.json para evitar fallos por lock desincronizado (error «Missing: vercel@50.32.5 from lock file»).
## [0.1.0] - 2026-03-14

### Added

- Proyecto inicial con Next.js 16, React 19, TypeScript y Tailwind CSS 4.
- Estructura base (App Router, componentes, documentación).
- README y control de versiones (Git, remoto GitHub).
- Changelog inicial.
