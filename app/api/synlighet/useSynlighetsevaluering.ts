'use client';
/**
 * Endepunkt /useSynlighetsevaluering
 */
import { Server } from 'miragejs/server';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { SynlighetsevalueringAPI } from '../api-routes';
import { postApiWithSchema } from '../fetcher';

const SynlighetsevalueringEndepunkt = `${SynlighetsevalueringAPI.internUrl}/evaluering`;

export enum KriterieUtenforNoensKontroll {
  ErIkkeSperretAnsatt = 'erIkkeSperretAnsatt',
  ErIkkeDød = 'erIkkeDoed',
}

export enum KravTilKandidaten {
  HarAktivCv = 'harAktivCv',
  HarJobbprofil = 'harJobbprofil',
  HarSettHjemmel = 'harSettHjemmel',
  MåIkkeBehandleTidligereCv = 'maaIkkeBehandleTidligereCv',
  ErUnderOppfølging = 'erUnderOppfoelging',
}

export enum KravTilVeileder {
  ErIkkeFritattKandidatsøk = 'erIkkeFritattKandidatsøk',
  HarRiktigFormidlingsgruppe = 'harRiktigFormidlingsgruppe',
}

export const SynlighetskriterieSchema = z.union([
  z.nativeEnum(KriterieUtenforNoensKontroll),
  z.nativeEnum(KravTilKandidaten),
  z.nativeEnum(KravTilVeileder),
]);

export const SynlighetsevalueringSchema = z.record(
  SynlighetskriterieSchema,
  z.boolean(),
);

export type SynlighetsevalueringDTO = z.infer<
  typeof SynlighetsevalueringSchema
>;

export const useSynlighetsevaluering = (fødselsnummer: string) =>
  useSWRImmutable(
    {
      url: SynlighetsevalueringEndepunkt,
      body: {
        fnr: fødselsnummer,
      },
    },
    (data) => postApiWithSchema(SynlighetsevalueringSchema)(data),
  );

export const synlighetsevalueringMirage = (server: Server) => {
  server.post(SynlighetsevalueringEndepunkt, () => {
    return {
      harAktivCv: false,
      harJobbprofil: false,
      harSettHjemmel: false,
      maaIkkeBehandleTidligereCv: false,
      erIkkeFritattKandidatsøk: false,
      erUnderOppfoelging: false,
      harRiktigFormidlingsgruppe: false,
      erIkkeSperretAnsatt: true,
      erIkkeDoed: true,
      erFerdigBeregnet: true,
    };
  });
};
