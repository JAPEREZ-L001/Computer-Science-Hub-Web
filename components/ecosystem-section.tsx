"use client"

import { Users, Flag, Network, Building2 } from "lucide-react"

const stages = [
  {
    icon: Users,
    title: "Community",
    description: "Peer-learning foundation where students connect, share knowledge, and grow together.",
    number: "01",
  },
  {
    icon: Flag,
    title: "Representation",
    description: "Students become ambassadors, representing CSH in academic and professional spaces.",
    number: "02",
  },
  {
    icon: Network,
    title: "Professional Network",
    description: "Building lasting connections with industry leaders and fellow engineers.",
    number: "03",
  },
  {
    icon: Building2,
    title: "Engineering Table",
    description: "A professional collective driving innovation with national impact.",
    number: "04",
  },
]

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="relative overflow-hidden py-32 bg-[#0D0D0D]">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            The Journey
          </span>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
            Ecosystem Evolution
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            From your first day as a student to becoming a force of innovation in the industry.
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
