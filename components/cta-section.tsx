"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { scrollToJoin } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"

export function CTASection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section className="glow-line relative overflow-hidden py-32 bg-[#0D0D0D]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className={`mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2 reveal-scale ${isInView ? "visible" : ""}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-medium tracking-wider text-white/50">
              Abierto a estudiantes de Computación
            </span>
          </div>

          <h2 className={`mb-6 max-w-3xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl reveal-up stagger-1 ${isInView ? "visible" : ""}`}>
            ¿Te sumás a
            <br />
            construir el Hub?
          </h2>

          <p className={`mx-auto mb-12 max-w-xl text-base leading-relaxed text-white/45 reveal-up stagger-2 ${isInView ? "visible" : ""}`}>
            Unite a una comunidad que convierte la teoría en práctica, organiza
            la voz estudiantil y abre caminos hacia el mundo profesional en
            ingeniería.
          </p>

          <div className={`flex flex-col items-center gap-4 sm:flex-row reveal-up stagger-3 ${isInView ? "visible" : ""}`}>
            <Link
              href="#join"
              onClick={scrollToJoin}
              className="btn-press group inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-sm font-bold tracking-wide text-[#0D0D0D] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              Comenzar mi ruta
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/programas"
              className="btn-press inline-flex items-center gap-2 rounded-full border border-white/20 px-10 py-4 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              Explorar programas
            </Link>
          </div>

          <p className={`mt-10 text-xs tracking-wide text-white/25 reveal-up stagger-4 ${isInView ? "visible" : ""}`}>
            Sin compromiso · Abierto a todos los estudiantes de CSH
          </p>
        </div>
      </div>
    </section>
  )
}
