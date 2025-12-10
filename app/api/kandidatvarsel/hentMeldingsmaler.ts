/**
 * Endepunkt /api/meldingsmal
 */
import { KandidatvarselAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';
import z from 'zod';

const hentStillingMeldingsmalerEndepunkt = `${KandidatvarselAPI.internUrl}/meldingsmal/stilling`;
const hentRekrutteringstreffMeldingsmalerEndepunkt = `${KandidatvarselAPI.internUrl}/meldingsmal/rekrutteringstreff`;

const MeldingSchema = z.object({
  smsTekst: z.string(),
  epostTittel: z.string(),
  epostHtmlBody: z.string(),
});

const MeldingsmalerDTOSchema = z.object({
  vurdertSomAktuell: MeldingSchema,
  passendeStilling: MeldingSchema,
  passendeJobbarrangement: MeldingSchema,
});

const RekrutteringstreffMeldingsmalerDTOSchema = z.object({
  kandidatInvitertTreff: MeldingSchema,
  kandidatInvitertTreffEndret: MeldingSchema,
});

export type MeldingsmalerDTO = z.infer<typeof MeldingsmalerDTOSchema>;
export type RekrutteringstreffMeldingsmalerDTO = z.infer<
  typeof RekrutteringstreffMeldingsmalerDTOSchema
>;

export const useHentMeldingsmaler = () =>
  useSWRGet(hentStillingMeldingsmalerEndepunkt, MeldingsmalerDTOSchema);

export const useHentRekrutteringstreffMeldingsmaler = () =>
  useSWRGet(
    hentRekrutteringstreffMeldingsmalerEndepunkt,
    RekrutteringstreffMeldingsmalerDTOSchema,
  );

const hentMeldingsmalerStillingMock = {
  vurdertSomAktuell: {
    smsTekst:
      'Hei! Vi har vurdert at kompetansen din kan passe til en stilling. Logg inn på Nav for å se stillingen. Vennlig hilsen Nav',
    epostTittel: 'Stilling som kan passe for deg?',
    epostHtmlBody:
      '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Hei!</p><p>Vi har vurdert at kompetansen din kan passe til en stilling. Logg inn på Nav for å se stillingen.</p><p>Vennlig hilsen</p><p>Nav</p></body></html>',
  },
  passendeStilling: {
    smsTekst:
      'Hei! Vi har funnet en stilling som kan passe deg. Logg inn på Nav for å se stillingen. Vennlig hilsen Nav',
    epostTittel: 'Stilling som kan passe for deg?',
    epostHtmlBody:
      '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Hei!</p><p>Vi har funnet en stilling som kanskje kan passe for deg. Logg inn på Nav for å se stillingen.</p><p>Vennlig hilsen</p><p>Nav</p></body></html>',
  },
  passendeJobbarrangement: {
    smsTekst:
      'Hei! Vi har funnet et jobbarrangement som kanskje passer for deg. Logg inn på Nav for å se arrangementet. Vennlig hilsen Nav',
    epostTittel: 'Jobbarrangement',
    epostHtmlBody:
      '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Hei!</p><p>Vi har funnet et jobbarrangement som kanskje passer for deg. Logg inn på Nav for å se arrangementet.</p><p>Vennlig hilsen</p><p>Nav</p></body></html>',
  },
};

const hentRekrutteringstreffMeldingsmalerMock = {
  kandidatInvitertTreff: {
    smsTekst:
      'Hei! Du er invitert til et treff der du kan møte arbeidsgivere. Logg inn på Nav for å melde deg på. Vennlig hilsen Nav',
    epostTittel: 'Invitasjon til å treffe arbeidsgivere',
    epostHtmlBody:
      '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Hei! Du er invitert til et treff der du kan møte arbeidsgivere. Logg inn på Nav for å melde deg på.</p><p>Vennlig hilsen</p><p>Nav</p></body></html>',
  },
  kandidatInvitertTreffEndret: {
    smsTekst:
      'Det har skjedd endringer på et treff med arbeidsgivere som du er invitert til:\n\n{{ENDRINGER}}\n\nLogg inn på Nav for mer informasjon.\n\nVennlig hilsen Nav.',
    epostTittel: 'Endringer på treff du er invitert til',
    epostHtmlBody:
      '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Det har skjedd endringer på et treff med arbeidsgivere som du er invitert til:</p><p>{{ENDRINGER}}</p><p>Logg inn på Nav for mer informasjon.</p><p>Vennlig hilsen</p><p>Nav</p></body></html>',
  },
};

export const meldingsmalerStillingMSWHandler = http.get(
  hentStillingMeldingsmalerEndepunkt,
  () => HttpResponse.json(hentMeldingsmalerStillingMock),
);

export const meldingsmalerRekrutteringstreffMSWHandler = http.get(
  hentRekrutteringstreffMeldingsmalerEndepunkt,
  () => HttpResponse.json(hentRekrutteringstreffMeldingsmalerMock),
);
