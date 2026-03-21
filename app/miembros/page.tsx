import { fetchActiveProfiles } from '@/src/lib/supabase/queries'

import { MiembrosDirectory } from '@/components/miembros-directory'

export default async function MiembrosPage() {
  const members = await fetchActiveProfiles()

  return <MiembrosDirectory initialMembers={members} />
}
