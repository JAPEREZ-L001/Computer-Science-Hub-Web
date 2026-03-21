'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { saveMentorMatchingProfile } from '@/app/comunidad/actions'
import { useToast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

type Initial = {
  role: string
  topics: string
  availability: string
  bio_short: string
  active: boolean
} | null

export function MentorMatchingForm({ initial }: { initial: Initial }) {
  const router = useRouter()
  const { toast } = useToast()
  const [pending, setPending] = useState(false)
  const [role, setRole] = useState(initial?.role ?? 'student')
  const [topics, setTopics] = useState(initial?.topics ?? '')
  const [availability, setAvailability] = useState(initial?.availability ?? '')
  const [bio_short, setBioShort] = useState(initial?.bio_short ?? '')
  const [active, setActive] = useState(initial?.active ?? true)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    const res = await saveMentorMatchingProfile({
      role,
      topics,
      availability,
      bio_short,
      active,
    })
    setPending(false)
    if (!res.ok) {
      toast({ variant: 'destructive', title: 'Error', description: res.message })
      return
    }
    toast({ title: 'Perfil guardado' })
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-white/[0.08] bg-white/[0.02] p-6">
      <h2 className="text-lg font-semibold text-white">Tu perfil de matching</h2>
      <p className="text-sm text-white/45">
        Definí si buscás mentoría, ofrecés acompañamiento o ambos. Solo perfiles activos aparecen en el
        directorio de mentores.
      </p>
      <div className="grid gap-2">
        <Label className="text-white/70">Rol</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="border-white/10 bg-white/5 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Busco mentoría</SelectItem>
            <SelectItem value="mentor">Ofrezco mentoría</SelectItem>
            <SelectItem value="both">Ambos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="m-top" className="text-white/70">
          Temas / stack
        </Label>
        <Input
          id="m-top"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          className="border-white/10 bg-white/5 text-white"
          placeholder="React, algoritmos, diseño de APIs…"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="m-av" className="text-white/70">
          Disponibilidad
        </Label>
        <Input
          id="m-av"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="border-white/10 bg-white/5 text-white"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="m-bio" className="text-white/70">
          Bio corta
        </Label>
        <Textarea
          id="m-bio"
          value={bio_short}
          onChange={(e) => setBioShort(e.target.value)}
          rows={3}
          className="border-white/10 bg-white/5 text-white"
        />
      </div>
      <div className="flex items-center justify-between rounded-md border border-white/10 px-3 py-2">
        <Label htmlFor="m-act" className="cursor-pointer text-white/70">
          Visible en directorio (mentores)
        </Label>
        <Switch id="m-act" checked={active} onCheckedChange={setActive} />
      </div>
      <Button type="submit" disabled={pending}>
        Guardar
      </Button>
    </form>
  )
}
