'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

import { useAuthSession } from '@/components/providers/auth-session-provider'
import { Button } from '@/components/ui/button'

const SESSION_KEY = 'csh_session_tip_dismissed'

const TIPS = [
  {
    text: '¿Sabías que podés votar ideas en la licitación de la comunidad?',
    href: '/comunidad/ideas',
    cta: 'Ver ideas',
  },
  {
    text: 'Inscribite a workshops y hackathons desde Eventos.',
    href: '/eventos',
    cta: 'Ver eventos',
  },
  {
    text: 'Pedí tutoría o conectá con mentores cuando lo necesites.',
    href: '/comunidad/tutorias',
    cta: 'Tutorías',
  },
  {
    text: 'Revisá beneficios de membresía y aliados del Hub.',
    href: '/comunidad/beneficios',
    cta: 'Beneficios',
  },
] as const

export function SessionTipBanner() {
  const { isAuthenticated } = useAuthSession()
  const [dismissed, setDismissed] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)] ?? TIPS[0])

  useEffect(() => {
    setMounted(true)
    try {
      if (typeof window === 'undefined') return
      setDismissed(window.sessionStorage.getItem(SESSION_KEY) === '1')
    } catch {
      setDismissed(false)
    }
  }, [])

  if (!mounted || !isAuthenticated || dismissed) return null

  const onDismiss = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
    setDismissed(true)
  }

  return (
    <div
      role="region"
      aria-label="Sugerencia del Hub"
      className="border-b border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-center text-xs text-white/70 sm:text-left"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row sm:px-2">
        <p className="max-w-2xl">
          <span className="text-white/85">{tip.text}</span>{' '}
          <Link href={tip.href} className="font-medium text-white underline-offset-4 hover:underline">
            {tip.cta}
          </Link>
        </p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 shrink-0 text-white/50 hover:bg-white/10 hover:text-white"
          onClick={onDismiss}
        >
          <X className="mr-1 h-3.5 w-3.5" aria-hidden />
          Cerrar
        </Button>
      </div>
    </div>
  )
}
