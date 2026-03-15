"use client"

import Link from "next/link"
import { ArrowRight, Zap, Cog, Compass } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"

const pilares = [
  {
    icon: Zap,
    title: "Disruptiva",
    description:
      "Identificamos problemas reales en la experiencia estudiantil y proponemos soluciones distintas, creativas y viables.",
  },
  {
    icon: Cog,
    title: "Operativa",
    description:
      "Planificamos, documentamos y evaluamos para que los proyectos avancen y sean sostenibles en el tiempo.",
  },
  {
    icon: Compass,
    title: "Autónoma",
    description:
      "Ejercemos liderazgo y autogestión responsable dentro del marco institucional de la universidad.",
  },
]

function SobreHero() {
  return (
    <section className="relative pt-40 pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/40 text-mask-reveal">
            Sobre CSH
          </span>
          <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-mask-reveal inline-block">Comunidad de ingeniería</span>
            <br />
            <span className="text-mask-reveal-delay inline-block text-white/40">
              que impulsa futuro
            </span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/50 reveal-up visible" style={{ animationDelay: "0.5s" }}>
            El Computer Science Hub es la comunidad de estudiantes de
            Ingeniería en Ciencias de la Computación de la Universidad Don
            Bosco que convierte el aula en un laboratorio vivo de aprendizaje,
            organización y proyección profesional.
          </p>
        </div>
      </div>
    </section>
  )
}

function QuienesSomos() {
  const { ref: leftRef, isInView: leftVisible } = useInView({ threshold: 0.2 })
  const { ref: rightRef, isInView: rightVisible } = useInView({ threshold: 0.2 })

  return (
    <section className="border-t border-white/[0.06] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-[1fr_1.5fr]">
          <div ref={leftRef} className={`reveal-left ${leftVisible ? "visible" : ""}`}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Quiénes somos
            </h2>
          </div>
          <div ref={rightRef} className={`space-y-6 text-sm leading-relaxed text-white/50 reveal-right ${rightVisible ? "visible" : ""}`}>
            <p>
              Nacimos como un proyecto creado por y para estudiantes, y estamos
              construyendo, paso a paso, una mesa formal de ingeniería con
              identidad propia y proyección nacional. Creemos que{" "}
              <span className="font-semibold text-white/80">
                la disrupción provoca innovación
              </span>
              : cuestionamos prácticas que ya no funcionan, proponemos
              alternativas nuevas y las llevamos a la práctica con rigor
              técnico y responsabilidad.
            </p>
            <p>
              Nuestro objetivo es que cada estudiante encuentre aquí un lugar
              para aprender más, participar más y proyectarse más lejos,
              combinando formación académica, organización comunitaria y
              oportunidades profesionales.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ComoTrabajamos() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section className="border-t border-white/[0.06] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`mb-16 reveal-up ${isInView ? "visible" : ""}`} ref={ref}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Cómo trabajamos
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-lg border border-white/[0.06] md:grid-cols-3">
          {pilares.map((pilar, index) => (
            <div
              key={pilar.title}
              className={`hover-lift group bg-white/[0.02] p-10 transition-colors duration-300 hover:bg-white/[0.05] reveal-scale stagger-${index + 1} ${isInView ? "visible" : ""}`}
            >
              <pilar.icon className="mb-8 h-6 w-6 text-white/20 transition-all duration-500 group-hover:text-white/60 group-hover:rotate-12 group-hover:scale-110" />
              <h3 className="mb-4 text-xl font-bold">{pilar.title}</h3>
              <p className="text-sm leading-relaxed text-white/40">
                {pilar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HaciaDonde() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  const metas = [
    {
      label: "Corto plazo",
      text: "Consolidar una comunidad educativa de acompañamiento reconocida en el campus, con canales de diálogo abiertos y actividades que fortalezcan el sentido de pertenencia.",
    },
    {
      label: "Mediano plazo",
      text: "Estructura organizativa clara, programas regulares de formación profesional y reconocimiento formal como organización de referencia en Ciencias de la Computación.",
    },
    {
      label: "Largo plazo",
      text: "Mesa formal de ingeniería con redes de colaboración nacionales e internacionales, programas sostenibles y la capacidad de proyectar talento más allá de la universidad.",
    },
  ]

  return (
    <section className="border-t border-white/[0.06] py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-[1fr_1.5fr]">
          <div className={`reveal-left ${isInView ? "visible" : ""}`}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Hacia dónde vamos
            </h2>
          </div>
          <div className="space-y-8">
            {metas.map((meta, index) => (
              <div
                key={meta.label}
                className={`border-l border-white/10 pl-6 transition-all duration-500 hover:border-white/30 hover:pl-8 reveal-clip stagger-${index + 1} ${isInView ? "visible" : ""}`}
              >
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
                  {meta.label}
                </span>
                <p className="text-sm leading-relaxed text-white/50">
                  {meta.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
      <Header />
      <SobreHero />
      <QuienesSomos />
      <ComoTrabajamos />
      <HaciaDonde />

      <section className="border-t border-white/[0.06] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <p className="text-sm text-white/40">
            ¿Querés ser parte? Explorá los valores y programas del Hub.
          </p>
          <div className="flex gap-4">
            <Link
              href="/valores"
              className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              Valores
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/programas"
              className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              Programas
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
