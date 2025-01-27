'use client';
/**
 * Endepunkt /stilling
 */
import useSWRImmutable from 'swr/immutable';
import { postApiWithSchema } from '../fetcher';
import { useGeografi } from '../stilling/geografi/useGeografi';

import { StillingsSøkAPI } from '../api-routes';
import { mockStillingssøk } from './mocks/mockStillingssøk';
import { stillingsSøkSchema } from './schema/stillingsSøkSchema.zod';
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
  const geografiData = useGeografi();

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
      return postApiWithSchema(stillingsSøkSchema)(data);
    },
  );
};

export const stillingssøkMirage = (server: any) =>
  server.post(stillingsSøkEndepunkt, () => mockStillingssøk);
