# Cambios en Backend para Integración con Resend

## 📅 Fecha
22 de marzo de 2026

## 🎯 Objetivo
Adaptar el flujo de autenticación (registro, login, recuperación de contraseña) para funcionar correctamente con el nuevo servicio SMTP de Resend, reemplazando el servicio SMTP gratuito limitado de Supabase.

---

## 📝 Cambios Realizados

### 1. Variables de Entorno

#### Archivo: `.env`
**Cambio:** Agregada variable `NEXT_PUBLIC_SITE_URL`

**Antes:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://lijihfnrcjuooaoftyel.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_vX7r21xGamRM5DarVd6BaA_j9yhUTrG
RESEND_API_KEY=re_5WdrK97y_ARYTacRrHaejTiQdNHPfkDYe
```

**Después:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://lijihfnrcjuooaoftyel.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_vX7r21xGamRM5DarVd6BaA_j9yhUTrG
NEXT_PUBLIC_SITE_URL=https://computersciencehub-web.vercel.app
RESEND_API_KEY=re_5WdrK97y_ARYTacRrHaejTiQdNHPfkDYe
```

**Razón:** La variable `NEXT_PUBLIC_SITE_URL` es necesaria para que los enlaces de confirmación en los emails apunten correctamente a la aplicación en producción en lugar de localhost.

---

#### Archivo: `.env.example`
**Cambio:** Agregada documentación de `RESEND_API_KEY`

**Agregado:**
```env
# API Key de Resend para SMTP (obtener en https://resend.com/api-keys)
# Necesaria para envío de emails de confirmación en desarrollo local
RESEND_API_KEY=re_REPLACE_ME
```

**Razón:** Documentar para otros desarrolladores que necesitarán esta variable para desarrollo local.

---

### 2. Página de Registro

#### Archivo: `app/registro/page.tsx`

**Cambio 1: Mejora en mensaje de rate limiting**

**Líneas 96-109**

**Antes:**
```typescript
description: isRateLimit
  ? 'Por seguridad, Supabase limita los registros por minuto. Espera un momento e inténtalo de nuevo.'
  : error.message,
```

**Después:**
```typescript
description: isRateLimit
  ? 'Por seguridad, esperá un momento antes de intentar nuevamente.'
  : error.message,
```

**Razón:** Mensaje más conciso y sin mencionar específicamente "Supabase" ya que ahora usamos Resend.

---

**Cambio 2: Mensaje de confirmación mejorado**

**Líneas 118-122**

**Antes:**
```typescript
toast({
  title: 'Revisa tu correo',
  description:
    'Te enviamos un enlace para confirmar tu cuenta. Después podrás iniciar sesión.',
})
```

**Después:**
```typescript
toast({
  title: '✉️ Confirmá tu correo',
  description:
    'Te enviamos un email de confirmación desde noreply@send.cshdevs.org. Revisá tu bandeja de entrada y confirmá tu cuenta para poder iniciar sesión.',
})
```

**Razón:** 
- Más descriptivo y específico
- Menciona el remitente exacto (`noreply@send.cshdevs.org`)
- Emoji visual para mejor UX
- Instruye claramente al usuario sobre qué hacer

---

### 3. Página de Login

#### Archivo: `app/login/page.tsx`

**Cambio: Mensaje de recuperación de contraseña mejorado**

**Líneas 112-116**

**Antes:**
```typescript
setResetSent(true)
toast({
  title: 'Revisá tu correo',
  description: 'Te enviamos un enlace para restablecer tu contraseña.',
})
```

**Después:**
```typescript
setResetSent(true)
toast({
  title: '✉️ Revisá tu correo',
  description: 'Te enviamos un enlace desde noreply@send.cshdevs.org para restablecer tu contraseña.',
})
```

**Razón:** 
- Menciona el remitente específico para que el usuario sepa qué email buscar
- Emoji visual para mejor UX
- Consistencia con el mensaje de registro

---

### 4. Configuración de Supabase (Local)

#### Archivo: `supabase/config.toml`

**Cambio 1: Habilitar confirmaciones por email**

**Línea 214**

**Antes:**
```toml
enable_confirmations = false
```

**Después:**
```toml
enable_confirmations = true
```

**Razón:** Ahora que tenemos SMTP personalizado con Resend (3,000 emails/mes vs 2 emails/hora), podemos habilitar las confirmaciones por email de forma segura.

---

**Cambio 2: Configurar SMTP de Resend**

**Líneas 225-233**

**Antes:**
```toml
# Use a production-ready SMTP server
# [auth.email.smtp]
# enabled = true
# host = "smtp.sendgrid.net"
# port = 587
# user = "apikey"
# pass = "env(SENDGRID_API_KEY)"
# admin_email = "admin@email.com"
# sender_name = "Admin"
```

**Después:**
```toml
# Use a production-ready SMTP server (Resend)
[auth.email.smtp]
enabled = true
host = "smtp.resend.com"
port = 465
user = "resend"
pass = "env(RESEND_API_KEY)"
admin_email = "noreply@send.cshdevs.org"
sender_name = "ComputerScienceHub"
```

**Razón:** 
- Configurar SMTP de Resend para desarrollo local
- Puerto 465 (SSL) para mayor seguridad
- Email remitente profesional con dominio verificado
- Nombre del remitente descriptivo

---

## ✅ Archivos NO Modificados (pero relevantes)

### `app/auth/callback/route.ts`
**Estado:** No requiere cambios

**Razón:** Este archivo maneja el callback después de la confirmación de email. El código actual ya es compatible con Resend:
- Procesa el código de confirmación correctamente
- Redirige apropiadamente después de la confirmación
- Maneja errores de autenticación

### `src/lib/supabase/client.ts`
**Estado:** No requiere cambios

**Razón:** El cliente de Supabase funciona independientemente del proveedor SMTP configurado.

### `src/lib/site-url.ts`
**Estado:** No requiere cambios

**Razón:** Ya tiene la lógica correcta para:
1. Usar `window.location.origin` en el cliente
2. Usar `NEXT_PUBLIC_SITE_URL` en el servidor
3. Fallback a localhost en desarrollo

---

## 🔄 Flujo de Autenticación Actualizado

### Flujo de Registro

```mermaid
graph TD
    A[Usuario completa formulario] --> B[signUp con Supabase]
    B --> C{¿Error?}
    C -->|Sí| D[Mostrar toast de error]
    C -->|No| E{¿Sesión creada?}
    E -->|Sí| F[Redirigir a /perfil]
    E -->|No| G[Mostrar toast: Confirmá tu correo]
    G --> H[Supabase envía email via Resend SMTP]
    H --> I[Email desde noreply@send.cshdevs.org]
    I --> J[Usuario hace clic en enlace]
    J --> K[/auth/callback procesa confirmación]
    K --> L[Usuario puede iniciar sesión]
```

### Flujo de Recuperación de Contraseña

```mermaid
graph TD
    A[Usuario ingresa email] --> B[resetPasswordForEmail]
    B --> C{¿Error?}
    C -->|Sí| D[Mostrar toast de error]
    C -->|No| E[Mostrar toast: Revisá tu correo]
    E --> F[Supabase envía email via Resend SMTP]
    F --> G[Email desde noreply@send.cshdevs.org]
    G --> H[Usuario hace clic en enlace]
    H --> I[/auth/callback con next=/perfil]
    I --> J[Usuario puede cambiar contraseña]
```

---

## 📋 Checklist de Verificación

### Backend (Código)
- [x] Variable `NEXT_PUBLIC_SITE_URL` agregada al `.env`
- [x] Variable `RESEND_API_KEY` documentada en `.env.example`
- [x] Mensajes de confirmación actualizados en `/registro`
- [x] Mensaje de recuperación actualizado en `/login`
- [x] `enable_confirmations = true` en `config.toml`
- [x] SMTP configurado en `config.toml` (desarrollo local)

### Producción (Pendiente)
- [ ] **IMPORTANTE:** Configurar SMTP en Dashboard de Supabase (producción)
- [ ] Configurar variables de entorno en Vercel:
  - [ ] `NEXT_PUBLIC_SITE_URL`
  - [ ] `RESEND_API_KEY`
- [ ] Probar registro completo en producción
- [ ] Probar recuperación de contraseña en producción

---

## 🚀 Pasos para Desplegar en Producción

### 1. Configurar Variables en Vercel

```bash
# En Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_SITE_URL=https://computersciencehub-web.vercel.app
RESEND_API_KEY=re_5WdrK97y_ARYTacRrHaejTiQdNHPfkDYe
```

### 2. Configurar SMTP en Supabase Dashboard

1. Ir a: https://supabase.com/dashboard/project/lijihfnrcjuooaoftyel
2. Navegar a: **Authentication** → **SMTP Settings**
3. Activar: **Enable Custom SMTP**
4. Configurar:
   ```
   Sender email: noreply@send.cshdevs.org
   Sender name: ComputerScienceHub
   Host: smtp.resend.com
   Port: 465
   Username: resend
   Password: re_5WdrK97y_ARYTacRrHaejTiQdNHPfkDYe
   ```
5. Guardar cambios

### 3. Habilitar Confirmaciones en Supabase

1. En el mismo dashboard de Supabase
2. **Authentication** → **Email Auth**
3. Asegurarse de que **Confirm email** esté activado
4. Verificar que **Secure email change** esté configurado según preferencia

### 4. Probar el Flujo Completo

```bash
# 1. Registrar un usuario de prueba
# 2. Verificar que el email llegue desde noreply@send.cshdevs.org
# 3. Confirmar el email haciendo clic en el enlace
# 4. Iniciar sesión con el usuario confirmado
# 5. Probar recuperación de contraseña
```

---

## 🔍 Monitoreo y Troubleshooting

### Verificar Envío de Emails

**Dashboard de Resend:** https://resend.com/emails

Aquí puedes ver:
- Emails enviados
- Estado de entrega (delivered, bounced, complained)
- Logs de errores

### Verificar Usuarios en Supabase

**Dashboard de Supabase:** https://supabase.com/dashboard/project/lijihfnrcjuooaoftyel/auth/users

Aquí puedes ver:
- Usuarios registrados
- Estado de confirmación (confirmed/unconfirmed)
- Última actividad

### Problemas Comunes

#### 1. Email no llega al usuario

**Causas posibles:**
- El email está en spam (revisar carpeta de spam)
- Dominio no verificado en Resend (verificar en dashboard)
- SMTP mal configurado en Supabase (revisar configuración)

**Solución:**
```bash
# Verificar estado del dominio
resend domains get 4ddf18b2-6142-46d1-9400-dd5369f16329
```

#### 2. Error "Email not confirmed" al iniciar sesión

**Causa:** El usuario no ha confirmado su email

**Solución:**
- El usuario debe revisar su email y hacer clic en el enlace
- O manualmente confirmar el usuario desde el dashboard de Supabase

#### 3. Enlaces de confirmación apuntan a localhost

**Causa:** Variable `NEXT_PUBLIC_SITE_URL` no configurada en Vercel

**Solución:**
1. Ir a Vercel Dashboard
2. Settings → Environment Variables
3. Agregar `NEXT_PUBLIC_SITE_URL` con la URL de producción
4. Redesplegar la aplicación

---

## 📊 Comparación Antes vs Después

| Aspecto | Antes (SMTP Supabase Free) | Después (Resend) |
|---------|---------------------------|------------------|
| **Emails/hora** | 2 | Sin límite |
| **Emails/mes** | ~1,460 máximo | 3,000 |
| **Remitente** | email@supabase.io | noreply@send.cshdevs.org |
| **Dominio** | Genérico Supabase | Dominio propio verificado |
| **Confirmaciones** | Deshabilitadas | ✅ Habilitadas |
| **Recuperación contraseña** | ✅ Funcional (limitado) | ✅ Funcional (sin límites) |
| **Profesionalismo** | Bajo | Alto |

---

## 📚 Referencias

- [Documentación de Resend SMTP](../configuracion-resend-smtp.md)
- [Supabase Auth Configuration](https://supabase.com/docs/guides/auth/auth-smtp)
- [Resend API Documentation](https://resend.com/docs)

---

**Documentación creada el:** 22 de marzo de 2026  
**Última actualización:** 22 de marzo de 2026  
**Autor:** Configuración asistida por IA  
**Proyecto:** ComputerScienceHub-Web
