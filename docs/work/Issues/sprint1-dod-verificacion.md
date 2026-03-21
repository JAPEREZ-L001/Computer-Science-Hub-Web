# Sprint 1 — Verificación DoD y Responsive (CSH-16)

Fecha: 20-03-2026

## Checklist funcional

- [x] `/login` renderiza correctamente y valida formulario
- [x] `/registro` renderiza correctamente y valida formulario
- [x] `/perfil` renderiza perfil con datos mock y enlaces sociales
- [x] `/miembros` renderiza grid y filtros por área
- [x] `/noticias` renderiza listado de noticias
- [x] `/noticias/[slug]` renderiza detalle por slug
- [x] `/eventos` renderiza listado de próximos eventos
- [x] Landing incluye sección de patrocinadores

## Checklist responsive (manual)

- [x] Mobile (>=360px): no desbordes horizontales en páginas Sprint 1
- [x] Tablet (>=768px): grillas y tarjetas escalan de forma correcta
- [x] Desktop (>=1024px): layouts se ven completos y sin solapamientos

## Observaciones

- Se agregó `mock-sponsors.ts` para completar los datos de patrocinadores.
- La sección de sponsors usa fallback de texto cuando no hay logo real.
