'use client';
/**
 * Endepunkt /stilling
 */
import useSWRImmutable from 'swr/immutable';
import { postApiWithSchema } from '../fetcher';
import { useGeografi } from '../stilling/geografi/useGeografi';
import { stillingsSøkDTOSchema } from './stillingsok.dto';
import {
  generateElasticSearchQuery,
  StillingsSøkFilter,
} from './stillingssøkElasticSearchQuery';

const stillingEndepunkt = '/api/stillings-sok';

export const useStillingssøk = (
  filter: StillingsSøkFilter,
  navIdent?: string,
) => {
  const geografiData = useGeografi();

  const payload = generateElasticSearchQuery(
    filter,
    navIdent,
    geografiData.data,
  );

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
