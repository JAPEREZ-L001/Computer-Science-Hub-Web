import type { HubEvent } from '../types'

export const mockEvents: HubEvent[] = [
  {
    id: 'e-001',
    title: 'Workshop: Construye tu primer UI accesible',
    description:
      'Práctica guiada para construir componentes accesibles usando React + buenas prácticas de UX.',
    date: '2026-03-25',
    time: '17:30',
    speaker: 'Ana María López',
    type: 'workshop',
    location: 'Auditorio Don Bosco, UDB',
    registrationUrl: 'https://example.com/inscripcion-workshop-ui',
  },
  {
    id: 'e-002',
    title: 'Charla: Arquitectura limpia en APIs',
    description:
      'Cómo separar responsabilidades, modelar recursos y mantener consistencia en servicios backend.',
    date: '2026-03-29',
    time: '18:00',
    speaker: 'Carlos Ernesto Rivera',
    type: 'charla',
    location: 'Salón de conferencias - Campus Antiguo Cuscatlán',
  },
  {
    id: 'e-003',
    title: 'Hackathon: Build in 48 — Comunidad',
    description:
      'Ideación y construcción enfocada: equipos, retos técnicos y demo final con evaluación comunitaria.',
    date: '2026-04-05',
    time: '09:00',
    speaker: 'Equipo ComputerSciencieHub',
    type: 'hackathon',
    location: 'Plaza de eventos, UDB',
    registrationUrl: 'https://example.com/inscripcion-hackathon',
  },
  {
    id: 'e-004',
    title: 'Copa: Semifinal de retos de seguridad',
    description:
      'Ronda de challenges de seguridad práctica con writeups al finalizar cada módulo.',
    date: '2026-04-10',
    time: '16:00',
    speaker: 'Gustavo René Hernández',
    type: 'copa',
    location: 'Laboratorio de Computación',
  },
  {
    id: 'e-005',
    title: 'Networking: proyectos de IA y demos rápidas',
    description:
      'Espacio para compartir avances, demos de modelos y aprendizajes del camino (incluso si estás empezando).',
    date: '2026-04-15',
    time: '18:30',
    speaker: 'Comunidad IA',
    type: 'networking',
    location: 'Cafetería del Campus - UDB',
  },
]

