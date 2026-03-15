"use client"

import Link from "next/link"
import { Heart, Eye, HandshakeIcon, Award, Cpu, Users, Target, ArrowRight } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const values = [
  {
    icon: Heart,
    title: "Solidaridad activa",
    short: "Cuando una persona avanza, toda la comunidad avanza.",
  },
  {
    icon: Users,
    title: "Respeto y empatía",
    short: "Cualquier persona puede aprender y participar, sin importar su punto de partida.",
  },
  {
    icon: Eye,
    title: "Transparencia",
    short: "Compartimos cómo se toman decisiones y por qué, generando confianza.",
  },
  {
    icon: HandshakeIcon,
    title: "Corresponsabilidad",
    short: "La mejora del campus es tarea de todos; cada rol suma desde sus competencias.",
  },
  {
    icon: Award,
    title: "Excelencia ética",
    short: "Profundidad técnica y coherencia ética: buen código, buenas decisiones.",
  },
  {
    icon: Cpu,
    title: "Rigor e innovación",
    short: "Fundamentos sólidos con capacidad de crear soluciones nuevas para problemas reales.",
  },
  {
    icon: Target,
    title: "Liderazgo social",
    short: "Ingeniería al servicio de las personas y de la comunidad universitaria.",
  },
]

export function ValuesSection() {
  const { ref: headingRef, isInView: headingVisible } = useInView({ threshold: 0.3 })
  const { ref: topGridRef, isInView: topGridVisible } = useInView({ threshold: 0.1 })
  const { ref: bottomGridRef, isInView: bottomGridVisible } = useInView({ threshold: 0.1 })

  return (
    <section id="values" className="relative py-32 bg-[#0D0D0D]">
      <div className="relative mx-auto max-w-7xl px-6">
        <div
          ref={headingRef}
          className={`mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between reveal-up ${headingVisible ? "visible" : ""}`}
        >
          <div className="max-w-2xl">
            <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
              Lo que nos define
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Valores en acción
            </h2>
          </div>
          <Link
            href="/valores"
            className="group inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
          >
            Ver todos los valores
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div
          ref={topGridRef}
          className="grid gap-px overflow-hidden rounded-lg border border-white/[0.06] sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.slice(0, 4).map((value, index) => (
            <div
              key={value.title}
              className={`hover-tilt group relative bg-white/[0.02] p-8 transition-colors duration-300 hover:bg-white/[0.05] reveal-scale stagger-${index + 1} ${topGridVisible ? "visible" : ""}`}
            >
              <value.icon className="mb-6 h-5 w-5 text-white/25 transition-all duration-500 group-hover:text-white/60 group-hover:scale-125" />
              <h3 className="mb-3 text-base font-bold text-white">
                {value.title}
              </h3>
              <p className="text-xs leading-relaxed text-white/40">
                {value.short}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={bottomGridRef}
          className="mt-px grid gap-px overflow-hidden rounded-lg border border-white/[0.06] sm:grid-cols-3"
        >
          {values.slice(4).map((value, index) => (
            <div
              key={value.title}
              className={`hover-tilt group relative bg-white/[0.02] p-8 transition-colors duration-300 hover:bg-white/[0.05] reveal-scale stagger-${index + 3} ${bottomGridVisible ? "visible" : ""}`}
            >
              <value.icon className="mb-6 h-5 w-5 text-white/25 transition-all duration-500 group-hover:text-white/60 group-hover:scale-125" />
              <h3 className="mb-3 text-base font-bold text-white">
                {value.title}
              </h3>
              <p className="text-xs leading-relaxed text-white/40">
                {value.short}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
