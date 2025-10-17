import { isGyldigTid, kombinerDatoOgTid } from '../tidspunkt/utils';
import { addHours, format, startOfDay } from 'date-fns';
import { useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';

/**
 * Hook som automatisk justerer sluttidspunkt når starttidspunkt endres.
 * Positive offsetHours = sluttid ETTER startid (tilTid)
 * Negative offsetHours = sluttid FØR startid (svarfrist)
 */
export function useAutoAdjustEndTime(
  setValue: UseFormSetValue<any>,
  scheduleSave: () => void,
  offsetHours: number = 1,
) {
  const adjustEndTime = useCallback(
    (
      startDato: Date | null | undefined,
      startTid: string | null | undefined,
      currentEndDato: Date | null | undefined,
      currentEndTid: string | null | undefined,
      endDatoField: string,
      endTidField: string,
    ) => {
      if (!startDato || !isGyldigTid(startTid)) return false;

      const startTidspunkt = kombinerDatoOgTid(startDato, startTid);
      if (!startTidspunkt) return false;

      const sluttDato = currentEndDato ?? startDato;
      const currentEndTidspunkt = kombinerDatoOgTid(sluttDato, currentEndTid);

      // Hvis eksisterende verdi allerede oppfyller regelen, ikke juster
      const isAfterMode = offsetHours > 0;
      const currentEndValid = currentEndTidspunkt
        ? isAfterMode
          ? currentEndTidspunkt.getTime() > startTidspunkt.getTime()
          : currentEndTidspunkt.getTime() < startTidspunkt.getTime()
        : false;

      if (currentEndValid) {
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
