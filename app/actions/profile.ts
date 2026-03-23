'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/src/lib/supabase/server'
import { sanitizeOptionalUrl } from '@/src/lib/url-validation'

const AREAS = ['frontend', 'backend', 'diseño', 'devops', 'ia', 'seguridad', 'general'] as const
const CAREER_OPTIONS = [
  'Ing. en Ciencias de la Computación',
  'Licenciatura en Ingeniería de Software',
  'Ing. en Sistemas Informáticos',
  'Licenciatura en Diseño de Experiencias Digitales',
] as const

const GENERIC_ERROR = 'Error al guardar. Intentá de nuevo.'

export async function updateProfile(form: {
  full_name: string
  career: string
  cycle: string
  area: string
  bio: string
  github_url: string
  linkedin_url: string
  avatar_palette_index?: string
  banner_palette_index?: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.is_anonymous) {
    return { ok: false as const, message: 'No autenticado.' }
  }

  const area = AREAS.includes(form.area as (typeof AREAS)[number]) ? form.area : 'general'
  const career = CAREER_OPTIONS.includes(form.career as (typeof CAREER_OPTIONS)[number])
    ? form.career
    : form.career.trim() || null

  let cycle: number | null = null
  if (form.cycle.trim()) {
    const n = Number.parseInt(form.cycle, 10)
    if (!Number.isNaN(n) && n >= 1 && n <= 10) cycle = n
  }

  let avatarPaletteIndex: number | null = null
  if (form.avatar_palette_index != null && form.avatar_palette_index !== '') {
    const n = Number.parseInt(form.avatar_palette_index, 10)
    if (!Number.isNaN(n) && n >= 0 && n <= 9) avatarPaletteIndex = n
  }

  let bannerPaletteIndex: number | null = null
  if (form.banner_palette_index != null && form.banner_palette_index !== '') {
    const n = Number.parseInt(form.banner_palette_index, 10)
    if (!Number.isNaN(n) && n >= 0 && n <= 9) bannerPaletteIndex = n
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: form.full_name.trim() || null,
      career,
      cycle,
      area,
      bio: form.bio.trim() || null,
      github_url: sanitizeOptionalUrl(form.github_url),
      linkedin_url: sanitizeOptionalUrl(form.linkedin_url),
      avatar_palette_index: avatarPaletteIndex,
      banner_palette_index: bannerPaletteIndex,
    })
    .eq('id', user.id)

  if (error) {
    console.error('updateProfile', error)
    return { ok: false as const, message: GENERIC_ERROR }
  }

  revalidatePath('/perfil')
  revalidatePath('/miembros')
  return { ok: true as const }
}
