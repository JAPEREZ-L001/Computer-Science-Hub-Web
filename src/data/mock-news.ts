import type { NewsCategory, NewsPost } from '../types'

const category: Record<'anuncio' | 'logro' | 'evento' | 'update', NewsCategory> = {
  anuncio: 'anuncio',
  logro: 'logro',
  evento: 'evento',
  update: 'update',
}

export const mockNews: NewsPost[] = [
  {
    id: 'n-001',
    slug: 'hackathon-udb-2026',
    title: 'Hackathon UDB 2026: equipos y preparación',
    excerpt: 'Ya están abiertas las inscripciones y compartimos tips para llegar listos.',
    content:
      '## Hola, comunidad\n\nYa iniciamos la preparación del Hackathon UDB 2026.\n\n### Qué traer\n- Laptop y cargador\n- Ideas o roadmap\n- Disposición para aprender\n\nNos vemos en la sesión de arranque.',
    category: category.evento,
    date: '2026-03-18',
    author: 'Equipo ComputerSciencieHub',
  },
  {
    id: 'n-002',
    slug: 'logro-ml-modelo-ligero',
    title: 'Logro: modelo ligero para clasificación de textos',
    excerpt: 'Nuestro equipo IA entrenó un modelo compacto para despliegue rápido.',
    content:
      '## Resumen del logro\n\nEl equipo de IA logró entrenar un modelo compacto para clasificación de textos, optimizado para tiempos de respuesta bajos.\n\nGracias a todos los miembros por su apoyo en revisión y pruebas.',
    category: category.logro,
    date: '2026-03-12',
    author: 'Fernanda Estela García',
  },
  {
    id: 'n-003',
    slug: 'anuncio-nuevos-mentores',
    title: 'Anuncio: nuevos mentores del Hub',
    excerpt: 'Damos la bienvenida a mentores que acompañarán rutas de aprendizaje por área.',
    content:
      '### ¿Qué cambia?\n\nA partir de esta semana, el Hub tendrá mentores por área para guiar prácticas, revisar portafolios y apoyar proyectos.\n\nSi te interesa participar, revisa la sección de Eventos.',
    category: category.anuncio,
    date: '2026-03-08',
    author: 'Coordinación del Hub',
  },
  {
    id: 'n-004',
    slug: 'update-mejoras-ux-login',
    title: 'Update: mejoras de UX en pantallas de autenticación',
    excerpt: 'Ajustamos validaciones, estados de error y accesibilidad en el flujo de login.',
    content:
      '## Cambios principales\n\n- Mejoramos mensajes de validación\n- Añadimos soporte de teclado\n- Ajustamos el layout para responsive\n\nEste update es parte del Sprint 1 (UI).',
    category: category.update,
    date: '2026-03-05',
    author: 'Equipo Frontend',
  },
  {
    id: 'n-005',
    slug: 'evento-networking-ia',
    title: 'Evento: networking para proyectos de IA',
    excerpt: 'Espacio para compartir aprendizajes, demos y próximos retos.',
    content:
      '### Agenda\n\n1. Presentaciones cortas\n2. Demo de proyectos\n3. Q&A y networking\n\nTrae tu idea, incluso si está en borrador.',
    category: category.evento,
    date: '2026-03-02',
    author: 'Comunidad IA',
  },
]

