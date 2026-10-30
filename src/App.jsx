import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NavBar from './components/NavBar'
import DisponibilidadPage from './pages/DisponibilidadPage'
import MisCompromisosPage from './pages/MisCompromisosPage'
import SuscripcionPage from './pages/SuscripcionPage'
import ReservarPage from './pages/ReservarPage'
import { AppProvider } from './state/AppContext'

const App = () => (
  <AppProvider>
  <BrowserRouter>
    <div className='app'>
      <Header />
      <NavBar />
      <main className='main'>
        <Routes>
          <Route path='/' element={<DisponibilidadPage />} />
          <Route path='/mis-compromisos' element={<MisCompromisosPage />} />
          <Route path='/suscripcion' element={<SuscripcionPage />} />
          <Route path='/reservar' element={<ReservarPage />} />
        </Routes>
      </main>
      <footer className='footer'>
        Prototipo de demostración con datos simulados. Los cambios se pierden al recargar la página.
      </footer>
    </div>
  </BrowserRouter>
  </AppProvider>
)

export default App
