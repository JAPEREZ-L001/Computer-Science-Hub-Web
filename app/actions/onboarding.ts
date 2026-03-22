"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/src/lib/supabase/server"

export async function completeOnboardingAction(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "No autorizado" }
  }

  const bio = formData.get("bio") as string
  const github = formData.get("github") as string
  const linkedin = formData.get("linkedin") as string

  // 1. Fetch current profile
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("onboarding_completed, reputation_score")
    .eq("id", user.id)
    .single()

  if (profileErr || !profile) {
    return { error: "Perfil no encontrado" }
  }

  // 2. Prevent double-awarding points
  if (profile.onboarding_completed) {
    return { error: "El onboarding ya fue completado previamente." }
  }

  // 3. Update profile
  const reputation = (profile.reputation_score || 0) + 5

  const { error: updateErr } = await supabase
    .from("profiles")
    .update({
      bio: bio || null,
      github_url: github || null,
      linkedin_url: linkedin || null,
      onboarding_completed: true,
      reputation_score: reputation,
    })
    .eq("id", user.id)

  if (updateErr) {
    return { error: "Error al actualizar perfil: " + updateErr.message }
  }

  revalidatePath("/perfil")
  return { success: true }
}
