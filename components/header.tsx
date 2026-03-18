"use client"

import { useState } from "react"
import Link from "next/link"
import { scrollToJoin } from "@/lib/utils"
import Image from "next/image"
import { Menu, X, ArrowRight } from "lucide-react"

const navLinks = [
  { href: "/sobre", label: "Sobre CSH" },
  { href: "/valores", label: "Valores" },
  { href: "/programas", label: "Programas" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/recursos", label: "Recursos" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0D0D0D]/80 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="relative z-10 flex shrink-0 min-w-[28px] items-center gap-3">
          <Image
            src="/logo/logo-delta-dark.svg"
            alt="CSH"
            width={28}
            height={28}
            className="h-6 w-6 sm:h-5 sm:w-5 object-contain"
            priority
          />
          <span className="hidden text-xs font-bold uppercase tracking-[0.25em] text-white/80 sm:block">
            Computer Science Hub
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.12em] text-white/40 transition-colors duration-200 hover:text-white whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-white/60" />
          ) : (
            <Menu className="h-5 w-5 text-white/60" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-white/[0.06] bg-[#0D0D0D]/95 backdrop-blur-2xl lg:hidden max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-white/[0.06] pt-4">
              <Link
                href="#join"
                onClick={(e) => { scrollToJoin(e); setIsMenuOpen(false) }}
                className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white"
              >
                Comenzar mi ruta
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
