export const USER = { name: 'Pedro Gonzales' }

// Fecha simulada del prototipo (domingo previo a la semana mostrada).
// Cámbiala para probar el corte de las 16:00 hrs del día anterior.
export const SIMULATED_NOW = new Date('2026-09-06T10:00:00')

export const DAYS = [
  { id: 'lun', label: 'Lunes', num: 7, date: '2026-09-07', full: 'lunes 7 de septiembre' },
  { id: 'mar', label: 'Martes', num: 8, date: '2026-09-08', full: 'martes 8 de septiembre' },
  { id: 'mie', label: 'Miércoles', num: 9, date: '2026-09-09', full: 'miércoles 9 de septiembre' },
  { id: 'jue', label: 'Jueves', num: 10, date: '2026-09-10', full: 'jueves 10 de septiembre' },
  { id: 'vie', label: 'Viernes', num: 11, date: '2026-09-11', full: 'viernes 11 de septiembre' }
]

export const MENU_TYPES = ['Común', 'Vegetariano', 'Hipocalórico']

// Solo se conocen los datos del lunes; se reutilizan para el resto de los días.
export const CASINOS = [
  {
    id: 'casa-central',
    name: 'Casino Casa Central',
    place: 'patio central',
    menus: [
      { type: 'Común', dish: 'Cazuela de vacuno con arroz', available: 124, total: 220 },
      { type: 'Vegetariano', dish: 'Charquicán de zapallo y porotos verdes', available: 9, total: 80 },
      { type: 'Hipocalórico', dish: 'Pollo al vapor con ensalada surtida', available: 0, total: 60 }
    ]
  },
  {
    id: 'edificio-p',
    name: 'Casino Edificio P',
    place: 'Edificio P, Cuarto piso',
    menus: [
      { type: 'Común', dish: 'Cazuela de vacuno con arroz', available: 89, total: 150 },
      { type: 'Vegetariano', dish: 'Charquicán de zapallo y porotos verdes', available: 8, total: 60 },
      { type: 'Hipocalórico', dish: 'Pollo al vapor con ensalada surtida', available: 6, total: 45 }
    ]
  }
]

export const getStatus = ({ available, total }) => {
  if (available === 0) return { key: 'agotado', label: 'Agotado' }
  if (available / total <= 0.15) return { key: 'por-agotar', label: 'Por agotar' }
  return { key: 'disponible', label: 'Disponible' }
}

export const casinoById = (id) => CASINOS.find((c) => c.id === id)
export const dishOf = (casinoId, type) => casinoById(casinoId).menus.find((m) => m.type === type).dish

export const cutoffOf = (day) => {
  const d = new Date(day.date + 'T16:00:00')
  d.setDate(d.getDate() - 1)
  return d
}
export const isOpen = (day) => SIMULATED_NOW < cutoffOf(day)
export const formatCutoff = (day) =>
  cutoffOf(day).toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' }) + ', 16:00 hrs'
