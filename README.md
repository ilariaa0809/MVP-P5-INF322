# Casino USM · MVP en React

MVP funcional (solo frontend) del proyecto Lean UX **Casino USM · Gestión de almuerzos**,
traspasado desde el prototipo hecho en Lovable a React + Webpack.

**Metas de los usuarios implementadas**

1. Ver el menú completo del día (sopa, ensalada, fondos, postres), con alérgenos y disponibilidad por ubicación.
2. Crear y administrar una suscripción semanal o mensual, y liberar días puntuales.
3. Reservar un almuerzo puntual con confirmación explícita y plazo de liberación.

## Cómo ejecutarlo

```
npm install
npm run dev
```

Abre http://localhost:5050

- `npm run prod`: compila a `dist/`.
- `npm run typecheck`: revisa los tipos de TypeScript.

## Estructura

- `src/pages/`: las 4 pantallas (Disponibilidad, Mis compromisos, Suscripción, Reserva puntual).
- `src/components/casino/`: AppShell (cabecera y navegación) y MenuCard.
- `src/lib/casino-data.ts` y `src/lib/menu-diario.ts`: datos simulados (menús, alérgenos, comedores, días, hora de corte).
- `src/lib/casino-store.tsx`: estado en memoria (se pierde al recargar, como en el prototipo).
- `src/styles.css`: tema y colores (Tailwind CSS 4).

Stack: React 19, React Router 6, TypeScript, Tailwind CSS 4, Radix Accordion, Sonner (notificaciones), Lucide (íconos).
