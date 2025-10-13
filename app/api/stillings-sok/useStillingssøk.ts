'use client';

import { byggKombinertQuery } from './byggKombinertQuery';
import { mockStillingssøk } from './mocks/mockStillingssøk';
import {
  opprettElasticSearchAggregeringsQuery,
  opprettElasticSearchTreffQuery,
} from './opprettElasticSearchQuery';
import { StillingsSokCombinedSchema } from './schema/stillingsSokCombinedSchema.zod';
import { StillingsSøkAPI } from '@/app/api/api-routes';
import { usePamGeografi } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { IStillingsSøkContext } from '@/app/stilling/StillingsSøkContext';
import { http, HttpResponse } from 'msw';
/**
 * Endepunkt /stilling
 */
import useSWRImmutable from 'swr/immutable';

const stillingsSokBase = `${StillingsSøkAPI.internUrl}` as const; // direkte ett kall

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

  const mergedQuery = byggKombinertQuery(treffPayload, aggsPayload);

  const combinedHook = useSWRImmutable(
    geografiData.isLoading
      ? null
      : { url: stillingsSokBase, body: mergedQuery },
    async (requestConfig) => {
      const res = await fetch(requestConfig.url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestConfig.body),
      });
      if (!res.ok) throw new Error('Feil ved stillingssøk');
      const json = await res.json();
      const result = StillingsSokCombinedSchema.safeParse(json);
      return result.success ? result.data : json;
    },
  );

  return combinedHook;
};

export const stillingssøkMSWHandler = http.post(stillingsSokBase, () =>
  HttpResponse.json({
    hits: mockStillingssøk.hits,
    antall: { status: { publisert: 0, utløpt: 0, stoppet: 0 } },
  }),
);
