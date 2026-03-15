"use client"

import Link from "next/link"
import { ArrowRight, Heart, Eye, HandshakeIcon, Award, Cpu, Users, Target } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"

const valores = [
  {
    icon: Heart,
    title: "Solidaridad activa",
    description:
      "Cuando una persona avanza, toda la comunidad avanza: tutorías entre pares, apoyo en proyectos y acompañamiento humano.",
  },
  {
    icon: Users,
    title: "Respeto y empatía",
    description:
      "Cuidamos el ambiente para que cualquier persona pueda aprender y participar, sin importar su punto de partida.",
  },
  {
    icon: Eye,
    title: "Transparencia",
    description:
      "Compartimos de forma clara cómo se toman decisiones, qué se está haciendo y por qué, generando confianza interna y externa.",
  },
  {
    icon: HandshakeIcon,
    title: "Corresponsabilidad",
    description:
      "Entendemos que la mejora del campus es tarea de todos; estudiantes, docentes y autoridades suman desde su rol.",
  },
  {
    icon: Award,
    title: "Excelencia ética y académica",
    description:
      "Buscamos profundidad técnica y coherencia ética: buen código, buenas decisiones y buen impacto.",
  },
  {
    icon: Cpu,
    title: "Rigor técnico e innovación",
    description:
      "Combinamos fundamentos sólidos de computación con la capacidad de crear soluciones nuevas para problemas reales.",
  },
  {
    icon: Target,
    title: "Liderazgo con sentido social",
    description:
      "Impulsamos iniciativas que usan la ingeniería para mejorar la vida de las personas y de la comunidad universitaria.",
  },
]

function ValorRow({ valor, index }: { valor: typeof valores[number]; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <div
      ref={ref}
      className={`group grid items-start gap-8 border-b border-white/[0.06] py-10 last:border-b-0 md:grid-cols-[60px_280px_1fr] reveal-up stagger-${(index % 4) + 1} ${isInView ? "visible" : ""}`}
    >
      <div className="flex items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:border-white/30 group-hover:scale-110 group-hover:rotate-6">
          <valor.icon className="h-5 w-5 text-white/25 transition-all duration-500 group-hover:text-white/70" />
        </div>
      </div>

      <h2 className="text-xl font-bold transition-transform duration-300 group-hover:translate-x-2 md:text-2xl">
        {valor.title}
      </h2>

      <p className="max-w-lg text-sm leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/65">
        {valor.description}
      </p>
    </div>
  )
}

export default function ValoresPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
      <Header />

      <section className="relative pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/40 text-mask-reveal">
              Valores y cultura
            </span>
            <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="text-mask-reveal inline-block">Cómo se vive</span>
              <br />
              <span className="text-mask-reveal-delay inline-block text-white/40">
                el Computer Science Hub
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/50 reveal-up visible" style={{ animationDelay: "0.5s" }}>
              Nuestra identidad no solo se escribe, se practica. Estos son los
              valores que guían nuestras decisiones, actividades y la forma en
              que nos relacionamos.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-0">
            {valores.map((valor, index) => (
              <ValorRow key={valor.title} valor={valor} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <p className="text-sm text-white/40">
            ¿Querés ver cómo se traducen estos valores en acción?
          </p>
          <Link
            href="/programas"
            className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            Ver programas
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
