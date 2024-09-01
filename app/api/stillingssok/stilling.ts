'use client';
/**
 * Endepunkt /stilling
 */
import useSWRImmutable from 'swr/immutable';
import { postApiWithSchema } from '../fetcher';
import {
  generateElasticSearchQuery,
  StillingsSøkFilter,
} from './stillingssøkElasticSearchQuery';
import { stillingsSøkDTOSchema } from './zod';

const stillingEndepunkt = '/api/stillingssok';

export const useStilling = (filter: StillingsSøkFilter) => {
  const payload = generateElasticSearchQuery(filter);

  return useSWRImmutable(
    {
      url: stillingEndepunkt,
      body: payload,
    },
    (data) => {
      return postApiWithSchema(stillingsSøkDTOSchema)(data);
    },
  );
};
