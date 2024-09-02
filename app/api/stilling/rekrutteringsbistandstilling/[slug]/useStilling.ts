'use client';
/**
 * Endepunkt /useStilling
 */
import useSWRImmutable from 'swr/immutable';
import { getAPIwithSchema } from '../../../fetcher';
import { stillingSchema } from './zod';

const useStillingEndepunkt = (stillingsId: string) =>
  `/api/stilling/rekrutteringsbistandstilling/${stillingsId}`;

export const useStilling = (stillingsId: string) =>
  useSWRImmutable(
    useStillingEndepunkt(stillingsId),
    getAPIwithSchema(stillingSchema),
  );
