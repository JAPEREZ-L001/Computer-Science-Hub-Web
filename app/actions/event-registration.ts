'use server'

import { revalidatePath } from 'next/cache'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { createClient } from '@/src/lib/supabase/server'
import { isValidUUID } from '@/src/lib/url-validation'
import { notifyAdminNewRegistration } from '@/src/lib/resend'

export async function toggleEventRegistration(eventId: string) {
  if (!isValidUUID(eventId)) {
    return { ok: false as const, message: 'Evento inválido.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.is_anonymous) {
    return { ok: false as const, message: 'Debes iniciar sesión para inscribirte.' }
  }

  const { data: existing } = await supabase
    .from('event_registrations')
    .select('event_id')
    .eq('event_id', eventId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase
      .from('event_registrations')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', user.id)

    if (error) {
      console.error('toggleEventRegistration:delete', error)
      return { ok: false as const, message: 'Error al cancelar inscripción.' }
    }

    revalidatePath('/eventos')
    return { ok: true as const, registered: false }
  }

  const { error } = await supabase
    .from('event_registrations')
    .insert({ event_id: eventId, user_id: user.id })

  if (error) {
    console.error('toggleEventRegistration:insert', error)
    return { ok: false as const, message: 'Error al inscribirse.' }
  }

  // Notificar al admin por Resend (no-blocking)
  const { data: eventData } = await supabase
    .from('events')
    .select('title, event_date')
    .eq('id', eventId)
    .maybeSingle()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', user.id)
    .maybeSingle()

  if (eventData) {
    const eventDate = eventData.event_date
      ? format(new Date(eventData.event_date as string), "d 'de' MMMM 'de' yyyy", { locale: es })
      : '—'

    notifyAdminNewRegistration({
      eventTitle: String(eventData.title),
      eventDate,
      userName: (profile?.full_name as string | null) ?? user.email ?? 'Miembro',
      userEmail: user.email ?? '—',
    }).catch(() => {})
  }

  revalidatePath('/eventos')
  return { ok: true as const, registered: true }
}
