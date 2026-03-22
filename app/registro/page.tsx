'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AuthCard } from '@/components/auth-card'
import { InputField } from '@/components/input-field'
import { PasswordInput } from '@/components/password-input'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/hooks/use-toast'
import { createClient } from '@/src/lib/supabase/client'
import { getPublicSiteUrl } from '@/src/lib/site-url'

function safeRedirectPath(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) {
    return '/perfil'
  }
  return raw
}

const careerOptions = [
  'Ing. en Ciencias de la Computación',
  'Licenciatura en Ingeniería de Software',
  'Ing. en Sistemas Informáticos',
  'Licenciatura en Diseño de Experiencias Digitales',
] as const

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Ingresa tu nombre completo'),
    email: z.string().email('Ingresa un email válido'),
    career: z.enum(careerOptions),
    cycle: z.coerce
      .number()
      .int('El ciclo debe ser un número entero')
      .min(1, 'El ciclo debe estar entre 1 y 10')
      .max(10, 'El ciclo debe estar entre 1 y 10'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirma tu contraseña'),
    acceptTerms: z.boolean().refine((v) => v === true, {
      message: 'Debes aceptar los términos para continuar',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  })

type RegisterValues = z.infer<typeof registerSchema>

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = safeRedirectPath(searchParams.get('redirect'))
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      career: careerOptions[0],
      cycle: 1,
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    mode: 'onSubmit',
  })

  const onSubmit = async (values: RegisterValues) => {
    const supabase = createClient()
    const origin = getPublicSiteUrl()

    const { data, error } = await supabase.auth.signUp({
      email: values.email.trim(),
      password: values.password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          full_name: values.fullName.trim(),
          career: values.career,
          cycle: values.cycle,
          area: 'general',
        },
      },
    })

    if (error) {
      const isRateLimit =
        error.status === 429 ||
        error.message?.toLowerCase().includes('security purposes') ||
        error.message?.toLowerCase().includes('rate limit')

      toast({
        variant: 'destructive',
        title: isRateLimit ? 'Demasiados intentos' : 'No se pudo registrar',
        description: isRateLimit
          ? 'Por seguridad, esperá un momento antes de intentar nuevamente.'
          : error.message,
      })
      return
    }

    if (data.session) {
      router.refresh()
      router.push(redirectTo)
      return
    }

    toast({
      title: '✉️ Confirmá tu correo',
      description:
        'Te enviamos un email de confirmación desde noreply@send.cshdevs.org. Revisá tu bandeja de entrada y confirmá tu cuenta para poder iniciar sesión.',
    })
  }

  const inputFormStyleOverrides = "[&_label]:text-[10px] [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-[0.2em] [&_label]:text-white/50 [&_input]:h-12 [&_input]:rounded-2xl [&_input]:border-white/[0.08] [&_input]:bg-black/40 [&_input]:text-sm [&_input]:font-medium [&_input]:text-white [&_input]:placeholder-white/20 [&_input:focus]:border-white/30 [&_input:focus]:bg-white/[0.02] [&_input:focus]:ring-4 [&_input:focus]:ring-white/[0.05] [&_input]:transition-all"

  return (
    <div className="w-full max-w-md">
      <div className="mb-10 flex flex-col items-center justify-center gap-4">
        <Image
          src="/logo/logo-delta-dark.svg"
          alt="CSH Logo"
          width={48}
          height={48}
          className="h-12 w-12 object-contain"
          priority
        />
        <div className="text-center">
          <p className="font-bold tracking-[0.25em] text-[11px] uppercase text-white/90">
            Computer Science Hub
          </p>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">Inscripción Oficial</p>
        </div>
      </div>

      <AuthCard title="Crea tu cuenta" description="Sé parte de la nueva red de ingenieros.">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className={inputFormStyleOverrides}>
            <InputField
              label="Nombre completo"
              id="register-fullName"
              placeholder="Ej. Ana María López"
              error={errors.fullName?.message}
              autoComplete="name"
              {...register('fullName')}
            />
          </div>

          <div className={inputFormStyleOverrides}>
            <InputField
              label="Correo institucional"
              id="register-email"
              type="email"
              placeholder="alumno@udb.edu.sv"
              error={errors.email?.message}
              autoComplete="email"
              {...register('email')}
            />
          </div>

          <div className="grid gap-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 ml-1" htmlFor="register-career">
              Carrera
            </label>
            <select
              id="register-career"
              className={`h-12 w-full rounded-2xl border bg-black/40 px-4 text-sm font-medium text-white transition-all focus:border-white/30 focus:bg-white/[0.02] focus:outline-none focus:ring-4 focus:ring-white/[0.05] ${
                errors.career ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.08]'
              }`}
              {...register('career')}
            >
              {careerOptions.map((c) => (
                <option key={c} value={c} className="bg-[#0A0A0A] text-white py-2">
                  {c}
                </option>
              ))}
            </select>
            {errors.career ? (
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mt-1 ml-1" role="alert">
                {errors.career.message}
              </p>
            ) : null}
          </div>

          <div className={inputFormStyleOverrides}>
            <InputField
              label="Ciclo actual (1-10)"
              id="register-cycle"
              type="number"
              placeholder="Ej. 4"
              error={errors.cycle?.message}
              inputMode="numeric"
              {...register('cycle')}
            />
          </div>

          <div className={inputFormStyleOverrides}>
            <PasswordInput
              label="Contraseña segura"
              placeholder="Mínimo 6 caracteres"
              error={errors.password?.message}
              inputProps={register('password')}
            />
          </div>

          <div className={inputFormStyleOverrides}>
            <PasswordInput
              label="Confirmar contraseña"
              placeholder="Repite tu contraseña secreta"
              error={errors.confirmPassword?.message}
              inputProps={register('confirmPassword')}
            />
          </div>

          <div className="grid gap-2 border-t border-white/[0.06] pt-6 mt-4">
            <label className="flex items-start gap-3 text-xs leading-relaxed font-medium text-white/40 hover:text-white/60 transition-colors cursor-pointer">
              <input 
                type="checkbox" 
                className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-black/40 text-emerald-500 focus:ring-emerald-500/20" 
                {...register('acceptTerms')} 
              />
              Confirmo que pertenezco a la comunidad estudiantil de Ciencias de la Computación de la Universidad Don Bosco.
            </label>
            {errors.acceptTerms ? (
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mt-1" role="alert">
                {errors.acceptTerms.message}
              </p>
            ) : null}
          </div>

          <button 
            type="submit" 
            className="btn-press flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D] transition-transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:hover:scale-100 mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner className="h-4 w-4 bg-black" /> : null}
            Crear mi cuenta de acceso
          </button>

          <div className="flex flex-col gap-4 text-center mt-6">
            <Link
              href="/login"
              className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/30 hover:text-white/70 transition-colors"
            >
              ¿Ya tienes cuenta? Inicia sesión aquí
            </Link>
          </div>
        </form>
      </AuthCard>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-24">
        <Suspense
          fallback={
            <div className="flex w-full max-w-md justify-center py-12">
              <Spinner className="h-8 w-8 text-white/20" />
            </div>
          }
        >
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  )
}
