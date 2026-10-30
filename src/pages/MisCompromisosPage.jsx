import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CASINOS, DAYS, MENU_TYPES, casinoById, dishOf, formatCutoff, isOpen } from '../data/menus'
import { useApp } from '../state/AppContext'

const Row = ({ c }) => {
  const { stockOf, release, modify } = useApp()
  const day = DAYS.find((d) => d.id === c.dayId)
  const open = isOpen(day)
  const soldOut = stockOf(c.dayId, c.casinoId, c.type) === 0
  const [editing, setEditing] = useState(false)
  const [casinoId, setCasinoId] = useState(c.casinoId)
  const [type, setType] = useState(c.type)
  const [msg, setMsg] = useState(null)

  const save = () => {
    const r = modify(c.id, casinoId, type)
    setMsg(r)
    if (r.ok) setEditing(false)
  }

  return (
    <article className='commit'>
      <div className='commit__main'>
        <p className='commit__day'>{day.full}</p>
        {editing ? (
          <div className='form-row'>
            <select value={casinoId} onChange={(e) => setCasinoId(e.target.value)}>
              {CASINOS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {MENU_TYPES.map((t) => (
                <option key={t} value={t} disabled={stockOf(c.dayId, casinoId, t) === 0 && !(casinoId === c.casinoId && t === c.type)}>
                  {t}{stockOf(c.dayId, casinoId, t) === 0 ? ' (agotado)' : ''}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className='commit__menu'>
            {c.type} · {dishOf(c.casinoId, c.type)} <span className='muted'>({casinoById(c.casinoId).name})</span>
          </p>
        )}
        <p className='muted small'>
          {open ? `Modificable hasta ${formatCutoff(day)}` : 'Plazo vencido'}
        </p>
        {msg && <p className={msg.ok ? 'msg msg--ok' : 'msg msg--bad'}>{msg.msg}</p>}
      </div>
      <div className='commit__side'>
        <span className={'badge ' + (c.source === 'suscripcion' ? 'badge--plan' : 'badge--disponible')}>
          {c.source === 'suscripcion' ? 'Suscripción' : 'Reserva puntual'}
        </span>
        {soldOut && <span className='badge badge--agotado'>Menú agotado</span>}
        <div className='btn-row'>
          {editing ? (
            <>
              <button className='btn btn--primary' onClick={save}>Guardar</button>
              <button className='btn' onClick={() => { setEditing(false); setCasinoId(c.casinoId); setType(c.type) }}>Cancelar</button>
            </>
          ) : (
            <>
              <button className='btn' disabled={!open} onClick={() => { setEditing(true); setMsg(null) }}>Modificar</button>
              <button className='btn btn--danger' disabled={!open} onClick={() => setMsg(release(c.id))}>Liberar</button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

const MisCompromisosPage = () => {
  const { commitments } = useApp()
  const sorted = [...commitments].sort(
    (a, b) => DAYS.findIndex((d) => d.id === a.dayId) - DAYS.findIndex((d) => d.id === b.dayId)
  )
  return (
    <section>
      <h2>Mis compromisos</h2>
      <p className='muted'>Tus almuerzos de la semana. Puedes modificarlos o liberarlos hasta las 16:00 hrs del día anterior.</p>
      {sorted.length === 0 ? (
        <p>No tienes compromisos. Puedes hacer una <Link to='/reservar'>reserva puntual</Link>.</p>
      ) : (
        sorted.map((c) => <Row key={c.id} c={c} />)
      )}
    </section>
  )
}

export default MisCompromisosPage
