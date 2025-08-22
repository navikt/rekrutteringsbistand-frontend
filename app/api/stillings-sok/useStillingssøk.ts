'use client';

import { IStillingsSøkContext } from '../../stilling/StillingsSøkContext';
import { StillingsSøkAPI } from '../api-routes';
import { postApiWithSchema } from '../fetcher';
import { usePamGeografi } from '../pam-geografi/typehead/lokasjoner/usePamGeografi';
import { mockStillingssøk } from './mocks/mockStillingssøk';
import { opprettElasticSearchQuery } from './opprettElasticSearchQuery';
import { ESStillingsSøkSchema } from './schema/stillingsSøkSchema.zod';
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
