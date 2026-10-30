import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CASINOS, DAYS, MENU_TYPES, dishOf, formatCutoff, isOpen } from '../data/menus'
import { useApp } from '../state/AppContext'

const ReservarPage = () => {
  const { commitments, stockOf, reserve } = useApp()
  const freeDays = DAYS.filter((d) => isOpen(d) && !commitments.some((c) => c.dayId === d.id))
  const [dayId, setDayId] = useState('')
  const [casinoId, setCasinoId] = useState(CASINOS[0].id)
  const [type, setType] = useState(MENU_TYPES[0])
  const [msg, setMsg] = useState(null)

  const selected = freeDays.find((d) => d.id === dayId) || freeDays[0]
  const left = selected ? stockOf(selected.id, casinoId, type) : 0

  const submit = () => {
    const r = reserve(selected.id, casinoId, type)
    setMsg(r)
    setDayId('')
  }

  return (
    <section>
      <h2>Reserva puntual</h2>
      <p className='muted'>Reserva un almuerzo para un día en que no tengas compromiso.</p>

      {freeDays.length === 0 ? (
        <p>
          Ya tienes un compromiso todos los días disponibles. Libera uno en <Link to='/mis-compromisos'>Mis compromisos</Link> para reservar otro.
        </p>
      ) : (
        <div className='form'>
          <label>Día
            <select value={selected.id} onChange={(e) => setDayId(e.target.value)}>
              {freeDays.map((d) => <option key={d.id} value={d.id}>{d.full}</option>)}
            </select>
          </label>
          <label>Casino
            <select value={casinoId} onChange={(e) => setCasinoId(e.target.value)}>
              {CASINOS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label>Menú
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {MENU_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <p><strong>{dishOf(casinoId, type)}</strong></p>
          <p className='muted small'>
            {left > 0 ? `${left} raciones disponibles` : 'Menú agotado'} · Reserva hasta {formatCutoff(selected)}
          </p>
          <button className='btn btn--primary' disabled={left < 1} onClick={submit}>Reservar</button>
        </div>
      )}
      {msg && (
        <p className={msg.ok ? 'msg msg--ok' : 'msg msg--bad'}>
          {msg.msg} {msg.ok && <Link to='/mis-compromisos'>Ver mis compromisos</Link>}
        </p>
      )}
    </section>
  )
}

export default ReservarPage
