'use client';

import {
  type StandardsøkDomene,
  type StandardsøkDTO,
} from '@/app/api/bruker/standardsok/standardsøkTyper';
import {
  registrerBrukAvStandardsøk,
  useStandardsøk,
} from '@/app/api/bruker/standardsok/useStandardsøk';
import { erUtløpt } from '@/components/standardsøk/standardsøkDato';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { useCallback } from 'react';

const IKKE_FUNNET =
  'Fant ikke det lagrede søket. Det kan være slettet fordi det ikke er brukt på seks måneder.';

/**
 * Kontrollerer et lagret søk før domenet tar det i bruk. Et utløpt søk i cachen eller 404 fra backend
 * gir null, så filtre og søkeord fra et slettet søk aldri blir aktivert. Vi kaller alltid backend,
 * også når søket er brukt i dag, fordi søket kan være slettet eller endret i en annen fane.
 * Backend skriver likevel høyst én gang i døgnet per søk.
 */
export const useBrukStandardsøk = (domene: StandardsøkDomene) => {
  const liste = useStandardsøk(domene);
  const { mutate } = liste;
  const { visVarsel } = useApplikasjonContext();

  const hentGjeldendeSøk = useCallback(
    async (søk: StandardsøkDTO): Promise<StandardsøkDTO | null> => {
      if (erUtløpt(søk)) {
        visVarsel({ type: 'warning', tekst: IKKE_FUNNET });
        await mutate();
        return null;
      }

      try {
        const oppdatert = await registrerBrukAvStandardsøk(domene, søk.id);
        await mutate(
          (data) => data?.map((s) => (s.id === oppdatert.id ? oppdatert : s)),
          { revalidate: false },
        );
        return oppdatert;
      } catch (error) {
        if (RekbisError.ensure(error).statuskode === 404) {
          visVarsel({ type: 'warning', tekst: IKKE_FUNNET });
          await mutate();
        } else {
          visVarsel({
            type: 'error',
            tekst: 'Kunne ikke bruke det lagrede søket. Prøv igjen.',
          });
        }
        return null;
      }
    },
    [domene, mutate, visVarsel],
  );

  return { liste, hentGjeldendeSøk };
};
