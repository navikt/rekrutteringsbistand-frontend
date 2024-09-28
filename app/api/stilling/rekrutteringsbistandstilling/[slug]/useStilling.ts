'use client';
/**
 * Endepunkt /useStilling
 */
import useSWRImmutable from 'swr/immutable';
import { getAPIwithSchema } from '../../../fetcher';
import { stillingMock } from './mocks/stillingMock';
import { stillingSchema } from './zod';

const stillingEndepunkt = (stillingsId: string) =>
  `/api/stilling/rekrutteringsbistandstilling/${stillingsId}`;

export const useStilling = (stillingsId: string) =>
  useSWRImmutable(
    stillingEndepunkt(stillingsId),
    getAPIwithSchema(stillingSchema),
  );

export const stillingMirage = (server: any) => {
  server.get(stillingEndepunkt('*'), () => stillingMock);
};
