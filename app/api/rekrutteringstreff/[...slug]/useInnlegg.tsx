'use client';

import { RekrutteringstreffAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { innleggMock } from './mocks/InnleggMock';
import useSWR from 'swr';
import { z } from 'zod';

export const innleggEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/innlegg`;

export const InnleggSchema = z.object({
  id: z.string(),
  treffId: z.string(),
  tittel: z.string(),
  opprettetAvPersonNavident: z.string(),
  opprettetAvPersonNavn: z.string(),
  opprettetAvPersonBeskrivelse: z.string(),
  sendesTilJobbsokerTidspunkt: z.string().nullable(),
  htmlContent: z.string(),
  opprettetTidspunkt: z.string(),
  sistOppdatertTidspunkt: z.string(),
});

const InnleggListeSchema = z.array(InnleggSchema);

export type InnleggDTO = z.infer<typeof InnleggSchema>;
export type InnleggListeDTO = z.infer<typeof InnleggListeSchema>;

export const useInnlegg = (id: string) =>
  useSWR(innleggEndepunkt(id), getAPIwithSchema(InnleggListeSchema));

export const innleggMirage = (server: any) =>
  server.get(innleggEndepunkt('*'), () => innleggMock);
