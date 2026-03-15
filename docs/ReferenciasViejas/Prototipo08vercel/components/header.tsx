"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background font-bold text-lg">
            CSH
          </div>
          <span className="hidden font-semibold tracking-tight sm:block">
            Computer Science Hub
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#philosophy"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Philosophy
          </Link>
          <Link
            href="#ecosystem"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Ecosystem
          </Link>
          <Link
            href="#values"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Values
          </Link>
        </div>

        <div className="hidden md:block">
          <Link
            href="#join"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">Join the Hub</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link
              href="#philosophy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Philosophy
            </Link>
            <Link
              href="#ecosystem"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Ecosystem
            </Link>
            <Link
              href="#values"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Values
            </Link>
            <Link
              href="#join"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background"
              onClick={() => setIsMenuOpen(false)}
            >
              Join the Hub
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
