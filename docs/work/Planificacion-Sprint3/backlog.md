# 🚀 Backlog - Sprint 3: CSH Social Evolution

## 🌟 Sprint 3 Vision
> **"Consolidar Computer Science Hub como una Red Social interactiva para estudiantes de Ingeniería y Tecnología."**

- **Enfoque Principal:** Transformar la web estática en una plataforma dinámica de comunidad.
- **KPI Clave:** Implementación de funcionalidades en tiempo real (Realtime) y mejora de la identidad visual por roles.
- **Ajuste Estratégico:** Reducir contenido informativo denso ("Sobre Nosotros") para priorizar beneficios directos y networking.

---

## 📋 Master Backlog

| ID | Categoría | Tarea | Prioridad | Autor | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FE-01** | UI/UX | Implementar Easter Egg (Mascota interactiva + Minijuego) | Alta | Fer | 📝 To Do |
| **FE-02** | UI/UX | Limpieza de rutas y botones sin propósito | Media | - | 📝 To Do |
| **FE-03** | UI/UX | Visualización de Roles: Agent, Member, Fellow | Alta | - | 📝 To Do |
| **FE-04** | UI/UX | Integración visual de Ingeniería Industrial, Diseño, Mkt, etc. | Media | - | 📝 To Do |
| **FE-05** | UI/UX | Integración de universidades (UCA, UFG, USAM, UDB, ESEN, UES) | Media | - | 📝 To Do |
| **FE-06** | UI/UX | Diferenciación visual (Bands) para Catedráticos e Ingenieros | Alta | - | 📝 To Do |
| **FE-07** | UI/UX | Expansión de áreas: UX/UI, Fullstack, Mobile, etc. | Baja | - | 📝 To Do |
| **FE-08** | UI/UX | Timeout de sugerencias (ocultar tras 10-15s) | Baja | - | 📝 To Do |
| **FE-09** | UI/UX | Refactor "Sobre Nosotros" -> Enfoque en Beneficios CSH | Media | - | 📝 To Do |
| **BE-01** | Backend | Foro Abierto con Realtime | Crítica | - | 📝 To Do |
| **BE-02** | Backend | Flujo de recuperación de contraseña | Alta | - | 📝 To Do |
| **BE-03** | Backend | Lógica de Eventos (Gmail + Google Calendar API) | Alta | - | 📝 To Do |
| **BE-04** | Backend | Sistema de Mensajería Interna (Realtime Supabase) | Crítica | - | 📝 To Do |
| **BE-05** | DevOps | Limpieza de Data Seed y tablas mockeadas | Media | - | 📝 To Do |
| **BE-06** | Backend | Sugerencias de rutas dinámicas según posición actual | Baja | - | 📝 To Do |
| **QA-01** | Calidad | Auditoría de Funcionalidades (Mapping + TestSprite) | Crítica | JL | 📝 To Do |
| **QA-02** | Calidad | Creación de PRDs para cada funcionalidad existente | Alta | JL | 📝 To Do |
| **ADM-01** | Admin | Poster publicitario con QR de intriga | Alta | - | 📝 To Do |
| **ADM-02** | Admin | Organización de Meet con "Agents Seguros" | Media | - | 📝 To Do |
| **ADM-03** | Admin | Creación y gestión de Redes Sociales | Media | - | 📝 To Do |
| **ADM-04** | Admin | Investigación de métodos tradicionales de tutorías | Baja | - | 📝 To Do |

---

## 💡 Conceptos Detallados

### 🥚 Easter Egg & Gamificación
**Autor:** Nataly Fernandez (Fer)
- **Idea:** Una mascota que se mueve por la página.
- **Interacción:** Al encontrarla, el usuario interactúa para desbloquear un minijuego personalizado.
- **Recompensa:** El juego entrega una "estampita" o badge coleccionable para el perfil del usuario.
- **Flujo de Trabajo Sugerido:** Gemini para el mapa/diseño, Claude para la lógica, GPT para refactorización.

### 🔍 Auditoría de Funcionalidades
**Autor:** Josué (JL)
- **Objetivo:** Garantizar la estabilidad total del sistema.
- **Proceso:** 
    1. Mapping de todas las features actuales.
    2. Testeo intensivo con **TestSprite** en Frontend y Backend.
    3. Documentación formal (PRD) de cada funcionalidad para estandarizar el desarrollo.

### 🧭 Sugerencias Dinámicas
- **Comportamiento:** Las rutas sugeridas deben aparecer basadas en la navegación actual del usuario.
- **Persistencia:** Deben desaparecer automáticamente tras 1 minuto de inactividad o cambio de contexto para no saturar la UI.
