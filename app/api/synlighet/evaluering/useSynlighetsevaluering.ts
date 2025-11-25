'use client';

/**
 * Endepunkt /useSynlighetsevaluering
 */
import { SynlighetsevalueringAPI } from '@/app/api/api-routes';
import { useSWRPost } from '@/app/api/useSWRPost';
import { http, HttpResponse } from 'msw';
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

const ekstraSynlighetskriterier = [
  'harRiktigFormidlingsgruppe',
  'erFerdigBeregnet',
] as const;

const EkstraSynlighetskriterierSchema = z.enum(ekstraSynlighetskriterier);

export const SynlighetskriterieSchema = z.union([
  z.nativeEnum(KriterieUtenforNoensKontroll),
  z.nativeEnum(KravTilKandidaten),
  z.nativeEnum(KravTilVeileder),
  EkstraSynlighetskriterierSchema,
]);

export const SynlighetsevalueringSchema = z.record(
  SynlighetskriterieSchema,
  z.boolean().nullish(),
);

export type SynlighetsevalueringDTO = z.infer<
  typeof SynlighetsevalueringSchema
>;

export const useSynlighetsevaluering = (fødselsnummer: string | null) =>
  useSWRPost(
    fødselsnummer ? SynlighetsevalueringEndepunkt : null,
    SynlighetsevalueringSchema,
    fødselsnummer
      ? {
          fnr: fødselsnummer,
        }
      : null,
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
