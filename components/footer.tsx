import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Link href="/" className="flex shrink-0 items-center justify-center rounded-2xl bg-white/5 p-3 border border-white/10 transition-colors hover:bg-white/10">
              <Image
                src="/logo/logo-delta-dark.svg"
                alt="CSH Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </Link>
            <div>
              <p className="font-bold tracking-[0.25em] text-[11px] uppercase text-white/90">Computer Science Hub</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">
                La disrupción provoca innovación <span className="mx-1 opacity-50">·</span> Ingeniería que impulsa el futuro
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/40 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/40 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/40 transition-all hover:-translate-y-1 hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/[0.06] pt-8 md:flex-row md:items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            © {new Date().getFullYear()} Computer Science Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="#"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white"
            >
              Privacidad
            </Link>
            <Link
              href="#"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white"
            >
              Términos
            </Link>
            <Link
              href="#"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
