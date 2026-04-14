# 📋 Asignaciones Formales — Sprint 00

> **Proyecto:** Computer Science Hub (CSH) Web  
> **URL Producción:** `https://cshdevs.org`  
> **Sprint:** Sprint 00 — Hotfix + Nuevas Funcionalidades  
> **Fecha de creación:** 2026-04-13  
> **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Supabase · Resend · Vercel

---

## Índice

| Código | Tipo | Título | Prioridad | Complejidad |
|:---|:---|:---|:---|:---|
| CSH-S0-001 | 🐛 Bug | Feedback anónimo no se persiste | **Crítica** | Media |
| CSH-S0-002 | 🐛 Bug | Encuesta Betatester bloqueada para anónimos | **Crítica** | Media |
| CSH-S0-003 | 🔍 Chore | Auditoría de deuda técnica funcional | **Alta** | Alta |
| CSH-S0-004 | ✨ Feature | Easter Egg — Juego tipo Galaga 2D | **Media** | Muy Alta |
| CSH-S0-005 | ✨ Feature | Foro abierto en Realtime | **Crítica** | Muy Alta |
| CSH-S0-006 | ✨ Feature | Sistema de bandas y roles de usuario | **Alta** | Alta |
| CSH-S0-007 | ✨ Feature | Integración multi-universidad | **Media** | Media |
| CSH-S0-008 | ✨ Feature | Sistema de mensajería interna Realtime | **Alta** | Muy Alta |
| CSH-S0-009 | ✨ Feature | Foros por áreas de interés + notificaciones | **Alta** | Muy Alta |
| CSH-S0-010 | ✨ Feature | Sistema de posts/papers + biblioteca personal | **Alta** | Épica |
| CSH-S0-011 | 🏗️ Chore | Plan de arquitectura y workflow profesional | **Crítica** | Alta |

---

## Detalle de Asignaciones

---

### CSH-S0-001 · 🐛 Bug · Feedback Anónimo No Se Persiste

**Prioridad:** Crítica  
**Complejidad:** Media (5 SP)  
**Módulo afectado:** `app/actions/feedback.ts` · `components/feedback-form.tsx`

#### Descripción

El formulario de "Déjanos tu opinión" (`/feedback`) bloquea el envío para usuarios anónimos con el guard:

```typescript
// app/actions/feedback.ts — línea 29
if (!user || user.is_anonymous) {
  return { ok: false, message: 'Debes iniciar sesión para enviar feedback.' }
}
```

El requisito de negocio es que **usuarios anónimos también puedan enviar feedback**, pero con rate limiting para prevenir spam y ataques DoS.

#### Criterios de Aceptación

- [ ] **AC-1:** Un usuario sin autenticar puede enviar feedback desde `/feedback` y el registro se persiste en la tabla `feedback` de Supabase.
- [ ] **AC-2:** Se implementa rate limiting de **máximo 75 envíos por hora** por IP para usuarios anónimos. El mecanismo puede ser:
  - *Opción A:* RLS policy + función PostgreSQL con ventana temporal.
  - *Opción B:* Rate limiter a nivel de Server Action con cache en memoria o Redis (considerar el plan free de Supabase).
- [ ] **AC-3:** El email de notificación al admin (`notifyAdminFeedback`) se sigue disparando para envíos anónimos, indicando claramente que el remitente es anónimo.
- [ ] **AC-4:** Se mantiene la validación de campos (nombre, email, mensaje ≥ 10 caracteres).
- [ ] **AC-5:** El formulario muestra un toast de éxito al completar el envío anónimo.

#### Archivos a Modificar

| Archivo | Cambio |
|---|---|
| `app/actions/feedback.ts` | Eliminar guard de autenticación; agregar rate limiting |
| `components/feedback-form.tsx` | Asegurar que no bloquee la UI si el usuario es anónimo |
| `supabase/migrations/` | (Opcional) RLS policy para permitir INSERT anónimo con rate limit |

#### Notas Técnicas

- La tabla `feedback` actualmente requiere RLS review: verificar que la policy permita INSERT sin `auth.uid()`.
- Considerar agregar un campo `is_anonymous` (boolean) a la tabla `feedback` para métricas.
- El rate limit por IP puede implementarse con un Map en memoria del Server Action (reseteo por hora) dado que Vercel serverless functions tienen lifecycle corto — evaluar alternativa con contador en tabla de Supabase.

---

### CSH-S0-002 · 🐛 Bug · Encuesta Betatester Bloqueada para Anónimos

**Prioridad:** Crítica  
**Complejidad:** Media (5 SP)  
**Módulo afectado:** `app/actions/betatester-survey.ts` · `components/betatester-survey-form.tsx`

#### Descripción

Al seleccionar "Soy usuario nuevo" en la encuesta de Betatester, el formulario no permite el envío si el usuario no está autenticado. El código actual en `submitNewUserSurvey` ya maneja parcialmente esto:

```typescript
user_id: user?.is_anonymous ? null : user?.id ?? null,
```

Sin embargo, la **RLS policy** en Supabase o el propio formulario del frontend bloquean la inserción.

#### Criterios de Aceptación

- [ ] **AC-1:** Un usuario anónimo puede completar y enviar la encuesta "Soy usuario nuevo" sin autenticarse.
- [ ] **AC-2:** El campo `user_id` se guarda como `null` para envíos anónimos.
- [ ] **AC-3:** La encuesta de "Soy usuario recurrente" sigue requiriendo autenticación (comportamiento actual).
- [ ] **AC-4:** Se aplica rate limiting equivalente al de CSH-S0-001 (75/hora por IP) para encuestas anónimas.
- [ ] **AC-5:** La UI no muestra elementos de autenticación cuando se selecciona "Soy usuario nuevo".

#### Archivos a Modificar

| Archivo | Cambio |
|---|---|
| `app/actions/betatester-survey.ts` | Verificar que no se rechace por falta de auth |
| `components/betatester-survey-form.tsx` | Limpiar lógica condicional de UI para anónimos |
| `supabase/migrations/` | RLS policy para `betatester_survey_new_users` que permita INSERT anónimo |

---

### CSH-S0-003 · 🔍 Chore · Auditoría de Deuda Técnica Funcional

**Prioridad:** Alta  
**Complejidad:** Alta (13 SP)  
**Módulo afectado:** Todo el repositorio

#### Descripción

Exploración exhaustiva del repositorio para identificar funcionalidades incompletas, rutas muertas, queries sin uso, componentes huérfanos, inconsistencias de tipos y vulnerabilidades de lógica de negocio.

#### Criterios de Aceptación

- [ ] **AC-1:** Se genera un documento `docs/work/Sprints/Sprint00/AuditoriaTecnica.md` con:
  - Listado de rutas funcionales vs. no funcionales.
  - Componentes sin uso o con props sin implementar.
  - Server Actions con lógica incompleta.
  - Queries de Supabase no utilizadas.
  - Tipos TypeScript desactualizados vs. schema de BD.
- [ ] **AC-2:** Cada deuda identificada incluye: ubicación (archivo:línea), severidad (crítica/alta/media/baja) y esfuerzo estimado.
- [ ] **AC-3:** Se clasifican las deudas por categoría: seguridad, funcionalidad, rendimiento, UX, accesibilidad.
- [ ] **AC-4:** El documento propone una priorización para abordar las deudas en sprints futuros.

#### Proceso de Ejecución

1. Mapeo de todas las rutas en `app/` y verificar que cada `page.tsx` renderiza correctamente.
2. Revisar cada Server Action en `app/actions/` vs. formularios que la consumen.
3. Auditar `src/lib/supabase/queries.ts` y `community-queries.ts` — verificar que cada query tenga al menos un consumidor.
4. Comparar `src/types/index.ts` con el schema real de Supabase reportado en `docs/DATABASE.md`.
5. Revisar RLS policies en `supabase/migrations/` para detectar brechas.
6. Analizar `components/` para identificar componentes sin importar o duplicados.

---

### CSH-S0-004 · ✨ Feature · Easter Egg — Juego Tipo Galaga 2D

**Prioridad:** Media  
**Complejidad:** Muy Alta (21 SP)  
**Módulo afectado:** Nuevo módulo — `app/easter-egg/` · `components/game/`

#### Descripción

Implementar un juego de naves espaciales 2D estilo Galaga con 10 niveles (0–10), accesible como Easter Egg oculto dentro de la plataforma. Debe ser un minijuego ligero, divertido, con instrucciones claras y dificultad progresiva.

#### Criterios de Aceptación

- [ ] **AC-1:** El juego se activa mediante una interacción oculta (ej.: Konami Code, click en elemento específico del footer, o combinación de teclas).
- [ ] **AC-2:** Canvas HTML5 o implementación con React + CSS para el juego 2D.
- [ ] **AC-3:** 11 niveles (0–10) con dificultad progresiva:
  - Nivel 0: Tutorial interactivo.
  - Niveles 1–5: Incremento gradual de enemigos y velocidad.
  - Niveles 6–9: Power-ups, tipos de enemigos especiales.
  - Nivel 10: Jefe final.
- [ ] **AC-4:** Controles intuitivos: teclado (flechas + espacio) y touch para móvil.
- [ ] **AC-5:** Pantalla de instrucciones antes de iniciar.
- [ ] **AC-6:** Score visible durante el juego y pantalla de "Game Over" / "Victoria" al finalizar.
- [ ] **AC-7:** El juego se carga de forma lazy (code-splitting) para no impactar el rendimiento del sitio principal.
- [ ] **AC-8:** Diseño visual coherente con la identidad del hub (dark mode, colores del brand).

#### Restricciones

- Sin dependencias externas de game engine (Phaser, PixiJS) — usar Canvas API nativo o CSS animations.
- El bundle del juego no debe exceder **150 KB** gzipped.
- Compatible con Chrome, Firefox, Safari, Edge y navegadores móviles.

#### Estructura Propuesta

```
app/easter-egg/
  └── page.tsx              # Entrada (lazy route)
components/game/
  ├── GalagaGame.tsx        # Motor principal del juego
  ├── GameCanvas.tsx         # Canvas wrapper
  ├── GameHUD.tsx            # Score, vidas, nivel
  ├── GameInstructions.tsx   # Pantalla de instrucciones
  ├── useGameLoop.ts         # Custom hook para game loop
  └── types.ts               # Tipos del juego
```

---

### CSH-S0-005 · ✨ Feature · Foro Abierto en Realtime

**Prioridad:** Crítica  
**Complejidad:** Muy Alta (21 SP)  
**Módulo afectado:** `app/foro/` · `components/foro/` · Supabase Realtime

#### Descripción

Implementar un foro de chat abierto donde la comunidad pueda conversar en tiempo real usando Supabase Realtime.

#### Criterios de Aceptación

- [ ] **AC-1:** Ruta `/foro` accesible desde la navegación principal.
- [ ] **AC-2:** **Usuarios anónimos:** Solo pueden leer mensajes (modo solo lectura). Se muestra un banner invitando a registrarse para participar.
- [ ] **AC-3:** **Usuarios autenticados** pueden:
  - Escribir nuevos mensajes.
  - Editar sus propios mensajes (ventana de 15 minutos).
  - Eliminar sus propios mensajes.
- [ ] **AC-4:** Los mensajes se actualizan en tiempo real via Supabase Realtime (sin refresh).
- [ ] **AC-5:** Cada mensaje muestra: avatar generativo del autor, nombre, timestamp relativo, y badge de rol (Agent/Member/Fellow).
- [ ] **AC-6:** Scroll infinito para mensajes históricos con paginación cursor-based.
- [ ] **AC-7:** Filtro de contenido básico (palabras prohibidas).
- [ ] **AC-8:** Límite de 500 caracteres por mensaje.

#### Schema de Base de Datos

```sql
CREATE TABLE forum_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL CHECK (char_length(content) BETWEEN 1 AND 500),
  edited boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE forum_messages ENABLE ROW LEVEL SECURITY;

-- Lectura: todos (incluye anónimos)
CREATE POLICY "Forum messages are viewable by everyone"
  ON forum_messages FOR SELECT USING (true);

-- Inserción: solo autenticados no-anónimos
CREATE POLICY "Authenticated users can insert messages"
  ON forum_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Update/Delete: solo el autor
CREATE POLICY "Users can update own messages"
  ON forum_messages FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own messages"
  ON forum_messages FOR DELETE USING (auth.uid() = user_id);
```

#### Archivos Nuevos

| Archivo | Propósito |
|---|---|
| `app/foro/page.tsx` | Página RSC del foro |
| `components/foro/ForumChat.tsx` | Componente principal con Realtime subscription |
| `components/foro/MessageBubble.tsx` | Burbuja de mensaje individual |
| `components/foro/MessageInput.tsx` | Input para nuevo mensaje |
| `app/actions/forum.ts` | Server Actions: insert/update/delete mensaje |
| `src/lib/supabase/queries.ts` | Query para paginación de mensajes |

---

### CSH-S0-006 · ✨ Feature · Sistema de Bandas y Roles de Usuario

**Prioridad:** Alta  
**Complejidad:** Alta (13 SP)  
**Módulo afectado:** `profiles` table · `components/miembros-directory.tsx` · UI global

#### Descripción

Implementar un sistema de diferenciación visual de usuarios mediante "bandas" (badges) que representen su rol y categoría dentro del hub.

#### Roles y Bandas

| Banda | Código | Descripción | Color sugerido |
|---|---|---|---|
| CEO-Founder | `ceo_founder` | Creador del Hub | 🟡 Dorado |
| Primary Agent | `primary_agent` | Primera mesa de agents | 🟠 Ámbar |
| Primary Fellow | `primary_fellow` | Primera mesa de fellows | 🟣 Púrpura |
| Agent | `agent` | Colaboradores del hub | 🔵 Azul |
| Member | `member` | Usuarios registrados activos | 🟢 Verde |
| Fellow | `fellow` | Sponsors / patrocinadores | 💎 Diamante |
| Catedrático | `catedratico` | Profesores de la facultad | 🔴 Rojo |
| Estudiante | `estudiante` | Alumnos de la facultad | ⚪ Neutro |

#### Criterios de Aceptación

- [ ] **AC-1:** Se agrega el campo `badge` (text) y `university_role` (text) a la tabla `profiles`.
- [ ] **AC-2:** El badge se muestra como un chip visual junto al nombre del usuario en: directorio de miembros, foro, perfil público, y headers de mensajes.
- [ ] **AC-3:** Los badges fundadores (`ceo_founder`, `primary_agent`, `primary_fellow`) solo se asignan vía admin o migración — no editables por el usuario.
- [ ] **AC-4:** El componente `<UserBadge />` es reutilizable y acepta el tipo de badge como prop.
- [ ] **AC-5:** Se actualiza el tipo `MemberProfile` en `src/types/index.ts` para incluir los nuevos campos.
- [ ] **AC-6:** Se actualiza el formulario de onboarding para permitir seleccionar `estudiante` o `catedratico` como `university_role`.

#### Archivos a Modificar/Crear

| Archivo | Cambio |
|---|---|
| `supabase/migrations/` | ALTER TABLE profiles ADD badge, university_role |
| `src/types/index.ts` | Nuevos tipos `UserBadge`, `UniversityRole` |
| `components/ui/user-badge.tsx` | [NEW] Componente visual de badge |
| `components/miembros-directory.tsx` | Integrar `<UserBadge />` |
| `app/onboarding/` | Agregar selector de rol universitario |

---

### CSH-S0-007 · ✨ Feature · Integración Multi-Universidad

**Prioridad:** Media  
**Complejidad:** Media (8 SP)  
**Módulo afectado:** `profiles` table · Onboarding · Registro

#### Descripción

Expandir el sistema para soportar múltiples universidades de El Salvador, más allá de UDB.

#### Universidades a Agregar

| Sigla | Nombre Completo |
|---|---|
| UDB | Universidad Don Bosco |
| UCA | Universidad Centroamericana José Simeón Cañas |
| ESEN | Escuela Superior de Economía y Negocios |
| UES | Universidad de El Salvador |
| UFG | Universidad Francisco Gavidia |
| UEES | Universidad Evangélica de El Salvador |

#### Criterios de Aceptación

- [ ] **AC-1:** Se agrega el campo `university` (text) a la tabla `profiles` con default `'UDB'`.
- [ ] **AC-2:** Se crea una tabla `universities` o configuración estática con las universidades disponibles.
- [ ] **AC-3:** El formulario de registro incluye un selector de universidad.
- [ ] **AC-4:** El flujo de onboarding permite cambiar la universidad seleccionada.
- [ ] **AC-5:** El directorio de miembros muestra la universidad como metadata y permite filtrar por ella.
- [ ] **AC-6:** El perfil del usuario muestra su universidad.

---

### CSH-S0-008 · ✨ Feature · Sistema de Mensajería Interna Realtime

**Prioridad:** Alta  
**Complejidad:** Muy Alta (34 SP)  
**Módulo afectado:** Nueva sección completa

#### Descripción

Implementar un sistema de mensajería directa (DMs) entre usuarios autenticados, con notificaciones en tiempo real vía Supabase Realtime.

#### Criterios de Aceptación

- [ ] **AC-1:** Los usuarios autenticados pueden enviar mensajes directos a otros miembros del hub.
- [ ] **AC-2:** Los mensajes se entregan en tiempo real usando Supabase Realtime.
- [ ] **AC-3:** Interfaz tipo chat con lista de conversaciones (sidebar) y panel de mensajes.
- [ ] **AC-4:** Indicador de mensajes no leídos en el header/navbar.
- [ ] **AC-5:** Historial de conversaciones paginado.
- [ ] **AC-6:** Solo usuarios autenticados pueden acceder (ruta protegida).
- [ ] **AC-7:** Los usuarios pueden bloquear a otros para no recibir mensajes de ellos.
- [ ] **AC-8:** Soporte responsive (móvil: vista de lista o chat, no ambas simultáneamente).

#### Schema Propuesto

```sql
CREATE TABLE conversations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE conversation_participants (
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE direct_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL CHECK (char_length(content) BETWEEN 1 AND 2000),
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE blocked_users (
  blocker_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  blocked_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (blocker_id, blocked_id)
);
```

---

### CSH-S0-009 · ✨ Feature · Foros por Áreas de Interés + Notificaciones

**Prioridad:** Alta  
**Complejidad:** Muy Alta (34 SP)  
**Módulo afectado:** `app/foros/` · Supabase Realtime · Notificaciones

#### Descripción

Sistema de foros temáticos organizados por áreas de interés técnico (Frontend, Backend, IA, DevOps, Seguridad, etc.) con notificaciones en tiempo real para los suscriptores de cada área.

> **Nota:** Esta feature extiende CSH-S0-005 (Foro General). El foro general pasa a ser un canal dentro del sistema de foros.

#### Criterios de Aceptación

- [ ] **AC-1:** Ruta `/foros` que lista todos los foros disponibles organizados por área.
- [ ] **AC-2:** Ruta `/foros/[area]` para ver los threads de un foro específico.
- [ ] **AC-3:** Los usuarios pueden suscribirse/desuscribirse a foros de su interés.
- [ ] **AC-4:** Usuarios anónimos: solo lectura del foro general y los foros por área.
- [ ] **AC-5:** Usuarios autenticados: CRUD de sus propios comentarios en cualquier foro al que estén suscritos.
- [ ] **AC-6:** Sistema de notificaciones in-app para actividad en foros suscritos.
- [ ] **AC-7:** El foro general (CSH-S0-005) se integra como el canal `general` dentro de este sistema.
- [ ] **AC-8:** Cada thread soporta respuestas anidadas (máx. 2 niveles de profundidad).

#### Dependencias

- Depende de: **CSH-S0-005** (Foro Realtime base).
- Se beneficia de: **CSH-S0-006** (Badges visibles en los posts del foro).

---

### CSH-S0-010 · ✨ Feature · Sistema de Posts/Papers + Biblioteca Personal

**Prioridad:** Alta  
**Complejidad:** Épica (55+ SP) — Considerar subdivir en sub-features  
**Módulo afectado:** Nueva sección completa

#### Descripción

Plataforma de publicación y consumo de papers académicos y artículos técnicos en formato Markdown y PDF, con funcionalidades sociales y biblioteca personal para cada usuario.

#### Criterios de Aceptación

**Publicación:**
- [ ] **AC-1:** Usuarios autenticados pueden crear posts en formato Markdown con preview en tiempo real.
- [ ] **AC-2:** Los posts pueden incluir archivos PDF adjuntos.
- [ ] **AC-3:** Sistema de categorías/tags para organizar contenido.

**Consumo:**
- [ ] **AC-4:** Usuarios anónimos pueden ver posts (solo lectura).
- [ ] **AC-5:** Viewer de PDF inline sin necesidad de descarga.
- [ ] **AC-6:** Renderizado de Markdown con code highlighting.

**Interacción Social:**
- [ ] **AC-7:** Like / Dislike en posts.
- [ ] **AC-8:** Comentarios en posts (solo usuarios autenticados).
- [ ] **AC-9:** Compartir post (generar link limpio, open graph tags).
- [ ] **AC-10:** Guardar posts en biblioteca personal.

**Biblioteca Personal:**
- [ ] **AC-11:** Cada usuario tiene una sección "Mi Biblioteca" con posts guardados.
- [ ] **AC-12:** Organización personal por carpetas/colecciones.

**Almacenamiento:**
- [ ] **AC-13:** PDFs y assets se almacenan en Supabase Storage (free tier: 1 GB).
- [ ] **AC-14:** Límite de 10 MB por archivo PDF.
- [ ] **AC-15:** Documentar plan de migración a almacenamiento alternativo cuando se alcance el límite del free tier (opciones: Cloudflare R2 gratuito 10 GB/mes, Backblaze B2).

#### ⚠️ Consideraciones del Free Tier de Supabase

| Recurso | Límite Free | Estrategia |
|---|---|---|
| Storage | 1 GB | Comprimir PDFs; limitar 10 MB/archivo; alertar al 80% |
| Bandwidth | 2 GB/mes | Lazy load de PDFs; thumbnails para listados |
| Database rows | 500 MB | Paginación estricta; archiving de posts viejos |

**Plan de contingencia:** Cloudflare R2 ofrece 10 GB/mes gratuito con egress gratis — ideal como backend de storage alternativo en fase de escala.

---

### CSH-S0-011 · 🏗️ Chore · Plan de Arquitectura y Workflow Profesional

**Prioridad:** Crítica  
**Complejidad:** Alta (13 SP)  
**Módulo afectado:** Documentación · CI/CD · Supabase environments

#### Descripción

Diseñar e implementar un plan para profesionalizar el flujo de trabajo del proyecto: branching strategy, entornos de Supabase, CI/CD en Vercel, convenciones de código, y estándares de la industria.

#### Criterios de Aceptación

- [ ] **AC-1:** Documento `docs/WORKFLOW.md` que define:
  - Git branching strategy (GitFlow o Trunk-based).
  - Convención de commits (Conventional Commits).
  - Template de PR con checklist.
  - Proceso de code review.
- [ ] **AC-2:** Configuración de entornos en Supabase:
  - `development` (local con `supabase start`).
  - `staging` (proyecto Supabase separado para QA).
  - `production` (proyecto actual).
- [ ] **AC-3:** Pipeline de CI/CD en Vercel:
  - Preview deploys automáticos en PRs.
  - Deploy a producción solo desde `main`.
  - Lint + build check obligatorio.
- [ ] **AC-4:** Documento `docs/ENVIRONMENTS.md` con instrucciones de setup de cada entorno.
- [ ] **AC-5:** Script de migración de esquema de BD entre entornos (`supabase db push` / `supabase db reset`).
- [ ] **AC-6:** Se establece un GitHub Actions workflow básico (lint + type-check + build).

---

## Resumen de Esfuerzo

| Categoría | Story Points | Items |
|---|---|---|
| 🐛 Bugs (Hotfix) | 10 SP | 2 |
| 🔍 Chore (Auditoría) | 13 SP | 1 |
| ✨ Features (Nuevas) | 186+ SP | 7 |
| 🏗️ Chore (Arquitectura) | 13 SP | 1 |
| **Total Sprint 00** | **222+ SP** | **11** |

> ⚠️ **Nota:** Este sprint tiene una carga de trabajo que excede significativamente la capacidad de un sprint estándar (40–60 SP). Se recomienda **priorizar los hotfixes (CSH-S0-001, CSH-S0-002)** y la **arquitectura (CSH-S0-011)** como Sprint 00, y distribuir las features en sprints subsecuentes.

---

## Priorización Recomendada

### 🔴 Sprint 00A — Hotfixes & Fundación (Meta: 1–2 semanas)
1. CSH-S0-001 — Feedback anónimo
2. CSH-S0-002 — Encuesta Betatester anónimos
3. CSH-S0-003 — Auditoría de deuda técnica
4. CSH-S0-011 — Plan de arquitectura y workflow

### 🟡 Sprint 00B — Identidad & Comunidad (Meta: 2–3 semanas)
5. CSH-S0-006 — Bandas y roles
6. CSH-S0-007 — Multi-universidad
7. CSH-S0-005 — Foro Realtime (base)

### 🟢 Sprint 00C — Social & Engagement (Meta: 3–4 semanas)
8. CSH-S0-004 — Easter Egg Galaga
9. CSH-S0-009 — Foros por área (extiende S0-005)
10. CSH-S0-008 — Mensajería directa

### 🔵 Sprint 00D — Contenido & Papers (Meta: 4–6 semanas)
11. CSH-S0-010 — Posts/Papers + Biblioteca

---

*Documento generado el 2026-04-13 · Computer Science Hub · Sprint 00*
