"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { scrollToJoin } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"

export function CTASection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section className="glow-line relative overflow-hidden py-32 sm:py-40 bg-[#0D0D0D]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent pointer-events-none" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className={`mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-2.5 reveal-scale ${isInView ? "visible" : ""}`}>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
              Abierto a estudiantes de Computación
            </span>
          </div>

          <h2 className={`mb-8 max-w-4xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl reveal-up stagger-1 ${isInView ? "visible" : ""}`}>
            ¿Te sumas a
            <br />
            construir el Hub?
          </h2>

          <p className={`mx-auto mb-14 max-w-2xl text-base sm:text-lg leading-relaxed text-white/50 font-medium reveal-up stagger-2 ${isInView ? "visible" : ""}`}>
            Únete a una red de estudiantes apasionados que convierten la teoría en software real, organizan eventos revolucionarios y se posicionan como líderes orgánicos ante la industria tecnológica.
          </p>

          <div className={`flex flex-col items-center gap-5 sm:flex-row reveal-up stagger-3 ${isInView ? "visible" : ""}`}>
            <Link
              href="#join"
              onClick={scrollToJoin}
              className="btn-press group inline-flex items-center justify-center gap-3 rounded-full bg-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D] transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Comenzar mi ruta
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/nosotros"
              className="btn-press inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
            >
              Explorar programas
            </Link>
          </div>

          <p className={`mt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 reveal-up stagger-4 ${isInView ? "visible" : ""}`}>
            Sin compromiso obligatorio · Abierto a toda la UDB
          </p>
        </div>
      </div>
    </section>
  )
}
