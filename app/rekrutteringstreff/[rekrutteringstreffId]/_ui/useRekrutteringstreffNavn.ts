import { useRekrutteringstreffData } from './useRekrutteringstreffData';
import { useMemo } from 'react';

export function useRekrutteringstreffNavn() {
  const { treff } = useRekrutteringstreffData();

  return useMemo(() => {
    const tittel = treff?.tittel?.trim();
    if (tittel && tittel.length > 0 && tittel !== 'Treff uten navn') {
      return tittel;
    }
    return 'Rekrutteringstreff';
  }, [treff?.tittel]);
}
