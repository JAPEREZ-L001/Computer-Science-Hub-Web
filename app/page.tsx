import { HeroSection } from "@/components/hero-section"
import { SitePath } from "@/components/site-path"
import { SocialProofStrip } from "@/components/social-proof"
import { SponsorsSection } from "@/components/sponsors-section"
import { HomeGrowthSections } from "@/components/home-growth-sections"
import { InteractiveFeaturesSection } from "@/components/interactive-features-section"
import { CTASection } from "@/components/cta-section"
import { MicroIntakeForm } from "@/components/micro-intake-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="overflow-x-hidden">
        <HeroSection />
        <SitePath />
        <SocialProofStrip />
        <HomeGrowthSections />
        <InteractiveFeaturesSection />
        <SponsorsSection />
        <CTASection />
        <MicroIntakeForm variant="home" />
        <Footer />
      </div>
    </main>
  )
}
