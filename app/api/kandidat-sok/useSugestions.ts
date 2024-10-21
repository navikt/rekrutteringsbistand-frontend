'use client';
/**
 * Endepunkt /useSugestions
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { KandidatSøkAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';

const useSugestionsEndepunkt = `${KandidatSøkAPI.internUrl}/suggest`;

const useSugestionsSchema = z.array(z.string());

export type useSugestionsDTO = z.infer<typeof useSugestionsSchema>;

export const useUseSugestions = () =>
  useSWRImmutable(
    useSugestionsEndepunkt,
    getAPIwithSchema(useSugestionsSchema),
  );
