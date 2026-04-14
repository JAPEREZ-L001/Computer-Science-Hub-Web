# 📝 STATUS.md — Estado del Sprint Activo

> **Para la IA:** Este archivo te dice qué está en progreso ahora mismo.
> Actualiza este archivo al inicio y al final de cada sesión de trabajo.

---

## Sprint Activo: Sprint 00
**Período:** Abril 2026
**Última actualización:** 2026-04-13

---

## ✅ Completado Recientemente — Sprint 00

### 🔴 Hotfixes
- [x] **CSH-S0-001** — Feedback anónimo habilitado con rate limiting (75/hora por IP)
  - `app/actions/feedback.ts` — guard eliminado, rate limit añadido
  - `src/lib/rate-limiter.ts` — módulo compartido de rate limiting
  - `supabase/migrations/csh_s0_01_feedback_anon.sql` — RLS abierta + `is_anonymous` column
- [x] **CSH-S0-002** — Encuesta Betatester habilitada para anónimos
  - `app/actions/betatester-survey.ts` — rate limiting añadido a `submitNewUserSurvey`
  - `supabase/migrations/csh_s0_02_betatester_anon.sql` — GRANTs confirmados

### 🟠 Fundación Técnica
- [x] **CSH-S0-011** — Plan de arquitectura y workflow profesional
  - `docs/WORKFLOW.md` — branching strategy, Conventional Commits, PR process
  - `docs/ENVIRONMENTS.md` — setup de 3 entornos (local/staging/producción)
  - `.github/workflows/ci.yml` — GitHub Actions: lint + typecheck + build
  - `.github/pull_request_template.md` — template de PR con checklist
  - `.gitmessage` — template de commit message

### 🟡 Identidad y Comunidad
- [x] **CSH-S0-006** — Sistema de bandas y roles de usuario
  - `supabase/migrations/csh_s0_06_badges_universities.sql` — badge, university_role en profiles
  - `src/types/index.ts` — UserBadge, BADGE_CONFIG, UniversityRole, MemberProfile actualizado
  - `components/ui/user-badge.tsx` — componente UserBadge + BadgeGroup reutilizable
  - `components/miembros-directory.tsx` — integra BadgeGroup, muestra universidad
  - `app/onboarding/onboarding-wizard.tsx` — paso 3 con rol universitario y universidad
  - `app/actions/onboarding.ts` — persiste university_role y university
  - `src/lib/supabase/queries.ts` — mapProfileRow y SELECT actualizados

- [x] **CSH-S0-007** — Integración multi-universidad
  - `supabase/migrations/csh_s0_06_badges_universities.sql` — tabla universities + 6 unis SV + FK en profiles
  - `components/miembros-directory.tsx` — filtro por universidad con estilo diferenciado
  - `app/onboarding/onboarding-wizard.tsx` — selector de universidad en paso 3
  - `src/types/index.ts` — University, UniversityCode tipos

### 🔍 Deuda técnica corregida (parcial)
- [x] `components/encuesta-form.tsx` — importación huérfana resuelta
- [x] `src/data/mock-members.ts` — mock data actualizada con nuevos campos obligatorios

---

## 🔄 En Progreso

_(nada activo en este momento)_

---

## 📋 Pendiente — Sprint 00B (próxima sesión)

- [ ] **CSH-S0-005** — Foro abierto en Realtime (Supabase Realtime)
- [ ] Perfil de usuario: mostrar badge y universidad en `/perfil`
- [ ] Admin panel: editar badge de un usuario

## 📋 Pendiente — Sprint 00C

- [ ] **CSH-S0-004** — Easter Egg Galaga 2D
- [ ] **CSH-S0-009** — Foros por áreas de interés

## 📋 Pendiente — Sprint 00D

- [ ] **CSH-S0-008** — Sistema de mensajería directa Realtime
- [ ] **CSH-S0-010** — Posts/Papers + Biblioteca personal
- [ ] **CSH-S0-003** — Auditoría completa de deuda técnica

---

## 🚫 Bloqueados

_(nada bloqueado actualmente)_

---

## 📌 Próximos pasos (próxima sesión)

1. Aplicar migración `csh_s0_06_badges_universities.sql` en Supabase producción
2. Verificar que el directorio de miembros muestra badges correctamente
3. Iniciar CSH-S0-005 (Foro Realtime): schema + Server Actions + componentes

---

*Para contexto técnico completo → ver `CONTEXT.md` en la raíz*
*Para plan completo de Sprint 00 → `docs/work/Sprints/Sprint00/PlanDeTrabajoIA.md`*
