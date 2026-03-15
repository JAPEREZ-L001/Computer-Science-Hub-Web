"use client"

import { Users, Flag, Network, Building2 } from "lucide-react"

const stages = [
  {
    icon: Users,
    title: "Comunidad educativa",
    description: "Acompañamiento académico entre pares, integración estudiantil y base sólida de colaboración y desarrollo constante.",
    number: "01",
  },
  {
    icon: Flag,
    title: "Comunidad administrativa",
    description: "Mediación y representación ante las autoridades; canalización de inquietudes y propuestas de fortalecimiento académico e institucional.",
    number: "02",
  },
  {
    icon: Network,
    title: "Comunidad profesional",
    description: "Preparación de integrantes como profesionales competentes, estructurados y habilitados para el campo laboral.",
    number: "03",
  },
  {
    icon: Building2,
    title: "Mesa de ingeniería",
    description: "Identidad institucional propia, gobernanza definida, sostenibilidad y proyección nacional en ingeniería y tecnología.",
    number: "04",
  },
]

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="relative overflow-hidden py-32 bg-[#0D0D0D]">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            El camino
          </span>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
            Evolución del ecosistema
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            De comunidad educativa a mesa formal de ingeniería con identidad propia y proyección nacional.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-white/20 lg:block" />

          {/* Vertical line for mobile */}
          <div className="absolute left-8 top-0 h-full w-px bg-white/20 lg:hidden" />

          <div className="grid gap-8 lg:grid-cols-4">
            {stages.map((stage) => (
              <div key={stage.title} className="relative flex lg:flex-col">
                {/* Mobile layout */}
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center lg:mx-auto lg:mb-6">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-[#0D0D0D]">
                    <stage.icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                <div className="ml-6 lg:ml-0 lg:text-center">
                  <span className="mb-2 block text-xs font-bold text-white/50 tracking-[0.2em]">
                    {stage.number}
                  </span>
                  <h3 className="mb-3 text-xl font-bold text-white">{stage.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
