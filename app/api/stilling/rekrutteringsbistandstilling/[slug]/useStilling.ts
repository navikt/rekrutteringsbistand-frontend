'use client';
/**
 * Endepunkt /useStilling
 */
import useSWRImmutable from 'swr/immutable';
import { getAPIwithSchema } from '../../../fetcher';
import { stillingMock } from './mocks/stillingMock';
import { StillingDataSchema } from './stilling.dto';
import { StillingAPI } from '../../../api-routes';

const stillingEndepunkt = (stillingsId: string) =>
  `${StillingAPI.internUrl}/rekrutteringsbistandstilling/${stillingsId}`;

export const useStilling = (stillingsId: string) =>
  useSWRImmutable(
    stillingEndepunkt(stillingsId),
    getAPIwithSchema(StillingDataSchema),
  );

export const stillingMirage = (server: any) => {
  server.get(stillingEndepunkt('*'), () => stillingMock);
};
