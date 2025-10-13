'use client';

/**
 * Endepunkt /useSynlighetsevaluering
 */
import { SynlighetsevalueringAPI } from '@/app/api/api-routes';
import { postApiWithSchema } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

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
  ErArbeidssøker = 'erArbeidssøker',
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

export const useSynlighetsevaluering = (fødselsnummer: string | null) =>
  useSWRImmutable(
    fødselsnummer
      ? {
          url: SynlighetsevalueringEndepunkt,
          body: {
            fnr: fødselsnummer,
          },
        }
      : null,
    (data) => postApiWithSchema(SynlighetsevalueringSchema)(data),
  );

export const synlighetsevalueringMSWHandler = http.post(
  SynlighetsevalueringEndepunkt,
  () =>
    HttpResponse.json({
      harAktivCv: false,
      harJobbprofil: false,
      harSettHjemmel: false,
      maaIkkeBehandleTidligereCv: false,
      erIkkeFritattKandidatsøk: false,
      erUnderOppfoelging: false,
      erArbeidssøker: false,
      erIkkeSperretAnsatt: true,
      erIkkeDoed: true,
      erFerdigBeregnet: true,
    }),
);
