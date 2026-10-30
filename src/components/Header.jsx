import React from 'react'
import { USER } from '../data/menus'
import { useApp } from '../state/AppContext'

const Header = () => {
  const { subscribed } = useApp()
  return (
    <header className='header'>
      <div>
        <h1 className='header__title'>Casino USM</h1>
        <p className='header__subtitle'>Gestión de almuerzos para funcionarios y docentes</p>
      </div>
      <div className='header__info'>
        <span>Corte diario 16:00 hrs del día anterior</span>
        <span className='header__user'>{USER.name}</span>
        <span className={'badge ' + (subscribed ? 'badge--plan' : 'badge--agotado')}>
          {subscribed ? 'Suscrito mensual' : 'Sin suscripción'}
        </span>
      </div>
    </header>
  )
}

export default Header
