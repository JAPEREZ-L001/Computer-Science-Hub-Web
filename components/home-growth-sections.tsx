import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ArrowRight } from "lucide-react"

import { mockEvents } from "@/src/data/mock-events"
import { mockMembers } from "@/src/data/mock-members"
import { mockNews } from "@/src/data/mock-news"

function categoryLabel(category: string) {
  switch (category) {
    case "anuncio": return "Anuncio"
    case "logro": return "Logro"
    case "evento": return "Evento"
    case "update": return "Update"
    default: return category
  }
}

function areaLabel(area: string) {
  switch (area) {
    case "frontend": return "Frontend"
    case "backend": return "Backend"
    case "diseño": return "Diseño"
    case "devops": return "DevOps"
    case "ia": return "IA"
    case "seguridad": return "Seguridad"
    case "general": return "General"
    default: return area
  }
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2)
  const initials = parts.map((p) => p[0]?.toUpperCase()).join('')
  return initials || 'U'
}

export function HomeGrowthSections() {
  const nextEvent = [...mockEvents]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]

  const latestNews = [...mockNews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  const featuredMembers = mockMembers.filter((m) => m.status === "activo").slice(0, 3)

  return (
    <section className="bg-[#050505] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 border-y border-white/[0.06] py-24">
        
        <article className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-12 transition-all hover:border-white/[0.15]">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between z-10">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400/80">
                Evento destacado
              </p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{nextEvent.title}</h3>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 flex flex-wrap items-center gap-2">
                <span>{format(new Date(nextEvent.date), "d 'de' MMMM", { locale: es })}</span>
                <span className="opacity-40">·</span>
                <span>{nextEvent.time}</span>
              </p>
              <p className="mt-6 text-sm leading-relaxed text-white/60 font-medium">{nextEvent.description}</p>
            </div>
            <Link
              href="/eventos"
              className="mt-6 lg:mt-0 inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D] transition-all hover:scale-105 hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Ver eventos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        <article>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end justify-between border-b border-white/[0.06] pb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Noticias recientes</p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">Mantente al día con el Hub</h3>
            </div>
            <Link href="/noticias" className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 transition-colors hover:text-white">
              Ver todas <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((n) => (
              <Link key={n.id} href={`/noticias/${n.slug}`} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.15] hover:bg-white/[0.04]">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                     <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white/50">
                       {categoryLabel(n.category)}
                     </span>
                  </div>
                  <h4 className="text-xl font-bold text-white transition-colors group-hover:text-white/90 leading-tight mb-3">{n.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed font-medium line-clamp-3">{n.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </article>

        <article>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end justify-between border-b border-white/[0.06] pb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Conoce a los miembros</p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">Personas reales construyendo CSH</h3>
            </div>
            <Link href="/miembros" className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 transition-colors hover:text-white">
              Explorar miembros <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMembers.map((m) => (
              <Link key={m.id} href="/miembros" className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.15] hover:bg-white/[0.04]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-sm font-bold text-white/50 transition-colors group-hover:bg-white/[0.05]">
                    {getInitials(m.name)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white transition-colors group-hover:text-white/90">{m.name}</h4>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 truncate mt-1">{m.career}</p>
                  </div>
                </div>
                <div className="border-t border-white/[0.06] pt-5">
                   <p className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
                     {areaLabel(m.area)}
                   </p>
                </div>
              </Link>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
