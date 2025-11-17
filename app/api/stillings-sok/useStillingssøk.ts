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
import { useSWRPost } from '@/app/api/useSWRPost';
import { IStillingsSøkContext } from '@/app/stilling/StillingsSøkContext';
import { http, HttpResponse, passthrough } from 'msw';

/**
 * Endepunkt /stilling
 */

const stillingsSokBase = `${StillingsSøkAPI.internUrl}`;

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

  return useSWRPost(
    geografiData.isLoading ? null : stillingsSokBase,
    StillingsSokCombinedSchema,
    mergedQuery,
  );
};

export const stillingssøkMSWHandler = http.post(stillingsSokBase, () => {
  if (process.env.NEXT_PUBLIC_STILLING_ES_MOCK === 'true') {
    return passthrough(); // slipper igjennom til ekte backend
  }
  return HttpResponse.json({
    hits: mockStillingssøk.hits,
    antall: { status: { publisert: 0, utløpt: 0, stoppet: 0 } },
  });
});
