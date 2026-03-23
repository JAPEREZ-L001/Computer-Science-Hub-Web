"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { scrollToJoin } from "@/lib/utils"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-20 px-4 sm:px-0 bg-[#050505]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtle-zoom {
          0% { transform: scale(1.05); opacity: 0; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; opacity: 0.9; filter: drop-shadow(0 0 10px rgba(255,255,255,0.1)); }
          50% { filter: drop-shadow(0 0 25px rgba(255,255,255,0.4)); opacity: 1; }
          100% { background-position: -200% 50%; opacity: 0.9; filter: drop-shadow(0 0 10px rgba(255,255,255,0.1)); }
        }
      `}} />

      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full" style={{ animation: 'subtle-zoom 3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero.png-MxyJ3FP4CbYnPmcUTCJ0Q7uI8dNd2M.jpeg"
            alt="CSH Headquarters"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
        {/* Radial vignette mask (heavy sides, clearer center) - Using inline style for max compatibility */}
        <div 
          className="absolute inset-0 opacity-90"
          style={{ background: "radial-gradient(circle at center, transparent 0%, #050505 100%)" }}
        />
        {/* Bottom linear fade so it blends seamlessly to the standard dark background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 text-center mt-8">
        {/* Premium Pill Badge */}
        <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-2.5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
            La disrupción provoca innovación
          </span>
        </div>

        <h1 className="mb-8">
          <span className="block text-4xl font-bold tracking-[0.1em] sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white pb-1">
            COMPUTER
          </span>
          <span 
            className="block text-4xl font-bold tracking-[0.1em] sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl pb-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-white to-emerald-100 bg-[length:200%_auto]"
            style={{ animation: 'text-shimmer 6s linear infinite' }}
          >
            SCIENCE HUB
          </span>
        </h1>

        <p className="mx-auto mb-14 max-w-xl text-sm sm:text-base font-medium leading-relaxed text-white/50">
          Comunidad estudiantil de Ciencias de la Computación que convierte el aula en
          un laboratorio vivo de aprendizaje, organización y proyección profesional:
          acompañamiento académico entre pares y puente vital hacia la industria tecnológica global.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          {/* <Link
            href="#join"
            onClick={scrollToJoin}
            className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D] transition-transform duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            <span className="relative z-10">Comenzar mi ruta</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link> */}

          <Link
            href="/nosotros"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.03] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 transition-all duration-300 hover:border-white/40 hover:bg-white/[0.08] hover:text-white backdrop-blur-sm"
          >
            Explorar ecosistema
          </Link>
        </div>
      </div>
    </section>
  )
}
