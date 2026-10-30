import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuCard from '../components/MenuCard'
import { DAYS, casinoById } from '../data/menus'
import { useApp } from '../state/AppContext'

const DisponibilidadPage = () => {
  const { casinosFor, commitments, stockOf } = useApp()
  const [dayId, setDayId] = useState('lun')
  const day = DAYS.find((d) => d.id === dayId)
  const isSub = (casinoId, type) =>
    commitments.some((c) => c.source === 'suscripcion' && c.dayId === dayId && c.casinoId === casinoId && c.type === type)

  const soldOut = commitments.filter((c) => c.source === 'suscripcion' && stockOf(c.dayId, c.casinoId, c.type) === 0)

  return (
    <section>
      <h2>Disponibilidad de menús</h2>
      <p className='muted'>Revisa cuántas raciones quedan antes de bajar al comedor.</p>
      <p>Puedes reservar, modificar o liberar hasta las <strong>16:00 hrs</strong> del día anterior.</p>

      {soldOut.map((c) => (
        <div className='alert' key={c.id}>
          <strong>Menú agotado:</strong> {c.type} del {DAYS.find((d) => d.id === c.dayId).label.toLowerCase()} en{' '}
          {casinoById(c.casinoId).name} — incluido en tu suscripción.{' '}
          <Link to='/mis-compromisos'>Revisar mis compromisos</Link>
        </div>
      ))}

      <div className='days'>
        {DAYS.map((d) => (
          <button key={d.id} className={'days__btn' + (d.id === dayId ? ' days__btn--active' : '')} onClick={() => setDayId(d.id)}>
            {d.label} <span>{d.num}</span>
          </button>
        ))}
      </div>

      <h3 className='muted'>Minuta del {day.full}</h3>

      {casinosFor(dayId).map((casino) => (
        <div className='casino' key={casino.id}>
          <h2>{casino.name}</h2>
          <p className='muted'>{casino.place}</p>
          <div className='casino__grid'>
            {casino.menus.map((menu) => (
              <MenuCard key={menu.type} menu={menu} included={isSub(casino.id, menu.type)} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default DisponibilidadPage
