import { createClient } from '@/src/lib/supabase/server'

export type NewsAdminRow = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string | null
  category: string
  published: boolean
  published_at: string | null
}

export type EventAdminRow = {
  id: string
  title: string
  description: string | null
  event_date: string
  event_time: string | null
  speaker: string | null
  type: string
  location: string | null
  registration_url: string | null
  published: boolean
}

export type OpportunityAdminRow = {
  id: string
  title: string
  organization: string
  description: string | null
  url: string | null
  type: string
  published: boolean
}

export type ResourceAdminRow = {
  id: string
  title: string
  description: string | null
  url: string | null
  category: string
  tags: string[] | null
  published: boolean
}

export type SponsorAdminRow = {
  id: string
  name: string
  logo_url: string | null
  website_url: string | null
  tier: string
  active: boolean
}

export type ProfileAdminRow = {
  id: string
  full_name: string | null
  email: string | null
  career: string | null
  cycle: number | null
  area: string | null
  status: string | null
  role: string | null
  bio: string | null
  github_url: string | null
  linkedin_url: string | null
  created_at: string | null
}

export async function adminListNews(): Promise<NewsAdminRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news')
    .select('id, slug, title, excerpt, content, category, published, published_at')
    .order('published_at', { ascending: false, nullsFirst: true })

  if (error) {
    console.error('adminListNews', error)
    return []
  }
  return (data ?? []) as NewsAdminRow[]
}

export async function adminListEvents(): Promise<EventAdminRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('events')
    .select(
      'id, title, description, event_date, event_time, speaker, type, location, registration_url, published',
    )
    .order('event_date', { ascending: false })

  if (error) {
    console.error('adminListEvents', error)
    return []
  }
  return (data ?? []) as EventAdminRow[]
}

export async function adminListOpportunities(): Promise<OpportunityAdminRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('opportunities')
    .select('id, title, organization, description, url, type, published')
    .order('title', { ascending: true })

  if (error) {
    console.error('adminListOpportunities', error)
    return []
  }
  return (data ?? []) as OpportunityAdminRow[]
}

export async function adminListResources(): Promise<ResourceAdminRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('resources')
    .select('id, title, description, url, category, tags, published')
    .order('title', { ascending: true })

  if (error) {
    console.error('adminListResources', error)
    return []
  }
  return (data ?? []) as ResourceAdminRow[]
}

export async function adminListSponsors(): Promise<SponsorAdminRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('sponsors')
    .select('id, name, logo_url, website_url, tier, active')
    .order('name', { ascending: true })

  if (error) {
    console.error('adminListSponsors', error)
    return []
  }
  return (data ?? []) as SponsorAdminRow[]
}

export async function adminListProfiles(): Promise<ProfileAdminRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'id, full_name, email, career, cycle, area, status, role, bio, github_url, linkedin_url, created_at',
    )
    .order('created_at', { ascending: false, nullsFirst: true })

  if (error) {
    console.error('adminListProfiles', error)
    return []
  }
  return (data ?? []) as ProfileAdminRow[]
}

export async function adminCounts() {
  const supabase = await createClient()
  const [news, events, opps, resources, sponsors, profiles] = await Promise.all([
    supabase.from('news').select('id', { count: 'exact', head: true }),
    supabase.from('events').select('id', { count: 'exact', head: true }),
    supabase.from('opportunities').select('id', { count: 'exact', head: true }),
    supabase.from('resources').select('id', { count: 'exact', head: true }),
    supabase.from('sponsors').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
  ])
  return {
    news: news.count ?? 0,
    events: events.count ?? 0,
    opportunities: opps.count ?? 0,
    resources: resources.count ?? 0,
    sponsors: sponsors.count ?? 0,
    profiles: profiles.count ?? 0,
  }
}
