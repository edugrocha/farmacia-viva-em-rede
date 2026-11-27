/**
 * Farmácia Viva em Rede - Hook de media query responsivo.
 * Permite adaptar estilos inline (que não aceitam @media) ao contexto mobile.
 */
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/** true em viewports de celular (<= 767px). */
export const useIsMobile = (): boolean => useMediaQuery('(max-width: 767px)');