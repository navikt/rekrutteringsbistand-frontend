'use client';
/**
 * Endepunkt /stilling
 */
import useSWRImmutable from 'swr/immutable';
import { postApiWithSchema } from '../fetcher';

import { StillingsSøkAPI } from '../api-routes';
import { usePamGeografi } from '../pam-geografi/typehead/lokasjoner/usePamGeografi';
import { mockStillingssøk } from './mocks/mockStillingssøk';
import { ESStillingsSøkSchema } from './schema/stillingsSøkSchema.zod';
import {
  generateElasticSearchQuery,
  StillingsSøkFilter,
} from './stillingssøkElasticSearchQuery';
const stillingsSøkEndepunkt = StillingsSøkAPI.internUrl;

export const useStillingssøk = (
  filter: StillingsSøkFilter,
  navIdent?: string,
  formidlinger?: boolean,
) => {
  const geografiData = usePamGeografi();

  const payload = generateElasticSearchQuery(
    filter,
    navIdent,
    geografiData.data,
    formidlinger,
  );

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
