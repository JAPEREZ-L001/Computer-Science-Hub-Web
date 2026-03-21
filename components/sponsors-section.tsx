import Link from 'next/link'

import { fetchActiveSponsors } from '@/src/lib/supabase/queries'
import type { Sponsor } from '@/src/types'

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  if (sponsor.logoUrl) {
    return (
      <img
        src={sponsor.logoUrl}
        alt={sponsor.name}
        className="h-10 w-auto max-w-[140px] shrink-0 object-contain opacity-40 grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
      />
    )
  }

  return (
    <div className="text-xl font-bold tracking-tight text-white/30 transition-all duration-500 group-hover:text-white/90">
      {sponsor.name}
    </div>
  )
}

export async function SponsorsSection() {
  const sponsors = await fetchActiveSponsors()

  if (sponsors.length === 0) {
    return null
  }

  return (
    <section className="border-t border-white/[0.06] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex justify-center text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30">
            PARTNERS
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sponsors.map((sponsor) => (
            <Link
              key={sponsor.id}
              href={sponsor.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center justify-between overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.01] p-8 text-center transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
            >
              <div className="mb-6 flex min-h-[4rem] flex-1 items-center justify-center">
                <SponsorLogo sponsor={sponsor} />
              </div>

              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 transition-colors duration-500 group-hover:text-white/70">
                {sponsor.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
