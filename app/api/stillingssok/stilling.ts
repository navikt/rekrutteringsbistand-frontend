'use client';
/**
 * Endepunkt /stilling
 */
import useSWRImmutable from 'swr/immutable';
import { stillingsSøkDTOSchema } from '../../stillingssok/zod';
import { postApiWithSchema } from '../fetcher';

const stillingEndepunkt = '/api/stillingssok';

export const useStilling = (payload: any) =>
  useSWRImmutable(
    {
      url: stillingEndepunkt,
      body: payload,
    },
    (data) => {
      return postApiWithSchema(stillingsSøkDTOSchema)(data);
    },
  );
