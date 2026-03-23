"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { scrollToJoin } from "@/lib/utils"
import Image from "next/image"
import { Menu, X, ArrowRight, Sparkles, ChevronDown } from "lucide-react"

import { useAuthSession } from "@/components/providers/auth-session-provider"
import { SessionTipBanner } from "@/components/session-tip-banner"
import { createClient } from "@/src/lib/supabase/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const navGroups = [
  {
    label: "El Hub",
    links: [
      { href: "/nosotros", label: "Conócenos" },
      { href: "/comunidad", label: "Comunidad" },
      { href: "/miembros", label: "Directorio" },
    ]
  },
  {
    label: "Crecimiento",
    links: [
      { href: "/oportunidades", label: "Oportunidades" },
      { href: "/recursos", label: "Recursos" },
    ]
  },
  {
    label: "Novedades",
    links: [
      { href: "/eventos", label: "Eventos", interactive: true },
      { href: "/noticias", label: "Noticias" },
    ]
  }
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, isAdmin } = useAuthSession()
  const router = useRouter()
  const pathname = usePathname()

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut({ scope: "global" })
    setIsMenuOpen(false)
    router.refresh()
    router.push("/")
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-500 bg-[#0a0a0a]/90 backdrop-blur-2xl border-b ${
      scrolled || isMenuOpen
        ? 'border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
        : 'border-white/[0.04]'
    }`}>
      <SessionTipBanner />

      <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 transition-all duration-500 ${scrolled ? 'py-3.5' : 'py-5'}`}>
        <nav className="relative z-50 flex w-full items-center justify-between transition-all duration-500">
          
          <Link href="/" className="relative z-10 flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80">
             <Image
              src="/logo/logo-delta-dark.svg"
              alt="CSH"
              width={28}
              height={28}
              className={`object-contain transition-all duration-300 ${scrolled ? 'h-5 w-5' : 'h-6 w-6'}`}
              priority
            />
            <span className={`hidden font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 sm:block ${scrolled ? 'text-[9px]' : 'text-[11px]'}`}>
              Computer Science Hub
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navGroups.map((group) => {
              const isActive = group.links.some(link => pathname === link.href) || pathname.startsWith(`/${group.label.toLowerCase()}`)
              return (
                <DropdownMenu key={group.label}>
                  <DropdownMenuTrigger className={`group inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-200 whitespace-nowrap outline-none px-2 py-1 relative ${
                    isActive ? "text-white" : "text-white/40 hover:text-white"
                  }`}>
                    {group.label}
                    <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180 opacity-50" />
                    {isActive && (
                      <span className="absolute -bottom-3 left-1/2 h-px w-6 -translate-x-1/2 bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="center"
                    sideOffset={16}
                    className="w-56 rounded-2xl border border-white/[0.08] bg-[#0c0c0c]/95 backdrop-blur-xl p-2 text-white shadow-2xl duration-300"
                  >
                    {group.links.map((link) => (
                      <DropdownMenuItem
                        key={link.href}
                        asChild
                        className="cursor-pointer rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/50 transition-all focus:bg-white/[0.04] focus:text-white hover:text-white"
                      >
                        <Link href={link.href} className="flex items-center justify-between gap-2">
                          <span className={pathname === link.href ? "text-white" : ""}>{link.label}</span>
                          {"interactive" in link && link.interactive ? (
                            <Badge
                              variant="interactive"
                              className="px-1.5 py-0 text-[8px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(255,255,255,0.05)] ml-2"
                              title="Incluye acciones para miembros"
                            >
                              <Sparkles className="size-2.5 mr-1" aria-hidden />
                              Live
                            </Badge>
                          ) : null}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex z-10">
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link
                    href="/admin"
                    className="rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 transition hover:border-amber-500/40 hover:bg-amber-500/10"
                  >
                    Admin
                  </Link>
                ) : null}
                <Link
                  href="/perfil"
                  className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
                >
                  Perfil
                </Link>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="rounded-full bg-white px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D] shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105 hover:bg-white/90"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <div className="flex items-center gap-5">
                <Link
                  href="/login"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
                >
                  Acceder
                </Link>
                <Link
                  href="/#join"
                  onClick={(e) => scrollToJoin(e)}
                  className="btn-press rounded-full bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D] shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all hover:scale-105 hover:bg-white/90"
                >
                  Postularse
                </Link>
              </div>
            )}
          </div>

          <button
            className="group relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] transition-colors hover:bg-white/[0.06] lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4 text-white/80 transition-transform group-hover:rotate-90" />
            ) : (
              <Menu className="h-4 w-4 text-white/80" />
            )}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="absolute left-4 right-4 top-[calc(100%+8px)] z-40 lg:hidden">
            <div className="animate-in fade-in slide-in-from-top-4 duration-300 rounded-3xl border border-white/[0.08] bg-[#0c0c0c]/95 backdrop-blur-2xl shadow-2xl p-6 overflow-hidden">
              <Accordion type="single" collapsible defaultValue="El Hub" className="rounded-2xl border border-white/[0.06] bg-white/[0.01]">
                {navGroups.map((group) => (
                  <AccordionItem key={group.label} value={group.label} className="border-b border-white/[0.06] last:border-0">
                    <AccordionTrigger className="px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:no-underline hover:text-white/70 [&[data-state=open]>svg]:rotate-180">
                      {group.label}
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3 pt-0">
                      <div className="flex flex-col gap-1 mt-1">
                        {group.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center justify-between rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-white/[0.06] hover:text-white ${pathname === link.href ? "bg-white/[0.04] text-white border border-white/[0.06]" : "text-white/50"}`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="truncate">{link.label}</span>
                            {"interactive" in link && link.interactive ? (
                              <Badge variant="interactive" className="text-[9px] uppercase tracking-widest shadow-[0_0_10px_rgba(255,255,255,0.1)] py-0.5">
                                Live
                              </Badge>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-6">
                {isAuthenticated ? (
                  <>
                    <button
                      type="button"
                      onClick={() => void signOut()}
                      className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      Cerrar sesión
                    </button>
                    {isAdmin ? (
                      <Link
                         href="/admin"
                         onClick={() => setIsMenuOpen(false)}
                         className="rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-colors hover:bg-amber-500/20"
                       >
                         Admin
                       </Link>
                    ) : (
                      <Link
                        href="/perfil"
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-full bg-white px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D] shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-colors hover:bg-white/90"
                      >
                        Mi Perfil
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      Acceder
                    </Link>
                    <Link
                      href="/#join"
                      onClick={(e) => {
                        setIsMenuOpen(false)
                        scrollToJoin(e)
                      }}
                      className="rounded-full bg-white px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D] shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-colors hover:bg-white/90"
                    >
                      Postularse
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
