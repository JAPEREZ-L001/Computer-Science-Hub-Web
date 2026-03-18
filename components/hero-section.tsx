"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { scrollToJoin } from "@/lib/utils"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 pb-20 px-4 sm:px-0">
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero.png-MxyJ3FP4CbYnPmcUTCJ0Q7uI8dNd2M.jpeg"
          alt="CSH Headquarters"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0D0D0D]/70" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />

      <div className="relative z-20 mx-auto max-w-7xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-medium text-white/70 tracking-wider">
            La disrupción provoca innovación
          </span>
        </div>

        <h1 className="mb-8 text-balance">
          <span className="block text-4xl font-bold tracking-[0.1em] sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white">
            COMPUTER
          </span>
          <span className="block text-4xl font-bold tracking-[0.1em] sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white">
            SCIENCE HUB
          </span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-base text-white/70 sm:text-lg md:text-xl leading-relaxed">
          Comunidad estudiantil de Ciencias de la Computación que convierte el aula en
          un laboratorio vivo de aprendizaje, organización y proyección profesional:
          acompañamiento académico entre pares, comunidad organizada y puente hacia la
          industria tecnológica.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#join"
            onClick={scrollToJoin}
            className="btn-press group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-semibold text-[#0D0D0D] transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">Comenzar mi ruta</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/sobre"
            className="btn-press inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Explorar qué hacemos
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/50">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-white/30">
            <div className="mx-auto mt-1.5 h-2 w-1 animate-bounce rounded-full bg-white/50" />
          </div>
        </div>
      </div>
    </section>
  )
}
