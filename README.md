# Casino USM (réplica en React)

Reconstrucción en React + Webpack de https://university-lunch-hub.lovable.app
(no es el código original).

```
npm install
npm run dev
```

Abre http://localhost:5050

- **Disponibilidad**: replicada de lo que se ve en la página original.
- **Mis compromisos, Suscripción y Reserva puntual**: diseñadas por inferencia (no se pudo ver el original).
- `src/state/AppContext.jsx`: estado en memoria (se pierde al recargar, como en el prototipo original).
- `src/data/menus.js`: datos simulados y `SIMULATED_NOW` para probar el corte de las 16:00 hrs.
