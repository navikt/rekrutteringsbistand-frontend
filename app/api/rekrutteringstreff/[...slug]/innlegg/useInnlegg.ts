'use client';

import { innleggMock } from './innleggMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';

// Schemas
export const InnleggSchema = z.object({
  id: z.string(),
  treffId: z.string(),
  tittel: z.string(),
  opprettetAvPersonNavident: z.string(),
  opprettetAvPersonNavn: z.string().optional().nullable(),
  opprettetAvPersonBeskrivelse: z.string(),
  sendesTilJobbsokerTidspunkt: z.string().nullable(),
  htmlContent: z.string(),
  opprettetTidspunkt: z.string(),
  sistOppdatertTidspunkt: z.string(),
});

export const InnleggListeSchema = z.array(InnleggSchema);

// DTOs
export type InnleggDTO = z.infer<typeof InnleggSchema>;
export type InnleggListeDTO = z.infer<typeof InnleggListeSchema>;

export const innleggEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/innlegg`;

export const useInnlegg = (id: string) =>
  useSWR(innleggEndepunkt(id), getAPIwithSchema(InnleggListeSchema));

export const innleggMSWHandler = http.get(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/innlegg`,
  () => HttpResponse.json(innleggMock),
);
