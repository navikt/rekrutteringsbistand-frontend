/**
 * Endepunkt /api/meldingsmal
 */
import { KandidatvarselAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import z from 'zod';

const hentRekrutteringstreffMeldingsmalerEndepunkt = `${KandidatvarselAPI.internUrl}/meldingsmal/rekrutteringstreff`;

const MeldingSchema = z.object({
  smsTekst: z.string(),
  epostTittel: z.string(),
  epostHtmlBody: z.string(),
});

const RekrutteringstreffMeldingsmalerDTOSchema = z.object({
  kandidatInvitertTreff: MeldingSchema,
  kandidatInvitertTreffEndret: MeldingSchema,
  kandidatInvitertWorkOp: MeldingSchema,
  kandidatInvitertWorkOpEndret: MeldingSchema,
});

export type RekrutteringstreffMeldingsmalerDTO = z.infer<
  typeof RekrutteringstreffMeldingsmalerDTOSchema
>;

/** WorkOp har egne tekster i SMS og e-post. */
export const meldingsmalerForTreff = (
  maler: RekrutteringstreffMeldingsmalerDTO,
  erWorkOp: boolean,
) => ({
  invitert: erWorkOp
    ? maler.kandidatInvitertWorkOp
    : maler.kandidatInvitertTreff,
  endret: erWorkOp
    ? maler.kandidatInvitertWorkOpEndret
    : maler.kandidatInvitertTreffEndret,
});

export const useHentRekrutteringstreffMeldingsmaler = () =>
  useSWRGet(
    hentRekrutteringstreffMeldingsmalerEndepunkt,
    RekrutteringstreffMeldingsmalerDTOSchema,
  );

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
      'Det har skjedd endringer på et treff med arbeidsgivere som du er invitert til:\n\n{{ENDRINGER}}\n\nLogg inn på Nav for mer informasjon.\n\nVennlig hilsen Nav',
    epostTittel: 'Endringer på treff du er invitert til',
    epostHtmlBody:
      '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Det har skjedd endringer på et treff med arbeidsgivere som du er invitert til:</p><p>{{ENDRINGER}}</p><p>Logg inn på Nav for mer informasjon.</p><p>Vennlig hilsen</p><p>Nav</p></body></html>',
  },
  kandidatInvitertWorkOp: {
    smsTekst:
      'Hei! Du er invitert til en WorkOp der du kan møte arbeidsgivere. Logg inn på Nav for å svare JA eller NEI på om du planlegger å delta. Vennlig hilsen Nav',
    epostTittel: 'Invitasjon til å treffe arbeidsgivere',
    epostHtmlBody:
      '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Hei! Du er invitert til en WorkOp der du kan møte arbeidsgivere. Logg inn på Nav for å svare JA eller NEI på om du planlegger å delta. Åpne kortet for å lese om WorkOp-en og svarfristen.</p><p>Vennlig hilsen</p><p>Nav</p></body></html>',
  },
  kandidatInvitertWorkOpEndret: {
    smsTekst:
      'Det er endringer i en WorkOp du er invitert til: {{ENDRINGER}}. Logg inn på Nav for å se detaljer.',
    epostTittel: 'Endringer på WorkOp du er invitert til',
    epostHtmlBody:
      '<!DOCTYPE html><html><head><title>Melding</title></head><body><p>Det har skjedd endringer på en WorkOp med arbeidsgivere som du er invitert til:</p><p>{{ENDRINGER}}</p><p>Logg inn på Nav for mer informasjon.</p><p>Vennlig hilsen</p><p>Nav</p></body></html>',
  },
};

export const meldingsmalerRekrutteringstreffMSWHandler = getMock(
  hentRekrutteringstreffMeldingsmalerEndepunkt,
  () => HttpResponse.json(hentRekrutteringstreffMeldingsmalerMock),
);
