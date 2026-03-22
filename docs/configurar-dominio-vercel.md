# Configurar Dominio Personalizado en Vercel

## 📅 Fecha
22 de marzo de 2026

## 🎯 Objetivo
Configurar el dominio `cshdevs.org` para que apunte a tu aplicación en Vercel, reemplazando la URL automática `computersciencehub-web.vercel.app`.

---

## 📋 Paso a Paso

### **Paso 1: Agregar el dominio en Vercel**

1. Ve a tu Dashboard de Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto: **computersciencehub-web**
3. En el menú lateral, ve a **Settings** → **Domains**
4. En el campo "Domain", escribe: `cshdevs.org`
5. Click en **Add**

**También puedes agregar subdominios:**
- `www.cshdevs.org`
- `app.cshdevs.org`
- etc.

---

### **Paso 2: Obtener registros DNS de Vercel**

Después de agregar el dominio, Vercel te mostrará los registros DNS que necesitas configurar:

**Registros típicos que Vercel proporciona:**

#### Para dominio principal (`cshdevs.org`):
```
Type: A
Name: @
Value: 76.76.21.21
```

#### Para subdominio www (`www.cshdevs.org`):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**⚠️ Nota:** Los valores exactos pueden variar. Usa los que Vercel te muestre en su dashboard.

---

### **Paso 3: Configurar registros DNS en Cloudflare**

Ahora vas a Cloudflare para agregar estos registros:

1. Ve a: https://dash.cloudflare.com
2. Selecciona tu dominio: **cshdevs.org**
3. Ve a **DNS** → **Records**
4. Click en **Add record**

#### Registro A (Dominio principal)

```
Type: A
Name: @
IPv4 address: 76.76.21.21
Proxy status: ✅ Proxied (naranja 🟠)
TTL: Auto
```

**Importante:** Deja el proxy activado (naranja) para aprovechar CDN y SSL de Cloudflare.

#### Registro CNAME (www - opcional)

```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (gris)
TTL: Auto
```

**Nota:** Para CNAME, desactiva el proxy (gris) si hay problemas de verificación.

---

### **Paso 4: Esperar propagación y verificación**

- **Propagación DNS:** 5-30 minutos (normalmente)
- **Verificación de Vercel:** Automática una vez que DNS propaga
- **Certificado SSL:** Vercel lo genera automáticamente

**Para verificar propagación:**

```bash
# Verificar registro A
nslookup cshdevs.org

# Verificar CNAME
nslookup www.cshdevs.org
```

---

### **Paso 5: Configurar redirecciones (Opcional)**

En Vercel, puedes configurar que `www.cshdevs.org` redirija a `cshdevs.org`:

1. En Vercel Dashboard → Settings → Domains
2. Click en los tres puntos (...) al lado de `www.cshdevs.org`
3. Click en **Redirect to Another Domain**
4. Selecciona `cshdevs.org`
5. Tipo de redirect: **308 Permanent Redirect**

---

### **Paso 6: Actualizar Variables de Entorno**

#### En Vercel Dashboard:

1. **Settings** → **Environment Variables**
2. Editar `NEXT_PUBLIC_SITE_URL`:

```
NEXT_PUBLIC_SITE_URL = https://cshdevs.org
```

3. Aplicar a: **Production**, **Preview**, **Development**
4. **Save**

#### En tu archivo `.env` local:

```env
NEXT_PUBLIC_SITE_URL=https://cshdevs.org
```

---

### **Paso 7: Actualizar configuración de Supabase**

#### En el Dashboard de Supabase:

1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto: **ComputerScienceHub-Web**
3. **Authentication** → **URL Configuration**
4. Actualizar:

```
Site URL: https://cshdevs.org
Redirect URLs: 
  - https://cshdevs.org/auth/callback
  - https://www.cshdevs.org/auth/callback (si usas www)
```

5. **Save**

---

### **Paso 8: Redesplegar la aplicación**

Para que los cambios de variables tomen efecto:

**Opción A: Push a git**
```bash
git add .
git commit -m "Configurar dominio personalizado cshdevs.org"
git push
```

**Opción B: Redeploy manual**
1. En Vercel Dashboard → **Deployments**
2. Último deployment → tres puntos → **Redeploy**

**Opción C: CLI de Vercel**
```bash
vercel --prod
```

---

## ✅ Verificación Final

### Checklist:

- [ ] Dominio agregado en Vercel
- [ ] Registros DNS configurados en Cloudflare
- [ ] DNS propagado (verificar con nslookup)
- [ ] Vercel verificó el dominio (✅ verde en dashboard)
- [ ] SSL activo (https funciona)
- [ ] Variable `NEXT_PUBLIC_SITE_URL` actualizada en Vercel
- [ ] Variable actualizada en `.env` local
- [ ] Site URL actualizado en Supabase
- [ ] Aplicación redesplegada
- [ ] Sitio accesible en https://cshdevs.org
- [ ] Emails de confirmación apuntan al nuevo dominio

### Prueba el flujo completo:

1. Ir a: https://cshdevs.org/registro
2. Registrarse con un email real
3. Verificar que el email llegue con enlaces a `cshdevs.org`
4. Confirmar la cuenta
5. Iniciar sesión en `cshdevs.org/login`

---

## 🎨 Configuraciones Adicionales Recomendadas

### 1. Configurar WWW → Apex redirect

Para que `www.cshdevs.org` redirija automáticamente a `cshdevs.org`:

**En Vercel:**
- Settings → Domains → www.cshdevs.org → Redirect to `cshdevs.org`

### 2. Configurar HTTP → HTTPS redirect

Cloudflare lo hace automáticamente si el proxy está activado (naranja 🟠).

Para forzarlo:
1. En Cloudflare Dashboard
2. **SSL/TLS** → **Edge Certificates**
3. Activar **Always Use HTTPS**

### 3. Mejorar performance con Cloudflare

**Cache Rules:**
1. Cloudflare Dashboard → **Rules** → **Page Rules**
2. Crear regla para cachear assets estáticos:
   ```
   URL: cshdevs.org/_next/static/*
   Setting: Cache Level = Cache Everything
   ```

**Speed optimizations:**
1. **Speed** → **Optimization**
2. Activar:
   - Auto Minify (HTML, CSS, JS)
   - Brotli compression
   - Early Hints
   - HTTP/3 (QUIC)

---

## 🚨 Troubleshooting

### Problema 1: "Domain not verified" en Vercel

**Causa:** DNS no propagado o registros incorrectos

**Solución:**
1. Verificar que los registros DNS estén exactamente como Vercel indica
2. Esperar más tiempo (hasta 24h en casos extremos)
3. Limpiar caché DNS local:
   ```bash
   ipconfig /flushdns
   ```
4. Verificar propagación en: https://dnschecker.org

---

### Problema 2: SSL Certificate error

**Causa:** Certificado aún generándose o problema de configuración

**Solución:**
1. Esperar 10-15 minutos después de verificación
2. En Cloudflare, asegurarse de que SSL/TLS mode sea **Full** o **Full (strict)**
3. En Vercel, regenerar certificado:
   - Settings → Domains → Refresh

---

### Problema 3: Emails siguen apuntando al dominio viejo

**Causa:** Variables de entorno no actualizadas

**Solución:**
1. Verificar que `NEXT_PUBLIC_SITE_URL` esté actualizada en Vercel
2. Redesplegar la aplicación después de cambiar variables
3. Verificar en Supabase que el Site URL esté correcto

---

### Problema 4: 404 en cshdevs.org

**Causa:** DNS apunta a lugar incorrecto o deployment no activo

**Solución:**
1. Verificar que el registro A apunte a la IP correcta de Vercel
2. En Vercel, verificar que el dominio esté asignado al proyecto correcto
3. Verificar que haya un deployment activo en producción

---

## 📊 Comparación: Antes vs Después

| Aspecto | Antes (vercel.app) | Después (dominio propio) |
|---------|-------------------|-------------------------|
| **URL** | computersciencehub-web.vercel.app | cshdevs.org |
| **Profesionalismo** | Medio | Alto ✅ |
| **Branding** | Genérico Vercel | Marca propia ✅ |
| **SEO** | Menos favorable | Mejor ✅ |
| **Memorabilidad** | Difícil de recordar | Fácil de recordar ✅ |
| **Emails** | De vercel.app | De cshdevs.org ✅ |
| **Confianza** | Media | Alta ✅ |

---

## 🔄 Actualización de URLs en el código

Los siguientes archivos ya fueron actualizados:

- ✅ `.env` - Variable `NEXT_PUBLIC_SITE_URL`
- ✅ `supabase/config.toml` - `site_url` y `additional_redirect_urls`

**No necesitan cambios:**
- ❌ Archivos de componentes - Usan `getPublicSiteUrl()` dinámicamente
- ❌ API routes - Se adaptan automáticamente
- ❌ Middleware - Compatible automáticamente

---

## 📚 Recursos Adicionales

- [Vercel Domains Documentation](https://vercel.com/docs/concepts/projects/domains)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [Supabase Auth Configuration](https://supabase.com/docs/guides/auth/redirect-urls)

---

## 📝 Notas Finales

### Sobre el dominio `cshdevs.org`:

- **Propósito:** Dominio temporal para desarrolladores del proyecto
- **Registrador:** Cloudflare
- **DNS:** Administrado por Cloudflare
- **Hosting:** Vercel
- **Emails:** Resend (via SMTP)

### Beneficios de usar dominio propio:

1. **Branding consistente** - Misma marca en web y emails
2. **Profesionalismo** - Inspira más confianza
3. **Control total** - Puedes mover el hosting sin cambiar dominio
4. **SEO** - Mejor para posicionamiento en buscadores
5. **Flexibilidad** - Puedes crear subdominios (api.cshdevs.org, etc.)

### Próximos pasos recomendados:

1. Configurar subdominios si es necesario:
   - `api.cshdevs.org` - Para API separada
   - `docs.cshdevs.org` - Para documentación
   - `admin.cshdevs.org` - Para panel administrativo

2. Configurar email profesional (opcional):
   - Google Workspace con tu dominio
   - O usar Resend también para emails operacionales

3. Analytics y monitoreo:
   - Configurar Vercel Analytics
   - Google Analytics con dominio propio
   - Cloudflare Web Analytics

---

**Documentación creada el:** 22 de marzo de 2026  
**Última actualización:** 22 de marzo de 2026  
**Autor:** Configuración asistida por IA  
**Proyecto:** ComputerScienceHub-Web
