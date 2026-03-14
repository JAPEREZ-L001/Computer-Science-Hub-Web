"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function CTASection() {
  return (
    <section id="join" className="relative overflow-hidden py-32 bg-[#0D0D0D]">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6%20simbolo%20en%20negro-YTWYDfjRHUXTOCKEsDaCL7ceaFrXxv.png"
            alt="CSH Symbol"
            width={60}
            height={60}
            className="h-15 w-15 object-contain opacity-50"
          />
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-medium text-white/70 tracking-wider">
            Now accepting members
          </span>
        </div>

        <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
          Ready to build the future?
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60">
          Join a community of ambitious engineers who are transforming computer
          science education and driving innovation with real-world impact.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-semibold text-[#0D0D0D] transition-all duration-300 hover:scale-105"
          >
            <span>Join the Hub</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Learn More
          </Link>
        </div>

        <p className="mt-8 text-sm text-white/40">
          No commitment required | Open to all CS students
        </p>
      </div>
    </section>
  )
}
