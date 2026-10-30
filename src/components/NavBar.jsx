import React from 'react'
import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Disponibilidad' },
  { to: '/mis-compromisos', label: 'Mis compromisos' },
  { to: '/suscripcion', label: 'Suscripción' },
  { to: '/reservar', label: 'Reserva puntual' }
]

const NavBar = () => (
  <nav className='nav'>
    {LINKS.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        end={to === '/'}
        className={({ isActive }) => 'nav__link' + (isActive ? ' nav__link--active' : '')}
      >
        {label}
      </NavLink>
    ))}
  </nav>
)

export default NavBar
