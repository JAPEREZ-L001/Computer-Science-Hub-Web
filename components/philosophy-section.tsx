"use client"

import { Zap, Cog, Compass } from "lucide-react"

const philosophies = [
  {
    icon: Zap,
    title: "Disruptiva",
    description:
      "Cuestionamos prácticas que ya no responden al contexto; proponemos alternativas creativas, viables y responsables. La disrupción provoca innovación.",
  },
  {
    icon: Cog,
    title: "Operativa",
    description:
      "Planificación, seguimiento, documentación y evaluación constante. Las buenas ideas se convierten en resultados tangibles.",
  },
  {
    icon: Compass,
    title: "Autónoma",
    description:
      "Autogestión responsable en el marco institucional: liderazgo, decisiones informadas y corresponsabilidad por la sostenibilidad del Hub.",
  },
]

export function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-32 bg-[#0D0D0D]">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            Nuestra filosofía
          </span>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
            Tres culturas que nos definen
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {philosophies.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:border-white/30 hover:bg-white/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/5">
                <item.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">{item.title}</h3>

              <p className="text-white/60 leading-relaxed">
                {item.description}
              </p>

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
