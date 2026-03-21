"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import type { Session, User } from "@supabase/supabase-js"

import { createClient } from "@/src/lib/supabase/client"

type AuthSessionContextValue = {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAnonymous: boolean
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null)

export function useAuthSession() {
  const ctx = useContext(AuthSessionContext)
  if (!ctx) {
    throw new Error("useAuthSession must be used within AuthSessionProvider")
  }
  return ctx
}

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()

  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/registro" ||
    pathname.startsWith("/auth/")

  const ensureAnonymousSession = useCallback(async () => {
    const supabase = createClient()
    const { data: { user: u } } = await supabase.auth.getUser()

    if (u) {
      const { data: { session: s } } = await supabase.auth.getSession()
      setSession(s)
      setUser(u)
    } else {
      try {
        const { data, error } = await supabase.auth.signInAnonymously()
        if (!error) {
          setSession(data.session)
          setUser(data.user)
        }
      } catch {
        setSession(null)
        setUser(null)
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const supabase = createClient()

    void supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (u) {
        void supabase.auth.getSession().then(({ data: { session: s } }) => {
          setSession(s)
          setUser(u)
          setIsLoading(false)
        })
        return
      }

      if (isAuthRoute) {
        setSession(null)
        setUser(null)
        setIsLoading(false)
        return
      }

      void ensureAnonymousSession()
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [isAuthRoute, ensureAnonymousSession])

  useEffect(() => {
    if (!user || user.is_anonymous) {
      setIsAdmin(false)
      return
    }
    let cancelled = false
    const supabase = createClient()
    void supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setIsAdmin(data?.role === 'admin')
      })
    return () => {
      cancelled = true
    }
  }, [user])

  const value: AuthSessionContextValue = {
    user,
    session,
    isLoading,
    isAnonymous: Boolean(user?.is_anonymous),
    isAuthenticated: Boolean(user && !user.is_anonymous),
    isAdmin,
  }

  return (
    <AuthSessionContext.Provider value={value}>{children}</AuthSessionContext.Provider>
  )
}
