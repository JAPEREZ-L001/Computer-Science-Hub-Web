"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

type GoalOption = "apoyo" | "comunidad" | "profesional"

const goalOptions: { id: GoalOption; title: string; description: string }[] = [
  {
    id: "apoyo",
    title: "Apoyo académico",
    description: "Quiero acompañamiento con materias y exámenes.",
  },
  {
    id: "comunidad",
    title: "Comunidad y liderazgo",
    description: "Quiero participar en comités, eventos u organización.",
  },
  {
    id: "profesional",
    title: "Proyección profesional",
    description: "Quiero preparar portafolio, CV o acercarme a la industria.",
  },
]

export function MicroIntakeForm({ variant = "home" }: { variant?: "home" | "programas" }) {
  const [goals, setGoals] = useState<GoalOption[]>([])

  const title =
    variant === "home"
      ? "Contanos qué estás buscando"
      : "Decinos en qué programa te gustaría involucrarte"

  const subtitle =
    variant === "home"
      ? "Este es el primer paso: en menos de un minuto nos das contexto para poder contactarte con la iniciativa correcta."
      : "Usamos esta información para conectarte con el programa que mejor encaje con tu momento actual."

  const toggleGoal = (goal: GoalOption) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    )
  }

  return (
    <section id="join" className="border-t border-white/[0.06] bg-[#050505] py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            Primer paso
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-white/45">
            {subtitle}
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="h-10 rounded-md border border-white/[0.12] bg-black/40 px-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-white/40"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                Correo institucional
              </label>
              <input
                type="email"
                placeholder="tucorreo@udb.edu.sv"
                className="h-10 rounded-md border border-white/[0.12] bg-black/40 px-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-white/40"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
              ¿Qué te interesa ahora mismo?{" "}
              <span className="normal-case tracking-normal text-white/25">
                (podés elegir más de una)
              </span>
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              {goalOptions.map((option) => {
                const isSelected = goals.includes(option.id)
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleGoal(option.id)}
                    className={`btn-press relative rounded-lg border px-3 py-3 text-left text-xs leading-relaxed transition-all duration-200 ${
                      isSelected
                        ? "border-white/60 bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                        : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/30 hover:bg-white/[0.04]"
                    }`}
                    aria-pressed={isSelected}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2">
                        <Check className="h-3.5 w-3.5 text-white/80" />
                      </span>
                    )}
                    <span className="block font-semibold text-[11px] uppercase tracking-[0.16em] mb-1">
                      {option.title}
                    </span>
                    <span>{option.description}</span>
                  </button>
                )
              })}
            </div>
            {goals.length === 0 && (
              <p className="text-[10px] text-white/20">
                Seleccioná al menos una opción para continuar.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
              Detalle breve (opcional)
            </label>
            <textarea
              rows={3}
              placeholder="Cuéntanos algo más si quieres (máx. 2–3 líneas)…"
              className="rounded-md border border-white/[0.12] bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-white/40 resize-none"
            />
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={goals.length === 0}
              className="btn-press inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0D0D0D] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Enviar mi interés
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <p className="text-[10px] text-white/35">
              No es un compromiso formal. Solo nos ayuda a escribirte con algo que
              realmente te sirva.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
