"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section id="join" className="relative overflow-hidden py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-[120px]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(100, 200, 255, 0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(100, 200, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-medium text-cyan-400">
            Now accepting members
          </span>
        </div>

        <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Ready to build
          <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            the future?
          </span>
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          Join a community of ambitious engineers who are transforming computer
          science education and driving innovation with real-world impact.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base font-semibold text-background transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]"
          >
            <span>Join the Hub</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:border-muted-foreground hover:bg-secondary"
          >
            Learn More
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          No commitment required • Open to all CS students
        </p>
      </div>
    </section>
  )
}
