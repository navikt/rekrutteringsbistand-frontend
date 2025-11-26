'use client';

/**
 * Endepunkt /useSugestions
 */
import { KandidatSøkAPI } from '@/app/api/api-routes';
import { useSWRPost } from '@/app/api/useSWRPost';
import { z } from 'zod';

const suggestionsEndepunkt = `${KandidatSøkAPI.internUrl}/suggest`;

const SuggestionsSchema = z.array(z.string());

export type SuggestionsDTO = z.infer<typeof SuggestionsSchema>;

export enum SuggestType {
  ØnsketYrke,
  Kompetanse,
  Arbeidserfaring,
  Språk,
}

export const useUseSuggestions = (søkeTekst: string, type: SuggestType) =>
  useSWRPost(
    søkeTekst ? suggestionsEndepunkt : null,
    SuggestionsSchema,
    søkeTekst
      ? {
          query: søkeTekst,
          type: type,
        }
      : null,
  );
