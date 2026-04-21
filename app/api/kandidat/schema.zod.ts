import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { z } from 'zod';

export enum Kandidatlistestatus {
  Åpen = 'ÅPEN',
  Lukket = 'LUKKET',
}

export type kandidaterPaginertSchemaDTO = z.infer<
  typeof kandidaterPaginertSchema
>;
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
  arkivert: z.boolean(),
  arkivertTidspunkt: z.string().nullable(),
  arkivertAv: z.object({ ident: z.string(), navn: z.string() }).nullable(),
  aktørid: z.string().nullable(),
  utfallsendringer: z.array(utfallsendringerSchema),
});

export const kandidaterPaginertSchema = z.object({
  totaltAntallKandidater: z.number(),
  kandidater: z.array(kandidaterSchema),
  formidlingerAvUsynligKandidat: z.array(usynligKandidaterSchema),
});

const forespørselOmDelingAvCvSchema = z.object({
  aktørId: z.string(),
  stillingsId: z.string(),
  deltStatus: z.string(),
  deltTidspunkt: z.string(),
  deltAv: z.string(),
  svarfrist: z.string(),
  tilstand: z.string().nullable(),
  svar: z
    .object({
      harSvartJa: z.boolean(),
      svarTidspunkt: z.string().optional(),
      svartAv: z
        .object({
          ident: z.string(),
          identType: z.string(),
        })
        .optional(),
    })
    .nullable(),
});

export type ForespørselOmDelingAvCvDTO = z.infer<
  typeof forespørselOmDelingAvCvSchema
>;

const varselSchema = z.object({
  id: z.string().optional(),
  opprettet: z.string().optional(),
  stillingId: z.string().optional(),
  mottakerFnr: z.string().optional(),
  avsenderNavident: z.string().optional(),
  minsideStatus: z.string().optional(),
  eksternStatus: z.string().optional(),
  eksternFeilmelding: z.string().nullable().optional(),
  eksternKanal: z.string().nullable().optional(),
});

export type VarselDTO = z.infer<typeof varselSchema>;

const kandidatPersonSchema = z.object({
  kandidat: kandidaterSchema,
  formidlingerAvUsynligKandidat: usynligKandidaterSchema.nullable(),
  forespørslerOmDelingAvCver: z.array(forespørselOmDelingAvCvSchema),
  varsler: z.array(varselSchema),
});

export type KandidatPersonDTO = z.infer<typeof kandidatPersonSchema>;

const antallPerKategoriPerFilterSchema = z.object({
  internStatus: z.record(z.string(), z.number()),
  visSlettede: z.record(z.string(), z.number()),
  kandidatlisteHendelseType: z.record(z.string(), z.number()),
});

export const kandidatlisteKandidaterResponseSchema = z.object({
  totaltAntallKandidater: z.number(),
  kandidatPersoner: z.array(kandidatPersonSchema),
  antallPerKategoriPerFilter: antallPerKategoriPerFilterSchema,
});

export type KandidatlisteKandidaterResponseDTO = z.infer<
  typeof kandidatlisteKandidaterResponseSchema
>;

export type AntallPerKategoriPerFilterDTO = z.infer<
  typeof antallPerKategoriPerFilterSchema
>;

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
  erMaskert: z.boolean().optional().nullable(),
});
