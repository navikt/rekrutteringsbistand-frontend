import type { useAutosave } from '../useAutosave';
import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook som gir scheduleSave funksjon for å batche lagring.
 * Bruker setTimeout(0) for å batche flere endringer i samme event loop.
 */
export function useScheduledSave(
  save: ReturnType<typeof useAutosave>['validerOgLagreRekrutteringstreff'],
  fields: string[],
) {
  const timeoutRef = useRef<number | null>(null);

  // Cleanup ved unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scheduleSave = useCallback(() => {
    // Avbryt eventuell pending lagring
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Planlegg ny lagring i neste event loop
    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      save(fields);
    }, 0);
  }, [save, fields]);

  return { scheduleSave };
}
