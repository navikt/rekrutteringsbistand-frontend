'use client';
/**
 * Endepunkt /stilling
 */
import useSWRImmutable from 'swr/immutable';
import { postApiWithSchema } from '../fetcher';
import { stillingsSøkDTOSchema } from './zod';

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
