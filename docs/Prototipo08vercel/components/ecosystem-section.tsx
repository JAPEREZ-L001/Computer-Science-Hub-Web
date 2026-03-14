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
    <section id="ecosystem" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-muted-foreground">
            The Journey
          </span>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Ecosystem Evolution
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            From your first day as a student to becoming a force of innovation in the industry.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 lg:block">
            <div className="h-full w-full bg-gradient-to-r from-cyan-500/20 via-blue-500/40 to-cyan-500/20" />
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
          </div>

          {/* Vertical line for mobile */}
          <div className="absolute left-8 top-0 h-full w-0.5 lg:hidden">
            <div className="h-full w-full bg-gradient-to-b from-cyan-500/20 via-blue-500/40 to-cyan-500/20" />
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {stages.map((stage, index) => (
              <div key={stage.title} className="relative flex lg:flex-col">
                {/* Mobile layout */}
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center lg:mx-auto lg:mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-20 blur-lg" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card">
                    <stage.icon className="h-7 w-7 text-cyan-400" />
                  </div>
                </div>

                <div className="ml-6 lg:ml-0 lg:text-center">
                  <span className="mb-2 block text-xs font-bold text-cyan-400">
                    {stage.number}
                  </span>
                  <h3 className="mb-3 text-xl font-bold">{stage.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />
        <div className="absolute -left-20 top-1/3 h-60 w-60 rounded-full bg-blue-500/5 blur-[80px]" />
      </div>
    </section>
  )
}
