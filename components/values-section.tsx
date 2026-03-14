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
    <section id="values" className="relative py-32 bg-[#0D0D0D]">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            What We Stand For
          </span>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
            Our Core Values
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 ${
                index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 transition-colors duration-300 group-hover:border-white/40">
                  <value.icon className="h-5 w-5 text-white/70 transition-colors duration-300 group-hover:text-white" />
                </div>

                <h3 className="mb-3 text-lg font-bold text-white">{value.title}</h3>

                <p className="text-sm text-white/60 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
