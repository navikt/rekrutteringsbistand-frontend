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
  targetDate: Date | null | undefined,
  referenceDato: Date | null | undefined,
  referenceTid: string | null | undefined,
  offsetMinutes: number = 15,
) {
  return useMemo(() => {
    // Normaliser undefined til null
    const normalizedTargetDate = targetDate ?? null;
    const normalizedReferenceDato = referenceDato ?? null;
    const normalizedReferenceTid = referenceTid ?? null;

    // Ingen filtrering hvis manglende data eller ulike dager
    if (
      !normalizedTargetDate ||
      !normalizedReferenceDato ||
      !isGyldigTid(normalizedReferenceTid) ||
      !isSameDay(normalizedTargetDate, normalizedReferenceDato)
    ) {
      return KLOKKESLETT_OPTIONS;
    }

    const referenceTidspunkt = kombinerDatoOgTid(
      normalizedReferenceDato,
      normalizedReferenceTid,
    );
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
      const kandidat = kombinerDatoOgTid(normalizedTargetDate, option);
      if (!kandidat) return false;

      return isAfterMode
        ? kandidat.getTime() >= grenseTimestamp
        : kandidat.getTime() <= grenseTimestamp;
    });

    // Behold stigende sortering uansett offset (00:00 øverst)
    return filtrert;
  }, [targetDate, referenceDato, referenceTid, offsetMinutes]);
}
