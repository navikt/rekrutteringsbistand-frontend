'use client';
/**
 * Endepunkt /useSugestions
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchema } from '../fetcher';

const sugestionsEndepunkt = `${KandidatSøkAPI.internUrl}/suggest`;

const SugestionsSchema = z.array(z.string());

export type SugestionsDTO = z.infer<typeof SugestionsSchema>;

export enum SuggestType {
  ØnsketYrke,
  Kompetanse,
  Arbeidserfaring,
  Språk,
}

export const useUseSugestions = (søkeTekst: string, type: SuggestType) => {
  return useSWRImmutable(
    søkeTekst
      ? {
          url: sugestionsEndepunkt,
          body: {
            query: søkeTekst,
            type: type,
          },
        }
      : null,
    (data) => {
      return postApiWithSchema(SugestionsSchema)(data);
    },
  );
};
