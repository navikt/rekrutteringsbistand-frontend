'use client';

import { arbeidsgivereMock } from './mocks/arbeidsgivereMock';
import {
  ArbeidsgiverDTO,
  ArbeidsgivereDTO,
  ArbeidsgivereSchema,
  ArbeidsgiverHendelseDTO,
} from './schemas';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import useSWR from 'swr';

export type { ArbeidsgiverDTO, ArbeidsgivereDTO, ArbeidsgiverHendelseDTO };

export const rekrutteringstreffArbeidsgivereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/arbeidsgiver`;

export const useRekrutteringstreffArbeidsgivere = (id: string) => {
  return useSWR(
    rekrutteringstreffArbeidsgivereEndepunkt(id),
    getAPIwithSchema(ArbeidsgivereSchema),
  );
};

export const rekrutteringstreffArbeidsgivereMirage = (server: any) => {
  return server.get(rekrutteringstreffArbeidsgivereEndepunkt('*'), () =>
    arbeidsgivereMock(),
  );
};
