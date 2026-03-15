"use client"

import { Zap, Cog, Compass } from "lucide-react"

const philosophies = [
  {
    icon: Zap,
    title: "Disruptive",
    description:
      "We challenge conventional thinking and embrace bold ideas that redefine what's possible in technology and education.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Cog,
    title: "Operative",
    description:
      "We execute with precision, transforming concepts into reality through disciplined engineering practices and collaboration.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: Compass,
    title: "Autonomous",
    description:
      "We cultivate self-directed learners who take ownership of their growth and contribute independently to the collective mission.",
    gradient: "from-indigo-500 to-cyan-500",
  },
]

export function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Our Philosophy
          </span>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Built on three pillars
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {philosophies.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-muted-foreground/50 hover:bg-secondary/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} p-0.5`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-card">
                  <item.icon className="h-6 w-6 text-foreground" />
                </div>
              </div>

              <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>

              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              <div
                className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${item.gradient} transition-all duration-500 group-hover:w-full`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
