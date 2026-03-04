'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  RekrutteringstreffOversiktDTO,
  RekrutteringstreffOversiktSchema,
} from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { useSWRGet } from '@/app/api/useSWRGet';

/**
 * Endepunkt /rekrutteringstreff/mittkontor
 * Returnerer rekrutteringstreff for brukerens kontor
 */

export const rekrutteringstreffMittKontorEndepunkt = () =>
  `${RekrutteringstreffAPI.internUrl}/mittkontor`;

export const useRekrutteringstreffMittKontor = () =>
  useSWRGet<RekrutteringstreffOversiktDTO>(
    rekrutteringstreffMittKontorEndepunkt(),
    RekrutteringstreffOversiktSchema,
  );
