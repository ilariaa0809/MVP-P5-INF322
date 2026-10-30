import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { AlertTriangle, CalendarClock } from "lucide-react";
import { AppShell } from "@/components/casino/AppShell";
import { MenuCard } from "@/components/casino/MenuCard";
import { cn } from "@/lib/utils";
import {
  COMEDORES,
  DIAS,
  HORA_CORTE,
  TIPOS,
  estadoDe,
  fechaDia,
  keyDe,
  nombreComedor,
  nombreDia,
  nombreTipo,
  type DiaId,
} from "@/lib/casino-data";
import { useCasino } from "@/lib/casino-store";
import { usePageTitle } from "@/lib/usePageTitle";

export default function Panel() {
  usePageTitle("Disponibilidad de menús | Casino USM");
  const { platoDe, suscripcion, reservas } = useCasino();
  const [dia, setDia] = useState<DiaId>("lun");

  const comprometidos = useMemo(() => {
    const map = new Map<string, string>();
    reservas.forEach((r) =>
      map.set(
        keyDe(r.dia, r.comedor, r.tipo),
        r.confirmada ? "Tu reserva puntual confirmada" : "Tu reserva puntual pendiente de confirmar",
      ),
    );
    suscripcion?.dias
      .filter((d) => !d.liberado)
      .forEach((d) => map.set(keyDe(d.dia, suscripcion.comedor, d.tipo), "Incluido en tu suscripción"));
    return map;
  }, [reservas, suscripcion]);

  const alertas = useMemo(() => {
    const out: { texto: string; estado: "por-agotar" | "agotado" }[] = [];
    comprometidos.forEach((detalle, key) => {
      const [d, c, t] = key.split("|") as [DiaId, never, never];
      const plato = platoDe(d, c, t);
      const estado = estadoDe(plato);
      if (estado === "disponible") return;
      out.push({
        estado,
        texto: `${nombreTipo(t)} del ${nombreDia(d).toLowerCase()} en ${nombreComedor(c)} — ${detalle.toLowerCase()}`,
      });
    });
    return out;
  }, [comprometidos, platoDe]);

  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-foreground">
            Disponibilidad de menús
          </h1>
          <p className="mt-1 text-muted-foreground">
            Revisa cuántas raciones quedan antes de bajar al comedor.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-brand/30 bg-brand-soft px-3 py-2 text-sm text-brand">
          <CalendarClock className="h-4 w-4" />
          Puedes reservar, modificar o liberar hasta las <strong>{HORA_CORTE} hrs</strong> del día anterior.
        </div>
      </div>

      {alertas.length > 0 && (
        <div className="mt-6 space-y-2">
          {alertas.map((a, i) => (
            <div
              key={i}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3 text-sm",
                a.estado === "agotado"
                  ? "border-danger/50 bg-danger-soft text-danger"
                  : "border-warning/60 bg-warning-soft text-warning-foreground",
              )}
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                <strong>{a.estado === "agotado" ? "Menú agotado: " : "Quedan pocas raciones: "}</strong>
                {a.texto}.{" "}
                <Link to="/mis-compromisos" className="underline underline-offset-2">
                  Revisar mis compromisos
                </Link>
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {DIAS.map((d) => (
          <button
            key={d.id}
            onClick={() => setDia(d.id)}
            className={cn(
              "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
              dia === d.id
                ? "border-brand bg-brand text-brand-foreground"
                : "border-border bg-surface text-foreground hover:bg-secondary",
            )}
          >
            {d.nombre}
            <span className="ml-2 text-xs opacity-70">{d.fecha.split(" de ")[0]}</span>
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Minuta del {nombreDia(dia).toLowerCase()} {fechaDia(dia)}
      </p>

      <div className="mt-4 space-y-6">
        {COMEDORES.map((c) => (
          <section key={c.id} className="rounded-xl border border-border bg-secondary/40 p-4">
            <header className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">{c.nombre}</h2>
              <span className="text-sm text-muted-foreground">{c.ubicacion}</span>
            </header>
            <div className="grid gap-3 md:grid-cols-3">
              {TIPOS.map((t) => {
                const plato = platoDe(dia, c.id, t.id);
                return (
                  <MenuCard
                    key={t.id}
                    plato={plato}
                    comprometido={comprometidos.get(plato.key)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
