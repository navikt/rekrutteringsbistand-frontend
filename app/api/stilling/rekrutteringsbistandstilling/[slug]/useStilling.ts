'use client';

/**
 * Endepunkt /useStilling
 */
import {
  internStillingMock,
  mockBaseStilling,
  mockEksternStilling,
  mockFormidling,
  mockMinEksternStilling,
  mockMinStilling,
  nyStillingMock,
} from './mocks/stillingMock';
import { StillingDataSchema } from './stilling.dto';
import { StillingAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import useSWR from 'swr';

export const stillingEndepunkt = (stillingsId: string) =>
  `${StillingAPI.internUrl}/rekrutteringsbistandstilling/${stillingsId}`;

export const useStilling = (stillingsId?: string | null) =>
  useSWR(
    stillingsId ? stillingEndepunkt(stillingsId) : null,
    getAPIwithSchema(StillingDataSchema),
    {
      revalidateOnFocus: false,
      // Bruker default SWR-oppførsel for revalidateOnMount (false når data finnes i cache)
    },
  );

export const stillingMirage = (server: any) => {
  server.get(stillingEndepunkt('nyStilling'), () => nyStillingMock);
  server.get(stillingEndepunkt('internStilling'), () => internStillingMock);
  server.get(stillingEndepunkt('minStilling'), () => mockMinStilling);
  server.get(stillingEndepunkt('minFormidling'), () => mockFormidling);
  server.get(stillingEndepunkt('eksternStilling'), () => mockEksternStilling);
  server.get(
    stillingEndepunkt('minEksternStilling'),
    () => mockMinEksternStilling,
  );
  server.get(stillingEndepunkt('*'), () => mockBaseStilling);
};
