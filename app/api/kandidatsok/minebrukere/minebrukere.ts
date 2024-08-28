'use client';
/**
 * Endepunkt /minebrukere
 */
import useSWRImmutable from 'swr/immutable';
import { postApiWithSchema } from '../../fetcher';
import { kandidatSokSchema } from '../types';

const minebrukereEndepunkt = '/api/kandidatsok/minebrukere';

export const useMinebrukere = (payload : any) =>
  useSWRImmutable(
    {
      url: minebrukereEndepunkt,
      body: payload
    },
    (data) => {
      return postApiWithSchema(kandidatSokSchema)(data);
    },
  );
