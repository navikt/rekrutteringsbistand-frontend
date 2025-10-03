import { useRekrutteringstreffContext } from '../../_contexts/RekrutteringstreffContext';
import { useRekrutteringstreffData } from './useRekrutteringstreffData';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useMemo } from 'react';

const DEFAULT_TITTEL = 'Treff uten navn';

export interface SjekklisteStatus {
  items: {
    arbeidsgiver: boolean;
    navn: boolean;
    sted: boolean;
    tidspunkt: boolean;
    svarfrist: boolean;
    omtreffet: boolean;
  };
  punkterFullfort: number;
  totaltAntallPunkter: number;
  erPubliseringklar: boolean;
}

/**
 * Hook for å beregne sjekkliste-status for publisering av rekrutteringstreff
 *
 * Denne hooken sentraliserer logikken for å sjekke om et rekrutteringstreff
 * er klart for publisering ved å verifisere at alle påkrevde felt er fylt ut.
 *
 * @returns SjekklisteStatus med items, fullførte punkter og om treffet er publiseringklart
 */
export const useSjekklisteStatus = (): SjekklisteStatus => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff: rekrutteringstreff, innlegg } = useRekrutteringstreffData();
  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const items = useMemo(() => {
    const tittel = rekrutteringstreff?.tittel?.trim() ?? '';
    return {
      arbeidsgiver: (arbeidsgivere?.length ?? 0) > 0,
      navn: tittel.length > 0 && tittel !== DEFAULT_TITTEL,
      sted:
        !!rekrutteringstreff?.gateadresse?.trim() &&
        !!rekrutteringstreff?.poststed?.trim(),
      tidspunkt: !!rekrutteringstreff?.fraTid,
      svarfrist: !!rekrutteringstreff?.svarfrist,
      omtreffet: (innlegg?.length ?? 0) > 0,
    };
  }, [arbeidsgivere, rekrutteringstreff, innlegg]);

  const punkterFullfort = useMemo(
    () => Object.values(items).filter(Boolean).length,
    [items],
  );

  const totaltAntallPunkter = Object.keys(items).length;
  const erPubliseringklar = punkterFullfort === totaltAntallPunkter;

  return {
    items,
    punkterFullfort,
    totaltAntallPunkter,
    erPubliseringklar,
  };
};
