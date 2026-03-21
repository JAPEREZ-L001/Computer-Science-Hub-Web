git add package.json package-lock.json next.config.mjs .gitignore .cursor/settings.json tsconfig.tsbuildinfo .env.example
git commit -m "chore: update dependencies and project configuration"

git add src/ supabase/ tmp_rls_query.txt
git commit -m "feat(db): integrate Supabase with schema migrations and RLS"

git add app/auth/ app/login/ app/registro/ components/auth-card.tsx components/auth-gate-modal.tsx components/auth-required-banner.tsx components/password-input.tsx components/providers/ middleware.ts app/layout.tsx
git commit -m "feat(auth): implement authentication flow and session providers"

git add app/admin/ app/actions/ components/admin/
git commit -m "feat(admin): add admin dashboard and server actions"

git add app/comunidad/ app/miembros/ app/perfil/ app/eventos/ app/noticias/ components/comunidad/ components/miembros-directory.tsx components/event-subscribe-button.tsx components/encuesta-form.tsx
git commit -m "feat(community): add members directory, profiles and events area"

git add app/oportunidades/page.tsx app/recursos/page.tsx components/oportunidades-client.tsx components/recursos-client.tsx
git commit -m "refactor: migrate opportunities and resources to dynamic client components"

git add app/page.tsx components/home-growth-sections.tsx components/interactive-features-section.tsx components/sponsors-section.tsx components/discover-hub-section.tsx components/contextual-suggestion.tsx components/session-tip-banner.tsx
git commit -m "refactor(home): restructure home layout and add interactive growth sections"

git add app/programas/page.tsx app/sobre/page.tsx app/valores/page.tsx app/nosotros/ components/nosotros-sections.tsx
git commit -m "refactor(about): consolidate about pages into nosotros section"

git add components/cta-section.tsx components/ecosystem-section.tsx components/footer.tsx components/header.tsx components/hero-section.tsx components/micro-intake-form.tsx components/philosophy-section.tsx components/site-path.tsx components/social-proof.tsx components/ui/badge.tsx components/values-section.tsx components/input-field.tsx
git commit -m "style: update UI component design and layout"

git add docs/ARCHITECTURE.md docs/rutas-usuario.md docs/work/Issues/ docs/work/auditoria-repositorio-completa.md
git commit -m "docs: update project architecture and audit documentation"

git add .
git commit -m "chore: formatting and remaining untracked updates"
