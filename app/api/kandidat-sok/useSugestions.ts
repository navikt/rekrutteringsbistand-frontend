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

export const useUseSugestions = (søkeTekst: string) =>
  useSWRImmutable(
    søkeTekst
      ? {
          url: sugestionsEndepunkt,
          body: {
            query: søkeTekst,
            type: 0,
          },
        }
      : null,
    (data) => {
      return postApiWithSchema(SugestionsSchema)(data);
    },
  );
