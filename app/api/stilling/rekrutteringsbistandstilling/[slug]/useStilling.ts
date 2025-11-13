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
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';

export const stillingEndepunkt = (stillingsId: string) =>
  `${StillingAPI.internUrl}/rekrutteringsbistandstilling/${stillingsId}`;

export const useStilling = (stillingsId?: string | null) =>
  useSWRGet(
    stillingsId ? stillingEndepunkt(stillingsId) : null,
    StillingDataSchema,
    {
      revalidateOnFocus: false,
      // Bruker default SWR-oppførsel for revalidateOnMount (false når data finnes i cache)
    },
  );

export const stillingMSWHandlers = [
  http.get(stillingEndepunkt('nyStilling'), () =>
    HttpResponse.json(nyStillingMock),
  ),
  http.get(stillingEndepunkt('internStilling'), () =>
    HttpResponse.json(internStillingMock),
  ),
  http.get(stillingEndepunkt('minStilling'), () =>
    HttpResponse.json(mockMinStilling),
  ),
  http.get(stillingEndepunkt('minFormidling'), () =>
    HttpResponse.json(mockFormidling),
  ),
  http.get(stillingEndepunkt('eksternStilling'), () =>
    HttpResponse.json(mockEksternStilling),
  ),
  http.get(stillingEndepunkt('minEksternStilling'), () =>
    HttpResponse.json(mockMinEksternStilling),
  ),
  http.get(stillingEndepunkt('*'), () => HttpResponse.json(mockBaseStilling)),
];
