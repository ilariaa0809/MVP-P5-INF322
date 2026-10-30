import { useEffect } from "react";

/** Equivalente al `head: () => ({ meta: [{ title }] })` de las rutas de Lovable. */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
