'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitFeedback } from '@/app/actions/feedback'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function FeedbackForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [pending, setPending] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    const res = await submitFeedback(form)
    setPending(false)

    if (!res.ok) {
      toast({ variant: 'destructive', title: 'Error', description: res.message })
      return
    }

    toast({ title: '¡Gracias!', description: 'Tu opinión fue enviada correctamente.' })
    setForm({ name: '', email: '', message: '' })
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="fb-name">Nombre completo</Label>
        <Input
          id="fb-name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Tu nombre"
          className="bg-white/[0.03] border-white/[0.08]"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="fb-email">Correo electrónico</Label>
        <Input
          id="fb-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="tu@ejemplo.com"
          className="bg-white/[0.03] border-white/[0.08]"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="fb-message">Mensaje</Label>
        <Textarea
          id="fb-message"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Contanos qué pensás, sugerencias, ideas..."
          rows={5}
          className="bg-white/[0.03] border-white/[0.08] resize-none"
          required
          minLength={10}
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? 'Enviando...' : 'Enviar opinión'}
      </Button>
    </form>
  )
}
