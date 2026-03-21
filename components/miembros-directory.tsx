'use client'

import { useState } from 'react'
import { Github, GraduationCap, Linkedin, Users } from 'lucide-react'

import { ContextualSuggestion } from '@/components/contextual-suggestion'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

import type { MemberArea, MemberProfile } from '@/src/types'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Empty, EmptyContent, EmptyHeader, EmptyTitle } from '@/components/ui/empty'

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)

  const initials = parts.map((p) => p[0]?.toUpperCase()).join('')
  return initials || 'U'
}

function prettyArea(area: MemberArea) {
  switch (area) {
    case 'frontend': return 'Frontend'
    case 'backend': return 'Backend'
    case 'diseño': return 'Diseño'
    case 'devops': return 'DevOps'
    case 'ia': return 'IA'
    case 'seguridad': return 'Seguridad'
    case 'general': return 'General'
  }
}

const areaFilters = [
  { value: 'all', label: 'Todos' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'diseño', label: 'Diseño' },
  { value: 'devops', label: 'DevOps' },
  { value: 'ia', label: 'IA' },
  { value: 'seguridad', label: 'Seguridad' },
] as const

type AreaFilterValue = (typeof areaFilters)[number]['value']

function MemberCard({ member }: { member: MemberProfile }) {
  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.01] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.03]">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <Avatar className="h-12 w-12 border border-white/[0.08] bg-white/[0.02]">
            <AvatarFallback className="bg-transparent text-sm font-bold text-white/50">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          
          <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white/50">
            {prettyArea(member.area)}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-white/90 line-clamp-1">
          {member.name}
        </h3>
        
        <p className="mb-6 text-[10px] font-bold uppercase tracking-widest text-white/30 truncate">
          {member.career} <span className="mx-1.5 opacity-40">·</span> Ciclo {member.cycle}
        </p>
      </div>

      <div className="flex items-center gap-3 border-t border-white/[0.06] pt-5">
        {!member.github && !member.linkedin && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/20">
            Redes no vinculadas
          </span>
        )}
        
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/40 transition-all hover:scale-110 hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-white"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
        
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/40 transition-all hover:scale-110 hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  )
}

export function MiembrosDirectory({ initialMembers }: { initialMembers: MemberProfile[] }) {
  const activeMembers = initialMembers.filter((m) => m.status === 'activo')
  const [areaFilter, setAreaFilter] = useState<AreaFilterValue>('all')

  const filteredMembers =
    areaFilter === 'all'
      ? activeMembers
      : activeMembers.filter((m) => m.area === areaFilter)

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden pt-10">
      <Header />
      
      <section className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">
              Directorio
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
              Miembros <span className="text-white/40">del Hub</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/50">
              Explora los perfiles de los estudiantes activos, descubre sus áreas de interés, conecta con ellos y encuentra compañeros de equipo.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-32 sm:px-6">
        <section className="space-y-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/[0.06] pb-8">
            <div className="flex flex-wrap gap-2">
              {areaFilters.map((f) => {
                const isActive = areaFilter === f.value
                return (
                  <button
                    key={f.value}
                    onClick={() => setAreaFilter(f.value)}
                    className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                        : 'border border-white/[0.08] bg-white/[0.01] text-white/40 hover:bg-white/[0.05] hover:text-white/80 hover:border-white/[0.15]'
                    }`}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 shrink-0">
              {filteredMembers.length} Miembro{filteredMembers.length !== 1 && 's'} activo{filteredMembers.length !== 1 && 's'}
            </p>
          </div>

          <div>
            {filteredMembers.length === 0 ? (
              <Empty className="border-white/[0.06] bg-white/[0.01] mt-12 py-24">
                <EmptyHeader>
                  <EmptyTitle className="text-white">Directorio vacío</EmptyTitle>
                  <EmptyContent className="text-white/50">
                    No encontramos ningún miembro activo en esta área técnica.
                  </EmptyContent>
                </EmptyHeader>
              </Empty>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {filteredMembers.map((m) => (
                  <MemberCard key={m.id} member={m} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <ContextualSuggestion
        theme="dark"
        suggestions={[
          {
            title: 'Mentores & matching',
            description: 'Conéctate con miembros experimentados que actúan como mentores del hub.',
            href: '/comunidad/mentores',
            icon: Users,
            requiresAuth: true,
          },
          {
            title: 'Tutorías entre pares',
            description: 'Aprovecha a la comunidad para pedir refuerzo en temas puntuales de tus clases.',
            href: '/comunidad/tutorias',
            icon: GraduationCap,
            requiresAuth: true,
          },
        ]}
      />

      <Footer />
    </main>
  )
}
