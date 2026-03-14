"use client"

import { Zap, Cog, Compass } from "lucide-react"

const philosophies = [
  {
    icon: Zap,
    title: "Disruptive",
    description:
      "We challenge conventional thinking and embrace bold ideas that redefine what's possible in technology and education.",
  },
  {
    icon: Cog,
    title: "Operative",
    description:
      "We execute with precision, transforming concepts into reality through disciplined engineering practices and collaboration.",
  },
  {
    icon: Compass,
    title: "Autonomous",
    description:
      "We cultivate self-directed learners who take ownership of their growth and contribute independently to the collective mission.",
  },
]

export function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-32 bg-[#0D0D0D]">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            Our Philosophy
          </span>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
            Built on three pillars
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
