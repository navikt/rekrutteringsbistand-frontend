import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { z } from 'zod';

export enum Kandidatlistestatus {
  Åpen = 'ÅPEN',
  Lukket = 'LUKKET',
}

export type kandidatlisteSchemaDTO = z.infer<typeof kandidatlisteSchema>;
export type utfallsendringerSchemaDTO = z.infer<typeof utfallsendringerSchema>;
export type KandidatListeKandidatDTO = z.infer<typeof kandidaterSchema>;
export type usynligKandidaterSchemaDTO = z.infer<
  typeof usynligKandidaterSchema
>;
export type kandidatHistorikkSchemaDTO = z.infer<
  typeof kandidatHistorikkSchema
>;

const utfallsendringerSchema = z.object({
  utfall: z.string(),
  registrertAvIdent: z.string(),
  tidspunkt: z.string(),
  sendtTilArbeidsgiversKandidatliste: z.boolean(),
});

const usynligKandidaterSchema = z.object({
  id: z.string(),
  fornavn: z.string(),
  mellomnavn: z.string().nullable(),
  etternavn: z.string(),
  utfall: z.string(),
  lagtTilAvIdent: z.string(),
  lagtTilAvNavn: z.string(),
  lagtTilTidspunkt: z.string(),
  arkivert: z.boolean(),
  arkivertAvIdent: z.string().nullable(),
  arkivertAvNavn: z.string().nullable(),
  arkivertTidspunkt: z.string().nullable(),
});

const kandidaterSchema = z.object({
  kandidatId: z.string(),
  kandidatnr: z.string(),
  status: z.nativeEnum(InternKandidatstatus),
  lagtTilTidspunkt: z.string(),
  lagtTilAv: z.object({ ident: z.string(), navn: z.string() }),
  fornavn: z.string(),
  etternavn: z.string(),
  fodselsdato: z.string(),
  fodselsnr: z.string().nullable(),
  utfall: z.string(),
  telefon: z.string().nullable(),
  epost: z.string().nullable(),
  innsatsgruppe: z.string(),
  antallNotater: z.number(),
  arkivert: z.boolean(),
  arkivertTidspunkt: z.string().nullable(),
  arkivertAv: z.object({ ident: z.string(), navn: z.string() }).nullable(),
  aktørid: z.string().nullable(),
  utfallsendringer: z.array(utfallsendringerSchema),
});

export const kandidatlisteSchema = z.object({
  kandidatlisteId: z.string(),
  tittel: z.string().nullable(),
  organisasjonReferanse: z.string().nullable(),
  organisasjonNavn: z.string().nullable(),
  stillingId: z.string(),
  opprettetAv: z.object({ ident: z.string(), navn: z.string() }),
  opprettetTidspunkt: z.string(),
  kandidater: z.array(kandidaterSchema),
  kanEditere: z.boolean(),
  erEier: z.boolean(),
  kanSlette: z.string(),
  formidlingerAvUsynligKandidat: z.array(usynligKandidaterSchema),
  status: z.string(),
  antallStillinger: z.number(),
  stillingskategori: z.string(),
});

export const kandidatHistorikkSchema = z.object({
  kandidatnr: z.string(),
  fornavn: z.string(),
  etternavn: z.string(),
  lagtTilTidspunkt: z.string(),
  lagtTilAvIdent: z.string(),
  lagtTilAvEpost: z.string(),
  lagtTilAvNavn: z.string(),
  status: z.nativeEnum(InternKandidatstatus),
  utfall: z.string(),
  uuid: z.string(),
  tittel: z.string().nullable(),
  organisasjonReferanse: z.string().nullable(),
  organisasjonNavn: z.string().nullable(),
  stillingId: z.string().nullable(),
  slettet: z.boolean(),
  utfallsendringer: z.array(
    z.object({
      utfall: z.string(),
      registrertAvIdent: z.string(),
      tidspunkt: z.string(),
      sendtTilArbeidsgiversKandidatliste: z.boolean(),
    }),
  ),
  stillingskategori: z.string().nullable(),
  opprettetAvIdent: z.string(),
  erMaskert: z.boolean().optional().nullable(),
});
