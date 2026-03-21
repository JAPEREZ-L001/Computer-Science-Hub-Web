import * as React from 'react'

export function AuthCard({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0A0A0A]/80 backdrop-blur-2xl px-6 py-10 sm:px-12 sm:py-14 shadow-2xl">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="relative z-10 mx-auto w-full max-w-sm">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
          {description ? (
            <p className="mt-3 text-sm font-medium leading-relaxed text-white/50">{description}</p>
          ) : null}
        </div>
        
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
