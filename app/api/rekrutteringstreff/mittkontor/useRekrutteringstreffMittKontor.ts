'use client';

/**
 * Endepunkt /rekrutteringstreff/mittkontor
 * Returnerer rekrutteringstreff for brukerens kontor
 */
import { rekrutteringstreffMittKontorMock } from './useRekrutteringstreffMittKontorMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  RekrutteringstreffOversiktDTO,
  RekrutteringstreffOversiktSchema,
} from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';

export const rekrutteringstreffMittKontorEndepunkt = () =>
  `${RekrutteringstreffAPI.internUrl}/mittkontor`;

export const useRekrutteringstreffMittKontor = () =>
  useSWRGet<RekrutteringstreffOversiktDTO>(
    rekrutteringstreffMittKontorEndepunkt(),
    RekrutteringstreffOversiktSchema,
  );

export const rekrutteringstreffMittKontorMSWHandler = http.get(
  `${RekrutteringstreffAPI.internUrl}/mittkontor`,
  () => HttpResponse.json(rekrutteringstreffMittKontorMock),
);
