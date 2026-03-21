'use server'

import { createClient } from '@/src/lib/supabase/server'

const VALID_GOALS = ['apoyo', 'comunidad', 'profesional'] as const
type Goal = (typeof VALID_GOALS)[number]

export async function submitInterest(form: {
  name: string
  email: string
  goals: string[]
  detail: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const goals = form.goals.filter((g): g is Goal => VALID_GOALS.includes(g as Goal))
  if (goals.length === 0) {
    return { ok: false as const, message: 'Seleccioná al menos una opción.' }
  }

  const userId = user && !user.is_anonymous ? user.id : null

  const { error } = await supabase.from('member_interests').insert({
    user_id: userId,
    name: form.name.trim() || null,
    email: form.email.trim() || null,
    goals,
    detail: form.detail.trim() || null,
  })

  if (error) {
    console.error('submitInterest', error)
    return { ok: false as const, message: 'No se pudo guardar. Intentá de nuevo.' }
  }

  return { ok: true as const }
}
