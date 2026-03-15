---
title: "Levantar el proyecto en local"
status: "active"
owner: "@team"
authors: ["@team"]
tracking:
  - README.md
  - package.json
  - src/lib/supabaseClient.ts
  - src/services/apiKeyService.ts
baseline_commit: ""
created: "2026-02-07"
last_reviewed: "2026-02-07"
---

# Objetivo

Levantar la aplicacion en entorno local para desarrollo y validacion basica (dev server, build y preview).

# Alcance

- Sistema operativo: Windows, macOS y Linux.
- Runtime principal: Node.js 20+.
- Gestor de paquetes: npm.
- Runtime opcional para tests automatizados: Python 3.10+ (con `py` en Windows).

# Prerrequisitos

1. Tener instalado Node.js 20 o superior.
2. Tener npm disponible en terminal.
3. Tener git instalado.
4. (Opcional) Tener Python 3.10+ para ejecutar tests de `test/`.

# Pasos para levantar en local

## 1) Clonar y entrar al repo

```bash
git clone <url-del-repo>
cd haiku-questioner
```

Resultado esperado:
- El directorio contiene `package.json`, `src/`, `docs/` y `test/`.

## 2) Instalar dependencias

```bash
npm install
```

Resultado esperado:
- Se crea `node_modules/`.
- No hay errores bloqueantes de instalacion.

## 3) Configurar variables de entorno (opcional)

La app puede iniciar sin `.env.local` para flujo base.
Si quieres habilitar providers de IA por entorno, crea `.env.local` en la raiz con:

```bash
VITE_GEMINI_API_KEY=tu_api_key
VITE_GROQ_API_KEY=tu_api_key
```

Notas:
- El proyecto tambien puede tomar keys desde `localStorage` por UI.
- El cliente de Supabase actual ya tiene configuracion en `src/lib/supabaseClient.ts`.

## 4) Levantar servidor de desarrollo

```bash
npm run dev
```

Resultado esperado:
- Vite inicia sin errores.
- URL local disponible (por defecto): `http://localhost:5173`.

## 5) Verificar navegacion base

Validar manualmente:
- Home carga colecciones.
- Se puede abrir detalle de coleccion.
- Se puede entrar a StudyPage.

Indicador de exito:
- No hay pantalla en blanco ni error fatal al navegar entre vistas principales.

## 6) Verificar build local

```bash
npm run build
```

Resultado esperado:
- Build completado y carpeta `dist/` generada.

## 7) (Opcional) Preview del build

```bash
npm run preview
```

Resultado esperado:
- App servida desde build de produccion local para verificacion rapida.

# Comandos utiles

```bash
# Desarrollo
npm run dev

# Build de produccion
npm run build

# Preview del build
npm run preview

# TypeScript check (estado actual del repo puede tener deuda)
npx tsc --noEmit

# Ejecutar ultimo test Python (si aplica)
py test/run_latest_test.py
```

# Solucion de problemas

## Puerto ocupado en 5173
- Sintoma: Vite no puede usar `5173`.
- Solucion: cerrar proceso que usa el puerto o arrancar Vite en otro puerto.

## Error por dependencias
- Sintoma: fallo en `npm install`.
- Solucion: eliminar `node_modules` y `package-lock.json`, luego reinstalar.

## Error de IA (sin respuesta de modelo)
- Sintoma: funciones de IA no responden.
- Solucion: configurar `VITE_GEMINI_API_KEY` o `VITE_GROQ_API_KEY` en `.env.local` o desde UI.

## Error de datos de colecciones
- Sintoma: Home no muestra datos o falla al cargar.
- Solucion: validar conectividad de red y estado de Supabase (el cliente esta en `src/lib/supabaseClient.ts`).

# Verificacion final

- [ ] `npm install` ejecuta sin bloqueos.
- [ ] `npm run dev` levanta la app.
- [ ] Home, Detail y Study cargan correctamente.
- [ ] `npm run build` completa y genera `dist/`.
- [ ] (Opcional) `npm run preview` sirve el build local.
