"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const steps = [
  {
    label: "Paso 1",
    title: "Entender qué es el Hub",
    description: "Lee la página Sobre CSH para conocer la historia, filosofía y metas.",
    href: "/sobre",
  },
  {
    label: "Paso 2",
    title: "Ver si resuena contigo",
    description:
      "Explora Valores para ver cómo se vive el día a día dentro de la comunidad.",
    href: "/valores",
  },
  {
    label: "Paso 3",
    title: "Elegir un programa",
    description:
      "Revisa los programas académicos, organizativos y profesionales disponibles.",
    href: "/programas",
  },
  {
    label: "Paso 4",
    title: "Dejar tu interés",
    description:
      "Completa el formulario corto para que podamos contactarte con la iniciativa correcta.",
    href: "#join",
  },
]

export function SitePath() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section className="border-t border-white/[0.06] bg-[#050505] py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className={`mb-10 max-w-3xl reveal-up ${isInView ? "visible" : ""}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            Ruta sugerida
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Cómo moverte dentro del Hub
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-white/45">
            No hace falta verlo todo de una vez. Seguir esta secuencia te ayuda a entender,
            decidir y luego dar un primer paso concreto.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <Link
              key={step.title}
              href={step.href}
              className={`group flex flex-col rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 text-left text-xs text-white/55 transition-colors hover:bg-white/[0.06] reveal-up stagger-${
                index + 1
              } ${isInView ? "visible" : ""}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
                {step.label}
              </span>
              <span className="mt-2 text-sm font-semibold text-white">{step.title}</span>
              <span className="mt-2 leading-relaxed">{step.description}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-white/60">
                Ir
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

