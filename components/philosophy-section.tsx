"use client"

import { Zap, Cog, Compass } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const philosophies = [
  {
    icon: Zap,
    number: "01",
    title: "Disruptiva",
    description:
      "Identificamos problemas reales en la experiencia estudiantil y nos atrevemos a proponer soluciones distintas, creativas y viables.",
    accent: "La disrupción provoca innovación.",
  },
  {
    icon: Cog,
    number: "02",
    title: "Operativa",
    description:
      "No nos quedamos en ideas: planificamos, documentamos y evaluamos lo que hacemos para que los proyectos avancen.",
    accent: "Las buenas ideas se convierten en resultados.",
  },
  {
    icon: Compass,
    number: "03",
    title: "Autónoma",
    description:
      "Ejercemos liderazgo y autogestión responsable dentro del marco institucional, asumiendo la corresponsabilidad por el Hub.",
    accent: "Decisiones informadas, sostenibilidad real.",
  },
]

export function PhilosophySection() {
  const { ref: headingRef, isInView: headingVisible } = useInView({ threshold: 0.2 })
  const { ref: gridRef, isInView: gridVisible } = useInView({ threshold: 0.1 })

  return (
    <section id="philosophy" className="relative py-32 bg-[#0D0D0D]">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "1px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          ref={headingRef}
          className={`mb-24 max-w-3xl reveal-left ${headingVisible ? "visible" : ""}`}
        >
          <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            Nuestra forma de trabajar
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Tres pilares que
            <br />
            <span className="text-white/50">nos definen</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid gap-px md:grid-cols-3">
          {philosophies.map((item, index) => (
            <div
              key={item.title}
              className={`border-grow group relative border-l border-white/10 py-8 pl-8 pr-6 transition-colors duration-500 hover:border-white/40 reveal-up stagger-${index + 1} ${gridVisible ? "visible" : ""}`}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.3em] text-white/30">
                  {item.number}
                </span>
                <item.icon className="h-5 w-5 text-white/20 transition-all duration-500 group-hover:text-white/60 group-hover:rotate-12" />
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
                {item.title}
              </h3>

              <p className="mb-6 text-sm leading-relaxed text-white/50">
                {item.description}
              </p>

              <p className="text-xs font-medium italic text-white/30 transition-all duration-500 group-hover:text-white/60 group-hover:translate-x-1">
                {item.accent}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
