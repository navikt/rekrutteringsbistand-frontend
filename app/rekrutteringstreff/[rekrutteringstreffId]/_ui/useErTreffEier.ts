import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useMemo } from 'react';

export function useErTreffEier() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const { brukerData, harRolle } = useApplikasjonContext();

  return useMemo(() => {
    if (!treff) return false;
    return (
      treff.eiere.includes(brukerData.ident) ||
      harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER])
    );
  }, [treff, brukerData.ident, harRolle]);
}
