'use client';

/**
 * Endepunkt /useMineKandidatlister
 */
import { KandidatAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import { Server } from 'miragejs';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const mineKandidatlisterEndepunkt = (pageNumber?: number) =>
  `${KandidatAPI.internUrl}/veileder/kandidatlister?pagesize=8${pageNumber && pageNumber > 1 ? `&pagenumber=${pageNumber}` : ''}`;

const MinKandidatListeSchema = z.object({
  kandidatlisteId: z.string(),
  tittel: z.string().nullable(),
  organisasjonReferanse: z.string(),
  organisasjonNavn: z.string(),
  stillingId: z.string(),
  opprettetAv: z.object({ ident: z.string(), navn: z.string() }),
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
  useSWRImmutable(
    mineKandidatlisterEndepunkt(pageNumber),
    getAPIwithSchema(MineKandidatlisterSchema),
  );

export const mineKandidatlisterMirage = (server: Server) => {
  server.get(`${KandidatAPI.internUrl}/veileder/kandidatlister`, () => {
    return {
      liste: [
        {
          kandidatlisteId: '4e61831a-38e0-4d5b-ab0c-ffda4a0aa729',
          tittel: 'Stilling tittel 1',
          organisasjonReferanse: '824391122',
          organisasjonNavn: 'TEST.NO',
          stillingId: '3d0a4bec-f7b0-434b-a22e-d681504124e7',
          opprettetAv: {
            ident: 'TestIdent',
            navn: 'F_993141 E_993141',
          },
          opprettetTidspunkt: '2025-02-18T14:55:47.305',
          antallKandidater: 0,
          kanEditere: true,
          erEier: true,
          kanSlette: 'HAR_STILLING',
          antallUsynligeKandidater: 0,
          status: 'ÅPEN',
          antallStillinger: 1,
          stillingskategori: 'FORMIDLING',
        },
      ],
      antall: 88,
    };
  });
};
