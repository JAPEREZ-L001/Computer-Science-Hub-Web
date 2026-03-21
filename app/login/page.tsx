'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { toast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Spinner } from '@/components/ui/spinner'

import { AuthCard } from '@/components/auth-card'
import { InputField } from '@/components/input-field'
import { PasswordInput } from '@/components/password-input'
import { createClient } from '@/src/lib/supabase/client'
import { getPublicSiteUrl } from '@/src/lib/site-url'

function safeRedirectPath(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) {
    return '/'
  }
  return raw
}

const loginSchema = z.object({
  email: z.string().email('Ingresa un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type LoginValues = z.infer<typeof loginSchema>

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = safeRedirectPath(searchParams.get('redirect'))
  const [resetSent, setResetSent] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)

  useEffect(() => {
    if (searchParams.get('error') === 'auth') {
      toast({
        variant: 'destructive',
        title: 'Error de autenticación',
        description: 'No pudimos validar tu sesión. Intenta de nuevo.',
      })
    }
  }, [searchParams])

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (values: LoginValues) => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    })

    if (error) {
      toast({
        variant: 'destructive',
        title: 'No se pudo iniciar sesión',
        description: error.message,
      })
      return
    }

    router.refresh()
    router.push(redirectTo)
  }

  const handleForgotPassword = async () => {
    const email = getValues('email')?.trim()
    if (!email || !z.string().email().safeParse(email).success) {
      toast({
        variant: 'destructive',
        title: 'Ingresá tu email primero',
        description: 'Escribí tu email en el campo de arriba y luego hacé clic aquí.',
      })
      return
    }

    setResetLoading(true)
    const supabase = createClient()
    const origin = getPublicSiteUrl()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/perfil`,
    })

    setResetLoading(false)

    if (error) {
      toast({
        variant: 'destructive',
        title: 'No se pudo enviar el enlace',
        description: error.message,
      })
      return
    }

    setResetSent(true)
    toast({
      title: 'Revisá tu correo',
      description: 'Te enviamos un enlace para restablecer tu contraseña.',
    })
  }

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
          <p className="font-bold tracking-[0.25em] text-[11px] uppercase text-white/90">Computer Science Hub</p>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">Portal de Acceso</p>
        </div>
      </div>

      <AuthCard title="Bienvenido de vuelta" description="Ingresa tus credenciales para acceder al Hub.">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="[&_label]:text-[10px] [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-[0.2em] [&_label]:text-white/50 [&_input]:h-12 [&_input]:rounded-2xl [&_input]:border-white/[0.08] [&_input]:bg-black/40 [&_input]:text-sm [&_input]:font-medium [&_input]:text-white [&_input]:placeholder-white/20 [&_input:focus]:border-white/30 [&_input:focus]:bg-white/[0.02] [&_input:focus]:ring-4 [&_input:focus]:ring-white/[0.05] [&_input]:transition-all">
            <InputField
              label="Correo institucional"
              id="login-email"
              type="email"
              placeholder="alumno@udb.edu.sv"
              error={errors.email?.message}
              autoComplete="email"
              {...register('email')}
            />
          </div>

          <div className="[&_label]:text-[10px] [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-[0.2em] [&_label]:text-white/50 [&_input]:h-12 [&_input]:rounded-2xl [&_input]:border-white/[0.08] [&_input]:bg-black/40 [&_input]:text-sm [&_input]:font-medium [&_input]:text-white [&_input]:placeholder-white/20 [&_input:focus]:border-white/30 [&_input:focus]:bg-white/[0.02] [&_input:focus]:ring-4 [&_input:focus]:ring-white/[0.05] [&_input]:transition-all">
            <PasswordInput
              label="Contraseña"
              placeholder="Tu contraseña secreta"
              error={errors.password?.message}
              inputProps={register('password')}
            />
          </div>

          <button 
            type="submit" 
            className="btn-press flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0D0D0D] transition-transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:hover:scale-100 mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner className="h-4 w-4 bg-black" /> : null}
            Entrar a mi perfil
          </button>

          <div className="flex flex-col gap-4 text-center mt-8 pt-6 border-t border-white/[0.06]">
            <button
              type="button"
              disabled={resetLoading || resetSent}
              className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/30 hover:text-white/70 transition-colors disabled:opacity-50"
              onClick={handleForgotPassword}
            >
              {resetSent ? '✓ Enlace enviado por correo' : '¿Olvidaste tu contraseña?'}
            </button>

            <Link href="/registro" className="text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-400/80 hover:text-emerald-400 transition-colors">
              ¿No tienes cuenta? Regístrate aquí
            </Link>
          </div>
        </form>
      </AuthCard>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      <Toaster />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-24">
        <Suspense
          fallback={
            <div className="flex w-full max-w-md justify-center py-12">
              <Spinner className="h-8 w-8 text-white/20" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </main>
  )
}
