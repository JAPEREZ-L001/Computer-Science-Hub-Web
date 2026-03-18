"use client"

import { useState } from "react"
import Link from "next/link"
import { scrollToJoin } from "@/lib/utils"
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const steps = [
  {
    label: "Paso 1",
    shortLabel: "Sobre",
    title: "Entender qué es el Hub",
    description:
      "Lee la sección Sobre CSH para conocer la historia, filosofía y metas de la comunidad. Entendé de dónde venimos y hacia dónde vamos.",
    href: "/sobre",
    cta: "Ir a Sobre CSH",
  },
  {
    label: "Paso 2",
    shortLabel: "Valores",
    title: "Ver si resuena con vos",
    description:
      "Explorá la sección de Valores para ver cómo se vive el día a día dentro de la comunidad y si te identificás con nuestra cultura.",
    href: "/valores",
    cta: "Explorar valores",
  },
  {
    label: "Paso 3",
    shortLabel: "Programas",
    title: "Elegir un programa",
    description:
      "Revisá los programas académicos, organizativos y profesionales disponibles. Encontrá el que se ajuste a tu momento actual.",
    href: "/programas",
    cta: "Ver programas",
  },
  {
    label: "Paso 4",
    shortLabel: "Unirme",
    title: "Dejar tu interés",
    description:
      "Completá el formulario corto para que podamos contactarte. No es un compromiso formal, solo el primer paso para conectar.",
    href: "#join",
    cta: "Completar formulario",
  },
]

export function SitePath() {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="border-t border-white/[0.06] bg-[#050505] py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`mb-10 max-w-3xl reveal-up ${isInView ? "visible" : ""}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            Ruta sugerida
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Cómo moverte dentro del Hub
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-white/45">
            No hace falta verlo todo de una vez. Seguí esta secuencia paso a paso para
            entender, decidir y dar tu primer paso concreto.
          </p>
        </div>

        {/* Desktop stepper indicator */}
        <div className="hidden md:flex items-center gap-0 mb-8">
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => setActiveStep(index)}
                className={`relative flex items-center gap-3 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                  index === activeStep
                    ? "bg-white/10 text-white border border-white/20"
                    : index < activeStep
                    ? "text-white/60 hover:text-white"
                    : "text-white/30 hover:text-white/50"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
                    index < activeStep
                      ? "bg-white/20 text-white"
                      : index === activeStep
                      ? "bg-white text-[#0D0D0D]"
                      : "border border-white/20 text-white/40"
                  }`}
                >
                  {index < activeStep ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="hidden lg:inline">{step.title}</span>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-px flex-1 transition-colors duration-500 ${
                    index < activeStep ? "bg-white/30" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile step indicator - pills with labels */}
        <div className="flex md:hidden gap-2 mb-6 overflow-x-auto pb-1 -mx-1 scrollbar-hide">
          {steps.map((step, index) => (
            <button
              key={step.label}
              onClick={() => setActiveStep(index)}
              className={`btn-press flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-xs font-medium transition-all duration-300 min-h-[44px] ${
                index === activeStep
                  ? "bg-white/10 text-white border border-white/20"
                  : index < activeStep
                  ? "text-white/60 border border-white/10 bg-white/[0.02] hover:text-white hover:bg-white/[0.05]"
                  : "text-white/40 border border-white/[0.06] bg-white/[0.01] hover:text-white/60 hover:border-white/10"
              }`}
              aria-label={`Ir al paso ${index + 1}: ${step.title}`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
                  index < activeStep
                    ? "bg-white/20 text-white"
                    : index === activeStep
                    ? "bg-white text-[#0D0D0D]"
                    : "border border-white/20 text-white/40"
                }`}
              >
                {index < activeStep ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  index + 1
                )}
              </span>
              <span>{step.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Active step content */}
        <div
          className={`rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 md:p-10 transition-all duration-500 reveal-scale ${isInView ? "visible" : ""}`}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
                {steps[activeStep].label}
              </span>
              <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl md:text-3xl">
                {steps[activeStep].title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/50 max-w-lg">
                {steps[activeStep].description}
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <Link
                href={steps[activeStep].href}
                onClick={steps[activeStep].href === "#join" ? scrollToJoin : undefined}
                className="btn-press group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0D0D0D] transition-all duration-300 hover:scale-105"
              >
                {steps[activeStep].cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-6">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="btn-press inline-flex items-center gap-2 text-xs font-medium text-white/40 transition-colors hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Paso anterior
            </button>

            <span className="text-xs text-white/25">
              {activeStep + 1} / {steps.length}
            </span>

            <button
              onClick={() =>
                setActiveStep(Math.min(steps.length - 1, activeStep + 1))
              }
              disabled={activeStep === steps.length - 1}
              className="btn-press inline-flex items-center gap-2 text-xs font-medium text-white/40 transition-colors hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
            >
              Siguiente paso
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
