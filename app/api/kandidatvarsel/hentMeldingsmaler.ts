/**
 * Endepunkt /api/meldingsmal
 */
import { KandidatvarselAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';
import z from 'zod';

const hentMeldingsmalerEndepunkt = `${KandidatvarselAPI.internUrl}/meldingsmal/stilling`;
const hentRekrutteringstreffMeldingsmalerEndepunkt = `${KandidatvarselAPI.internUrl}/meldingsmal/rekrutteringstreff`;

const VurdertSomAktuellSchema = z.object({
  smsTekst: z.string(),
  epostTittel: z.string(),
  epostHtmlBody: z.string(),
});

const PassendeStillingSchema = z.object({
  smsTekst: z.string(),
  epostTittel: z.string(),
  epostHtmlBody: z.string(),
});

const PassendeJobbarrangementSchema = z.object({
  smsTekst: z.string(),
  epostTittel: z.string(),
  epostHtmlBody: z.string(),
});

const KandidatInvitertTreffSchema = z.object({
  smsTekst: z.string(),
  epostTittel: z.string(),
  epostHtmlBody: z.string(),
});

const KandidatInvitertTreffEndretSchema = z.object({
  smsTekst: z.string(),
  epostTittel: z.string(),
  epostHtmlBody: z.string(),
});

const MeldingsmalerDTOSchema = z.object({
  vurdertSomAktuell: VurdertSomAktuellSchema,
  passendeStilling: PassendeStillingSchema,
  passendeJobbarrangement: PassendeJobbarrangementSchema,
});

const RekrutteringstreffMeldingsmalerDTOSchema = z.object({
  kandidatInvitertTreff: KandidatInvitertTreffSchema,
  kandidatInvitertTreffEndret: KandidatInvitertTreffEndretSchema,
});

export type MeldingsmalerDTO = z.infer<typeof MeldingsmalerDTOSchema>;
export type RekrutteringstreffMeldingsmalerDTO = z.infer<
  typeof RekrutteringstreffMeldingsmalerDTOSchema
>;

export const useHentMeldingsmaler = () =>
  useSWRGet(hentMeldingsmalerEndepunkt, MeldingsmalerDTOSchema);

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
      'Hei! Du er invitert til et rekrutteringstreff. Logg inn på Nav for å se detaljer. Vennlig hilsen Nav',
    epostTittel: 'Invitasjon til rekrutteringstreff',
    epostHtmlBody:
      '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Hei!</p><p>Du er invitert til et rekrutteringstreff. Logg inn på Nav for å se detaljer.</p><p>Vennlig hilsen</p><p>Nav</p></body></html>',
  },
  kandidatInvitertTreffEndret: {
    smsTekst:
      'Hei! Det er endringer i rekrutteringstreffet du er invitert til. Logg inn på Nav for å se detaljer. Vennlig hilsen Nav',
    epostTittel: 'Endring i rekrutteringstreff',
    epostHtmlBody:
      '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Hei!</p><p>Det er endringer i rekrutteringstreffet du er invitert til. Logg inn på Nav for å se detaljer.</p><p>Vennlig hilsen</p><p>Nav</p></body></html>',
  },
};

export const meldingsmalerStiillingMSWHandler = http.get(
  hentMeldingsmalerEndepunkt,
  () => HttpResponse.json(hentMeldingsmalerStillingMock),
);

export const meldingsmalerRekrutteringstreffMSWHandler = http.get(
  hentRekrutteringstreffMeldingsmalerEndepunkt,
  () => HttpResponse.json(hentRekrutteringstreffMeldingsmalerMock),
);
