import { useEffect, useRef } from 'react';

/**
 * Ref som alltid inneholder siste verdi.
 * Nyttig i async callbacks (setTimeout, promises) for å unngå stale closures.
 * Tilsvarer useLatest fra react-use.
 */
export function useLatestRef<T>(value: T): { readonly current: T } {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}
