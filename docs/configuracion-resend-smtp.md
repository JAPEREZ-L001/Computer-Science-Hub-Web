# Configuración de SMTP con Resend para Supabase

## 📋 Información General

- **Fecha de configuración:** 22 de marzo de 2026
- **Dominio:** cshdevs.org
- **Registrador de dominio:** Cloudflare
- **Proveedor SMTP:** Resend
- **Plan:** Free (3,000 emails/mes, sin límite por hora)

---

## 🎯 Objetivo

Configurar un servicio SMTP personalizado con Resend para reemplazar el servicio SMTP gratuito de Supabase (limitado a 2 emails/hora) y habilitar la confirmación de email en el registro de usuarios.

---

## 📦 Herramientas Utilizadas

### 1. Resend CLI
```bash
npm install -g resend-cli
```

**Versión instalada:** v1.6.0

**Comandos principales usados:**
```bash
# Verificar autenticación
resend whoami

# Verificar configuración
resend doctor

# Crear dominio
resend domains create --name cshdevs.org --region us-east-1 --json

# Verificar dominio
resend domains verify <domain-id>

# Listar dominios
resend domains list

# Obtener información de dominio
resend domains get <domain-id>
```

---

## 🌐 Configuración del Dominio

### Dominio Seleccionado
**`cshdevs.org`** - Dominio .org registrado en Cloudflare

**Razón de selección:**
- Temporal para desarrolladores que participen en el proyecto
- Extensión .org profesional
- Precio económico en Cloudflare (~$10-15/año)
- Beneficios incluidos: DNS gratis, CDN gratis, SSL gratis, WHOIS privacy

---

## 🔧 Paso a Paso de la Configuración

### Paso 1: Instalación de Resend CLI

```bash
npm install -g resend-cli
```

### Paso 2: Autenticación con Resend

Se utilizó la API key almacenada en el archivo `.env`:

```bash
RESEND_API_KEY=re_5WdrK97y_ARYTacRrHaejTiQdNHPfkDYe
```

**Nota:** Esta API key tiene permisos de "Full Access" necesarios para gestionar dominios y configuración SMTP.

### Paso 3: Registro del Dominio en Cloudflare

1. Accedimos a Cloudflare Dashboard: https://dash.cloudflare.com
2. Registramos el dominio `cshdevs.org`
3. Cloudflare automáticamente configuró los nameservers

### Paso 4: Creación del Dominio en Resend

```bash
resend domains create --name cshdevs.org --region us-east-1 --json
```

**Respuesta recibida:**
```json
{
  "object": "domain",
  "id": "4ddf18b2-6142-46d1-9400-dd5369f16329",
  "name": "cshdevs.org",
  "status": "not_started",
  "region": "us-east-1",
  "capabilities": {
    "sending": "enabled",
    "receiving": "disabled"
  }
}
```

### Paso 5: Configuración de Registros DNS en Cloudflare

Resend proporcionó 3 registros DNS que configuramos en Cloudflare:

#### Registro 1: DKIM (Autenticación de Email)
- **Type:** TXT
- **Name:** `resend._domainkey`
- **Content:** `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNGzQUn7e3zczBspaXAmjHVB/T6nBJEfMbmAO8sGwWkPNOslHSHfLWxAiVqQ0LVZE6yV0P6VfLawoNkDwtqk7W3TmNI9S0FPiYMR/H5I8MVo54Ovb0gvHuxk/zXvJYCdj0cTItORhs5PLdCoONs1NyLwKCFI7ac87Nrr1B+x2NiwIDAQAB`
- **TTL:** Auto
- **Proxy status:** DNS only (gris)

#### Registro 2: MX (Mail Exchange)
- **Type:** MX
- **Name:** `send`
- **Mail server:** `feedback-smtp.us-east-1.amazonses.com`
- **Priority:** 10
- **TTL:** Auto

#### Registro 3: SPF (Sender Policy Framework)
- **Type:** TXT
- **Name:** `send`
- **Content:** `v=spf1 include:amazonses.com ~all`
- **TTL:** Auto
- **Proxy status:** DNS only (gris)

### Paso 6: Verificación de Propagación DNS

Verificamos que los registros DNS se propagaran correctamente:

```bash
# Verificar DKIM
nslookup -type=TXT resend._domainkey.cshdevs.org

# Verificar MX
nslookup -type=MX send.cshdevs.org

# Verificar SPF
nslookup -type=TXT send.cshdevs.org
```

**Resultado:** ✅ Todos los registros propagados correctamente en ~5 minutos.

### Paso 7: Verificación del Dominio en Resend

```bash
resend domains verify 4ddf18b2-6142-46d1-9400-dd5369f16329
```

**Estado final:**
```json
{
  "id": "4ddf18b2-6142-46d1-9400-dd5369f16329",
  "name": "cshdevs.org",
  "status": "verified",
  "region": "us-east-1"
}
```

✅ **Dominio verificado exitosamente**

---

## ⚙️ Configuración en Supabase

### Configuración Local (config.toml)

Modificamos el archivo `supabase/config.toml`:

#### Cambio 1: Habilitar confirmaciones por email
```toml
# Línea 214
enable_confirmations = true
```

#### Cambio 2: Configurar SMTP personalizado
```toml
# Líneas 225-233
[auth.email.smtp]
enabled = true
host = "smtp.resend.com"
port = 465
user = "resend"
pass = "env(RESEND_API_KEY)"
admin_email = "noreply@send.cshdevs.org"
sender_name = "ComputerScienceHub"
```

### Configuración en Producción (Dashboard de Supabase)

**Para aplicar la configuración SMTP en producción:**

1. Ir a: https://supabase.com/dashboard
2. Seleccionar el proyecto: **ComputerSciencieHub-Web**
3. Navegar a: **Authentication** → **SMTP Settings**
4. Activar: **Enable Custom SMTP**
5. Configurar los siguientes valores:

```
Sender email: noreply@send.cshdevs.org
Sender name: ComputerScienceHub
Host: smtp.resend.com
Port: 465
Username: resend
Password: re_5WdrK97y_ARYTacRrHaejTiQdNHPfkDYe
```

6. Guardar cambios

---

## 📧 Credenciales SMTP Finales

### Para usar en aplicaciones externas:

```
Host: smtp.resend.com
Port: 465 (SSL) o 587 (TLS)
Username: resend
Password: [RESEND_API_KEY]
From: noreply@send.cshdevs.org
```

---

## ✅ Verificación Final

### Checklist de configuración completa:

- [x] Dominio `cshdevs.org` registrado en Cloudflare
- [x] API Key de Resend con permisos Full Access
- [x] Resend CLI instalado y funcionando
- [x] Dominio creado en Resend
- [x] 3 registros DNS configurados en Cloudflare:
  - [x] DKIM (TXT)
  - [x] MX
  - [x] SPF (TXT)
- [x] Registros DNS propagados y verificados
- [x] Dominio verificado en Resend (status: "verified")
- [x] `config.toml` actualizado con configuración SMTP
- [x] `enable_confirmations = true` activado
- [ ] **PENDIENTE:** Configurar SMTP en Dashboard de Supabase (producción)

---

## 🔍 Comandos Útiles para Mantenimiento

### Verificar estado del dominio:
```bash
resend domains get 4ddf18b2-6142-46d1-9400-dd5369f16329 --json
```

### Listar todos los dominios:
```bash
resend domains list --json
```

### Verificar salud general:
```bash
resend doctor
```

### Ver registros DNS necesarios:
```bash
resend domains get 4ddf18b2-6142-46d1-9400-dd5369f16329 --json | grep "records" -A 50
```

---

## 📊 Límites y Consideraciones

### Plan Free de Resend:
- **Emails por mes:** 3,000
- **Límite por hora:** Sin límite
- **Dominios:** Ilimitados
- **API calls:** Ilimitadas

### Comparación con Supabase Free SMTP:
- **Antes:** 2 emails/hora (muy limitado)
- **Ahora:** 3,000 emails/mes sin límite horario
- **Mejora:** ~150x más capacidad

---

## 🚨 Troubleshooting

### Problema: Emails no se envían

1. Verificar que el dominio esté verificado:
```bash
resend domains list
```

2. Verificar registros DNS:
```bash
nslookup -type=TXT resend._domainkey.cshdevs.org
nslookup -type=MX send.cshdevs.org
nslookup -type=TXT send.cshdevs.org
```

3. Verificar API Key en `.env`:
```bash
# Debe tener permisos Full Access, no solo Sending Access
RESEND_API_KEY=re_5WdrK97y_ARYTacRrHaejTiQdNHPfkDYe
```

4. Verificar configuración en Supabase Dashboard

### Problema: DNS no propaga

- **Tiempo normal:** 5-30 minutos con Cloudflare
- **Máximo:** 24 horas
- **Solución:** Esperar o limpiar caché DNS local:
```bash
ipconfig /flushdns
```

### Problema: Dominio no verifica en Resend

1. Esperar propagación DNS (mínimo 5 minutos)
2. Verificar que registros DNS sean exactos (sin espacios extra)
3. Re-intentar verificación:
```bash
resend domains verify 4ddf18b2-6142-46d1-9400-dd5369f16329
```

---

## 📚 Referencias

- [Resend Documentation](https://resend.com/docs)
- [Resend CLI GitHub](https://github.com/resend/resend-cli)
- [Supabase SMTP Configuration](https://supabase.com/docs/guides/auth/auth-smtp)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)

---

## 📝 Notas Adicionales

### Sobre el dominio `cshdevs.org`:
- Es un dominio **temporal** destinado a los desarrolladores del proyecto
- Puede ser reemplazado en el futuro por un dominio más permanente
- El proceso de migración sería similar al documentado aquí

### Sobre seguridad:
- La API Key de Resend debe mantenerse privada
- Nunca commitear el archivo `.env` al repositorio
- La API Key está configurada como variable de entorno en `config.toml`

### Próximos pasos recomendados:
1. Configurar templates de email personalizados en Supabase
2. Probar el flujo completo de registro con confirmación por email
3. Monitorear el uso de emails en el dashboard de Resend
4. Considerar upgrade a plan pago si se superan los 3,000 emails/mes

---

**Documentación creada el:** 22 de marzo de 2026  
**Última actualización:** 22 de marzo de 2026  
**Autor:** Configuración asistida por IA  
**Proyecto:** ComputerScienceHub-Web
