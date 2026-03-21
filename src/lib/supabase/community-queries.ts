import { createClient } from '@/src/lib/supabase/server'

export type HubDocumentRow = {
  id: string
  title: string
  description: string | null
  url: string
  category: string
  sort_order: number
}

export type PodcastEpisodeRow = {
  id: string
  title: string
  summary: string | null
  episode_url: string
  platform: string
  published_at: string | null
  sort_order: number
}

export type ResearchPublicationRow = {
  id: string
  title: string
  authors: string | null
  venue: string | null
  year: number | null
  url: string | null
  sort_order: number
}

export type LeaderboardRow = {
  id: string
  display_name: string
  points: number
  badge: string | null
  area: string | null
  sort_order: number
}

export type CommunityIdeaRow = {
  id: string
  title: string
  description: string | null
  vote_count: number
  created_at: string
}

export type TutoringRequestRow = {
  id: string
  topic: string
  details: string | null
  preferred_schedule: string | null
  status: string
  created_at: string
}

export type MentorProfileRow = {
  user_id: string
  role: string
  topics: string | null
  availability: string | null
  bio_short: string | null
  display_name?: string
}

export async function fetchHubDocuments(): Promise<HubDocumentRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hub_documents')
    .select('id, title, description, url, category, sort_order')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .limit(100)

  if (error) {
    console.error('fetchHubDocuments', error)
    return []
  }
  return (data ?? []) as HubDocumentRow[]
}

export async function fetchPodcastEpisodes(): Promise<PodcastEpisodeRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('podcast_episodes')
    .select('id, title, summary, episode_url, platform, published_at, sort_order')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .limit(100)

  if (error) {
    console.error('fetchPodcastEpisodes', error)
    return []
  }
  return (data ?? []) as PodcastEpisodeRow[]
}

export async function fetchResearchPublications(): Promise<ResearchPublicationRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('research_publications')
    .select('id, title, authors, venue, year, url, sort_order')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .limit(100)

  if (error) {
    console.error('fetchResearchPublications', error)
    return []
  }
  return (data ?? []) as ResearchPublicationRow[]
}

export async function fetchLeaderboard(): Promise<LeaderboardRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('community_leaderboard')
    .select('id, display_name, points, badge, area, sort_order')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .limit(100)

  if (error) {
    console.error('fetchLeaderboard', error)
    return []
  }
  return (data ?? []) as LeaderboardRow[]
}

export async function fetchCommunityIdeas(): Promise<CommunityIdeaRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('community_ideas')
    .select('id, title, description, vote_count, created_at')
    .eq('status', 'open')
    .order('vote_count', { ascending: false })
    .limit(200)

  if (error) {
    console.error('fetchCommunityIdeas', error)
    return []
  }
  return (data ?? []) as CommunityIdeaRow[]
}

export async function fetchIdeaVotesForUser(userId: string): Promise<Set<string>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('community_idea_votes')
    .select('idea_id')
    .eq('user_id', userId)
    .limit(500)

  if (error || !data) {
    return new Set()
  }
  return new Set(data.map((r) => r.idea_id as string))
}

export async function fetchTutoringRequestsForUser(userId: string): Promise<TutoringRequestRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tutoring_requests')
    .select('id, topic, details, preferred_schedule, status, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('fetchTutoringRequestsForUser', error)
    return []
  }
  return (data ?? []) as TutoringRequestRow[]
}

export type MentorOwnProfileRow = {
  user_id: string
  role: string
  topics: string | null
  availability: string | null
  bio_short: string | null
  active: boolean
}

export async function fetchMentorProfileForUser(userId: string): Promise<MentorOwnProfileRow | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('mentor_matching_profiles')
    .select('user_id, role, topics, availability, bio_short, active')
    .eq('user_id', userId)
    .maybeSingle()

  if (error || !data) return null
  return {
    user_id: data.user_id as string,
    role: data.role as string,
    topics: data.topics as string | null,
    availability: data.availability as string | null,
    bio_short: data.bio_short as string | null,
    active: Boolean(data.active),
  }
}

export async function fetchMentorDirectory(): Promise<MentorProfileRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('mentor_matching_profiles')
    .select('user_id, role, topics, availability, bio_short')
    .eq('active', true)
    .in('role', ['mentor', 'both'])
    .limit(200)

  if (error || !data) {
    console.error('fetchMentorDirectory', error)
    return []
  }

  const ids = data.map((r) => r.user_id as string)
  if (ids.length === 0) return []

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name')
    .in('id', ids)
    .eq('status', 'activo')

  const nameById = new Map((profiles ?? []).map((p) => [p.id as string, (p.full_name as string) || 'Miembro']))

  return data.map((row) => ({
    user_id: row.user_id as string,
    role: row.role as string,
    topics: row.topics as string | null,
    availability: row.availability as string | null,
    bio_short: row.bio_short as string | null,
    display_name: nameById.get(row.user_id as string),
  }))
}
