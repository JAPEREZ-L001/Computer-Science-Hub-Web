"use client"

import { useState, useEffect, useRef } from "react"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Estudiante de 3er año",
    quote:
      "Las tutorías entre pares me ayudaron a no soltar la carrera cuando más complicado se puso.",
  },
  {
    name: "Miembro de comité",
    quote:
      "Pasé de solo ir a clases a participar en decisiones y proponer cambios para el campus.",
  },
  {
    name: "Egresado reciente",
    quote:
      "El Hub me dio espacios para practicar liderazgo y presentar proyectos, eso pesó en las entrevistas.",
  },
]

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let current = 0
          const increment = Math.ceil(target / 30)
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(current)
            }
          }, 40)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <span ref={ref} className="text-3xl font-bold text-white tabular-nums">
      {count}{suffix}
    </span>
  )
}

export function SocialProofStrip() {
  return (
    <section className="border-y border-white/[0.06] bg-[#050505] py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            Comunidad en movimiento
          </p>
          <p className="mt-3 text-sm text-white/60 leading-relaxed font-medium">
            No son solo ideas: ya hay estudiantes usando el Hub para estudiar mejor,
            organizarse y acercarse a la industria.
          </p>
          <p className="mt-5 text-[9px] font-semibold uppercase tracking-widest text-white/30">
            Cifras de referencia iniciales, crecerán con la comunidad.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 flex-1 lg:max-w-3xl">
          <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.04]">
            <AnimatedCounter target={30} suffix="+" />
            <p className="mt-2 text-xs leading-relaxed font-medium text-white/50 group-hover:text-white/70 transition-colors">
              Tutorías y sesiones de estudio apoyadas por el Hub.
            </p>
          </div>
          <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.04]">
            <AnimatedCounter target={5} suffix="+" />
            <p className="mt-2 text-xs leading-relaxed font-medium text-white/50 group-hover:text-white/70 transition-colors">
              Comités y equipos de trabajo activos en organización estudiantil.
            </p>
          </div>
          <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.04]">
            <AnimatedCounter target={10} suffix="+" />
            <p className="mt-2 text-xs leading-relaxed font-medium text-white/50 group-hover:text-white/70 transition-colors">
              Actividades con foco en proyección profesional y contacto con la industria.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SocialProofExtended() {
  return (
    <section className="border-t border-white/[0.06] bg-[#050505] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              Lo que dicen quienes ya participaron
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Historias cortas desde el Hub
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="group flex h-full flex-col rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-20px_rgba(255,255,255,0.05)]"
            >
              <Quote className="mb-6 h-6 w-6 text-white/20 transition-colors group-hover:text-white/40" />
              <p className="flex-1 text-base leading-relaxed text-white/70 font-medium">"{t.quote}"</p>
              <div className="mt-8 border-t border-white/[0.06] pt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{t.name}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
