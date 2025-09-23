import { isGyldigTid, kombinerDatoOgTid } from '../tidspunkt/utils';
import { addHours, format, startOfDay } from 'date-fns';
import { useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';

/**
 * Hook som automatisk justerer sluttidspunkt når starttidspunkt endres.
 * Brukes for å sikre at sluttid alltid er etter startid med en gitt offset.
 */
export function useAutoAdjustEndTime(
  setValue: UseFormSetValue<any>,
  scheduleSave: () => void,
  offsetHours: number = 1,
) {
  const adjustEndTime = useCallback(
    (
      startDato: Date | null,
      startTid: string | null,
      currentEndDato: Date | null,
      currentEndTid: string | null,
      endDatoField: string,
      endTidField: string,
    ) => {
      if (!startDato || !isGyldigTid(startTid)) return false;

      const startTidspunkt = kombinerDatoOgTid(startDato, startTid);
      if (!startTidspunkt) return false;

      const sluttDato = currentEndDato ?? startDato;
      const currentEndTidspunkt = kombinerDatoOgTid(sluttDato, currentEndTid);

      // Hvis slutt er etter start, ikke juster
      if (
        currentEndTidspunkt &&
        currentEndTidspunkt.getTime() > startTidspunkt.getTime()
      ) {
        return false;
      }

      // Beregn ny slutttid
      const nyttSlutt = addHours(startTidspunkt, offsetHours);
      const nyDato = startOfDay(nyttSlutt);
      const nyTid = format(nyttSlutt, 'HH:mm');

      let oppdatert = false;

      if (
        !currentEndDato ||
        startOfDay(currentEndDato).getTime() !== nyDato.getTime()
      ) {
        setValue(endDatoField, nyDato, {
          shouldDirty: true,
          shouldValidate: false,
        });
        oppdatert = true;
      }

      if (currentEndTid !== nyTid) {
        setValue(endTidField, nyTid, {
          shouldDirty: true,
          shouldValidate: false,
        });
        oppdatert = true;
      }

      if (oppdatert) {
        scheduleSave();
      }

      return oppdatert;
    },
    [setValue, scheduleSave, offsetHours],
  );

  return { adjustEndTime };
}
