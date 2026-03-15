import { HeroSection } from "@/components/hero-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { EcosystemSection } from "@/components/ecosystem-section"
import { SitePath } from "@/components/site-path"
import { SocialProofStrip } from "@/components/social-proof"
import { ValuesSection } from "@/components/values-section"
import { CTASection } from "@/components/cta-section"
import { MicroIntakeForm } from "@/components/micro-intake-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <HeroSection />
      <PhilosophySection />
      <SitePath />
      <EcosystemSection />
      <SocialProofStrip />
      <ValuesSection />
      <CTASection />
      <MicroIntakeForm variant="home" />
      <Footer />
    </main>
  )
}
