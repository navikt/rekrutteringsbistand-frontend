'use client';

/**
 * Endepunkt /useMineKandidatlister
 */
import { KandidatAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const mineKandidatlisterEndepunkt = (pageNumber?: number) =>
  `${KandidatAPI.internUrl}/veileder/kandidatlister?pagesize=8${pageNumber && pageNumber > 1 ? `&pagenumber=${pageNumber}` : ''}`;

const MinKandidatListeSchema = z.object({
  kandidatlisteId: z.string(),
  tittel: z.string().nullable(),
  organisasjonReferanse: z.string().nullable(),
  organisasjonNavn: z.string().nullable(),
  stillingId: z.string(),
  opprettetTidspunkt: z.string(),
  antallKandidater: z.number(),
  kanEditere: z.boolean(),
  erEier: z.boolean(),
  kanSlette: z.string(),
  antallUsynligeKandidater: z.number(),
  status: z.string(),
  antallStillinger: z.number(),
  stillingskategori: z.string(),
});

const MineKandidatlisterSchema = z.object({
  liste: z.array(MinKandidatListeSchema),
  antall: z.number(),
});

export type MineKandidatlisterDTO = z.infer<typeof MineKandidatlisterSchema>;

export const useMineKandidatlister = (pageNumber: number) =>
  useSWRGet(mineKandidatlisterEndepunkt(pageNumber), MineKandidatlisterSchema);
