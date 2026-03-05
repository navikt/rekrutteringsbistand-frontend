import { useRekrutteringstreffData } from './useRekrutteringstreffData';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useMemo } from 'react';

export function useErTreffEier() {
  const { treff } = useRekrutteringstreffData();
  const { brukerData, harRolle } = useApplikasjonContext();

  return useMemo(() => {
    if (!treff) return false;
    return (
      treff.eiere.includes(brukerData.ident) ||
      harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER])
    );
  }, [treff, brukerData.ident, harRolle]);
}
