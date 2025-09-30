import { KLOKKESLETT_OPTIONS } from '../tidspunkt/TimeInput';
import { isGyldigTid, kombinerDatoOgTid } from '../tidspunkt/utils';
import { isSameDay, addMinutes } from 'date-fns';
import { useMemo } from 'react';

/**
 * Hook som filtrerer tidspunkter basert på en annen tid.
 * Positive offsetMinutes = tidspunkter ETTER referanse (til-tid)
 * Negative offsetMinutes = tidspunkter FØR referanse (svarfrist)
 */
export function useFilteredTimeOptions(
  targetDate: Date | null,
  referenceDato: Date | null,
  referenceTid: string | null,
  offsetMinutes: number = 15,
) {
  return useMemo(() => {
    // Ingen filtrering hvis manglende data eller ulike dager
    if (
      !targetDate ||
      !referenceDato ||
      !isGyldigTid(referenceTid) ||
      !isSameDay(targetDate, referenceDato)
    ) {
      return KLOKKESLETT_OPTIONS;
    }

    const referenceTidspunkt = kombinerDatoOgTid(referenceDato, referenceTid);
    if (!referenceTidspunkt) return KLOKKESLETT_OPTIONS;

    // Beregn grenseverdi - positivt offset = etter, negativt = før
    const grenseTidspunkt = addMinutes(referenceTidspunkt, offsetMinutes);

    // Hvis grensen går utenfor samme dag, returner tom liste (positiv) eller alle (negativ)
    if (!isSameDay(referenceTidspunkt, grenseTidspunkt)) {
      return offsetMinutes > 0 ? [] : KLOKKESLETT_OPTIONS;
    }

    const grenseTimestamp = grenseTidspunkt.getTime();
    const isAfterMode = offsetMinutes > 0;

    const filtrert = KLOKKESLETT_OPTIONS.filter((option) => {
      const kandidat = kombinerDatoOgTid(targetDate, option);
      if (!kandidat) return false;

      return isAfterMode
        ? kandidat.getTime() >= grenseTimestamp
        : kandidat.getTime() <= grenseTimestamp;
    });

    // Behold stigende sortering uansett offset (00:00 øverst)
    return filtrert;
  }, [targetDate, referenceDato, referenceTid, offsetMinutes]);
}
