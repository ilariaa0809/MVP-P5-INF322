import React from 'react'
import { getStatus } from '../data/menus'

const MenuCard = ({ menu, included }) => {
  const status = getStatus(menu)
  return (
    <article className={`menu-card menu-card--${status.key}`}>
      <div className='menu-card__top'>
        <span className='menu-card__type'>{menu.type}</span>
        <span className={`badge badge--${status.key}`}>{status.label}</span>
      </div>
      <p className='menu-card__dish'>{menu.dish}</p>
      <p className='menu-card__stock'>
        {menu.available} de {menu.total} raciones disponibles · {menu.total - menu.available} canjeadas
      </p>
      {included && <p className='menu-card__included'>Incluido en tu suscripción</p>}
    </article>
  )
}

export default MenuCard
