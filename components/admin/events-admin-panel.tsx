'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'

import type { EventAdminRow } from '@/src/lib/supabase/admin-queries'
import { deleteEvent, saveEvent } from '@/app/admin/actions/events'
import { useToast } from '@/components/ui/use-toast'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const emptyForm = {
  id: '' as string | undefined,
  title: '',
  description: '',
  event_date: '',
  event_time: '09:00',
  speaker: '',
  type: 'otro',
  location: '',
  registration_url: '',
  published: true,
}

export function EventsAdminPanel({ initialRows }: { initialRows: EventAdminRow[] }) {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const openCreate = () => {
    const d = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    setForm({ ...emptyForm, id: undefined, event_date: dateStr })
    setOpen(true)
  }

  const openEdit = (row: EventAdminRow) => {
    const datePart = row.event_date?.slice(0, 10) ?? ''
    setForm({
      id: row.id,
      title: row.title,
      description: row.description ?? '',
      event_date: datePart,
      event_time: (row.event_time ?? '09:00').slice(0, 5),
      speaker: row.speaker ?? '',
      type: row.type,
      location: row.location ?? '',
      registration_url: row.registration_url ?? '',
      published: row.published,
    })
    setOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    const res = await saveEvent({
      id: form.id,
      title: form.title,
      description: form.description,
      event_date: form.event_date,
      event_time: form.event_time,
      speaker: form.speaker,
      type: form.type,
      location: form.location,
      registration_url: form.registration_url,
      published: form.published,
    })
    setPending(false)
    if (!res.ok) {
      toast({ variant: 'destructive', title: 'Error', description: res.message })
      return
    }
    toast({ title: 'Guardado' })
    setOpen(false)
    router.refresh()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setPending(true)
    const res = await deleteEvent(deleteId)
    setPending(false)
    setDeleteId(null)
    if (!res.ok) {
      toast({ variant: 'destructive', title: 'Error', description: res.message })
      return
    }
    toast({ title: 'Eliminado' })
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Eventos</h1>
          <p className="text-sm text-zinc-400">Calendario público del hub.</p>
        </div>
        <Button type="button" onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo evento
        </Button>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.02]">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-zinc-300">Título</TableHead>
              <TableHead className="text-zinc-300">Fecha</TableHead>
              <TableHead className="text-zinc-300">Tipo</TableHead>
              <TableHead className="text-zinc-300">Publicado</TableHead>
              <TableHead className="w-[100px] text-right text-zinc-300">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialRows.length === 0 ? (
              <TableRow className="border-white/10">
                <TableCell colSpan={5} className="text-center text-zinc-500">
                  No hay eventos.
                </TableCell>
              </TableRow>
            ) : (
              initialRows.map((row) => (
                <TableRow key={row.id} className="border-white/10">
                  <TableCell className="max-w-[200px] truncate font-medium text-zinc-200">
                    {row.title}
                  </TableCell>
                  <TableCell className="text-zinc-400">
                    {row.event_date} {row.event_time}
                  </TableCell>
                  <TableCell className="text-zinc-400">{row.type}</TableCell>
                  <TableCell className="text-zinc-400">{row.published ? 'Sí' : 'No'}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400 hover:text-white"
                      onClick={() => openEdit(row)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400 hover:text-red-400"
                      onClick={() => setDeleteId(row.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-zinc-950 text-zinc-100 sm:max-w-lg">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{form.id ? 'Editar evento' : 'Nuevo evento'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="ev-title">Título</Label>
                <Input
                  id="ev-title"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  required
                  className="border-white/10 bg-white/5"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ev-desc">Descripción</Label>
                <Textarea
                  id="ev-desc"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={4}
                  className="border-white/10 bg-white/5"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="ev-date">Fecha</Label>
                  <Input
                    id="ev-date"
                    type="date"
                    value={form.event_date}
                    onChange={(e) => setForm((f) => ({ ...f, event_date: e.target.value }))}
                    required
                    className="border-white/10 bg-white/5"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ev-time">Hora</Label>
                  <Input
                    id="ev-time"
                    type="time"
                    value={form.event_time}
                    onChange={(e) => setForm((f) => ({ ...f, event_time: e.target.value }))}
                    className="border-white/10 bg-white/5"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ev-speaker">Ponente (opcional)</Label>
                <Input
                  id="ev-speaker"
                  value={form.speaker}
                  onChange={(e) => setForm((f) => ({ ...f, speaker: e.target.value }))}
                  className="border-white/10 bg-white/5"
                />
              </div>
              <div className="grid gap-2">
                <Label>Tipo</Label>
                <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                  <SelectTrigger className="border-white/10 bg-white/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="charla">Charla</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="copa">Copa</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ev-loc">Lugar</Label>
                <Input
                  id="ev-loc"
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  className="border-white/10 bg-white/5"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ev-reg">URL inscripción (opcional)</Label>
                <Input
                  id="ev-reg"
                  value={form.registration_url}
                  onChange={(e) => setForm((f) => ({ ...f, registration_url: e.target.value }))}
                  className="border-white/10 bg-white/5"
                />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
                <Label htmlFor="ev-pub" className="cursor-pointer">
                  Publicado
                </Label>
                <Switch
                  id="ev-pub"
                  checked={form.published}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={pending}>
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deleteId)} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="border-white/10 bg-zinc-950 text-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar evento?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 bg-transparent">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-500"
              onClick={handleDelete}
              disabled={pending}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
