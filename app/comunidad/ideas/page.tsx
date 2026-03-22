import { Calendar, HeartHandshake } from 'lucide-react'

import { createClient } from '@/src/lib/supabase/server'
import {
  fetchCommunityIdeas,
  fetchIdeaVotesForUser,
} from '@/src/lib/supabase/community-queries'

import { ComunidadShell } from '@/components/comunidad/comunidad-shell'
import { ContextualSuggestion } from '@/components/contextual-suggestion'
import { IdeasBoard } from '@/components/comunidad/ideas-board'

export default async function IdeasPage() {
  const [ideas, supabase] = await Promise.all([fetchCommunityIdeas(), createClient()])
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const authed = Boolean(user && !user.is_anonymous)
  const votedIds = authed && user ? Array.from(await fetchIdeaVotesForUser(user.id)) : []

  return (
    <ComunidadShell
      pathname="/comunidad/ideas"
      eyebrow="CSH-39 · Votación"
      title="Licitación"
      titleAccent="de ideas"
      description="La comunidad propone y vota. Los resultados ayudan al consejo estudiantil y a coordinación a priorizar esfuerzos."
      beforeFooter={
        <ContextualSuggestion
          theme="dark"
          suggestions={[
            {
              title: 'Eventos del Hub',
              description: 'Participá en workshops y charlas; inscribite cuando haya cupos.',
              href: '/eventos',
              icon: Calendar,
              requiresAuth: true,
            },
            {
              title: 'Beneficios de membresía',
              description: 'Aliados, prioridades y todo lo que suma ser miembro activo.',
              href: '/comunidad/beneficios',
              icon: HeartHandshake,
              requiresAuth: true,
            },
          ]}
        />
      }
    >
      {authed ? (
        <div className="mb-8 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="text-sm font-medium text-emerald-100/90">Ya tenés acceso al voto y a proponer</p>
          <p className="mt-1 text-sm text-white/50">
            Tu voto cuenta en la licitación; también podés publicar ideas nuevas para la comunidad.
          </p>
        </div>
      ) : (
        <div className="mb-8 rounded-lg border border-white/[0.08] bg-white/[0.02] p-4">
          <p className="text-sm text-white/60">
            Podés leer todas las ideas. Para votar o proponer necesitás{' '}
            <span className="text-white/85">iniciar sesión con cuenta real</span>.
          </p>
        </div>
      )}
      <IdeasBoard ideas={ideas} votedIds={votedIds} isAuthenticated={authed} />
    </ComunidadShell>
  )
}
