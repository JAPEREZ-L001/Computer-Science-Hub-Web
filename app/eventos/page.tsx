import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Lightbulb, Users, Calendar as CalendarIcon, Clock, MapPin, User as UserIcon } from 'lucide-react'

import { createClient } from '@/src/lib/supabase/server'
import { fetchPublishedEvents, fetchUserEventRegistrations } from '@/src/lib/supabase/queries'

import { ContextualSuggestion } from '@/components/contextual-suggestion'
import { DeleteEventButton } from '@/components/delete-event-button'
import { EventSubscribeButton } from '@/components/event-subscribe-button'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Empty, EmptyContent, EmptyHeader, EmptyTitle } from '@/components/ui/empty'
import { EventFilters } from '@/components/event-filters'

import type { HubEvent, HubEventType } from '@/src/types'

function eventDateTime(event: HubEvent) {
  return new Date(`${event.date}T${event.time}`)
}

function formatDateEs(dateStr: string) {
  return format(new Date(dateStr), "d 'de' MMMM 'de' yyyy", { locale: es })
}

function typeLabel(type: HubEventType) {
  switch (type) {
    case 'workshop': return 'Workshop'
    case 'charla': return 'Charla'
    case 'hackathon': return 'Hackathon'
    case 'copa': return 'Copa'
    case 'networking': return 'Networking'
    case 'otro': return 'Otro'
  }
}

function typeBadgeClass(type: HubEventType) {
  switch (type) {
    case 'workshop': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
    case 'charla': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    case 'hackathon': return 'bg-red-500/10 text-red-400 border border-red-500/20'
    case 'copa': return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
    case 'networking': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
    case 'otro': return 'bg-white/5 text-white/50 border border-white/10'
  }
}

function excerpt(text: string, maxChars: number) {
  if (text.length <= maxChars) return text
  return `${text.slice(0, maxChars - 3)}...`
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default async function EventosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams
}) {
  const resolvedSearchParams = await searchParams
  const typeFilter = typeof resolvedSearchParams?.type === 'string' ? resolvedSearchParams.type : 'all'
  const monthFilter = typeof resolvedSearchParams?.month === 'string' ? resolvedSearchParams.month : 'all'

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isRealUser = Boolean(user && !user.is_anonymous)

  const [events, registeredEventIds, profileData] = await Promise.all([
    fetchPublishedEvents(),
    isRealUser ? fetchUserEventRegistrations(user!.id) : Promise.resolve([]),
    isRealUser ? supabase.from('profiles').select('role').eq('id', user!.id).maybeSingle() : Promise.resolve({ data: null }),
  ])

  const isAdmin = profileData?.data?.role === 'admin'

  const now = new Date()
  let sorted = [...events].sort(
    (a, b) => eventDateTime(a).getTime() - eventDateTime(b).getTime(),
  )

  if (typeFilter !== 'all') {
    sorted = sorted.filter(e => e.type === typeFilter)
  }
  
  if (monthFilter !== 'all') {
    sorted = sorted.filter(e => {
      const eventDate = eventDateTime(e)
      const eventMonth = eventDate.getMonth() + 1 // 1-12
      return eventMonth.toString() === monthFilter
    })
  }

  const past = sorted.filter((e) => eventDateTime(e).getTime() < now.getTime())
  const upcoming = sorted.filter((e) => eventDateTime(e).getTime() >= now.getTime())

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden pt-10">
      <Header />
      
      <section className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">
              Agenda CSH
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
              Próximos <span className="text-white/40">Eventos</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/50">
              Workshops, charlas y hackathons diseñados para seguir aprendiendo y construyendo en comunidad. Inscríbete a los que más se alineen a tu interés.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-32 sm:px-6">
        {/* Banner de Info */}
        {isRealUser ? (
          <div className="mb-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-emerald-400">
                Tu cuenta está activa
              </p>
              <p className="mt-1 text-sm text-emerald-400/70">
                Usá &quot;Inscribirme&quot; en cada evento para asegurar tu cupo. Si hay link externo, se abrirá en una pestaña nueva.
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-12 rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white/90">
                Visualizando como invitado
              </p>
              <p className="mt-1 text-sm text-white/50">
                Podés ver todo el calendario sin cuenta. Para inscribirte, crea tu cuenta pulsando en el botón de inscripción.
              </p>
            </div>
          </div>
        )}

        {/* Filtros */}
        <EventFilters />

        {upcoming.length === 0 ? (
          <div className="mb-20">
            <Empty className="border-white/[0.06] bg-white/[0.01]">
              <EmptyHeader>
                <EmptyTitle className="text-white">No se encontraron eventos</EmptyTitle>
                <EmptyContent className="text-white/50">Ajusta los filtros o intenta con otra categoría.</EmptyContent>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          <div className="mb-24 space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/30 mb-8 border-b border-white/[0.06] pb-4">
              Eventos por venir
            </h2>
            <div className="grid gap-6">
              {upcoming.map((e) => (
                <div key={e.id} className="group relative flex flex-col items-start gap-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04] sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 space-y-4 min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${typeBadgeClass(e.type)}`}>
                        {typeLabel(e.type)}
                      </span>
                      <span className="text-xs font-medium text-white/40">{formatDateEs(e.date)}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-white/90 truncate break-words text-wrap">
                      {e.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 shrink-0 opacity-50" />
                        <span>{e.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 opacity-50" />
                        <span>{e.location}</span>
                      </div>
                      {e.speaker && (
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 shrink-0 opacity-50" />
                          <span>{e.speaker}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm leading-relaxed text-white/60 pt-2 lg:max-w-2xl">
                      {excerpt(e.description, 200)}
                    </p>
                  </div>

                  <div className="w-full lg:w-auto shrink-0 border-t border-white/[0.06] pt-6 lg:border-t-0 lg:pt-0 lg:pl-6 lg:border-l flex flex-col items-start lg:items-end gap-3">
                    <EventSubscribeButton
                      eventId={e.id}
                      registrationUrl={e.registrationUrl}
                      initialIsRegistered={registeredEventIds.includes(e.id)}
                    />
                    {(isAdmin || (isRealUser && e.createdBy === user?.id)) && (
                      <DeleteEventButton eventId={e.id} eventTitle={e.title} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/30 mb-8 border-b border-white/[0.06] pb-4">
              Historial del Hub
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {past.map((e) => (
                <div key={e.id} className="group relative flex flex-col gap-4 rounded-2xl border border-white/[0.04] bg-white/[0.01] p-6 transition-all hover:bg-white/[0.02]">
                  <div className="flex flex-wrap xl:flex-nowrap items-center justify-between gap-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-bold ${typeBadgeClass(e.type)} opacity-60`}>
                      {typeLabel(e.type)}
                    </span>
                    <span className="text-xs font-medium text-white/30">{formatDateEs(e.date)}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white/60">
                    {e.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/40">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 shrink-0 opacity-50" />
                      <span>{e.time}</span>
                    </div>
                    {e.speaker && (
                      <div className="flex items-center gap-1.5">
                        <UserIcon className="h-3.5 w-3.5 shrink-0 opacity-50" />
                        <span>{e.speaker}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ContextualSuggestion
        theme="dark"
        suggestions={[
          {
            title: 'Ideas en votación',
            description: 'Participá activamente decidiendo el rumbo de las siguientes actividades del hub.',
            href: '/comunidad/ideas',
            icon: Lightbulb,
            requiresAuth: true,
          },
          {
            title: 'Mentores del Hub',
            description: 'Conectá con profesionales y preparate como ponente para el próximo evento.',
            href: '/comunidad/mentores',
            icon: Users,
            requiresAuth: true,
          },
        ]}
      />

      <Footer />
    </main>
  )
}
