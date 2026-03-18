"use client"

import Link from "next/link"
import { ArrowRight, ExternalLink, Building2, MapPin, Briefcase } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"

const oportunidades = [
  {
    empresa: "Applaudo Studios",
    tipo: "Pasantía / Primer empleo",
    area: "Desarrollo de software",
    modalidad: "Presencial — San Salvador",
    descripcion:
      "Empresa líder de nearshore en latam que busca talento joven para programas de entrenamiento con salida laboral en desarrollo web y móvil.",
    url: "#",
  },
  {
    empresa: "Grupo Cassa",
    tipo: "Programa trainee",
    area: "Infraestructura y redes",
    modalidad: "Híbrido — El Salvador",
    descripcion:
      "Programa de formación técnica en infraestructura TI para estudiantes de los últimos ciclos de carreras de computación e ingeniería.",
    url: "#",
  },
  {
    empresa: "Platzi",
    tipo: "Becas de aprendizaje",
    area: "Múltiples áreas tech",
    modalidad: "Remoto",
    descripcion:
      "Acceso a becas de aprendizaje en desarrollo, ciencia de datos, inteligencia artificial y habilidades blandas para la industria.",
    url: "#",
  },
  {
    empresa: "GitHub Campus Expert",
    tipo: "Programa de liderazgo",
    area: "Comunidades tech / Open Source",
    modalidad: "Remoto — Global",
    descripcion:
      "Formación en liderazgo comunitario, organización de eventos tech y contribución a proyectos open source a nivel universitario.",
    url: "#",
  },
  {
    empresa: "Ministerio de Economía - CONAMYPE",
    tipo: "Convocatoria emprendimiento",
    area: "Emprendimiento tech",
    modalidad: "Presencial — El Salvador",
    descripcion:
      "Programas de apoyo para emprendedores en tecnología: mentoría, financiamiento inicial y acceso a redes empresariales.",
    url: "#",
  },
]

function OportunidadCard({ op, index }: { op: typeof oportunidades[number]; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <div
      ref={ref}
      className={`hover-lift group rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.05] reveal-up stagger-${(index % 4) + 1} ${isInView ? "visible" : ""} min-w-0 overflow-hidden`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center gap-3 mb-3 min-w-0">
            <Building2 className="h-4 w-4 text-white/30 shrink-0" />
            <h3 className="text-base sm:text-lg font-bold text-white truncate">
              {op.empresa}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex min-w-0 max-w-full items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/50 break-words">
              <Briefcase className="h-3 w-3 shrink-0" />
              {op.tipo}
            </span>
            <span className="inline-flex min-w-0 max-w-full items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/50 break-words">
              <MapPin className="h-3 w-3 shrink-0" />
              {op.modalidad}
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-2">
            {op.area}
          </p>

          <p className="text-sm leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/60 break-words">
            {op.descripcion}
          </p>
        </div>

        <Link
          href={op.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-press shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-xs font-medium text-white/60 transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/[0.08]"
        >
          Ver convocatoria
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}

export default function OportunidadesPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <Header />
      <div className="overflow-x-hidden">
      <section className="relative pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/40 text-mask-reveal">
              Oportunidades laborales y de crecimiento
            </span>
            <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-mask-reveal inline-block">Conectá con</span>
              <br />
              <span className="text-mask-reveal-delay inline-block text-white/40">
                la industria
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/50 reveal-up visible" style={{ animationDelay: "0.5s" }}>
              Pasantías, programas trainee, becas y convocatorias seleccionadas
              para estudiantes de Ciencias de la Computación. Este directorio se
              actualiza con oportunidades verificadas por el equipo del Hub.
            </p>
          </div>
        </div>
      </section>

      <section className="responsive-safe border-t border-white/[0.06] py-24 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 min-w-0">
          <div className="grid gap-6">
            {oportunidades.map((op, index) => (
              <OportunidadCard key={op.empresa} op={op} index={index} />
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-white/[0.06] bg-white/[0.01] p-4 sm:p-6 text-center min-w-0">
            <p className="text-sm text-white/40 mb-2 break-words">
              ¿Conocés una oportunidad que debería estar aquí?
            </p>
            <p className="text-xs text-white/25 break-words">
              Escribinos al correo del Hub o dejá un mensaje en el formulario de contacto con el enlace de la convocatoria.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 sm:flex-row sm:items-center">
          <p className="text-sm text-white/40">
            ¿Querés prepararte para aprovechar estas oportunidades?
          </p>
          <div className="flex gap-4">
            <Link
              href="/programas"
              className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              Ver programas profesionales
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

      <Footer />
      </div>
    </main>
  )
}
