import React, { createContext, useContext, useState } from 'react'
import { CASINOS, DAYS, isOpen } from '../data/menus'

const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

const key = (dayId, casinoId, type) => `${dayId}|${casinoId}|${type}`
const dayOf = (id) => DAYS.find((d) => d.id === id)
const ok = (msg) => ({ ok: true, msg })
const fail = (msg) => ({ ok: false, msg })

const buildStock = () => {
  const stock = {}
  DAYS.forEach((d) => CASINOS.forEach((c) => c.menus.forEach((m) => { stock[key(d.id, c.id, m.type)] = m.available })))
  return stock
}

const initial = {
  subscribed: true,
  nextId: 6,
  stock: buildStock(),
  // Compromisos iniciales de ejemplo (el lunes coincide con la alerta de menú agotado).
  commitments: [
    { id: 1, dayId: 'lun', casinoId: 'casa-central', type: 'Hipocalórico', source: 'suscripcion' },
    { id: 2, dayId: 'mar', casinoId: 'casa-central', type: 'Común', source: 'suscripcion' },
    { id: 3, dayId: 'mie', casinoId: 'casa-central', type: 'Hipocalórico', source: 'suscripcion' },
    { id: 4, dayId: 'jue', casinoId: 'edificio-p', type: 'Común', source: 'suscripcion' },
    { id: 5, dayId: 'vie', casinoId: 'casa-central', type: 'Vegetariano', source: 'suscripcion' }
  ]
}

export const AppProvider = ({ children }) => {
  const [st, setSt] = useState(initial)

  const stockOf = (d, c, t) => st.stock[key(d, c, t)]
  const casinosFor = (dayId) =>
    CASINOS.map((c) => ({ ...c, menus: c.menus.map((m) => ({ ...m, available: stockOf(dayId, c.id, m.type) })) }))

  const release = (id) => {
    const c = st.commitments.find((x) => x.id === id)
    if (!c) return fail('No se encontró el compromiso.')
    if (!isOpen(dayOf(c.dayId))) return fail('El plazo para liberar ya venció.')
    setSt((s) => {
      const k = key(c.dayId, c.casinoId, c.type)
      return { ...s, commitments: s.commitments.filter((x) => x.id !== id), stock: { ...s.stock, [k]: s.stock[k] + 1 } }
    })
    return ok('Compromiso liberado.')
  }

  const modify = (id, casinoId, type) => {
    const c = st.commitments.find((x) => x.id === id)
    if (!c) return fail('No se encontró el compromiso.')
    if (!isOpen(dayOf(c.dayId))) return fail('El plazo para modificar ya venció.')
    if (c.casinoId === casinoId && c.type === type) return ok('Sin cambios.')
    if (stockOf(c.dayId, casinoId, type) < 1) return fail('Ese menú está agotado.')
    setSt((s) => {
      const stock = { ...s.stock }
      stock[key(c.dayId, c.casinoId, c.type)] += 1
      stock[key(c.dayId, casinoId, type)] -= 1
      return { ...s, stock, commitments: s.commitments.map((x) => (x.id === id ? { ...x, casinoId, type } : x)) }
    })
    return ok('Compromiso modificado.')
  }

  const reserve = (dayId, casinoId, type) => {
    if (!isOpen(dayOf(dayId))) return fail('El plazo para reservar ese día ya venció.')
    if (st.commitments.some((c) => c.dayId === dayId)) return fail('Ya tienes un compromiso ese día.')
    if (stockOf(dayId, casinoId, type) < 1) return fail('Ese menú está agotado.')
    setSt((s) => {
      const k = key(dayId, casinoId, type)
      return {
        ...s,
        nextId: s.nextId + 1,
        stock: { ...s.stock, [k]: s.stock[k] - 1 },
        commitments: [...s.commitments, { id: s.nextId, dayId, casinoId, type, source: 'puntual' }]
      }
    })
    return ok('Reserva puntual realizada.')
  }

  const toggleSubscription = () =>
    setSt((s) => {
      const stock = { ...s.stock }
      if (s.subscribed) {
        const kept = s.commitments.filter((c) => {
          if (c.source === 'suscripcion' && isOpen(dayOf(c.dayId))) {
            stock[key(c.dayId, c.casinoId, c.type)] += 1
            return false
          }
          return true
        })
        return { ...s, subscribed: false, commitments: kept, stock }
      }
      let nextId = s.nextId
      const added = []
      DAYS.forEach((d) => {
        const k = key(d.id, 'casa-central', 'Común')
        if (isOpen(d) && !s.commitments.some((c) => c.dayId === d.id) && stock[k] > 0) {
          stock[k] -= 1
          added.push({ id: nextId++, dayId: d.id, casinoId: 'casa-central', type: 'Común', source: 'suscripcion' })
        }
      })
      return { ...s, subscribed: true, nextId, stock, commitments: [...s.commitments, ...added] }
    })

  const value = { subscribed: st.subscribed, commitments: st.commitments, stockOf, casinosFor, release, modify, reserve, toggleSubscription }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
