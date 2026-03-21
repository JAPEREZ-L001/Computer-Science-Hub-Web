'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { submitTutoringRequest } from '@/app/comunidad/actions'
import { useToast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function TutoringRequestForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [pending, setPending] = useState(false)
  const [topic, setTopic] = useState('')
  const [details, setDetails] = useState('')
  const [schedule, setSchedule] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    const res = await submitTutoringRequest({
      topic,
      details,
      preferred_schedule: schedule,
    })
    setPending(false)
    if (!res.ok) {
      toast({ variant: 'destructive', title: 'No se pudo enviar', description: res.message })
      return
    }
    toast({ title: 'Solicitud enviada', description: 'El equipo te contactará cuando haya match.' })
    setTopic('')
    setDetails('')
    setSchedule('')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-white/[0.08] bg-white/[0.02] p-6">
      <h2 className="text-lg font-semibold text-white">Nueva solicitud</h2>
      <div className="grid gap-2">
        <Label htmlFor="t-topic" className="text-white/70">
          Tema o materia
        </Label>
        <Input
          id="t-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className="border-white/10 bg-white/5 text-white"
          placeholder="Ej. Estructuras de datos, React, cálculo…"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="t-det" className="text-white/70">
          Detalle
        </Label>
        <Textarea
          id="t-det"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
          className="border-white/10 bg-white/5 text-white"
          placeholder="Objetivos, nivel, lo que ya intentaste…"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="t-sch" className="text-white/70">
          Horarios preferidos
        </Label>
        <Input
          id="t-sch"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          className="border-white/10 bg-white/5 text-white"
          placeholder="Ej. Lun/mié tarde, fines de semana…"
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        Enviar solicitud
      </Button>
    </form>
  )
}
