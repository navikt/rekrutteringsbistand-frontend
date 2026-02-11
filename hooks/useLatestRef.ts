import { useLayoutEffect, useRef } from 'react';

/**
 * Ref som alltid inneholder siste verdi.
 * Nyttig i async callbacks (setTimeout, promises) for å unngå stale closures.
 * Tilsvarer useLatest fra react-use.
 * Bruker useLayoutEffect (ikke useEffect) slik at ref.current oppdateres
 * synkront etter commit, før paint — ingen stale-vindu for timers/handlers.
 */
export function useLatestRef<T>(value: T): { readonly current: T } {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}
