export type MemberArea =
  | 'frontend'
  | 'backend'
  | 'diseño'
  | 'devops'
  | 'ia'
  | 'seguridad'
  | 'general'

export type MemberStatus = 'activo' | 'inactivo'

export interface MemberProfile {
  id: string
  name: string
  career: string
  cycle: number
  area: MemberArea
  bio?: string
  github?: string
  linkedin?: string
  status: MemberStatus
  joinedAt: string
  onboardingCompleted: boolean
  reputationScore: number
}

export type NewsCategory = 'anuncio' | 'logro' | 'evento' | 'update'

export interface NewsPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: NewsCategory
  date: string
  author: string
}

export type HubEventType = 'workshop' | 'charla' | 'hackathon' | 'copa' | 'networking' | 'otro'

export interface HubEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  speaker?: string
  type: HubEventType
  location: string
  registrationUrl?: string
}

export type SponsorTier = 'principal' | 'colaborador' | 'aliado'

export interface Sponsor {
  id: string
  name: string
  logoUrl: string
  url: string
  tier: SponsorTier
}

