'use client';
/**
 * Endepunkt /useStilling
 */
import useSWRImmutable from 'swr/immutable';
import { StillingAPI } from '../../../api-routes';
import { getAPIwithSchema } from '../../../fetcher';
import {
  mockBaseStilling,
  mockEksternStilling,
  mockFormidling,
  mockMinEksternStilling,
  mockMinStilling,
  nyStillingMock,
} from './mocks/stillingMock';
import { StillingDataSchema } from './stilling.dto';

const stillingEndepunkt = (stillingsId: string) =>
  `${StillingAPI.internUrl}/rekrutteringsbistandstilling/${stillingsId}`;

export const useStilling = (stillingsId: string) =>
  useSWRImmutable(
    stillingEndepunkt(stillingsId),
    getAPIwithSchema(StillingDataSchema),
  );

export const stillingMirage = (server: any) => {
  server.get(stillingEndepunkt('nyStilling'), () => nyStillingMock);
  server.get(stillingEndepunkt('minStilling'), () => mockMinStilling);
  server.get(stillingEndepunkt('minFormidling'), () => mockFormidling);
  server.get(stillingEndepunkt('eksternStilling'), () => mockEksternStilling);
  server.get(
    stillingEndepunkt('minEksternStilling'),
    () => mockMinEksternStilling,
  );
  server.get(stillingEndepunkt('*'), () => mockBaseStilling);
};
