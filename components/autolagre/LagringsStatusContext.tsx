'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

/**
 * Tidsforsinkelse etter lagring før vi tillater synkronisering fra server.
 * Dette gir tid for SWR revalidering å fullføre uten å forstyrre brukerens fokus.
 */
const LAGRING_BUFFER_MS = 500;

interface LagringsStatusContextValue {
  /**
   * Indikerer at en lagring nylig ble utført og SWR-oppdateringer bør ignoreres
   * for å unngå at fokus mistes i input-felter.
   */
  nettoLagret: boolean;
  /**
   * Marker at en lagring starter. Kall dette før onLagre kjøres.
   */
  startLagring: () => void;
  /**
   * Marker at en lagring er fullført. SWR-oppdateringer ignoreres i en kort periode etter dette.
   */
  fullførLagring: () => void;
}

const LagringsStatusContext = createContext<LagringsStatusContextValue | null>(
  null,
);

interface LagringsStatusProviderProps {
  children: ReactNode;
}

/**
 * Provider som holder styr på om en lagring nylig ble utført.
 * Komponenter kan bruke useLagringsStatus() for å sjekke om de bør
 * ignorere SWR-oppdateringer for å unngå fokustap.
 */
export function LagringsStatusProvider({
  children,
}: LagringsStatusProviderProps) {
  const [nettoLagret, setNettoLagret] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLagring = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setNettoLagret(true);
  }, []);

  const fullførLagring = useCallback(() => {
    // Hold nettoLagret=true en kort stund etter lagring for å la SWR revalidere
    // uten at komponentene reagerer på endringene
    timeoutRef.current = setTimeout(() => {
      setNettoLagret(false);
      timeoutRef.current = null;
    }, LAGRING_BUFFER_MS);
  }, []);

  return (
    <LagringsStatusContext.Provider
      value={{ nettoLagret, startLagring, fullførLagring }}
    >
      {children}
    </LagringsStatusContext.Provider>
  );
}

/**
 * Hook for å sjekke om en lagring nylig ble utført.
 * Bruk dette for å bestemme om komponenten bør ignorere SWR-oppdateringer.
 *
 * @example
 * ```tsx
 * const { nettoLagret } = useLagringsStatus();
 *
 * useEffect(() => {
 *   if (nettoLagret) return; // Ignorer oppdateringer rett etter lagring
 *   // Synkroniser med server-data
 * }, [serverData, nettoLagret]);
 * ```
 */
export function useLagringsStatus(): LagringsStatusContextValue {
  const context = useContext(LagringsStatusContext);

  if (!context) {
    // Fallback for komponenter som brukes utenfor provideren
    return {
      nettoLagret: false,
      startLagring: () => {},
      fullførLagring: () => {},
    };
  }

  return context;
}
