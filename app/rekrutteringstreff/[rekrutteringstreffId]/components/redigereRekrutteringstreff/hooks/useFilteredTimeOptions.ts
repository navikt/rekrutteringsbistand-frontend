import { KLOKKESLETT_OPTIONS } from '../tidspunkt/TimeInput';
import { isGyldigTid, kombinerDatoOgTid } from '../tidspunkt/utils';
import { isSameDay, addMinutes, subMinutes } from 'date-fns';
import { useMemo } from 'react';

type TimeFilterMode = 'after' | 'before';

/**
 * Hook som filtrerer tidspunkter basert på en annen tid.
 * Brukes for å begrense til-tidspunkt (etter fra-tid) og svarfrist (før fra-tid).
 */
export function useFilteredTimeOptions(
  targetDate: Date | null,
  referenceDato: Date | null,
  referenceTid: string | null,
  mode: TimeFilterMode,
  offsetMinutes: number = 15,
) {
  return useMemo(() => {
    if (!targetDate || !referenceDato || !isGyldigTid(referenceTid)) {
      return KLOKKESLETT_OPTIONS;
    }

    // Hvis ikke samme dag, ingen begrensninger
    if (!isSameDay(targetDate, referenceDato)) {
      return KLOKKESLETT_OPTIONS;
    }

    const referenceTidspunkt = kombinerDatoOgTid(referenceDato, referenceTid);
    if (!referenceTidspunkt) {
      return KLOKKESLETT_OPTIONS;
    }

    // Beregn grensetp basert på modus og offset
    const grenseTidspunkt =
      mode === 'after'
        ? addMinutes(referenceTidspunkt, offsetMinutes)
        : subMinutes(referenceTidspunkt, offsetMinutes);

    // Sjekk om grensen er innenfor samme dag
    if (!isSameDay(referenceTidspunkt, grenseTidspunkt)) {
      return mode === 'after' ? [] : KLOKKESLETT_OPTIONS;
    }

    const grenseTimestamp = grenseTidspunkt.getTime();

    return KLOKKESLETT_OPTIONS.filter((option) => {
      const kandidat = kombinerDatoOgTid(targetDate, option);
      if (!kandidat) return false;

      return mode === 'after'
        ? kandidat.getTime() >= grenseTimestamp
        : kandidat.getTime() <= grenseTimestamp;
    });
  }, [targetDate, referenceDato, referenceTid, mode, offsetMinutes]);
}
