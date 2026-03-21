Informe de Auditoría de Seguridad y QA — ComputerSciencieHub-Web
Auditoría realizada sobre el código fuente completo. Hallazgos clasificados por severidad.

CRITICOS (requieren acción inmediata)
C-01. Race Condition en conteo de votos — voteCommunityIdea

actions.ts
Lines 61-73
  const { data: idea } = await ctx.supabase
    .from('community_ideas')
    .select('vote_count')
    .eq('id', ideaId)
    .single()
  const next = (idea?.vote_count as number | undefined ?? 0) + 1
  const { error: upErr } = await ctx.supabase
    .from('community_ideas')
    .update({ vote_count: next })
    .eq('id', ideaId)
Problema: Classic TOCTOU (Time-of-Check-Time-of-Use). Dos usuarios votan simultaneamente, ambos leen vote_count = 5, ambos escriben 6. Se pierde un voto. Bajo carga, el contador diverge del conteo real en community_idea_votes.

Fix: Usar un incremento atomico con RPC:

UPDATE community_ideas SET vote_count = vote_count + 1 WHERE id = $1;
O mejor aun, calcular vote_count como un campo derivado (COUNT de community_idea_votes).

C-02. RLS permite a usuarios anonimos escribir en tablas de comunidad
Las politicas RLS de community_ideas, community_idea_votes, tutoring_requests, y mentor_matching_profiles solo verifican auth.uid() IS NOT NULL:


csh_s2_24_community.sql
Lines 123-124
CREATE POLICY "ideas_insert_authenticated"
ON public.community_ideas FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND (author_id IS NULL OR author_id = auth.uid()));

csh_s2_24_community.sql
Lines 139-141
CREATE POLICY "idea_votes_insert_own"
ON public.community_idea_votes FOR INSERT
WITH CHECK (user_id = auth.uid());
Problema: Los usuarios anonimos (creados automaticamente por signInAnonymously()) tienen un auth.uid() valido. Si un atacante usa la URL de Supabase + anon key (ambas publicas en NEXT_PUBLIC_*) directamente contra la API REST de Supabase, puede saltarse requireUser() del server action e insertar ideas, votos, solicitudes de tutoria, y perfiles de mentor directamente. El server action bloquea anonimos, pero RLS no.

Fix: Agregar a todas las politicas INSERT de comunidad:

AND (auth.jwt()->>'is_anonymous')::boolean IS NOT TRUE
O verificar que el perfil asociado tenga status = 'activo'.

C-03. ignoreBuildErrors: true oculta errores de tipo en produccion

next.config.mjs
Lines 3-5
  typescript: {
    ignoreBuildErrors: true,
  },
Problema: Los errores de TypeScript son silenciados en build y deploy. Esto permite que errores de tipo (null references, propiedades inexistentes, tipos incompatibles) lleguen a produccion. Un error de tipo puede ser un bug de seguridad disfrazado.

Fix: Cambiar a false. Corregir los errores TS que aparezcan. Si no es viable inmediatamente, al menos ejecutar tsc --noEmit en CI y trackear la deuda.

ALTOS
H-01. No hay validacion de protocolo en URLs renderizadas como href
Multiples componentes renderizan URLs de la base de datos directamente como atributos href:


event-subscribe-button.tsx
Lines 33-36
        <a
          href={registrationUrl}
          target="_blank"
          rel="noreferrer"

page.tsx
Lines 38-43
              <Link
                href={ep.episode_url}
                target="_blank"
                rel="noopener noreferrer"

sponsors-section.tsx
Lines 104-108
              <Link
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
Tambien en app/perfil/page.tsx con member.github y member.linkedin.

Problema: Un admin (o un atacante que comprometa la cuenta admin) puede guardar javascript:alert(document.cookie) como registration_url, episode_url, website_url, github_url, o linkedin_url. Al hacer clic, se ejecuta JavaScript en el contexto del usuario. Stored XSS via admin-controlled URLs.

Fix: Validar todas las URLs en server actions antes de guardar (protocolo https:// o http:// unicamente). Crear un helper:

function isSafeUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch { return false; }
}
H-02. No hay rate limiting en ninguna Server Action
signInWithPassword en el cliente — ataque de fuerza bruta
proposeCommunityIdea — spam de ideas
submitTutoringRequest — spam de solicitudes
voteCommunityIdea — abuso del sistema de votos
saveMentorMatchingProfile — perfil manipulado
Problema: Un atacante puede llamar las server actions en bucle sin limite. No hay proteccion contra brute force en login (Supabase tiene rate limiting propio, pero es generoso), ni contra spam en acciones de comunidad.

Fix: Implementar rate limiting con middleware (e.g., Vercel Edge con KV o Upstash) o al menos un throttle basico por IP/usuario en las server actions criticas.

H-03. No hay security headers configurados
Ni vercel.json ni next.config.mjs configuran headers de seguridad. Faltan:

Header	Proposito
Content-Security-Policy	Prevenir XSS, inyeccion de scripts
Strict-Transport-Security	Forzar HTTPS
X-Frame-Options	Prevenir clickjacking
X-Content-Type-Options	Prevenir MIME sniffing
Referrer-Policy	Controlar datos en referrer
Permissions-Policy	Limitar APIs del navegador
Fix: Agregar en next.config.mjs:

async headers() {
  return [{ source: '/(.*)', headers: [
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  ]}];
}
H-04. ESLint no esta instalado — predeploy falla silenciosamente

package.json
Lines 9-11
    "lint": "eslint .",
    "predeploy": "npm run lint && npm run build",
    "deploy:prod": "npm run predeploy && vercel --prod"
Pero eslint NO esta en devDependencies. Si se ejecuta npm run lint o deploy:prod, fallara.

Fix: Instalar eslint y configurar eslint.config.mjs.

H-05. Falta politica DELETE en la tabla profiles
No existe CREATE POLICY ... FOR DELETE en profiles. Ningun usuario (ni admin) puede eliminar un perfil via Supabase client.

Problema: Implica que no hay forma programatica de borrar cuentas. Riesgo de compliance (GDPR/LOPD en caso de usuarios europeos). Los perfiles huerfanos se acumulan.

Fix: Si no se necesita delete de perfiles, documentarlo. Si se necesita, agregar politica para admin y/o para el propio usuario.

H-06. Sesiones anonimas automaticas inflan auth.users y profiles

auth-session-provider.tsx
Lines 40-57
  const ensureAnonymousSession = useCallback(async () => {
    const supabase = createClient()
    const { data: { session: s } } = await supabase.auth.getSession()
    if (s) {
      setSession(s)
      setUser(s.user)
    } else {
      try {
        const { data, error } = await supabase.auth.signInAnonymously()
        // ...
Problema: Cada visitante sin sesion crea un usuario anonimo en auth.users + una fila en profiles (via trigger). Un bot que borre cookies puede generar miles de registros por minuto. No hay limpieza automatica.

Fix: Evaluar si las sesiones anonimas son realmente necesarias. Si lo son, implementar un cron job para purgar sesiones anonimas inactivas (e.g., >30 dias sin actividad).

MEDIOS
M-01. La pagina de registro ignora el parametro redirect
El AuthGateModal envia a /registro?redirect=/comunidad/ideas, pero la pagina de registro no lee este parametro:


page.tsx
Lines 113-114
      router.refresh()
      router.push('/perfil')
Siempre redirige a /perfil tras el registro, independientemente del redirect.

Fix: Leer searchParams.get('redirect') con safeRedirectPath() (como hace login) y redirigir ahi tras el registro.

M-02. Recuperacion de contrasena no implementada

page.tsx
Lines 126-137
            <button
              type="button"
              className="w-fit text-left text-muted-foreground hover:text-foreground"
              onClick={() =>
                toast({
                  title: 'Próximamente',
                  description: 'El flujo de recuperación de contraseña aún no está disponible.',
                })
              }
            >
              ¿Olvidaste tu contraseña?
            </button>
Problema: Un usuario que olvide su contrasena no puede recuperar su cuenta. Flujo roto critico para retencion de usuarios.

M-03. getSession() en cliente no valida JWT con el servidor

auth-session-provider.tsx
Lines 65-66
    void supabase.auth.getSession().then(({ data: { session: s } }) => {
La documentacion de Supabase advierte que getSession() lee desde local storage sin verificar la validez del JWT con el servidor. Puede ser manipulado. Para operaciones sensibles del cliente (como determinar isAdmin), esto es un riesgo. Sin embargo, isAdmin se valida server-side en el layout admin y server actions, asi que el impacto real es UI solamente.

M-04. Doble llamada a getUser() en flujo admin fallido

admin-auth.ts
Lines 29-41
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession()     // getUser() call #1
  if (session) return session
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()           // getUser() call #2
  // ...
Para usuarios no-admin, se hacen 2 llamadas a getUser() y 2 instancias de createClient(). Ineficiente.

M-05. Conversion anonimo→registrado puede dejar profile desactualizado
En el flujo de registro cuando el usuario es anonimo:


page.tsx
Lines 77-115
    if (currentUser?.is_anonymous) {
      const { data, error } = await supabase.auth.updateUser({
        email: values.email.trim(),
        password: values.password,
        data: { full_name, career, cycle, area },
      })
      // ...
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name, email, career, cycle, area,
          status: 'activo',
        }, { onConflict: 'id' })
      }
El upsert con onConflict: 'id' funciona, pero depende de que la politica RLS de UPDATE permita al usuario actualizar su propio perfil. Esto funciona (auth.uid() = id). Sin embargo, si el upsert falla silenciosamente (e.g., por un campo extra no previsto), el perfil queda con status: 'inactivo' del trigger original y el usuario aparece como inactivo.

M-06. NEXT_PUBLIC_SITE_URL sin valor causa emails con enlace a localhost

site-url.ts
Lines 5-14
export function getPublicSiteUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '')
  }
  return 'http://localhost:3000'
}
Si NEXT_PUBLIC_SITE_URL no esta configurado en produccion, los emails de confirmacion de Supabase apuntaran a http://localhost:3000/auth/callback, rompiendo el flujo de registro.

M-07. Sin paginacion en consultas de listado
Todas las funciones de fetch (fetchActiveProfiles, fetchPublishedNews, fetchPublishedEvents, etc.) retornan todos los registros sin LIMIT. A medida que la base de datos crece, esto causara:

Tiempos de respuesta lentos
Transferencia de datos excesiva
Potencial timeout en edge functions
M-08. No hay validacion de formato UUID en ideaId de voteCommunityIdea

actions.ts
Lines 43-43
export async function voteCommunityIdea(ideaId: string) {
El parametro ideaId se usa directamente en queries sin validar que sea un UUID valido. Un input malicioso como un string vacio o extra-largo genera errores de BD que se retornan al cliente (error.message), potencialmente exponiendo estructura interna.

M-09. Mensajes de error de Supabase expuestos al usuario
En multiples server actions:


actions.ts
Lines 37-37
  if (error) return { ok: false as const, message: error.message }
Los mensajes de error de Supabase/PostgreSQL se retornan directamente al frontend. Esto puede revelar nombres de tablas, columnas, y estructura de la BD.

Fix: Retornar mensajes genericos al usuario y loguear el detalle server-side.

BAJOS
L-01. Migracion base ausente (csh_s2_18_base_schema_public_tables)
El README menciona esta migracion pero no existe en el repositorio. Las tablas base (profiles, news, events, etc.) no tienen definicion visible en el codigo fuente, lo que dificulta auditorias futuras y reproduccion del esquema.

L-02. Seed data con URLs de example.com
El seed en csh_s2_24_community.sql usa URLs como https://example.com/docs/bienvenida. Si este seed se ejecuta en produccion, los usuarios veran links rotos.

L-03. Sin indices en columnas frecuentemente filtradas
No se observan indices en profiles.status, profiles.area, news.published, events.published, community_ideas.status. Impactara rendimiento conforme crezca la data.

L-04. Sin CI/CD pipeline ni tests automatizados
No hay .github/workflows/, ni playwright.config.ts, ni archivos de test. No hay red de seguridad automatica contra regresiones.

L-05. vote_count sin constraint CHECK >= 0
No hay CHECK (vote_count >= 0) en community_ideas. Combinado con el race condition (C-01), el contador podria ir a negativo en escenarios edge.

L-06. Proteccion de "ultimo admin" es incompleta

members.ts
Lines 32-34
  if (form.id === ctx.user.id && role !== 'admin') {
    return { ok: false as const, message: 'No puedes quitarte el rol de administrador a ti mismo.' }
  }
Un admin no puede quitarse el rol a si mismo, pero admin A puede quitar el rol a admin B, dejando a B sin privilegios. Si A luego pierde acceso, no queda ningún admin. No hay verificacion de "ultimo admin".

Resumen de prioridades
Severidad	Count	Accion recomendada
Critico	3	Fix inmediato antes de cualquier deploy
Alto	6	Planificar para el proximo sprint
Medio	9	Incluir en backlog con prioridad
Bajo	6	Deuda tecnica / mejora continua
Los 3 criticos (race condition de votos, RLS anonimos en comunidad, ignoreBuildErrors) son los que un atacante o un bot podrian explotar hoy. Recomiendo abordarlos antes del siguiente deploy a produccion.