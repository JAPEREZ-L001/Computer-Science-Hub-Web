import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { BetatesterSurveyForm } from '@/components/betatester-survey-form'

export default function BetatesterSurveyPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Encuesta Betatester</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/60">
          Esta encuesta es para la beta cerrada de CSH. Selecciona tu tipo de participante y
          responde solo tu sección correspondiente. Al final, todos completan el bloque común de
          valor.
        </p>

        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-8">
          <BetatesterSurveyForm />
        </div>
      </div>
      <Footer />
    </main>
  )
}
