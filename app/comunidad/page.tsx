import {
  Users,
  GraduationCap,
  HeartHandshake,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

import { createClient } from '@/src/lib/supabase/server'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ComunidadHubPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isRealUser = Boolean(user && !user.is_anonymous)

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <Header />
      <div className="overflow-x-hidden responsive-safe">
        <section className="relative pt-40 pb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
            <span className="mb-6 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              Comunidad CSH
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
               Tu red de <span className="text-white/40">crecimiento</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/50 font-medium">
               Conéctate con otros estudiantes, encuentra mentores que te guíen en tu carrera, y descubre los beneficios de formar parte activa de la comunidad.
            </p>
           </div>
        </section>

        <section className="border-y border-white/[0.06] bg-[#050505] py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Tabs defaultValue="mentores" className="w-full">
              <TabsList className="mb-12 flex w-full flex-wrap justify-center gap-3 bg-transparent p-0 border-none h-auto">
                <TabsTrigger 
                  value="miembros" 
                  className="rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 transition-all data-[state=active]:border-white/20 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white/[0.05] hover:text-white/80"
                >
                  Directorio
                </TabsTrigger>
                <TabsTrigger 
                  value="mentores" 
                  className="rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 transition-all data-[state=active]:border-white/20 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white/[0.05] hover:text-white/80"
                >
                  Mentores & Tutorías
                </TabsTrigger>
                <TabsTrigger 
                  value="beneficios" 
                  className="rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 transition-all data-[state=active]:border-white/20 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white/[0.05] hover:text-white/80"
                >
                  Beneficios
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="miembros" className="animate-in fade-in slide-in-from-bottom-2 duration-700 mt-0">
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-10 md:p-16 text-center backdrop-blur-md shadow-2xl">
                  <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04]">
                    <Users className="h-10 w-10 text-white/50" />
                  </div>
                  <h3 className="mb-4 text-3xl font-bold tracking-tight text-white">Conoce al talento del Hub</h3>
                  <p className="mb-10 text-white/50 mx-auto max-w-lg text-sm leading-relaxed font-medium">Explora los perfiles de los estudiantes de Ingeniería. Filtra por áreas de interés y encuentra compañeros para desarrollar proyectos innovadores.</p>
                  <Link href="/miembros" className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D] transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                     Ver directorio completo <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="mentores" className="animate-in fade-in slide-in-from-bottom-2 duration-700 mt-0">
                <div className="grid gap-6 md:grid-cols-2">
                   <div className="group rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-20px_rgba(255,255,255,0.05)]">
                      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] transition-colors group-hover:bg-white/[0.08]">
                        <GraduationCap className="h-7 w-7 text-white/50 transition-colors group-hover:text-white" />
                      </div>
                      <h3 className="mb-4 text-2xl font-bold text-white transition-colors group-hover:text-white/90">Tutorías entre pares</h3>
                      <p className="mb-8 text-sm leading-relaxed text-white/50 font-medium line-clamp-3">Solicita acompañamiento puntual para repasar para un examen o comprender un tema complejo con compañeros que dominan la materia a la perfección.</p>
                      <Link href="/comunidad/tutorias" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white">
                         Solicitar tutoría <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                   </div>
                   <div className="group rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-20px_rgba(255,255,255,0.05)]">
                      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] transition-colors group-hover:bg-white/[0.08]">
                        <Users className="h-7 w-7 text-white/50 transition-colors group-hover:text-white" />
                      </div>
                      <h3 className="mb-4 text-2xl font-bold text-white transition-colors group-hover:text-white/90">Matching de Mentores</h3>
                      <p className="mb-8 text-sm leading-relaxed text-white/50 font-medium line-clamp-3">Conéctate con estudiantes de ciclos avanzados o profesionales (alumni) que pueden guiarte en tu desarrollo técnico y profesional continuo.</p>
                      <Link href="/comunidad/mentores" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white">
                         Explorar mentores <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                   </div>
                </div>
              </TabsContent>

              <TabsContent value="beneficios" className="animate-in fade-in slide-in-from-bottom-2 duration-700 mt-0">
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-10 md:p-16 text-center backdrop-blur-md shadow-2xl">
                  <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04]">
                    <HeartHandshake className="h-10 w-10 text-white/50" />
                  </div>
                  <h3 className="mb-4 text-3xl font-bold tracking-tight text-white">Ventajas de membresía</h3>
                  <p className="mb-10 text-white/50 mx-auto max-w-lg text-sm leading-relaxed font-medium">Descubre los convenios, licencias de software, créditos de nube y accesos anticipados que obtienes al participar activamente en el Hub de Ciencias de la Computación.</p>
                  <Link href="/comunidad/beneficios" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white/10 hover:border-white/40">
                     Ver todos los beneficios <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  )
}
