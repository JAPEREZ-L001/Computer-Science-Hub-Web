"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/sobre", label: "Sobre CSH" },
  { href: "/valores", label: "Valores" },
  { href: "/programas", label: "Programas" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0D0D0D]/80 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/logo-delta-light.svg"
            alt="CSH"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="hidden text-xs font-bold uppercase tracking-[0.25em] text-white/80 sm:block">
            Computer Science Hub
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-white/40 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="#join"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/[0.04] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
          >
            Sumate al Hub
          </Link>
        </div>

        <button
          className="md:hidden"
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
        <div className="border-t border-white/[0.06] bg-[#0D0D0D]/95 backdrop-blur-2xl md:hidden">
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
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Sumate al Hub
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
