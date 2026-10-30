import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../state/AppContext'

const SuscripcionPage = () => {
  const { subscribed, toggleSubscription, commitments } = useApp()
  const count = commitments.filter((c) => c.source === 'suscripcion').length
  return (
    <section>
      <h2>Suscripción</h2>
      <p className='muted'>Gestiona tu plan mensual de almuerzos.</p>

      <div className='plan'>
        <div>
          <p className='plan__name'>Plan mensual</p>
          <span className={'badge ' + (subscribed ? 'badge--disponible' : 'badge--agotado')}>
            {subscribed ? 'Activa' : 'Inactiva'}
          </span>
        </div>
        <ul>
          <li>Un almuerzo por día hábil, asignado automáticamente.</li>
          <li>Puedes modificar o liberar cada día hasta las 16:00 hrs del día anterior.</li>
          <li>Si tu menú se agota, se te avisa para que lo cambies.</li>
        </ul>
        <p>
          Compromisos por suscripción esta semana: <strong>{count}</strong>.{' '}
          <Link to='/mis-compromisos'>Ver mis compromisos</Link>
        </p>
        <button className={'btn ' + (subscribed ? 'btn--danger' : 'btn--primary')} onClick={toggleSubscription}>
          {subscribed ? 'Cancelar suscripción' : 'Reactivar suscripción'}
        </button>
        {!subscribed && <p className='muted small'>Al reactivar se asigna el menú Común de Casa Central a los días libres.</p>}
      </div>
    </section>
  )
}

export default SuscripcionPage
