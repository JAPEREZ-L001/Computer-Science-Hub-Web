# 🤖 Plan de Trabajo con Inteligencia Artificial — Sprint 00

> **Proyecto:** Computer Science Hub (CSH) Web  
> **Objetivo:** Guía paso a paso para ejecutar cada asignación del Sprint 00 utilizando agentes de IA  
> **Referencia:** `docs/work/Sprints/Sprint00/AsignacionesFormales.md`  
> **Fecha:** 2026-04-13

---

## Filosofía de Ejecución con IA

Cada asignación se aborda en **fases secuenciales** diseñadas para maximizar la efectividad de los agentes de IA:

```
📖 Contexto → 🔬 Análisis → 🏗️ Implementación → ✅ Verificación → 📝 Documentación
```

**Reglas generales:**
1. **Siempre proveer `CONTEXT.md`** al agente antes de cualquier tarea.
2. **Un ticket = una sesión** — evitar mezclar tickets en la misma conversación.
3. **Verificar antes de avanzar** — cada fase termina con un checkpoint.
4. **Commits atómicos** — un commit por cada cambio lógico completado.

---

## Fase 0 — Preparación del Entorno

Antes de ejecutar cualquier ticket, asegurar que:

```powershell
# 1. Instalar dependencias actualizadas
npm install

# 2. Verificar que el proyecto compila
npm run build

# 3. Verificar que lint pasa
npm run lint

# 4. Verificar que el dev server inicia correctamente
npm run dev
```

**Checkpoint 0:** ✅ Build exitoso, lint sin errores, dev server corriendo en `localhost:3000`.

---

## 🔴 Fase 1 — Hotfixes Críticos

### 1.1 · CSH-S0-001: Feedback Anónimo

**Tiempo estimado con IA:** 30–45 minutos

#### Prompt de Contexto Inicial

```
Lee el archivo CONTEXT.md y docs/DATABASE.md para entender la arquitectura del proyecto.
Luego analiza:
1. app/actions/feedback.ts — Server Action que maneja el envío de feedback
2. components/feedback-form.tsx — Formulario del frontend
3. src/lib/resend.ts — Servicio de email

El bug: usuarios anónimos no pueden enviar feedback porque el guard en línea 29 
de feedback.ts rechaza usuarios sin autenticar o anónimos. Necesitamos:
- Permitir el envío anónimo
- Implementar rate limiting (75 envíos/hora por IP)
- Mantener la notificación por email al admin
- Agregar campo is_anonymous a la tabla feedback
```

#### Pasos de Ejecución

| Paso | Acción | Archivo | Prompt para IA |
|:---|:---|:---|:---|
| 1 | Crear migración de BD | `supabase/migrations/` | "Crea una migración SQL que: (a) Agregue la columna `is_anonymous boolean DEFAULT false` a la tabla `feedback`. (b) Cree una RLS policy que permita INSERT en `feedback` sin requerir `auth.uid()`. (c) Mantenga la policy de SELECT existente." |
| 2 | Modificar Server Action | `app/actions/feedback.ts` | "Modifica `submitFeedback` para: (a) Eliminar el guard de autenticación (líneas 29-31). (b) Detectar si el usuario es anónimo (`!user \|\| user.is_anonymous`). (c) Agregar campo `is_anonymous: true/false` al INSERT. (d) Implementar rate limiting con un Map en memoria que cuente envíos por IP en ventana de 1 hora, máximo 75. Usa `headers()` de next/headers para obtener la IP." |
| 3 | Ajustar formulario | `components/feedback-form.tsx` | "Revisa el componente y asegúrate de que no tenga guards de autenticación en el frontend que bloqueen el envío para anónimos. El formulario debe funcionar igual para todos los usuarios." |
| 4 | Ajustar email | `src/lib/resend.ts` | "En la función `notifyAdminFeedback`, agrega lógica para que cuando el feedback sea anónimo, el email al admin indique '[Anónimo]' en el campo del nombre si corresponde." |

#### Verificación

```
1. Abre el sitio en modo incógnito (sin login) → /feedback
2. Completa el formulario y envía → ¿Se persiste en Supabase? ✅
3. Revisa la bandeja de admin@cshdevs.org → ¿Llegó el email? ✅
4. Envía 76 feedbacks seguidos → ¿El 76avo se rechaza con error de rate limit? ✅
5. Cierra sesión y vuelve a probar → ¿Funciona consistentemente? ✅
```

---

### 1.2 · CSH-S0-002: Encuesta Betatester Anónimos

**Tiempo estimado con IA:** 20–30 minutos

#### Prompt de Contexto Inicial

```
Analiza app/actions/betatester-survey.ts y components/betatester-survey-form.tsx.
El user_id ya se setea como null para anónimos, pero la RLS policy en Supabase 
probablemente bloquea el INSERT. Necesitamos:
- Crear/actualizar RLS policy para betatester_survey_new_users
- Verificar que el formulario frontend no bloquee anónimos
- Aplicar rate limiting equivalente al de CSH-S0-001
```

#### Pasos de Ejecución

| Paso | Acción | Archivo | Prompt para IA |
|:---|:---|:---|:---|
| 1 | Migración RLS | `supabase/migrations/` | "Crea una migración que agregue una RLS policy en `betatester_survey_new_users` que permita INSERT a cualquier usuario (autenticado o anónimo). Mantén SELECT restringido a admins." |
| 2 | Verificar Server Action | `app/actions/betatester-survey.ts` | "Verifica que `submitNewUserSurvey` no tenga ningún guard que rechace anónimos. El payload ya maneja `user_id: null` para anónimos — confirma que esto es correcto." |
| 3 | Ajustar UI | `components/betatester-survey-form.tsx` | "Revisa que cuando el combobox 'Soy usuario nuevo' esté seleccionado, no se muestre ningún elemento que requiera login y que el botón de enviar esté habilitado." |
| 4 | Rate limiting | `app/actions/betatester-survey.ts` | "Reutiliza el mismo patrón de rate limiting implementado en CSH-S0-001. Extrae el rate limiter a un módulo compartido en `src/lib/rate-limiter.ts`." |

#### Verificación

```
1. Modo incógnito → /encuesta-betatester → seleccionar "Soy usuario nuevo"
2. Completar todos los campos y enviar → ¿Se persiste? ✅
3. Verificar en Supabase que user_id es null → ✅
4. Probar rate limit (76 envíos) → ¿Se rechaza el 76avo? ✅
```

---

## 🟠 Fase 2 — Fundación Técnica

### 2.1 · CSH-S0-003: Auditoría de Deuda Técnica

**Tiempo estimado con IA:** 1–2 horas

#### Proceso por Capas

**Capa 1 — Rutas y páginas (20 min)**
```
Analiza todas las carpetas dentro de app/ y lista:
1. Cada page.tsx y su ruta correspondiente
2. Si la página renderiza contenido real o está vacía/placeholder
3. Si usa datos reales de Supabase o datos mock
4. Si tiene protección de autenticación donde la necesita
Genera un reporte en formato tabla con: Ruta | Estado | Fuente de datos | Auth requerido
```

**Capa 2 — Server Actions (15 min)**
```
Para cada archivo en app/actions/:
1. Lista todas las funciones exportadas
2. Verifica que cada función sea consumida por al menos un componente
3. Identifica validaciones faltantes o inconsistentes
4. Revisa manejo de errores
Genera un reporte con: Action | Archivo consumidor | Validación | Error handling | Issues
```

**Capa 3 — Queries de Supabase (15 min)**
```
Analiza src/lib/supabase/queries.ts y community-queries.ts:
1. Lista cada función query
2. Busca en todo el proyecto quién la importa
3. Identifica queries sin consumidor (código muerto)
4. Verifica que los campos consultados coincidan con DATABASE.md
```

**Capa 4 — Tipos vs BD (10 min)**
```
Compara src/types/index.ts con docs/DATABASE.md:
1. Identifica campos de la BD no representados en los tipos TypeScript
2. Identifica tipos TypeScript sin correspondencia en la BD
3. Propón actualizaciones necesarias
```

**Capa 5 — Componentes (20 min)**
```
Analiza la carpeta components/:
1. Lista todos los componentes .tsx
2. Verifica que cada uno sea importado en al menos una página
3. Identifica componentes duplicados o con funcionalidad solapada
4. Revisa accesibilidad básica (aria-labels, roles semánticos)
```

**Capa 6 — Seguridad (15 min)**
```
Auditoría de seguridad:
1. Revisa middleware.ts — ¿protege todas las rutas necesarias?
2. Revisa que SUPABASE_SERVICE_ROLE_KEY nunca se expose al cliente
3. Verifica que las RLS policies cubran todos los escenarios CRUD
4. Busca console.log con datos sensibles
5. Revisa .env.example vs .env — ¿hay keys expuestos?
```

#### Output Final

```
Genera el documento docs/work/Sprints/Sprint00/AuditoriaTecnica.md con todas 
las findings organizadas por capa. Cada finding debe tener:
- Ubicación (archivo:línea)
- Severidad (🔴 Crítica | 🟡 Alta | 🟢 Media | ⚪ Baja)
- Descripción del problema
- Sugerencia de fix
- Esfuerzo estimado
```

---

### 2.2 · CSH-S0-011: Plan de Arquitectura y Workflow

**Tiempo estimado con IA:** 1–1.5 horas

#### Prompts Secuenciales

**Paso 1 — Branching Strategy (15 min)**
```
Dado que este es un proyecto open source educativo con un equipo de 3-5 personas,
diseña una branching strategy basada en GitHub Flow simplificado:
- main: producción (protegido)
- develop: integración
- feature/CSH-XXX-descripcion: features
- hotfix/CSH-XXX-descripcion: hotfixes
Incluye reglas de merge: squash for features, merge commit for hotfixes.
Genera el documento docs/WORKFLOW.md
```

**Paso 2 — Conventional Commits (10 min)**
```
Define la convención de commits para el proyecto CSH:
- feat(scope): nueva funcionalidad
- fix(scope): bugfix
- chore(scope): mantenimiento
- docs(scope): documentación
- refactor(scope): refactorización sin cambio de comportamiento
Scopes válidos: auth, forum, feedback, survey, profile, events, admin, ui, db
Genera un commit message template en .gitmessage
```

**Paso 3 — Entornos Supabase (20 min)**
```
Documenta cómo configurar 3 entornos de Supabase:
1. Local (supabase start) — para desarrollo
2. Staging — proyecto Supabase separado
3. Production — proyecto actual
Incluye:
- Cómo sincronizar migraciones entre entornos
- Variables de entorno para cada entorno
- Proceso de deploy de migraciones
Genera docs/ENVIRONMENTS.md
```

**Paso 4 — CI/CD Básico (15 min)**
```
Crea un workflow de GitHub Actions en .github/workflows/ci.yml que:
1. Se ejecute en push a main y PRs
2. Instale dependencias (npm ci)
3. Ejecute lint (npm run lint)
4. Ejecute type-check (npx tsc --noEmit)
5. Ejecute build (npm run build)
6. Reporte resultados como checks en el PR
```

**Paso 5 — PR Template (5 min)**
```
Crea .github/pull_request_template.md con:
- Descripción del cambio
- Ticket vinculado (CSH-XXX)
- Tipo de cambio (feature/fix/chore/docs)
- Checklist: tests, lint, build, docs actualizados
- Screenshots (si aplica)
```

---

## 🟡 Fase 3 — Identidad y Comunidad

### 3.1 · CSH-S0-006: Bandas y Roles

**Tiempo estimado con IA:** 1.5–2 horas

#### Prompts Secuenciales

**Paso 1 — Migración BD (15 min)**
```
Crea una migración SQL que:
1. Agregue a profiles:
   - badge text DEFAULT 'member' CHECK (badge IN ('ceo_founder','primary_agent','primary_fellow','agent','member','fellow','catedratico','estudiante'))
   - university_role text DEFAULT 'estudiante' CHECK (university_role IN ('estudiante','catedratico'))
2. Actualice los perfiles existentes con badge='member'
```

**Paso 2 — Tipos TypeScript (10 min)**
```
Actualiza src/types/index.ts:
- Agrega el tipo UserBadge con los 8 valores posibles
- Agrega el tipo UniversityRole
- Agrega estos campos al interface MemberProfile
- Agrega una constante BADGE_CONFIG con label, color, icon para cada badge
```

**Paso 3 — Componente UserBadge (20 min)**
```
Crea components/ui/user-badge.tsx:
- Componente <UserBadge badge={badge} size="sm"|"md"|"lg" />
- Chip visual con gradiente del color correspondiente
- Tooltip con el label descriptivo
- Animación sutil al hover
- Usa los colores definidos en BADGE_CONFIG
- Sigue el patrón de shadcn/ui (con class-variance-authority)
```

**Paso 4 — Integrar en directorio (20 min)**
```
Modifica components/miembros-directory.tsx:
- Importa y muestra <UserBadge> junto al nombre de cada miembro
- Agrega filtro por badge en la barra de filtros existente
- Actualiza las queries para incluir badge y university_role
```

**Paso 5 — Actualizar onboarding (15 min)**
```
Modifica el flujo en app/onboarding/:
- Agrega un paso para seleccionar university_role (estudiante/catedrático)
- Si es catedrático, agregar campo de departamento/materia
- Actualiza la Server Action de onboarding para persistir estos campos
```

---

### 3.2 · CSH-S0-007: Multi-Universidad

**Tiempo estimado con IA:** 45 min–1 hora

#### Prompts Secuenciales

**Paso 1 — Migración (10 min)**
```
Migración SQL:
1. ALTER TABLE profiles ADD COLUMN university text DEFAULT 'UDB'
2. CREATE TABLE universities (
     code text PRIMARY KEY,
     name text NOT NULL,
     country text DEFAULT 'El Salvador',
     active boolean DEFAULT true,
     sort_order int DEFAULT 0
   )
3. INSERT las 6 universidades: UDB, UCA, ESEN, UES, UFG, UEES
```

**Paso 2 — Actualizar registro (15 min)**
```
En app/registro/ y el formulario de registro:
- Agrega un Select para elegir universidad
- El select se puebla desde la tabla universities
- Default: UDB
- El valor seleccionado se guarda en profiles.university
```

**Paso 3 — Actualizar directorio (10 min)**
```
En components/miembros-directory.tsx:
- Mostrar la universidad como metadata debajo del nombre
- Agregar filtro por universidad en la barra de filtros
```

**Paso 4 — Actualizar perfil (10 min)**
```
En app/perfil/:
- Mostrar la universidad del usuario
- Permitir cambiar de universidad desde la edición de perfil
```

---

### 3.3 · CSH-S0-005: Foro Realtime

**Tiempo estimado con IA:** 2–3 horas

#### Prompts Secuenciales

**Paso 1 — Schema y Migración (15 min)**
```
Crea la migración SQL para la tabla forum_messages con:
- id, user_id (FK profiles), content (1-500 chars), edited, created_at, updated_at
- RLS policies: SELECT público, INSERT/UPDATE/DELETE solo autor
- Habilita Realtime en la tabla
- Crea índice en created_at para paginación eficiente
```

**Paso 2 — Server Actions (20 min)**
```
Crea app/actions/forum.ts con las funciones:
- sendForumMessage(content: string) — con validación Zod, rate limiting
- editForumMessage(id: string, content: string) — solo dentro de 15 min
- deleteForumMessage(id: string) — solo mensajes propios
Todas deben verificar auth y usar Server Actions pattern
```

**Paso 3 — Queries (10 min)**
```
Agrega a src/lib/supabase/queries.ts:
- getForumMessages(cursor?: string, limit?: number) — paginación cursor-based
- La query debe hacer JOIN con profiles para obtener nombre, badge, avatar
```

**Paso 4 — Componente ForumChat (30 min)**
```
Crea components/foro/ForumChat.tsx como componente 'use client':
- Suscripción a Supabase Realtime channel 'forum_messages'
- Escucha INSERT, UPDATE, DELETE events
- Estado local de mensajes que se actualiza con cada evento
- Auto-scroll al último mensaje cuando llegan nuevos
- Carga inicial de mensajes vía props del RSC
```

**Paso 5 — Componente MessageBubble (20 min)**
```
Crea components/foro/MessageBubble.tsx:
- Muestra avatar generativo (usa avatar-generator.ts existente)
- Nombre con <UserBadge> al lado
- Contenido del mensaje
- Timestamp relativo (usando date-fns ya instalado)
- Botones de editar/eliminar solo si es el autor
- Indicador "editado" si edited=true
- Micro-animación de entrada
```

**Paso 6 — Componente MessageInput (15 min)**
```
Crea components/foro/MessageInput.tsx:
- Textarea con límite visual de 500 caracteres
- Botón de enviar con estado loading
- Deshabilitado para anónimos con banner "Regístrate para participar"
- Envía via la Server Action sendForumMessage
```

**Paso 7 — Página del Foro (15 min)**
```
Crea app/foro/page.tsx como Server Component:
- Fetch inicial de mensajes con getForumMessages()
- Detectar si el usuario está autenticado
- Pasar props al ForumChat component
- Metadata SEO para la página
```

**Paso 8 — Navegación (5 min)**
```
Agrega el enlace /foro en components/header.tsx dentro de la navegación principal.
Usa el ícono MessageSquare de Lucide.
```

---

## 🟢 Fase 4 — Social y Engagement

### 4.1 · CSH-S0-004: Easter Egg Galaga

**Tiempo estimado con IA:** 3–4 horas (puede subdividirse en sesiones)

#### Prompts Secuenciales

**Paso 1 — Estructura base (15 min)**
```
Crea la estructura de archivos:
- app/easter-egg/page.tsx (lazy route)
- components/game/GalagaGame.tsx (motor principal)
- components/game/GameCanvas.tsx (wrapper de canvas)
- components/game/GameHUD.tsx (heads-up display)
- components/game/GameInstructions.tsx (pantalla de instrucciones)
- components/game/useGameLoop.ts (custom hook)
- components/game/types.ts (tipos del juego)

Usa dynamic import con next/dynamic y loading fallback.
```

**Paso 2 — Game Engine (45 min)**
```
Implementa el game loop en useGameLoop.ts:
- requestAnimationFrame loop
- Estado del juego: menu, playing, paused, gameOver, victory
- Manejo de entidades: player, bullets, enemies, powerups
- Detección de colisiones rectangulares
- Sistema de niveles (0-10) con configuración de dificultad progresiva

Entities como interfaces en types.ts:
- Player: { x, y, width, height, lives, speed }
- Bullet: { x, y, dy, isEnemy }
- Enemy: { x, y, type, health, points }
- PowerUp: { x, y, type }
```

**Paso 3 — Renderizado (30 min)**
```
Implementa GameCanvas.tsx:
- Canvas 2D con dimensiones responsivas (max 800x600)
- Dibuja fondo con estrellas (parallax scroll)
- Dibuja nave del jugador (forma geométrica CSS-art)
- Dibuja enemigos con colores según tipo
- Efectos de explosión con partículas
- Todo usando la API Canvas nativa, sin librerías
```

**Paso 4 — HUD y UI (20 min)**
```
GameHUD.tsx:
- Score en esquina superior izquierda
- Vidas restantes (iconos de nave)
- Nivel actual
- Barra de progreso del nivel
- Estilo glassmorphism coherente con el hub

GameInstructions.tsx:
- Pantalla de bienvenida con instrucciones
- Controles: ← → para mover, Espacio para disparar
- Touch controls para móvil (virtual joystick + botón de disparo)
- Botón "Iniciar Juego"
```

**Paso 5 — Trigger oculto (10 min)**
```
En components/footer.tsx:
- Agrega un event listener para Konami Code (↑↑↓↓←→←→BA)
- Al completar la secuencia, navega a /easter-egg con una transición animada
- Alternativa: hacer que el logo del footer sea clickable 5 veces rápidas
```

**Paso 6 — Diseño de niveles (30 min)**
```
Define la configuración de 11 niveles:
- Nivel 0: 3 enemigos estáticos (tutorial)
- Nivel 1-3: 5-8 enemigos, movimiento horizontal lento
- Nivel 4-5: 10-12 enemigos, formaciones, velocidad media
- Nivel 6-7: 15 enemigos, enemigos que disparan, primer power-up
- Nivel 8-9: 20 enemigos, múltiples tipos, power-ups frecuentes
- Nivel 10: Boss final con 3 fases de ataque

Cada nivel tiene un JSON de configuración con:
{ enemies: [...], speed: number, fireRate: number, spawnPattern: string }
```

---

### 4.2 · CSH-S0-009: Foros por Áreas (Extensión de S0-005)

**Tiempo estimado con IA:** 2–3 horas  
**Dependencia:** CSH-S0-005 completado

#### Prompts Secuenciales

**Paso 1 — Extender Schema (15 min)**
```
Migración SQL:
1. Crear tabla forum_channels (id, name, slug, area_type, description, color, icon, sort_order)
2. INSERT canales predefinidos: general, frontend, backend, ia, devops, diseño, seguridad
3. Agregar forum_messages.channel_id FK a forum_channels
4. Crear tabla forum_subscriptions (user_id, channel_id, subscribed_at)
5. Crear tabla notifications (id, user_id, type, title, message, read, link, created_at)
```

**Paso 2 — Vistas de foro (30 min)**
```
- app/foros/page.tsx: lista de todos los canales con conteo de mensajes y suscriptores
- app/foros/[slug]/page.tsx: vista del foro individual con el ForumChat adaptado
- Reutilizar los componentes de CSH-S0-005 pero parameterizados por channel_id
```

**Paso 3 — Suscripciones (20 min)**
```
- Server Action para subscribe/unsubscribe a un canal
- Componente SubscribeButton para cada canal
- Las suscripciones del usuario se cargan en el layout del foro
```

**Paso 4 — Notificaciones (30 min)**
```
- Componente NotificationBell en el header con counter de no leídas
- Dropdown con lista de notificaciones recientes
- Server Action para marcar como leída
- Trigger: Supabase Database Webhook o Edge Function que crea notificaciones
  cuando alguien postea en un canal donde el usuario está suscrito
```

---

### 4.3 · CSH-S0-008: Mensajería Directa

**Tiempo estimado con IA:** 3–4 horas  
**Dependencia:** Supabase Realtime configurado (validado con S0-005)

#### Prompts Secuenciales (Alto Nivel)

```
La mensajería directa es un sistema complejo. Subdividir en:

1. Schema de BD: conversations, conversation_participants, direct_messages, blocked_users
2. Server Actions: createConversation, sendMessage, markAsRead, blockUser
3. Queries: getUserConversations, getConversationMessages, getUnreadCount
4. Components:
   - MessagesLayout.tsx (sidebar + chat panel)
   - ConversationList.tsx (lista de conversaciones)
   - ChatWindow.tsx (mensajes de una conversación)
   - MessageComposer.tsx (input de mensaje)
   - UserBlockDialog.tsx (bloquear usuario)
5. Realtime: suscripción al canal de cada conversación activa
6. Routing: app/mensajes/page.tsx y app/mensajes/[conversationId]/page.tsx
7. Header badge: contador de mensajes no leídos con Realtime
```

---

## 🔵 Fase 5 — Contenido y Papers (CSH-S0-010)

**Tiempo estimado con IA:** 4–6 horas (dividir en 2-3 sesiones)

> ⚠️ Esta es una **épica** — se recomienda subdividir en sub-tickets antes de ejecutar.

### Sub-tickets Sugeridos

| Sub-ticket | Descripción | SP |
|---|---|---|
| S0-010.1 | Schema de BD: posts, post_comments, post_likes, post_saves | 5 |
| S0-010.2 | CRUD de posts (crear, editar, eliminar) | 8 |
| S0-010.3 | Viewer de Markdown con syntax highlighting | 5 |
| S0-010.4 | Viewer de PDF inline | 5 |
| S0-010.5 | Interacción social (likes, comentarios) | 8 |
| S0-010.6 | Biblioteca personal del usuario | 8 |
| S0-010.7 | Supabase Storage para uploads de PDF | 5 |
| S0-010.8 | Notificaciones de actividad en posts | 5 |

#### Prompt para Sub-ticket S0-010.1

```
Crea la migración SQL para el sistema de posts:

CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL, -- Markdown
  excerpt text,
  category text CHECK (category IN ('paper','articulo','tutorial','opinion')),
  tags text[] DEFAULT '{}',
  pdf_url text, -- URL en Supabase Storage
  like_count int DEFAULT 0,
  comment_count int DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE post_likes (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text CHECK (type IN ('like','dislike')) DEFAULT 'like',
  PRIMARY KEY (post_id, user_id)
);

CREATE TABLE post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL CHECK (char_length(content) BETWEEN 1 AND 1000),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE saved_posts (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  collection text DEFAULT 'default',
  saved_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);

Con RLS policies apropiadas:
- Posts: lectura pública, escritura solo autenticados
- Likes/Saves: solo autenticados, uno por usuario por post
- Comments: lectura pública, escritura solo autenticados
```

---

## 📊 Resumen de Tiempos Estimados

| Fase | Asignaciones | Tiempo IA | Sesiones |
|:---|:---|:---|:---|
| 🔴 Fase 1 — Hotfixes | S0-001, S0-002 | 1–1.5 h | 1 |
| 🟠 Fase 2 — Fundación | S0-003, S0-011 | 2–3.5 h | 2 |
| 🟡 Fase 3 — Identidad | S0-005, S0-006, S0-007 | 4–6 h | 3–4 |
| 🟢 Fase 4 — Social | S0-004, S0-008, S0-009 | 8–11 h | 5–6 |
| 🔵 Fase 5 — Contenido | S0-010 | 4–6 h | 2–3 |
| **Total** | **11 asignaciones** | **19–28 h** | **13–16** |

---

## 🔄 Workflow por Sesión de IA

Cada sesión de trabajo con el agente de IA debe seguir este flujo:

```
┌─────────────────────────────────────────────────┐
│  1. PREPARAR CONTEXTO                           │
│     • Compartir CONTEXT.md                      │
│     • Especificar ticket (CSH-S0-XXX)           │
│     • Compartir archivos relevantes             │
├─────────────────────────────────────────────────┤
│  2. ANALIZAR                                    │
│     • IA lee y entiende el código existente      │
│     • Identifica impacto y dependencias          │
│     • Propone approach                           │
├─────────────────────────────────────────────────┤
│  3. IMPLEMENTAR                                 │
│     • Migraciones de BD (si aplica)             │
│     • Server Actions / Queries                   │
│     • Componentes React                          │
│     • Estilos y animaciones                      │
├─────────────────────────────────────────────────┤
│  4. VERIFICAR                                   │
│     • npm run build → sin errores               │
│     • npm run lint → sin warnings               │
│     • Prueba manual en dev server               │
│     • TestSprite para coverage (si está config)  │
├─────────────────────────────────────────────────┤
│  5. DOCUMENTAR & COMMIT                         │
│     • Actualizar STATUS.md                       │
│     • Commit con conventional commits           │
│     • Actualizar task de Sprint00                │
└─────────────────────────────────────────────────┘
```

---

## 📌 Tips para Maximizar la Efectividad de la IA

1. **Sé específico:** En lugar de "haz el foro", di "crea la Server Action `sendForumMessage` en `app/actions/forum.ts` que valide con Zod y haga INSERT en `forum_messages`".

2. **Provee archivos de referencia:** Siempre comparte los archivos que la IA necesita leer antes de implementar.

3. **Divide y conquista:** Un prompt largo y vago produce resultados peores que 5 prompts cortos y específicos.

4. **Valida cada paso:** No avances al paso 3 si el paso 2 no compila.

5. **Guarda el contexto:** Si divides un ticket en múltiples sesiones, empieza cada sesión con un resumen de lo completado.

6. **Usa los patrones existentes:** Cuando pidas implementar algo nuevo, referencia un patrón similar que ya existe en el codebase (ej.: "siguiendo el patrón de `app/actions/feedback.ts`").

7. **Prioriza siempre:** Si algo no compila o no funciona, arreglarlo tiene prioridad sobre avanzar.

---

*Plan generado el 2026-04-13 · Computer Science Hub · Sprint 00*  
*Referencia: AsignacionesFormales.md*
