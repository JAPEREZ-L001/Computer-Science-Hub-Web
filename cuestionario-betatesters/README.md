# Cuestionario Betatesters – Computer Science Hub

Mini-app Next.js independiente para la encuesta de betatesters del CSH. Vive en este repo bajo `/cuestionario-betatesters/` pero se despliega en un **proyecto Vercel separado** del sitio principal.

---

## Desarrollo local

```bash
cd cuestionario-betatesters
npm install
cp .env.local.example .env.local   # configura las variables (ver abajo)
npm run dev                         # corre en http://localhost:3001
```

---

## Configuración de Google Sheets

### 1. Crear el proyecto en Google Cloud

1. Ve a [console.cloud.google.com](https://console.cloud.google.com).
2. Crea un proyecto nuevo (o usa uno existente).
3. Activa la **Google Sheets API**:
   - Menú > APIs & Services > Library > buscar "Google Sheets API" > Enable.

### 2. Crear una Service Account

1. APIs & Services > Credentials > **Create Credentials** > Service account.
2. Dale un nombre (ej. `cuestionario-csh`), sin roles especiales; haz clic en Done.
3. Haz clic en la cuenta recién creada > pestaña **Keys** > Add Key > Create new key > **JSON** > Create.
4. Descarga el archivo `.json` (guárdalo en lugar seguro, **nunca lo subas al repo**).

Del archivo JSON necesitarás dos valores:
- `client_email`  → será `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key`   → será `GOOGLE_PRIVATE_KEY`

### 3. Crear la Google Sheet y compartirla

1. Ve a [sheets.google.com](https://sheets.google.com) y crea una nueva hoja.
2. Copia el **ID** de la hoja desde la URL:  
   `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`
3. Haz clic en **Share** y añade el `client_email` del Service Account con permisos de **Editor**.
4. En la primera fila de `Hoja1` añade las cabeceras (copia esto tal cual):

```
Timestamp	Rol	Rol (otro)	Familiaridad	Dispositivo	¿Qué es el CSH?	Claridad homepage	Confusión (detalle)	Propuesta de valor	Inicio rápido	Inicio (detalle)	Sobre CSH (facilidad)	Valores (facilidad)	Programas (facilidad)	Ruta sugerida	Ruta (mejora)	Dev – Seriedad	Dev – No es para mí	Dev – Sección interés	Biz – Iniciativas claras	Biz – Info faltante	Biz – Frase justificación	NT – Abrumado	NT – Solo expertos	Ganas de participar	CTAs claros	CTA – Cambiar	Micro-intake	Micro-intake (mejora)	Sensación visual	Animaciones	Animaciones (detalle)	Cambio único	Lo que más gustó	Sorpresa positiva	Comentarios adicionales
```

### 4. Variables de entorno

Crea el archivo `.env.local` en la raíz de esta carpeta (`cuestionario-betatesters/`):

```env
GOOGLE_SHEET_ID=tu_sheet_id_aqui
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-cuenta@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMII...\n-----END PRIVATE KEY-----\n"
```

> **Nota sobre `GOOGLE_PRIVATE_KEY`**: copia el valor tal como viene en el JSON, incluyendo los `\n`. En Vercel, al pegar el valor en las env vars, sustituye los `\n` literales por saltos de línea reales, o bien mantenlos como `\n` (la API route ya los normaliza).

---

## Variables de entorno requeridas

| Variable | Descripción |
|---|---|
| `GOOGLE_SHEET_ID` | ID de la Google Sheet (de la URL) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Email del Service Account |
| `GOOGLE_PRIVATE_KEY` | Clave privada del Service Account (con `\n`) |

---

## Despliegue en Vercel (proyecto independiente)

Este cuestionario **no** usa el mismo proyecto Vercel que el sitio Computer Science Hub.

### Pasos para crear el segundo proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com) → **Add New Project**.
2. Importa el **mismo repositorio** `ComputerSciencieHub-Web`.
3. En la pantalla de configuración, expande **"Root Directory"** y escribe:
   ```
   cuestionario-betatesters
   ```
4. Framework preset: **Next.js** (se detecta automático).
5. Antes de hacer Deploy, añade las **Environment Variables**:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
6. Haz clic en **Deploy**.

El sitio CSH seguirá desplegándose desde su propio proyecto Vercel (sin Root Directory). Los dos proyectos son completamente independientes.

### Dominio personalizado (opcional)

En el proyecto del cuestionario: Settings → Domains → Add Domain → (ej. `encuesta.computersciencehub.io`).

---

## Estructura del proyecto

```
cuestionario-betatesters/
├── app/
│   ├── api/
│   │   └── submit/
│   │       └── route.ts       # POST → Google Sheets
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── encuesta-form.tsx      # Formulario completo (cliente)
├── .env.local.example
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## Tecnologías usadas

- **Next.js 15** (App Router)
- **react-hook-form** + **zod** (validación)
- **googleapis** (escritura en Google Sheets)
- **Tailwind CSS v4**
