import type { useAutosave } from '../useAutosave';
import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook som gir scheduleSave funksjon for å batche/debounce lagring.
 * Brukes både i TidspunktForm og SvarfristForm for å unngå for hyppig lagring.
 */
export function useScheduledSave(
  save: ReturnType<typeof useAutosave>['save'],
  fields: string[],
) {
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const scheduleSave = useCallback(() => {
    const run = () => save(fields);

    if (typeof window === 'undefined') {
      void run();
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveTimeoutRef.current = null;
      void run();
    }, 0);
  }, [save, fields]);

  return { scheduleSave };
}
