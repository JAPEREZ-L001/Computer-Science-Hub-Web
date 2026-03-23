import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FeedbackForm } from '@/components/feedback-form'

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <Header />
      <div className="overflow-x-hidden">
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Déjanos tu opinión
          </h1>
          <p className="text-sm text-white/60 mb-12 max-w-xl">
            Tu feedback nos ayuda a mejorar la experiencia de Computer Science Hub. Contanos qué te gustaría ver, qué mejorar o cualquier sugerencia.
          </p>

          <FeedbackForm />
        </div>
      </div>
      <Footer />
    </main>
  )
}
