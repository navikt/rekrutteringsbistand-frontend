'use client';

import { byggKombinertQuery } from './byggKombinertQuery';
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

  const venter = geografiData.isLoading || filter.venterPåFiltreOgSøkeord;
  const søk = useSWRPost(
    venter ? null : stillingsSokBase,
    StillingsSokCombinedSchema,
    mergedQuery,
  );
  // Uten nøkkel er `isLoading` usann, og antallene i filtrene ville vist 0 i stedet for «-».
  return { ...søk, isLoading: søk.isLoading || venter };
};
