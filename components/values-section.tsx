"use client"

import { Heart, Eye, HandshakeIcon, Award, Cpu, Users, Target } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Solidaridad activa",
    description:
      "Nos apoyamos entre pares en lo académico, personal y profesional; el avance de uno aporta al avance de toda la comunidad.",
  },
  {
    icon: Users,
    title: "Respeto y empatía",
    description:
      "Valoramos la diversidad de contextos, ritmos e historias de vida; ambiente seguro y humano para todas las personas.",
  },
  {
    icon: Eye,
    title: "Transparencia",
    description:
      "Comunicamos con claridad decisiones, procesos y criterios; generamos confianza entre estudiantes, representantes y autoridades.",
  },
  {
    icon: HandshakeIcon,
    title: "Corresponsabilidad",
    description:
      "La mejora del campus es tarea compartida; cada rol contribuye desde sus competencias.",
  },
  {
    icon: Award,
    title: "Excelencia ética y académica",
    description:
      "Altos estándares de calidad en formación y conducta; rigor técnico con integridad, justicia y servicio.",
  },
  {
    icon: Cpu,
    title: "Rigor técnico e innovación",
    description:
      "Dominio de fundamentos y herramientas de la computación; capacidad de crear soluciones nuevas y relevantes.",
  },
  {
    icon: Target,
    title: "Liderazgo con sentido social",
    description:
      "Liderazgos que usan la ingeniería para mejorar la vida de las personas y atender problemáticas reales.",
  },
]

export function ValuesSection() {
  return (
    <section id="values" className="relative py-32 bg-[#0D0D0D]">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            Lo que nos define
          </span>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
            Nuestros valores
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 ${
                index === 6 ? "sm:col-span-2 lg:col-span-1" : ""
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
