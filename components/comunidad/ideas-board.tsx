'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { CommunityIdeaRow } from '@/src/lib/supabase/community-queries'
import { proposeCommunityIdea, voteCommunityIdea } from '@/app/comunidad/actions'
import { useToast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function IdeasBoard({
  ideas,
  votedIds,
  isAuthenticated,
}: {
  ideas: CommunityIdeaRow[]
  votedIds: string[]
  isAuthenticated: boolean
}) {
  const router = useRouter()
  const { toast } = useToast()
  const voted = new Set(votedIds)
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [propPending, setPropPending] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onVote = async (id: string) => {
    if (!isAuthenticated) {
      toast({
        variant: 'destructive',
        title: 'Iniciá sesión para que tu voto cuente',
        description: 'Necesitás una cuenta real para votar en la licitación de ideas.',
      })
      return
    }
    setPendingId(id)
    const res = await voteCommunityIdea(id)
    setPendingId(null)
    if (!res.ok) {
      toast({ variant: 'destructive', title: 'Voto', description: res.message })
      return
    }
    toast({ title: '¡Gracias! Tu voto suma.' })
    router.refresh()
  }

  const onPropose = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast({
        variant: 'destructive',
        title: 'Iniciá sesión para publicar una idea',
        description: 'Necesitás una cuenta real para sumar propuestas a la licitación.',
      })
      return
    }
    setPropPending(true)
    const res = await proposeCommunityIdea({ title, description })
    setPropPending(false)
    if (!res.ok) {
      toast({ variant: 'destructive', title: 'No se pudo publicar', description: res.message })
      return
    }
    toast({ title: 'Idea publicada' })
    setTitle('')
    setDescription('')
    setOpen(false)
    router.refresh()
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/45">
          Las ideas con más votos orientan prioridades del Hub (espacios, equipamiento, formatos).
        </p>
        {isAuthenticated ? (
          <Button type="button" variant="outline" className="border-white/20 bg-transparent" onClick={() => setOpen(true)}>
            Proponer idea
          </Button>
        ) : null}
      </div>

      <div className="grid gap-4">
        {ideas.length === 0 ? (
          <p className="text-sm text-white/40">Aún no hay ideas en licitación. Sé el primero en proponer.</p>
        ) : (
          ideas.map((idea) => (
            <div
              key={idea.id}
              className="flex flex-col gap-4 rounded-lg border border-white/[0.08] bg-white/[0.02] p-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white">{idea.title}</h3>
                {idea.description ? (
                  <p className="mt-2 text-sm text-white/50">{idea.description}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-sm tabular-nums text-white/40">{idea.vote_count} votos</span>
                <Button
                  type="button"
                  size="sm"
                  variant={voted.has(idea.id) ? 'secondary' : 'default'}
                  disabled={!isAuthenticated || voted.has(idea.id) || pendingId === idea.id}
                  onClick={() => onVote(idea.id)}
                  className={voted.has(idea.id) ? 'opacity-60' : ''}
                >
                  {voted.has(idea.id) ? 'Ya votaste' : 'Votar'}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-white/10 bg-[#111] text-white sm:max-w-md">
          <form onSubmit={onPropose}>
            <DialogHeader>
              <DialogTitle>Nueva idea</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="idea-t">Título</Label>
                <Input
                  id="idea-t"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="border-white/10 bg-white/5"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idea-d">Descripción</Label>
                <Textarea
                  id="idea-d"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="border-white/10 bg-white/5"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={propPending}>
                Publicar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
