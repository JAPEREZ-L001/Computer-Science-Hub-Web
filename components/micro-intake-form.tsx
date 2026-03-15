"use client"

import { useState } from "react"

type GoalOption = "apoyo" | "comunidad" | "profesional"

export function MicroIntakeForm({ variant = "home" }: { variant?: "home" | "programas" }) {
  const [goal, setGoal] = useState<GoalOption | null>(null)

  const title =
    variant === "home"
      ? "Contanos qué estás buscando"
      : "Decinos en qué programa te gustaría involucrarte"

  const subtitle =
    variant === "home"
      ? "Este es el primer paso: en menos de un minuto nos das contexto para poder contactarte con la iniciativa correcta."
      : "Usamos esta información para conectarte con el programa que mejor encaje con tu momento actual."

  return (
    <section id="join" className="border-t border-white/[0.06] bg-[#050505] py-20">
      <div className="mx-auto max-w-4xl px-6">
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
              ¿Qué te interesa ahora mismo?
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setGoal("apoyo")}
                className={`rounded-lg border px-3 py-3 text-left text-xs leading-relaxed transition-colors ${
                  goal === "apoyo"
                    ? "border-white/60 bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/30"
                }`}
              >
                <span className="block font-semibold text-[11px] uppercase tracking-[0.16em] mb-1">
                  Apoyo académico
                </span>
                <span>Quiero acompañamiento con materias y exámenes.</span>
              </button>
              <button
                type="button"
                onClick={() => setGoal("comunidad")}
                className={`rounded-lg border px-3 py-3 text-left text-xs leading-relaxed transition-colors ${
                  goal === "comunidad"
                    ? "border-white/60 bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/30"
                }`}
              >
                <span className="block font-semibold text-[11px] uppercase tracking-[0.16em] mb-1">
                  Comunidad y liderazgo
                </span>
                <span>Quiero participar en comités, eventos u organización.</span>
              </button>
              <button
                type="button"
                onClick={() => setGoal("profesional")}
                className={`rounded-lg border px-3 py-3 text-left text-xs leading-relaxed transition-colors ${
                  goal === "profesional"
                    ? "border-white/60 bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/30"
                }`}
              >
                <span className="block font-semibold text-[11px] uppercase tracking-[0.16em] mb-1">
                  Proyección profesional
                </span>
                <span>Quiero preparar portafolio, CV o acercarme a la industria.</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
              Detalle breve (opcional)
            </label>
            <textarea
              rows={3}
              placeholder="Cuéntanos algo más si quieres (máx. 2–3 líneas)…"
              className="rounded-md border border-white/[0.12] bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-white/40"
            />
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0D0D0D] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Enviar interés
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

