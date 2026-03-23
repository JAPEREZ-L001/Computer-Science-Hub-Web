'use client'

import { useState } from 'react'

import {
  submitNewUserSurvey,
  submitReturningUserSurvey,
} from '@/app/actions/betatester-survey'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

type SurveyType = 'nuevo' | 'recurrente'

type NewSurveyForm = {
  role: 'estudiante_computacion' | 'profesional_tecnico' | 'no_tecnico' | 'otro'
  roleOther: string
  device: 'laptop_desktop' | 'telefono' | 'tablet'
  familiarity: 'no_conocia' | 'solo_nombre' | 'conocimiento_general' | 'conocimiento_alto'
  homeOfferSummary: string
  homeValueClarity: number
  homeNextStepClarity: number
  homeNextAction:
    | 'registrarme_login'
    | 'ver_recursos'
    | 'ver_eventos'
    | 'explorar_comunidad'
    | 'no_supe'
  suggestedPathScore: number
  suggestedPathImprove: string
  firstPublicRoute: 'eventos' | 'recursos' | 'oportunidades' | 'noticias' | 'nosotros'
  routeUtilityScore: number
  routeTrustScore: number
  missingTrust: string
  registerProbability: number
  registerBarrier:
    | 'no_valor_suficiente'
    | 'no_entendi_beneficios'
    | 'no_tengo_tiempo'
    | 'desconfianza'
    | 'otro'
  registerMotivator: 'tutorias' | 'mentorias' | 'eventos' | 'recursos_curados' | 'networking' | 'otro'
  topNewUserImprovement: string
}

type ReturningSurveyForm = {
  overallComparedToPrevious: 'mucho_mejor' | 'mejor' | 'igual' | 'peor'
  mostImprovedArea:
    | 'claridad_mensaje'
    | 'navegacion'
    | 'diseno_visual'
    | 'rendimiento_responsive'
    | 'sin_cambios'
  pendingAspect: string
  testedLoginRegister: boolean
  loginEase: number
  loginOutcome: 'completado' | 'parcial' | 'no_completado'
  testedOnboarding: boolean
  onboardingProgressClarity: number
  onboardingMainFriction:
    | 'no_entendi_que_hacer'
    | 'flujo_largo'
    | 'problemas_tecnicos'
    | 'falta_valor_percibido'
    | 'otro'
  usedCommunityHub: boolean
  mainCommunityModule: 'ideas' | 'tutorias' | 'mentores' | 'beneficios'
  completedCommunityAction:
    | 'crear_idea'
    | 'votar_idea'
    | 'solicitar_tutoria'
    | 'revisar_mentores'
    | 'ninguna'
  communityNextStepClarity: number
  mainCommunityBlocker:
    | 'falta_tiempo'
    | 'no_entendi_siguiente_paso'
    | 'poco_contenido_actividad'
    | 'no_vi_beneficio'
    | 'otro'
  visitedContentRoutes: Array<'eventos' | 'recursos' | 'oportunidades' | 'noticias'>
  returnMostMotivatingRoute: 'eventos' | 'recursos' | 'oportunidades' | 'noticias'
  completedValueAction: 'si' | 'parcial' | 'no'
  weeklyReturnProbability: number
  topThreeSprintImprovements: string[]
  poFirstChange: string
}

function ScoreField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-10 w-full rounded-md border border-white/15 bg-zinc-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20 [color-scheme:dark]"
      >
        {[1, 2, 3, 4, 5].map((v) => (
          <option key={v} value={v} className="bg-zinc-900 text-white">
            {v}
          </option>
        ))}
      </select>
    </div>
  )
}

export function BetatesterSurveyForm() {
  const { toast } = useToast()
  const [pending, setPending] = useState(false)
  const [surveyType, setSurveyType] = useState<SurveyType>('nuevo')

  const [commonValueClarity, setCommonValueClarity] = useState(4)
  const [commonSiteUtility, setCommonSiteUtility] = useState(4)
  const [commonRecommendProbability, setCommonRecommendProbability] = useState(4)
  const [commonMostValuableModule, setCommonMostValuableModule] = useState('')
  const [commonPriorityImprovement, setCommonPriorityImprovement] = useState('')

  const [newSurvey, setNewSurvey] = useState<NewSurveyForm>({
    role: 'estudiante_computacion',
    roleOther: '',
    device: 'laptop_desktop',
    familiarity: 'no_conocia',
    homeOfferSummary: '',
    homeValueClarity: 4,
    homeNextStepClarity: 4,
    homeNextAction: 'registrarme_login',
    suggestedPathScore: 4,
    suggestedPathImprove: '',
    firstPublicRoute: 'eventos',
    routeUtilityScore: 4,
    routeTrustScore: 4,
    missingTrust: '',
    registerProbability: 4,
    registerBarrier: 'no_valor_suficiente',
    registerMotivator: 'eventos',
    topNewUserImprovement: '',
  })

  const [returningSurvey, setReturningSurvey] = useState<ReturningSurveyForm>({
    overallComparedToPrevious: 'mejor',
    mostImprovedArea: 'claridad_mensaje',
    pendingAspect: '',
    testedLoginRegister: true,
    loginEase: 4,
    loginOutcome: 'completado',
    testedOnboarding: true,
    onboardingProgressClarity: 4,
    onboardingMainFriction: 'flujo_largo',
    usedCommunityHub: true,
    mainCommunityModule: 'ideas',
    completedCommunityAction: 'ninguna',
    communityNextStepClarity: 4,
    mainCommunityBlocker: 'falta_tiempo',
    visitedContentRoutes: ['eventos'],
    returnMostMotivatingRoute: 'eventos',
    completedValueAction: 'parcial',
    weeklyReturnProbability: 4,
    topThreeSprintImprovements: ['simplificar_home'],
    poFirstChange: '',
  })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)

    if (!commonMostValuableModule.trim() || !commonPriorityImprovement.trim()) {
      setPending(false)
      toast({
        variant: 'destructive',
        title: 'Campos pendientes',
        description: 'Completá las preguntas del bloque común de valor.',
      })
      return
    }

    let result: { ok: true } | { ok: false; message: string }

    if (surveyType === 'nuevo') {
      result = await submitNewUserSurvey({
        ...newSurvey,
        commonValueClarity,
        commonSiteUtility,
        commonRecommendProbability,
        commonMostValuableModule,
        commonPriorityImprovement,
      })
    } else {
      result = await submitReturningUserSurvey({
        ...returningSurvey,
        topThreeSprintImprovements: returningSurvey.topThreeSprintImprovements as Array<
          | 'simplificar_home'
          | 'mejorar_onboarding'
          | 'mejorar_perfil_hub'
          | 'mas_actividad_comunidad'
          | 'mejorar_eventos_conversion'
          | 'mejorar_recursos_oportunidades'
          | 'mejoras_mobile_responsive'
        >,
        commonValueClarity,
        commonSiteUtility,
        commonRecommendProbability,
        commonMostValuableModule,
        commonPriorityImprovement,
      })
    }

    setPending(false)

    if (!result.ok) {
      toast({ variant: 'destructive', title: 'No se pudo enviar', description: result.message })
      return
    }

    toast({ title: 'Gracias', description: 'Tu encuesta fue enviada correctamente.' })
    setCommonMostValuableModule('')
    setCommonPriorityImprovement('')
  }

  const selectBaseClass =
    'h-10 w-full rounded-md border border-white/15 bg-zinc-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20 [color-scheme:dark]'

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-2">
        <Label htmlFor="survey-type">Tipo de participante</Label>
        <select
          id="survey-type"
          value={surveyType}
          onChange={(e) => setSurveyType(e.target.value as SurveyType)}
          className={selectBaseClass}
        >
          <option value="nuevo" className="bg-zinc-900 text-white">
            Soy usuario nuevo
          </option>
          <option value="recurrente" className="bg-zinc-900 text-white">
            Ya respondí la encuesta anterior
          </option>
        </select>
      </div>

      {surveyType === 'nuevo' ? (
        <section className="space-y-4 rounded-xl border border-white/[0.08] p-4">
          <h2 className="font-semibold text-white">Sección usuarios nuevos</h2>
          <div className="grid gap-2">
            <Label>Rol principal</Label>
            <select
              value={newSurvey.role}
              onChange={(e) =>
                setNewSurvey((s) => ({ ...s, role: e.target.value as NewSurveyForm['role'] }))
              }
              className={selectBaseClass}
            >
              <option value="estudiante_computacion" className="bg-zinc-900 text-white">Estudiante de computación</option>
              <option value="profesional_tecnico" className="bg-zinc-900 text-white">Profesional técnico</option>
              <option value="no_tecnico" className="bg-zinc-900 text-white">Perfil no técnico</option>
              <option value="otro" className="bg-zinc-900 text-white">Otro</option>
            </select>
          </div>
          {newSurvey.role === 'otro' && (
            <div className="grid gap-2">
              <Label htmlFor="role-other">Especifica tu rol</Label>
              <Input
                id="role-other"
                value={newSurvey.roleOther}
                onChange={(e) => setNewSurvey((s) => ({ ...s, roleOther: e.target.value }))}
                className="bg-white/[0.03] border-white/[0.08]"
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="home-offer">En una frase, ¿qué ofrece CSH?</Label>
            <Textarea
              id="home-offer"
              rows={3}
              value={newSurvey.homeOfferSummary}
              onChange={(e) => setNewSurvey((s) => ({ ...s, homeOfferSummary: e.target.value }))}
              className="bg-white/[0.03] border-white/[0.08]"
              required
            />
          </div>
          <ScoreField
            id="home-clarity"
            label="Claridad de propuesta de valor en home"
            value={newSurvey.homeValueClarity}
            onChange={(v) => setNewSurvey((s) => ({ ...s, homeValueClarity: v }))}
          />
          <ScoreField
            id="register-probability"
            label="Probabilidad de crear cuenta hoy"
            value={newSurvey.registerProbability}
            onChange={(v) => setNewSurvey((s) => ({ ...s, registerProbability: v }))}
          />
          <div className="grid gap-2">
            <Label htmlFor="new-improvement">Mejora #1 para usuarios nuevos</Label>
            <Textarea
              id="new-improvement"
              rows={3}
              value={newSurvey.topNewUserImprovement}
              onChange={(e) =>
                setNewSurvey((s) => ({ ...s, topNewUserImprovement: e.target.value }))
              }
              className="bg-white/[0.03] border-white/[0.08]"
              required
            />
          </div>
        </section>
      ) : (
        <section className="space-y-4 rounded-xl border border-white/[0.08] p-4">
          <h2 className="font-semibold text-white">Sección usuarios recurrentes</h2>
          <div className="grid gap-2">
            <Label>Comparación respecto a ronda anterior</Label>
            <select
              value={returningSurvey.overallComparedToPrevious}
              onChange={(e) =>
                setReturningSurvey((s) => ({
                  ...s,
                  overallComparedToPrevious: e.target.value as ReturningSurveyForm['overallComparedToPrevious'],
                }))
              }
              className={selectBaseClass}
            >
              <option value="mucho_mejor" className="bg-zinc-900 text-white">Mucho mejor</option>
              <option value="mejor" className="bg-zinc-900 text-white">Mejor</option>
              <option value="igual" className="bg-zinc-900 text-white">Igual</option>
              <option value="peor" className="bg-zinc-900 text-white">Peor</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pending-aspect">Aspecto principal pendiente</Label>
            <Textarea
              id="pending-aspect"
              rows={3}
              value={returningSurvey.pendingAspect}
              onChange={(e) => setReturningSurvey((s) => ({ ...s, pendingAspect: e.target.value }))}
              className="bg-white/[0.03] border-white/[0.08]"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="used-community"
              type="checkbox"
              checked={returningSurvey.usedCommunityHub}
              onChange={(e) =>
                setReturningSurvey((s) => ({ ...s, usedCommunityHub: e.target.checked }))
              }
            />
            <Label htmlFor="used-community">Entré al hub de comunidad</Label>
          </div>
          <ScoreField
            id="weekly-return"
            label="Probabilidad de volver semanalmente"
            value={returningSurvey.weeklyReturnProbability}
            onChange={(v) => setReturningSurvey((s) => ({ ...s, weeklyReturnProbability: v }))}
          />
          <div className="grid gap-2">
            <Label htmlFor="po-change">Sí fueras Miembro de CSH, ¿qué te gustaría cambiar primero?</Label>
            <Textarea
              id="po-change"
              rows={3}
              value={returningSurvey.poFirstChange}
              onChange={(e) => setReturningSurvey((s) => ({ ...s, poFirstChange: e.target.value }))}
              className="bg-white/[0.03] border-white/[0.08]"
              required
            />
          </div>
        </section>
      )}

      <section className="space-y-4 rounded-xl border border-sky-400/30 bg-sky-500/[0.04] p-4">
        <h2 className="font-semibold text-sky-200">Bloque común de valor (todos responden)</h2>
        <ScoreField
          id="common-clarity"
          label="Claridad de la propuesta de valor general"
          value={commonValueClarity}
          onChange={setCommonValueClarity}
        />
        <ScoreField
          id="common-utility"
          label="Utilidad real percibida del sitio"
          value={commonSiteUtility}
          onChange={setCommonSiteUtility}
        />
        <ScoreField
          id="common-recommend"
          label="Probabilidad de recomendar CSH"
          value={commonRecommendProbability}
          onChange={setCommonRecommendProbability}
        />
        <div className="grid gap-2">
          <Label htmlFor="common-module">Módulo o ruta de mayor valor percibido</Label>
          <Input
            id="common-module"
            value={commonMostValuableModule}
            onChange={(e) => setCommonMostValuableModule(e.target.value)}
            className="bg-white/[0.03] border-white/[0.08]"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="common-improvement">Mejora prioritaria #1</Label>
          <Textarea
            id="common-improvement"
            rows={3}
            value={commonPriorityImprovement}
            onChange={(e) => setCommonPriorityImprovement(e.target.value)}
            className="bg-white/[0.03] border-white/[0.08]"
            required
          />
        </div>
      </section>

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? 'Enviando encuesta...' : 'Enviar encuesta betatester'}
      </Button>
    </form>
  )
}
