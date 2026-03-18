"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Users, Briefcase } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"
import { MicroIntakeForm } from "@/components/micro-intake-form"

const categorias = [
  {
    icon: BookOpen,
    label: "Académico",
    programas: [
      {
        title: "Tutorías entre pares",
        description:
          "Espacios estructurados donde estudiantes que dominan una materia acompañan a quienes necesitan refuerzo, preparando exámenes y proyectos juntos.",
        audience: "Estudiantes de Ingeniería en Ciencias de la Computación",
      },
      {
        title: "Grupos de estudio y laboratorios",
        description:
          "Sesiones para profundizar en fundamentos de computación, resolver hojas de problemas y conectar teoría con práctica usando herramientas modernas.",
        audience: "Estudiantes que quieren fortalecer bases técnicas",
      },
    ],
  },
  {
    icon: Users,
    label: "Organizativo",
    programas: [
      {
        title: "Comités y equipos de trabajo",
        description:
          "Estructuras internas para planificar actividades, gestionar comunicación y sostener el funcionamiento del Hub en el tiempo.",
        audience: "Estudiantes interesados en organización y liderazgo",
      },
      {
        title: "Mesas de diálogo con autoridades",
        description:
          "Espacios formales para canalizar inquietudes estudiantiles, co-diseñar soluciones y fortalecer la vida académica e institucional.",
        audience: "Representantes estudiantiles y miembros activos del Hub",
      },
    ],
  },
  {
    icon: Briefcase,
    label: "Profesional",
    programas: [
      {
        title: "Charlas y paneles con la industria",
        description:
          "Conversaciones con profesionales del sector tecnológico para acercar la experiencia real de trabajo al aula.",
        audience: "Estudiantes que quieren entender mejor el campo laboral",
      },
      {
        title: "Rutas de preparación profesional",
        description:
          "Actividades enfocadas en portafolio, CV, entrevistas técnicas y proyectos aplicados para construir un perfil empleable.",
        audience: "Estudiantes de ciclos avanzados o próximos a graduarse",
      },
    ],
  },
]

function CategoriaSection({ cat, catIndex }: { cat: typeof categorias[number]; catIndex: number }) {
  const { ref: headerRef, isInView: headerVisible } = useInView({ threshold: 0.3 })
  const { ref: gridRef, isInView: gridVisible } = useInView({ threshold: 0.1 })

  return (
    <section className="border-t border-white/[0.06] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={headerRef}
          className={`mb-12 flex items-center gap-4 reveal-left ${headerVisible ? "visible" : ""}`}
        >
          <cat.icon className="h-5 w-5 text-white/30" />
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {cat.label}
          </h2>
        </div>

        <div ref={gridRef} className="grid gap-6 md:grid-cols-2">
          {cat.programas.map((prog, progIndex) => (
            <div
              key={prog.title}
              className={`hover-lift group rounded-lg border border-white/[0.06] bg-white/[0.02] p-8 transition-colors duration-300 hover:bg-white/[0.05] reveal-scale stagger-${progIndex + 1} ${gridVisible ? "visible" : ""}`}
            >
              <h3 className="mb-4 text-lg font-bold transition-transform duration-300 group-hover:translate-x-1">
                {prog.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/60">
                {prog.description}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/25 transition-colors duration-300 group-hover:text-white/40">
                Dirigido a: {prog.audience}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ProgramasPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <Header />
      <div className="overflow-x-hidden">
      <section className="relative pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/40 text-mask-reveal">
              Programas y líneas de acción
            </span>
            <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="text-mask-reveal inline-block">Dónde podés</span>
              <br />
              <span className="text-mask-reveal-delay inline-block text-white/40">
                involucrarte
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/50 reveal-up visible" style={{ animationDelay: "0.5s" }}>
              Los objetivos del Hub se vuelven reales a través de programas
              concretos. Cada uno responde a necesidades académicas,
              organizativas o profesionales de la comunidad.
            </p>
          </div>
        </div>
      </section>

      {categorias.map((cat, index) => (
        <CategoriaSection key={cat.label} cat={cat} catIndex={index} />
      ))}

      <section className="border-t border-white/[0.06] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 sm:flex-row sm:items-center">
          <p className="text-sm text-white/40">
            ¿Querés conectar con la industria o seguir aprendiendo?
          </p>
          <div className="flex gap-4">
            <Link
              href="/oportunidades"
              className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              Ver oportunidades
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/recursos"
              className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              Explorar recursos
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <MicroIntakeForm variant="programas" />

      <Footer />
      </div>
    </main>
  )
}
