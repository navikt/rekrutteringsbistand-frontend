'use client';

import { mockStillingssøk } from './mocks/mockStillingssøk';
import {
  opprettElasticSearchAggregeringsQuery,
  opprettElasticSearchTreffQuery,
} from './opprettElasticSearchQuery';
import { StillingsSokCombinedSchema } from './schema/stillingsSokCombinedSchema.zod';
import { StillingsSøkAPI } from '@/app/api/api-routes';
import { usePamGeografi } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { IStillingsSøkContext } from '@/app/stilling/StillingsSøkContext';
/**
 * Endepunkt /stilling
 */
import useSWRImmutable from 'swr/immutable';

const stillingsSøkCombined = `${StillingsSøkAPI.internUrl}/esCombined` as const; // kombinert endepunkt

interface UseStillingssøkParams {
  filter: IStillingsSøkContext;
  eierNavKontorEnhetId?: string;
  navIdent?: string;
  formidlinger?: boolean;
  finnStillingerForKandidat?: boolean;
}

export const useStillingssøk = ({
  filter,
  eierNavKontorEnhetId,
  navIdent,
  formidlinger,
  finnStillingerForKandidat,
}: UseStillingssøkParams) => {
  const geografiData = usePamGeografi();

  // const payload = generateElasticSearchQuery({
  const treffPayload = opprettElasticSearchTreffQuery({
    filter,
    eierNavKontorEnhetId,
    navIdent,
    geografiData: geografiData.data,
    formidlinger,
    finnStillingerForKandidat,
  });

  const aggsPayload = opprettElasticSearchAggregeringsQuery({
    filter: { ...filter, side: 1 }, // side påvirker ikke aggregat, men sikre deterministisk
    eierNavKontorEnhetId,
    navIdent,
    geografiData: geografiData.data,
    formidlinger,
    finnStillingerForKandidat,
  });

  // Vi henter treff og aggregeringer separat
  const combinedHook = useSWRImmutable(
    geografiData.isLoading
      ? null
      : {
          url: stillingsSøkCombined,
          body: { treff: treffPayload, aggs: aggsPayload },
        },
    async (requestConfig) => {
      // Utfør POST til combined endepunkt
      const res = await fetch(requestConfig.url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestConfig.body),
      });
      if (!res.ok) throw new Error('Feil ved kombinert stillingssøk');
      const json = await res.json();
      // Valider komplett combined respons (kaster ikke for å unngå hard crash, men kunne gjort parse her)
      const result = StillingsSokCombinedSchema.safeParse(json);
      if (!result.success) {
        // Returner likevel data for ikke å stoppe UI, evt kunne logges
        return json;
      }
      return result.data;
    },
  );

  return combinedHook;
};

export const stillingssøkMirage = (server: any) => {
  server.post(stillingsSøkCombined, () => ({
    hits: mockStillingssøk.hits,
    antall: {
      status: { publisert: 0, utløpt: 0, stoppet: 0 },
    },
  }));
};
