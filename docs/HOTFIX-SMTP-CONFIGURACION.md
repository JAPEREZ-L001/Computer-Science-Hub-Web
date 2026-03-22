# HOTFIX: Configurar SMTP en Supabase Dashboard

## 🚨 Problema Actual

Error 500 al intentar registrar usuarios: `POST https://lijihfnrcjuooaoftyel.supabase.co/auth/v1/signup 500 (Internal Server Error)`

**Causa:** Supabase Auth intenta enviar email de confirmación pero no tiene servidor SMTP configurado correctamente en el dashboard.

## ✅ Secret Configurado

Ya se configuró el secret `RESEND_API_KEY` en Supabase:

```bash
npx supabase secrets set RESEND_API_KEY=re_5WdrK97y_ARYTacRrHaejTiQdNHPfkDYe
```

**Verificación:**
```bash
npx supabase secrets list
# Output:
#   NAME           | DIGEST
#   RESEND_API_KEY | c4b46119cef6344e7ac1027f6b877720caf25544b052492387173acfa1d2b212
```

## 🔧 Solución Paso a Paso

### Opción 1: Configurar SMTP en Supabase Dashboard (Recomendado)

1. **Acceder a la configuración de Auth:**
   - URL: https://supabase.com/dashboard/project/lijihfnrcjuooaoftyel/settings/auth
   - O navegar: Dashboard → Proyecto → Settings → Authentication

2. **Habilitar Custom SMTP:**
   - Buscar la sección **"SMTP Settings"** o **"Email"**
   - Activar: **"Enable Custom SMTP"**

3. **Configurar los parámetros SMTP:**
   ```
   Sender email:    noreply@send.cshdevs.org
   Sender name:     ComputerScienceHub
   Host:            smtp.resend.com
   Port:            465
   Username:        resend
   Password:        re_5WdrK97y_ARYTacRrHaejTiQdNHPfkDYe
   ```

4. **Guardar configuración:**
   - Click en **"Save"** o **"Update"**

5. **Verificar URL Configuration:**
   - En el mismo dashboard de Auth
   - Sección **"URL Configuration"**
   - Verificar que:
     ```
     Site URL: https://cshdevs.org
     ```
   - Redirect URLs debe incluir:
     ```
     https://cshdevs.org/auth/callback
     http://localhost:3000/auth/callback
     ```

6. **Ajustar Rate Limits (opcional pero recomendado):**
   - Ir a: https://supabase.com/dashboard/project/lijihfnrcjuooaoftyel/auth/rate-limits
   - Verificar que `email_sent` esté en **30 o más** (por defecto es 30/hora con SMTP custom)
   - Para desarrollo/testing, puedes aumentarlo temporalmente

### Opción 2: Configurar SMTP via Management API

Si prefieres usar la API (requiere Personal Access Token):

1. **Obtener Access Token:**
   - Ir a: https://supabase.com/dashboard/account/tokens
   - Crear un nuevo **Personal Access Token (PAT)**
   - Copiar el token generado

2. **Ejecutar el siguiente comando:**

```bash
# Reemplazar YOUR_ACCESS_TOKEN con tu token personal
export SUPABASE_ACCESS_TOKEN="YOUR_ACCESS_TOKEN"
export PROJECT_REF="lijihfnrcjuooaoftyel"
export RESEND_API_KEY="re_5WdrK97y_ARYTacRrHaejTiQdNHPfkDYe"

curl -X PATCH "https://api.supabase.com/v1/projects/$PROJECT_REF/config/auth" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"external_email_enabled\": true,
    \"mailer_secure_email_change_enabled\": true,
    \"mailer_autoconfirm\": false,
    \"smtp_admin_email\": \"noreply@send.cshdevs.org\",
    \"smtp_host\": \"smtp.resend.com\",
    \"smtp_port\": 465,
    \"smtp_user\": \"resend\",
    \"smtp_pass\": \"$RESEND_API_KEY\",
    \"smtp_sender_name\": \"ComputerScienceHub\"
  }"
```

**Nota:** En PowerShell, usa:
```powershell
$env:SUPABASE_ACCESS_TOKEN = "YOUR_ACCESS_TOKEN"
$env:PROJECT_REF = "lijihfnrcjuooaoftyel"
$env:RESEND_API_KEY = "re_5WdrK97y_ARYTacRrHaejTiQdNHPfkDYe"

$body = @{
    external_email_enabled = $true
    mailer_secure_email_change_enabled = $true
    mailer_autoconfirm = $false
    smtp_admin_email = "noreply@send.cshdevs.org"
    smtp_host = "smtp.resend.com"
    smtp_port = 465
    smtp_user = "resend"
    smtp_pass = $env:RESEND_API_KEY
    smtp_sender_name = "ComputerScienceHub"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://api.supabase.com/v1/projects/$env:PROJECT_REF/config/auth" `
    -Method PATCH `
    -Headers @{
        "Authorization" = "Bearer $env:SUPABASE_ACCESS_TOKEN"
        "Content-Type" = "application/json"
    } `
    -Body $body
```

## 🧪 Probar la Configuración

1. **Desde el Dashboard de Supabase:**
   - Ir a: https://supabase.com/dashboard/project/lijihfnrcjuooaoftyel/auth/users
   - Click en **"Invite user"**
   - Ingresar un email de prueba
   - Verificar que el email llegue correctamente

2. **Desde la aplicación:**
   - Ir a: https://cshdevs.org/registro (o localhost:3000/registro)
   - Registrar un nuevo usuario
   - Verificar:
     - No aparece error 500
     - Llega el email de confirmación desde `noreply@send.cshdevs.org`
     - El link de confirmación apunta a `cshdevs.org/auth/callback`

3. **Verificar logs en Resend:**
   - Ir a: https://resend.com/emails
   - Verificar que los emails aparecen en el log
   - Estado debe ser **"Delivered"**

## 🔍 Troubleshooting

### Error persiste después de configurar SMTP

1. **Verificar credenciales:**
   - Asegurar que la API key de Resend es correcta
   - Verificar que el dominio `send.cshdevs.org` está verificado en Resend

2. **Verificar dominio en Resend:**
   ```bash
   resend domains list
   # Verificar que cshdevs.org tenga status: "verified"
   ```

3. **Revisar logs de Supabase:**
   - Dashboard → Proyecto → Logs → Auth Logs
   - Buscar errores relacionados con SMTP

### Email no llega

1. **Revisar carpeta de spam**

2. **Verificar configuración DNS:**
   - Los registros SPF, DKIM y DMARC deben estar configurados en Cloudflare
   - Ver: `docs/configuracion-resend-smtp.md` para detalles de DNS

3. **Verificar rate limits:**
   - Dashboard → Auth → Rate Limits
   - Asegurar que no estés alcanzando el límite

### Error de CAPTCHA o rate limit

Si ves errores relacionados con rate limits:

```bash
# Verificar rate limits actuales
# En el Dashboard: Auth → Rate Limits

# Aumentar límite temporal para testing:
# - email_sent: 30 → 100 (emails por hora)
# - sign_in_sign_ups: 30 → 100 (registros por 5 min)
```

## 📚 Referencias

- [Supabase SMTP Documentation](https://supabase.com/docs/guides/auth/auth-smtp)
- [Resend + Supabase Integration](https://resend.com/docs/send-with-supabase-smtp)
- [Configuración completa SMTP](./configuracion-resend-smtp.md)

## ✅ Checklist de Verificación

- [ ] Secret `RESEND_API_KEY` configurado en Supabase
- [ ] SMTP habilitado en Dashboard (Custom SMTP = enabled)
- [ ] Credenciales SMTP configuradas (host, port, user, pass)
- [ ] Site URL configurado: `https://cshdevs.org`
- [ ] Redirect URLs incluyen: `https://cshdevs.org/auth/callback`
- [ ] Dominio verificado en Resend
- [ ] DNS records (SPF, DKIM, DMARC) configurados en Cloudflare
- [ ] Rate limits ajustados (mínimo 30/hora)
- [ ] Test de registro exitoso
- [ ] Email de confirmación recibido
- [ ] Link de confirmación funciona

---

**Última actualización:** 22 de marzo de 2026
**Estado:** Pendiente configuración en Dashboard
