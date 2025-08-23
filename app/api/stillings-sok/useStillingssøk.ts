'use client';

import { mockStillingssøk } from './mocks/mockStillingssøk';
import { opprettElasticSearchQuery } from './opprettElasticSearchQuery';
import { ESStillingsSøkSchema } from './schema/stillingsSøkSchema.zod';
import { StillingsSøkAPI } from '@/app/api/api-routes';
import { postApiWithSchema } from '@/app/api/fetcher';
import { usePamGeografi } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { IStillingsSøkContext } from '@/app/stilling/StillingsSøkContext';
/**
 * Endepunkt /stilling
 */
import useSWRImmutable from 'swr/immutable';

const stillingsSøkEndepunkt = StillingsSøkAPI.internUrl;

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
  const payload = opprettElasticSearchQuery({
    filter,
    eierNavKontorEnhetId,
    navIdent,
    geografiData: geografiData.data,
    formidlinger,
    finnStillingerForKandidat,
  });

  return useSWRImmutable(
    geografiData.isLoading
      ? null
      : {
          url: stillingsSøkEndepunkt,
          body: payload,
        },
    (data) => {
      return postApiWithSchema(ESStillingsSøkSchema)(data);
    },
  );
};

export const stillingssøkMirage = (server: any) =>
  server.post(stillingsSøkEndepunkt, () => mockStillingssøk);
