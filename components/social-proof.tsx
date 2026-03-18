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
    <span ref={ref} className="text-2xl font-semibold text-white tabular-nums">
      {count}{suffix}
    </span>
  )
}

export function SocialProofStrip() {
  return (
    <section className="border-y border-white/[0.08] bg-[#050505] py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-sm shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            Comunidad en movimiento
          </p>
          <p className="mt-2 text-sm text-white/60 leading-relaxed">
            No son solo ideas: ya hay estudiantes usando el Hub para estudiar mejor,
            organizarse y acercarse a la industria.
          </p>
          <p className="mt-4 text-[11px] text-white/35">
            Datos internos · Cifras de referencia iniciales, crecerán con la comunidad.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 flex-1 max-w-2xl">
          <div className="hover-lift rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-xs text-white/60">
            <AnimatedCounter target={30} suffix="+" />
            <p className="mt-1 text-[11px] leading-snug text-white/45">
              Tutorías y sesiones de estudio apoyadas por el Hub.
            </p>
          </div>
          <div className="hover-lift rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-xs text-white/60">
            <AnimatedCounter target={5} suffix="+" />
            <p className="mt-1 text-[11px] leading-snug text-white/45">
              Comités y equipos de trabajo activos en organización estudiantil.
            </p>
          </div>
          <div className="hover-lift rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-xs text-white/60">
            <AnimatedCounter target={10} suffix="+" />
            <p className="mt-1 text-[11px] leading-snug text-white/45">
              Actividades con foco en proyección profesional y contacto con industria.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SocialProofExtended() {
  return (
    <section className="border-t border-white/[0.08] bg-[#050505] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
              Lo que dicen quienes ya participaron
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Historias cortas desde el Hub
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="hover-lift group flex h-full flex-col rounded-lg border border-white/[0.08] bg-white/[0.02] p-6 text-sm text-white/60 transition-colors hover:bg-white/[0.05]"
            >
              <Quote className="mb-4 h-4 w-4 text-white/25" />
              <p className="flex-1 leading-relaxed">{t.quote}</p>
              <p className="mt-4 text-xs font-medium text-white/55">{t.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
