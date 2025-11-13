'use client';

/**
 * Endepunkt /useSugestions
 */
import { KandidatSøkAPI } from '@/app/api/api-routes';
import { useSWRPost } from '@/app/api/useSWRPost';
import { z } from 'zod';

const sugestionsEndepunkt = `${KandidatSøkAPI.internUrl}/suggest`;

const SugestionsSchema = z.array(z.string());

export type SugestionsDTO = z.infer<typeof SugestionsSchema>;

export enum SuggestType {
  ØnsketYrke,
  Kompetanse,
  Arbeidserfaring,
  Språk,
}

export const useUseSugestions = (søkeTekst: string, type: SuggestType) =>
  useSWRPost(
    søkeTekst ? sugestionsEndepunkt : null,
    SugestionsSchema,
    søkeTekst
      ? {
          query: søkeTekst,
          type: type,
        }
      : null,
  );
