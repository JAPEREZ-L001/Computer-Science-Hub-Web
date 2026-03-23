'use server'

import { z } from 'zod'

import { createClient } from '@/src/lib/supabase/server'

const newSurveySchema = z.object({
  role: z.enum(['estudiante_computacion', 'profesional_tecnico', 'no_tecnico', 'otro']),
  roleOther: z.string().trim().max(150).optional(),
  device: z.enum(['laptop_desktop', 'telefono', 'tablet']),
  familiarity: z.enum(['no_conocia', 'solo_nombre', 'conocimiento_general', 'conocimiento_alto']),
  homeOfferSummary: z.string().trim().min(2).max(500),
  homeValueClarity: z.number().int().min(1).max(5),
  homeNextStepClarity: z.number().int().min(1).max(5),
  homeNextAction: z.enum(['registrarme_login', 'ver_recursos', 'ver_eventos', 'explorar_comunidad', 'no_supe']),
  suggestedPathScore: z.number().int().min(1).max(5),
  suggestedPathImprove: z.string().trim().max(500).optional(),
  firstPublicRoute: z.enum(['eventos', 'recursos', 'oportunidades', 'noticias', 'nosotros']),
  routeUtilityScore: z.number().int().min(1).max(5),
  routeTrustScore: z.number().int().min(1).max(5),
  missingTrust: z.string().trim().max(600).optional(),
  registerProbability: z.number().int().min(1).max(5),
  registerBarrier: z.enum([
    'no_valor_suficiente',
    'no_entendi_beneficios',
    'no_tengo_tiempo',
    'desconfianza',
    'otro',
  ]),
  registerMotivator: z.enum(['tutorias', 'mentorias', 'eventos', 'recursos_curados', 'networking', 'otro']),
  topNewUserImprovement: z.string().trim().min(2).max(600),
  commonValueClarity: z.number().int().min(1).max(5),
  commonSiteUtility: z.number().int().min(1).max(5),
  commonRecommendProbability: z.number().int().min(1).max(5),
  commonMostValuableModule: z.string().trim().min(2).max(200),
  commonPriorityImprovement: z.string().trim().min(2).max(600),
})

const returningSurveySchema = z.object({
  overallComparedToPrevious: z.enum(['mucho_mejor', 'mejor', 'igual', 'peor']),
  mostImprovedArea: z.enum([
    'claridad_mensaje',
    'navegacion',
    'diseno_visual',
    'rendimiento_responsive',
    'sin_cambios',
  ]),
  pendingAspect: z.string().trim().min(2).max(600),
  testedLoginRegister: z.boolean(),
  loginEase: z.number().int().min(1).max(5).optional(),
  loginOutcome: z.enum(['completado', 'parcial', 'no_completado']).optional(),
  testedOnboarding: z.boolean(),
  onboardingProgressClarity: z.number().int().min(1).max(5).optional(),
  onboardingMainFriction: z.enum([
    'no_entendi_que_hacer',
    'flujo_largo',
    'problemas_tecnicos',
    'falta_valor_percibido',
    'otro',
  ]).optional(),
  usedCommunityHub: z.boolean(),
  mainCommunityModule: z.enum(['ideas', 'tutorias', 'mentores', 'beneficios']).optional(),
  completedCommunityAction: z.enum([
    'crear_idea',
    'votar_idea',
    'solicitar_tutoria',
    'revisar_mentores',
    'ninguna',
  ]).optional(),
  communityNextStepClarity: z.number().int().min(1).max(5).optional(),
  mainCommunityBlocker: z.enum([
    'falta_tiempo',
    'no_entendi_siguiente_paso',
    'poco_contenido_actividad',
    'no_vi_beneficio',
    'otro',
  ]).optional(),
  visitedContentRoutes: z.array(z.enum(['eventos', 'recursos', 'oportunidades', 'noticias'])).min(1),
  returnMostMotivatingRoute: z.enum(['eventos', 'recursos', 'oportunidades', 'noticias']),
  completedValueAction: z.enum(['si', 'parcial', 'no']),
  weeklyReturnProbability: z.number().int().min(1).max(5),
  topThreeSprintImprovements: z.array(
    z.enum([
      'simplificar_home',
      'mejorar_onboarding',
      'mejorar_perfil_hub',
      'mas_actividad_comunidad',
      'mejorar_eventos_conversion',
      'mejorar_recursos_oportunidades',
      'mejoras_mobile_responsive',
    ]),
  ).min(1).max(3),
  poFirstChange: z.string().trim().min(2).max(700),
  commonValueClarity: z.number().int().min(1).max(5),
  commonSiteUtility: z.number().int().min(1).max(5),
  commonRecommendProbability: z.number().int().min(1).max(5),
  commonMostValuableModule: z.string().trim().min(2).max(200),
  commonPriorityImprovement: z.string().trim().min(2).max(600),
})

type NewSurveyInput = z.infer<typeof newSurveySchema>
type ReturningSurveyInput = z.infer<typeof returningSurveySchema>

export async function submitNewUserSurvey(input: NewSurveyInput) {
  const parsed = newSurveySchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false as const, message: 'Revisá los campos obligatorios de la encuesta.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const payload = {
    user_id: user?.is_anonymous ? null : user?.id ?? null,
    role: parsed.data.role,
    role_other: parsed.data.roleOther ?? null,
    device: parsed.data.device,
    familiarity: parsed.data.familiarity,
    home_offer_summary: parsed.data.homeOfferSummary,
    home_value_clarity: parsed.data.homeValueClarity,
    home_next_step_clarity: parsed.data.homeNextStepClarity,
    home_next_action: parsed.data.homeNextAction,
    suggested_path_score: parsed.data.suggestedPathScore,
    suggested_path_improve: parsed.data.suggestedPathImprove ?? null,
    first_public_route: parsed.data.firstPublicRoute,
    route_utility_score: parsed.data.routeUtilityScore,
    route_trust_score: parsed.data.routeTrustScore,
    missing_trust: parsed.data.missingTrust ?? null,
    register_probability: parsed.data.registerProbability,
    register_barrier: parsed.data.registerBarrier,
    register_motivator: parsed.data.registerMotivator,
    top_new_user_improvement: parsed.data.topNewUserImprovement,
    common_value_clarity: parsed.data.commonValueClarity,
    common_site_utility: parsed.data.commonSiteUtility,
    common_recommend_probability: parsed.data.commonRecommendProbability,
    common_most_valuable_module: parsed.data.commonMostValuableModule,
    common_priority_improvement: parsed.data.commonPriorityImprovement,
    cohort_tag: 'beta-cerrada',
  }

  const { error } = await supabase.from('betatester_survey_new_users').insert(payload)
  if (error) {
    console.error('submitNewUserSurvey', error)
    return { ok: false as const, message: 'No se pudo guardar tu encuesta. Intentá nuevamente.' }
  }

  return { ok: true as const }
}

export async function submitReturningUserSurvey(input: ReturningSurveyInput) {
  const parsed = returningSurveySchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false as const, message: 'Revisá los campos obligatorios de la encuesta.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const payload = {
    user_id: user?.is_anonymous ? null : user?.id ?? null,
    overall_compared_to_previous: parsed.data.overallComparedToPrevious,
    most_improved_area: parsed.data.mostImprovedArea,
    pending_aspect: parsed.data.pendingAspect,
    tested_login_register: parsed.data.testedLoginRegister,
    login_ease: parsed.data.loginEase ?? null,
    login_outcome: parsed.data.loginOutcome ?? null,
    tested_onboarding: parsed.data.testedOnboarding,
    onboarding_progress_clarity: parsed.data.onboardingProgressClarity ?? null,
    onboarding_main_friction: parsed.data.onboardingMainFriction ?? null,
    used_community_hub: parsed.data.usedCommunityHub,
    main_community_module: parsed.data.mainCommunityModule ?? null,
    completed_community_action: parsed.data.completedCommunityAction ?? null,
    community_next_step_clarity: parsed.data.communityNextStepClarity ?? null,
    main_community_blocker: parsed.data.mainCommunityBlocker ?? null,
    visited_content_routes: parsed.data.visitedContentRoutes,
    return_most_motivating_route: parsed.data.returnMostMotivatingRoute,
    completed_value_action: parsed.data.completedValueAction,
    weekly_return_probability: parsed.data.weeklyReturnProbability,
    top_three_sprint_improvements: parsed.data.topThreeSprintImprovements,
    po_first_change: parsed.data.poFirstChange,
    common_value_clarity: parsed.data.commonValueClarity,
    common_site_utility: parsed.data.commonSiteUtility,
    common_recommend_probability: parsed.data.commonRecommendProbability,
    common_most_valuable_module: parsed.data.commonMostValuableModule,
    common_priority_improvement: parsed.data.commonPriorityImprovement,
    cohort_tag: 'beta-cerrada',
  }

  const { error } = await supabase.from('betatester_survey_returning_users').insert(payload)
  if (error) {
    console.error('submitReturningUserSurvey', error)
    return { ok: false as const, message: 'No se pudo guardar tu encuesta. Intentá nuevamente.' }
  }

  return { ok: true as const }
}
