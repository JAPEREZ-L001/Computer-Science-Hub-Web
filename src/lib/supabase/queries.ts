import { createClient } from '@/src/lib/supabase/server'
import type {
  HubEvent,
  HubEventType,
  MemberArea,
  MemberProfile,
  MemberStatus,
  NewsCategory,
  NewsPost,
  Sponsor,
  SponsorTier,
} from '@/src/types'

function isMemberArea(v: string): v is MemberArea {
  return (
    v === 'frontend' ||
    v === 'backend' ||
    v === 'diseño' ||
    v === 'devops' ||
    v === 'ia' ||
    v === 'seguridad' ||
    v === 'general'
  )
}

function isMemberStatus(v: string): v is MemberStatus {
  return v === 'activo' || v === 'inactivo'
}

function isNewsCategory(v: string): v is NewsCategory {
  return v === 'anuncio' || v === 'logro' || v === 'evento' || v === 'update'
}

function isHubEventType(v: string): v is HubEventType {
  return (
    v === 'workshop' ||
    v === 'charla' ||
    v === 'hackathon' ||
    v === 'copa' ||
    v === 'networking' ||
    v === 'otro'
  )
}

function isSponsorTier(v: string): v is SponsorTier {
  return v === 'principal' || v === 'colaborador' || v === 'aliado'
}

export function mapProfileRow(row: {
  id: string
  full_name: string | null
  email: string | null
  career: string | null
  cycle: number | null
  area: string | null
  status: string | null
  bio?: string | null
  github_url?: string | null
  linkedin_url?: string | null
  created_at?: string | null
}): MemberProfile {
  const areaRaw = row.area ?? 'general'
  const area: MemberArea = isMemberArea(areaRaw) ? areaRaw : 'general'
  const statusRaw = row.status ?? 'inactivo'
  const status: MemberStatus = isMemberStatus(statusRaw) ? statusRaw : 'inactivo'
  const name =
    (row.full_name && row.full_name.trim()) ||
    (row.email ? row.email.split('@')[0] : null) ||
    'Miembro'
  const joinedAt = row.created_at
    ? row.created_at.slice(0, 10)
    : new Date().toISOString().slice(0, 10)

  return {
    id: row.id,
    name,
    career: row.career?.trim() || '—',
    cycle: typeof row.cycle === 'number' && !Number.isNaN(row.cycle) ? row.cycle : 1,
    area,
    bio: row.bio?.trim() || undefined,
    github: row.github_url?.trim() || undefined,
    linkedin: row.linkedin_url?.trim() || undefined,
    status,
    joinedAt,
  }
}

export async function fetchActiveProfiles(): Promise<MemberProfile[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'id, full_name, email, career, cycle, area, status, bio, github_url, linkedin_url, created_at',
    )
    .eq('status', 'activo')
    .order('full_name', { ascending: true, nullsFirst: false })
    .limit(500)

  if (error || !data) {
    console.error('fetchActiveProfiles', error)
    return []
  }

  return data.map((row) => mapProfileRow(row as Parameters<typeof mapProfileRow>[0]))
}

export async function fetchProfileByUserId(userId: string): Promise<MemberProfile | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'id, full_name, email, career, cycle, area, status, bio, github_url, linkedin_url, created_at',
    )
    .eq('id', userId)
    .maybeSingle()

  if (error || !data) {
    console.error('fetchProfileByUserId', error)
    return null
  }

  return mapProfileRow(data as Parameters<typeof mapProfileRow>[0])
}

export async function fetchRelatedMembers(
  area: MemberArea,
  excludeUserId: string,
  limit = 3,
): Promise<MemberProfile[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'id, full_name, email, career, cycle, area, status, bio, github_url, linkedin_url, created_at',
    )
    .eq('status', 'activo')
    .eq('area', area)
    .neq('id', excludeUserId)
    .limit(limit)

  if (error || !data) {
    console.error('fetchRelatedMembers', error)
    return []
  }

  return data.map((row) => mapProfileRow(row as Parameters<typeof mapProfileRow>[0]))
}

export async function fetchPublishedNews(): Promise<NewsPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news')
    .select('id, slug, title, excerpt, content, category, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(100)

  if (error || !data) {
    console.error('fetchPublishedNews', error)
    return []
  }

  return data
    .map((row) => {
      const catRaw = String(row.category ?? 'update')
      const category: NewsCategory = isNewsCategory(catRaw) ? catRaw : 'update'
      const published = row.published_at as string | null
      const date = published ? published.slice(0, 10) : new Date().toISOString().slice(0, 10)
      return {
        id: String(row.id),
        slug: String(row.slug),
        title: String(row.title),
        excerpt: String(row.excerpt ?? ''),
        content: String(row.content ?? ''),
        category,
        date,
        author: 'Computer Science Hub',
      } satisfies NewsPost
    })
    .filter((p) => p.slug)
}

export async function fetchNewsBySlug(slug: string): Promise<NewsPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news')
    .select('id, slug, title, excerpt, content, category, published_at')
    .eq('published', true)
    .eq('slug', slug)
    .maybeSingle()

  if (error || !data) {
    if (error) console.error('fetchNewsBySlug', error)
    return null
  }

  const catRaw = String(data.category ?? 'update')
  const category: NewsCategory = isNewsCategory(catRaw) ? catRaw : 'update'
  const published = data.published_at as string | null
  const date = published ? published.slice(0, 10) : new Date().toISOString().slice(0, 10)

  return {
    id: String(data.id),
    slug: String(data.slug),
    title: String(data.title),
    excerpt: String(data.excerpt ?? ''),
    content: String(data.content ?? ''),
    category,
    date,
    author: 'Computer Science Hub',
  }
}

export async function fetchPublishedEvents(): Promise<HubEvent[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('events')
    .select(
      'id, title, description, event_date, event_time, speaker, type, location, registration_url',
    )
    .eq('published', true)
    .order('event_date', { ascending: true })
    .limit(200)

  if (error || !data) {
    console.error('fetchPublishedEvents', error)
    return []
  }

  return data.map((row) => {
    const typeRaw = String(row.type ?? 'otro')
    const type: HubEventType = isHubEventType(typeRaw) ? typeRaw : 'otro'
    const dateStr = row.event_date as string
    return {
      id: String(row.id),
      title: String(row.title),
      description: String(row.description ?? ''),
      date: dateStr,
      time: String(row.event_time ?? '00:00'),
      speaker: row.speaker ? String(row.speaker) : undefined,
      type,
      location: String(row.location ?? ''),
      registrationUrl: row.registration_url ? String(row.registration_url) : undefined,
    }
  })
}

export type OpportunityRow = {
  id: string
  title: string
  organization: string
  description: string
  url: string
  type: string
}

export async function fetchPublishedOpportunities(): Promise<OpportunityRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('opportunities')
    .select('id, title, organization, description, url, type')
    .eq('published', true)
    .order('title', { ascending: true })
    .limit(200)

  if (error || !data) {
    console.error('fetchPublishedOpportunities', error)
    return []
  }

  return data.map((row) => ({
    id: String(row.id),
    title: String(row.title),
    organization: String(row.organization),
    description: String(row.description ?? ''),
    url: String(row.url ?? '#'),
    type: String(row.type ?? ''),
  }))
}

export type ResourceRow = {
  id: string
  title: string
  description: string
  url: string
  category: string
  tags: string[]
}

export async function fetchPublishedResources(): Promise<ResourceRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('resources')
    .select('id, title, description, url, category, tags')
    .eq('published', true)
    .order('title', { ascending: true })
    .limit(200)

  if (error || !data) {
    console.error('fetchPublishedResources', error)
    return []
  }

  return data.map((row) => ({
    id: String(row.id),
    title: String(row.title),
    description: String(row.description ?? ''),
    url: String(row.url ?? '#'),
    category: String(row.category ?? 'computacion'),
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
  }))
}

export async function fetchUserEventRegistrations(userId: string): Promise<string[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('event_registrations')
    .select('event_id')
    .eq('user_id', userId)

  if (error || !data) {
    console.error('fetchUserEventRegistrations', error)
    return []
  }

  return data.map((r) => String(r.event_id))
}

export async function fetchActiveSponsors(): Promise<Sponsor[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('sponsors')
    .select('id, name, logo_url, website_url, tier')
    .eq('active', true)
    .order('name', { ascending: true })
    .limit(50)

  if (error || !data) {
    console.error('fetchActiveSponsors', error)
    return []
  }

  return data.map((row) => {
    const tierRaw = String(row.tier ?? 'aliado')
    const tier: SponsorTier = isSponsorTier(tierRaw) ? tierRaw : 'aliado'
    return {
      id: String(row.id),
      name: String(row.name),
      logoUrl: row.logo_url ? String(row.logo_url) : '',
      url: String(row.website_url ?? '#'),
      tier,
    }
  })
}
