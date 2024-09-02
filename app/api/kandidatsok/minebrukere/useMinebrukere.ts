'use client';
/**
 * Endepunkt /minebrukere
 */
import useSWRImmutable from 'swr/immutable';
import { postApiWithSchema } from '../../fetcher';
import { kandidatSokSchema } from '../types';

const minebrukereEndepunkt =
  '/api/kandidatsok/minebrukere?side=1&sortering=nyeste';

export const useMinebrukere = (payload: any) =>
  useSWRImmutable(
    {
      url: minebrukereEndepunkt,
      body: payload,
    },
    (data) => {
      return postApiWithSchema(kandidatSokSchema)(data);
    },
  );
