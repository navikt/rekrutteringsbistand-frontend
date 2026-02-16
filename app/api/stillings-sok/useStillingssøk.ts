'use client';

import { byggKombinertQuery } from './byggKombinertQuery';
import {
  mockEtterregistreringssøk,
  mockStillingssøk,
} from './mocks/mockStillingssøk';
import {
  opprettElasticSearchAggregeringsQuery,
  opprettElasticSearchTreffQuery,
} from './opprettElasticSearchQuery';
import { StillingsSokCombinedSchema } from './schema/stillingsSokCombinedSchema.zod';
import { StillingsSøkAPI } from '@/app/api/api-routes';
import { usePamGeografi } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { useSWRPost } from '@/app/api/useSWRPost';
import { IStillingsSøkContext } from '@/app/stilling/StillingsSøkContext';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
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
  const { harRolle } = useApplikasjonContext();

  const harArbeidsgiverrettetRolle = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  ]);
  const treffPayload = opprettElasticSearchTreffQuery({
    filter,
    eierNavKontorEnhetId,
    navIdent,
    geografiData: geografiData.data,
    formidlinger,
    finnStillingerForKandidat,
    harArbeidsgiverrettetRolle,
  });

  const aggsPayload = opprettElasticSearchAggregeringsQuery({
    filter: { ...filter, side: 1 }, // side påvirker ikke aggregat, men sikre deterministisk
    eierNavKontorEnhetId,
    navIdent,
    geografiData: geografiData.data,
    formidlinger,
    finnStillingerForKandidat,
    harArbeidsgiverrettetRolle,
  });

  const mergedQuery = byggKombinertQuery(treffPayload, aggsPayload);

  return useSWRPost(
    geografiData.isLoading ? null : stillingsSokBase,
    StillingsSokCombinedSchema,
    mergedQuery,
  );
};

export const stillingssøkMSWHandler = http.post(
  stillingsSokBase,
  async ({ request }) => {
    if (process.env.NEXT_PUBLIC_STILLING_ES_MOCK === 'true') {
      return passthrough(); // slipper igjennom til ekte backend
    }

    const body = (await request.json()) as Record<string, unknown>;
    // Formidlingssøk har must-filter med stillingskategori=FORMIDLING i query,
    // mens stillingssøk har must_not med FORMIDLING i query.
    // Sjekker kun query-noden (ikke aggs som alltid inneholder begge).
    const queryStr = JSON.stringify(body.query ?? {});
    const erFormidling =
      queryStr.includes('"stillingsinfo.stillingskategori":"FORMIDLING"') &&
      !queryStr.includes('"stillingsinfo.stillingskategori":"ARBEIDSTRENING"');
    const mock = erFormidling ? mockEtterregistreringssøk : mockStillingssøk;

    return HttpResponse.json({
      hits: mock.hits,
      antall: { status: { publisert: 0, utløpt: 0, stoppet: 0 } },
    });
  },
);
