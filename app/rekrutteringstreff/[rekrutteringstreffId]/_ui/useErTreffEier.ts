import { useRekrutteringstreffData } from './useRekrutteringstreffData';
import { erEierAvTreff } from '@/app/rekrutteringstreff/_utils/eiere';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useMemo } from 'react';

export function useErTreffEier() {
  const { treff } = useRekrutteringstreffData();
  const { brukerData, harRolle } = useApplikasjonContext();

  return useMemo(() => {
    if (!treff) return false;
    return (
      erEierAvTreff(treff.eierOgKontor, brukerData.ident) ||
      harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER])
    );
  }, [treff, brukerData.ident, harRolle]);
}
