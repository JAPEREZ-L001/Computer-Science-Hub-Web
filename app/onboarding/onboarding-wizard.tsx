"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { completeOnboardingAction } from "@/app/actions/onboarding"
import type { MemberProfile } from "@/src/types"

export function OnboardingWizard({ profile }: { profile: MemberProfile | null }) {
  const router = useRouter()
  const { toast } = useToast()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    bio: profile?.bio || "",
    github: profile?.github || "",
    linkedin: profile?.linkedin || "",
  })

  // Basic step navigation
  const nextStep = () => setStep((s) => Math.min(s + 1, 3))
  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const handleFinish = async () => {
    setLoading(true)
    const formDataObj = new FormData()
    formDataObj.append("bio", formData.bio)
    formDataObj.append("github", formData.github)
    formDataObj.append("linkedin", formData.linkedin)

    const result = await completeOnboardingAction(formDataObj)
    setLoading(false)

    if (result.error) {
      toast({ title: "Error", description: result.error, variant: "destructive" })
      return
    }

    toast({ title: "¡Bienvenido al CSH!", description: "Has ganado 5 puntos de reputación iniciales." })
    router.refresh()
    router.push("/perfil")
  }

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-12 relative overflow-hidden backdrop-blur-md">
      <div className="absolute top-0 left-0 w-full h-1 bg-white/[0.05]">
        <div 
          className="h-full bg-cyan-400 transition-all duration-500 ease-in-out shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="text-center mb-12 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          {step === 1 && "Te damos la bienvenida al Hub"}
          {step === 2 && "Tus redes de desarrollo"}
          {step === 3 && "Último paso"}
        </h1>
        <p className="text-sm font-medium text-white/50">
          Completa este proceso para activar tu perfil y empezar a ganar reputación.
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-8 min-h-[250px]">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Breve biografía (Opcional pero recomendado)</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Ej. Soy estudiante de 5to ciclo. Me apasiona el desarrollo web y estoy empezando a aprender sobre Next.js."
                className="w-full flex min-h-[120px] rounded-2xl border border-white/[0.08] bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 resize-none transition-colors"
              />
            </div>
            <p className="text-[10px] text-white/30 text-center leading-relaxed">
              La comunidad usa este campo para saber en qué áreas estás trabajando y qué te gusta, facilitando el networking.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">GitHub URL</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/tu-usuario"
                className="w-full flex h-12 rounded-full border border-white/[0.08] bg-black/50 px-5 py-2 text-sm text-white placeholder:text-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/tu-usuario"
                className="w-full flex h-12 rounded-full border border-white/[0.08] bg-black/50 px-5 py-2 text-sm text-white placeholder:text-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 transition-colors"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-500/20 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
              <span className="text-3xl">🎉</span>
            </div>
            <h3 className="text-2xl font-bold text-white">¡Todo listo!</h3>
            <p className="text-sm text-white/60 font-medium">
              Al finalizar, ganarás tus primeros <strong className="text-cyan-400">5 puntos de reputación</strong> por activar tu cuenta y accederás a tu Dashboard y al sistema de Tutorías.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/[0.06]">
        {step > 1 ? (
          <button
            onClick={prevStep}
            disabled={loading}
            className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          >
            Atrás
          </button>
        ) : <div />}

        {step < 3 ? (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#0D0D0D] transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Siguiente <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={loading}
            className="flex items-center gap-3 rounded-full bg-cyan-500 px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#050505] transition-all hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            {loading ? "Completando..." : "Entrar al Hub"}
          </button>
        )}
      </div>
    </div>
  )
}
