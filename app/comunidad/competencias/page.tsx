import { fetchLeaderboard } from '@/src/lib/supabase/community-queries'

import { ComunidadShell } from '@/components/comunidad/comunidad-shell'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default async function CompetenciasPage() {
  const rows = await fetchLeaderboard()

  return (
    <ComunidadShell
      eyebrow="CSH-38 · Competencias"
      title="Ranking"
      titleAccent="de temporada (demo)"
      description="Puntos y badges de ejemplo para visualizar la sección. En una siguiente iteración se pueden ligar a eventos reales, entregas o desafíos verificados."
    >
      <div className="rounded-lg border border-white/10 bg-white/[0.02]">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/50">#</TableHead>
              <TableHead className="text-white/50">Equipo / colectivo</TableHead>
              <TableHead className="text-white/50">Área</TableHead>
              <TableHead className="text-white/50">Badge</TableHead>
              <TableHead className="text-right text-white/50">Puntos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow className="border-white/10">
                <TableCell colSpan={5} className="text-center text-white/40">
                  Sin datos de ranking todavía.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((r, i) => (
                <TableRow key={r.id} className="border-white/10">
                  <TableCell className="text-white/35">{i + 1}</TableCell>
                  <TableCell className="font-medium text-white">{r.display_name}</TableCell>
                  <TableCell className="text-white/45">{r.area ?? '—'}</TableCell>
                  <TableCell className="text-white/45">{r.badge ?? '—'}</TableCell>
                  <TableCell className="text-right tabular-nums text-white">{r.points}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </ComunidadShell>
  )
}
