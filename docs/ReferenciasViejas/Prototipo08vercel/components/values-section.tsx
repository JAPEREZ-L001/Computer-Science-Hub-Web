"use client"

import { Heart, Eye, HandshakeIcon, Award, Cpu } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Solidarity",
    description:
      "We stand together, supporting each other through challenges and celebrating collective achievements.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Open communication and honest collaboration form the foundation of our community.",
  },
  {
    icon: HandshakeIcon,
    title: "Co-responsibility",
    description:
      "Every member shares ownership of our mission, contributing to the ecosystem's growth and success.",
  },
  {
    icon: Award,
    title: "Ethical Excellence",
    description:
      "We pursue greatness with integrity, ensuring our innovations benefit society responsibly.",
  },
  {
    icon: Cpu,
    title: "Technical Rigor",
    description:
      "Precision, discipline, and continuous learning drive our engineering standards.",
  },
]

export function ValuesSection() {
  return (
    <section id="values" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-muted-foreground">
            What We Stand For
          </span>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Our Core Values
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-card ${
                index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-cyan-500/0 opacity-0 blur transition-all duration-300 group-hover:from-cyan-500/10 group-hover:via-blue-500/10 group-hover:to-cyan-500/10 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary transition-colors duration-300 group-hover:border-cyan-500/30">
                  <value.icon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-cyan-400" />
                </div>

                <h3 className="mb-3 text-lg font-bold">{value.title}</h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute -bottom-1 -right-1 h-20 w-20 rounded-tl-3xl bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
