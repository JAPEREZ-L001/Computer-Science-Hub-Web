'use server'

import { createClient } from '@/src/lib/supabase/server'
import { notifyAdminFeedback } from '@/src/lib/resend'

export async function submitFeedback(form: { name: string; email: string; message: string }) {
  const name = form.name?.trim()
  const email = form.email?.trim()
  const message = form.message?.trim()

  if (!name || !email || !message) {
    return { ok: false as const, message: 'Completá todos los campos.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { ok: false as const, message: 'Correo electrónico inválido.' }
  }

  if (message.length < 10) {
    return { ok: false as const, message: 'El mensaje es muy corto (mínimo 10 caracteres).' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.is_anonymous) {
    return { ok: false as const, message: 'Debes iniciar sesión para enviar feedback.' }
  }

  // Insertar en la tabla feedback
  const { error } = await supabase
    .from('feedback')
    .insert({
      name,
      email,
      message,
    })

  if (error) {
    console.error('submitFeedback:insert', error)
    return { ok: false as const, message: 'Error al guardar tu opinión.' }
  }

  // Notificar al admin por email (no-blocking)
  await notifyAdminFeedback({
    userName: name,
    userEmail: email,
    message,
  })

  return { ok: true as const }
}
