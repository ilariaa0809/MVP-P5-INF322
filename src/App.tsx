import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { CasinoProvider } from "@/lib/casino-store";
import DisponibilidadPage from "@/pages/DisponibilidadPage";
import MisCompromisosPage from "@/pages/MisCompromisosPage";
import ReservarPage from "@/pages/ReservarPage";
import SuscripcionPage from "@/pages/SuscripcionPage";

export default function App() {
  return (
    <CasinoProvider>
      <Routes>
        <Route path="/" element={<DisponibilidadPage />} />
        <Route path="/mis-compromisos" element={<MisCompromisosPage />} />
        <Route path="/suscripcion" element={<SuscripcionPage />} />
        <Route path="/reservar" element={<ReservarPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" richColors closeButton />
    </CasinoProvider>
  );
}
