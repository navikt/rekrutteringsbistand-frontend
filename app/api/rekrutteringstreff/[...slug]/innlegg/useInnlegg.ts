'use client';

import { innleggMock } from '../mocks/innleggMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import useSWR from 'swr';
import { z } from 'zod';

export const innleggEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/innlegg`;

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

export type InnleggDTO = z.infer<typeof InnleggSchema>;
export type InnleggListeDTO = z.infer<typeof InnleggListeSchema>;

export const useInnlegg = (id: string) =>
  useSWR(innleggEndepunkt(id), getAPIwithSchema(InnleggListeSchema));

export const innleggMirage = (server: any) =>
  server.get(innleggEndepunkt('*'), () => innleggMock);
