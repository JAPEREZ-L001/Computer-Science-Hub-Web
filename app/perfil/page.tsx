import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CalendarDays, ExternalLink, Github, Linkedin, ArrowRight, Activity, Zap } from 'lucide-react'
import { differenceInMonths, format } from 'date-fns'
import { es } from 'date-fns/locale'

import { createClient } from '@/src/lib/supabase/server'
import { fetchProfileByUserId, fetchRelatedMembers } from '@/src/lib/supabase/queries'
import type { MemberArea } from '@/src/types'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Toaster } from '@/components/ui/toaster'
import { EditProfileDialog } from '@/app/perfil/edit-profile-dialog'
import { DiscoverHubSection } from '@/components/discover-hub-section'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2)
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

function formatDateEs(date: string) {
  return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: es })
}

export default async function PerfilPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const member = await fetchProfileByUserId(user.id)
  
  if (!member) {
    return (
      <main className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden pt-10">
        <Header />
        <div className="mx-auto max-w-3xl px-4 py-32 flex flex-col justify-center min-h-[60vh]">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Perfil no encontrado</h2>
            <p className="text-sm text-white/50 mb-8 max-w-md mx-auto leading-relaxed">
              No encontramos tu perfil en la base de datos. Si acabas de registrarte, recarga la página en unos segundos o vuelve a iniciar sesión.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D] transition-all hover:bg-white/90">
              <ArrowRight className="h-4 w-4" />
              Volver al inicio
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // FORCE ONBOARDING
  if (!member.onboardingCompleted) {
    redirect('/onboarding')
  }

  const profileFields = [
    Boolean(member.bio),
    Boolean(member.github),
    Boolean(member.linkedin),
    Boolean(member.career),
    Boolean(member.area),
    Boolean(member.cycle),
  ]
  const completedFields = profileFields.filter(Boolean).length
  const profileCompletion = Math.round((completedFields / profileFields.length) * 100)
  const relatedMembers = await fetchRelatedMembers(member.area, member.id, 3)
  const membershipMonths = Math.max(differenceInMonths(new Date(), new Date(member.joinedAt)), 0)

  // Fetch User Events
  const { data: eventRegs } = await supabase
    .from('event_registrations')
    .select('event_id, events (id, title, date, time)')
    .eq('user_id', user.id)
    .order('registered_at', { ascending: false })
    .limit(5)
  
  const myEvents = (eventRegs || [])
    .map((reg) => reg.events as any)
    .filter(Boolean)

  // Fetch Tutoring Requests
  const { data: requestedTutorships } = await supabase
    .from('tutoring_requests')
    .select('id, topic, status, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3)

  // Fetch Mentor Profile
  const { data: mentorProfile } = await supabase
    .from('mentor_matching_profiles')
    .select('role, active')
    .eq('user_id', user.id)
    .maybeSingle()

  // Fetch My Ideas
  const { data: myIdeas } = await supabase
    .from('community_ideas')
    .select('id, title, status, created_at')
    .eq('author_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden pt-10">
      <Toaster />
      <Header />
      
      <div className="mx-auto max-w-5xl px-4 pt-24 pb-32 sm:px-6">
        <div className="mb-12">
           <DiscoverHubSection />
        </div>

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.01] overflow-hidden">
          <div className="h-40 w-full bg-gradient-to-tr from-white/[0.08] to-transparent relative">
            <div className="absolute -bottom-12 left-8 rounded-full border-[8px] border-[#0D0D0D] bg-[#0D0D0D] transition-transform duration-500 hover:scale-105">
              <Avatar className="h-24 w-24 border border-white/[0.08] bg-white/[0.02] sm:h-28 sm:w-28">
                <AvatarFallback className="text-2xl sm:text-3xl font-bold text-white/80 bg-transparent">{getInitials(member.name)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute top-6 right-6 flex items-center gap-3">
               <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] ${member.status === 'activo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                 <Activity className="h-3 w-3" />
                 {member.status === 'activo' ? 'Cuenta Activa' : 'Cuenta Inactiva'}
               </span>
            </div>
          </div>
          
          <div className="px-8 pt-20 pb-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">{member.name}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  <span>{member.career}</span>
                  <span className="opacity-40">·</span>
                  <span>Ciclo {member.cycle}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 shadow-sm">
                  {prettyArea(member.area)}
                </span>
                <EditProfileDialog member={member} />
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8 md:col-span-2 flex flex-col justify-between">
                <div>
                  <h2 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    Biografía
                  </h2>
                  <p className="text-sm leading-relaxed text-white/60 font-medium">
                    {member.bio ?? 'Aún no has agregado una biografía. Cuéntanos sobre ti, tus intereses en tecnología y en qué te gusta trabajar.'}
                  </p>
                </div>

                <div className="mt-10 border-t border-white/[0.06] pt-8 flex flex-wrap gap-4">
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noreferrer" className="group inline-flex flex-1 items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-white/5 px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-white/60 transition-all hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-white">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="group inline-flex flex-1 items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-white/5 px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-white/60 transition-all hover:-translate-y-1 hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                  {!member.github && !member.linkedin && (
                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/20">Sin redes vinculadas</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8 text-center flex-1 flex flex-col justify-center">
                  <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
                    Completitud del perfil
                  </h2>
                  <div className="my-6 text-4xl font-bold flex items-baseline justify-center gap-1 text-white">
                    {profileCompletion}<span className="text-xl text-white/30">%</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-white transition-all duration-1000 ease-out" style={{ width: `${profileCompletion}%` }} />
                  </div>
                  {profileCompletion < 100 && (
                    <p className="mt-5 text-[9px] uppercase tracking-widest text-white/40 leading-relaxed font-semibold">
                      Completa tu perfil para destacar en el parche
                    </p>
                  )}
                </div>

                <div className="rounded-3xl border border-emerald-500/10 bg-emerald-500/5 p-6 lg:p-8 text-center">
                  <CalendarDays className="mx-auto mb-4 h-6 w-6 text-emerald-400/50" />
                  <p className="text-sm font-bold text-emerald-400/80 mb-2">
                    {formatDateEs(member.joinedAt)}
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400/50">
                    {membershipMonths} {membershipMonths === 1 ? 'mes' : 'meses'} contigo
                  </p>
                </div>
              </div>
            </div>

            {/* DASHBOARD SECTION: Mis Puntos, Eventos, Tutorías */}
            <div className="mt-6 grid gap-6 md:grid-cols-4">
              {/* Mis Puntos */}
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8 flex flex-col justify-center text-center">
                <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400/80">
                  Reputación
                </h2>
                <div className="my-2 text-4xl font-bold flex items-baseline justify-center gap-1 text-white">
                  {member.reputationScore}<span className="text-xl text-white/30">pts</span>
                </div>
                <p className="mt-2 text-[9px] uppercase tracking-widest text-white/40 font-semibold">
                  {member.reputationScore >= 50 ? 'Experto' : member.reputationScore >= 20 ? 'Intermedio' : 'Inicial'}
                </p>
              </div>

              {/* Mis Eventos Próximos */}
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8 md:col-span-3 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6 border-b border-white/[0.06] pb-4">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 flex items-center gap-2">
                    <CalendarDays className="h-3 w-3" />
                    Mis inscripciones a eventos
                  </h2>
                  <Link href="/eventos" className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white">
                    Explorar <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                {myEvents.length === 0 ? (
                  <div className="py-6 text-center h-full flex flex-col items-center justify-center">
                    <p className="text-sm font-medium text-white/30 mb-4">No estás inscrito en ningún evento próximo.</p>
                    <Link href="/eventos" className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 transition-all hover:bg-white/[0.06] hover:text-white">
                      Ver agenda
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {myEvents.map((ev: any) => (
                      <div key={ev.id} className="flex justify-between items-center bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
                        <div>
                          <p className="text-sm font-bold text-white mb-1">{ev.title}</p>
                          <p className="text-xs text-white/40">{ev.date} - {ev.time}</p>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">Suscrito</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Mis Ideas */}
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6 border-b border-white/[0.06] pb-4">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    Mis Ideas Propuestas
                  </h2>
                  <Link href="/comunidad/ideas" className="text-[10px] uppercase font-bold text-white/40 hover:text-white transition-colors flex items-center gap-1">
                    Comunidad <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                {myIdeas && myIdeas.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {myIdeas.map((idea) => (
                      <div key={idea.id} className="flex justify-between items-center bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
                        <p className="text-sm font-bold text-white line-clamp-1">{idea.title}</p>
                        <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full ${idea.status === 'approved' ? 'text-emerald-400 bg-emerald-400/10' : idea.status === 'open' ? 'text-blue-400 bg-blue-400/10' : 'text-amber-400 bg-amber-400/10'}`}>
                          {idea.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-sm font-medium text-white/30">
                    Aún no has propuesto ninguna idea.
                  </div>
                )}
              </div>

              {/* Mis Tutorías */}
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6 border-b border-white/[0.06] pb-4">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 flex items-center gap-2">
                    <Activity className="h-3 w-3" />
                    Tutorías solicitadas
                  </h2>
                  <Link href="/comunidad/tutorias" className="text-[10px] uppercase font-bold text-white/40 hover:text-white transition-colors flex items-center gap-1">
                    Ver más <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                
                {requestedTutorships && requestedTutorships.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {requestedTutorships.map((tut) => (
                      <div key={tut.id} className="flex justify-between items-center bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
                        <p className="text-sm font-bold text-white line-clamp-1">{tut.topic}</p>
                        <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full ${tut.status === 'matched' ? 'text-emerald-400 bg-emerald-400/10' : 'text-amber-400 bg-amber-400/10'}`}>
                          {tut.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-2 text-center text-sm font-medium text-white/30">
                    No tienes solicitudes de tutoría pendientes.
                  </div>
                )}

                {/* Rol de Mentor */}
                <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Rol actual:</span>
                  {(mentorProfile?.role === 'mentor' || mentorProfile?.role === 'both') && mentorProfile?.active ? (
                    <span className="text-[9px] uppercase font-bold bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-3 py-1.5 rounded-full">
                      Tutor activo
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase font-bold text-white/30">Estudiante</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
                  Otros miembros en {prettyArea(member.area)}
                </h2>
                <Link href="/miembros" className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 transition-colors hover:text-white">
                  Ver directorio <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {relatedMembers.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm font-medium text-white/30">Aún no hay más miembros activos registrados en esta área.</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedMembers.map((related) => (
                    <div key={related.id} className="group rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 transition-all hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.03]">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border border-white/[0.08] bg-white/[0.02]">
                          <AvatarFallback className="text-xs font-bold text-white/50 bg-transparent">{getInitials(related.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-bold text-white/90 transition-colors group-hover:text-white">{related.name}</p>
                          <p className="text-[9px] mt-1 uppercase tracking-widest text-white/30">Ciclo {related.cycle}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
