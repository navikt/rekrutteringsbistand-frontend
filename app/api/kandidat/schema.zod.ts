import { z } from 'zod';

export type kandidatlisteSchemaDTO = z.infer<typeof kandidatlisteSchema>;
export type utfallsendringerSchemaDTO = z.infer<typeof utfallsendringerSchema>;
export type kandidaterSchemaDTO = z.infer<typeof kandidaterSchema>;
export type kandidatHistorikkSchemaDTO = z.infer<
  typeof kandidatHistorikkSchema
>;

const utfallsendringerSchema = z.object({
  utfall: z.string(),
  registrertAvIdent: z.string(),
  tidspunkt: z.string(),
  sendtTilArbeidsgiversKandidatliste: z.boolean(),
});

const kandidaterSchema = z.object({
  kandidatId: z.string(),
  kandidatnr: z.string(),
  status: z.string(),
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
  arkivertTidspunkt: z.null(),
  arkivertAv: z.null(),
  aktørid: z.string(),
  utfallsendringer: z.array(utfallsendringerSchema),
});

export const kandidatlisteSchema = z.object({
  kandidatlisteId: z.string(),
  tittel: z.null(),
  organisasjonReferanse: z.string(),
  organisasjonNavn: z.string(),
  stillingId: z.string(),
  opprettetAv: z.object({ ident: z.string(), navn: z.string() }),
  opprettetTidspunkt: z.string(),
  kandidater: z.array(kandidaterSchema),
  kanEditere: z.boolean(),
  erEier: z.boolean(),
  kanSlette: z.string(),
  formidlingerAvUsynligKandidat: z.array(
    z.object({
      id: z.string(),
      fornavn: z.string(),
      mellomnavn: z.string().nullable(),
      etternavn: z.string(),
      utfall: z.string(),
      lagtTilAvIdent: z.string(),
      lagtTilAvNavn: z.string(),
      lagtTilTidspunkt: z.string(),
      arkivert: z.boolean(),
      arkivertAvIdent: z.null(),
      arkivertAvNavn: z.null(),
      arkivertTidspunkt: z.null(),
    }),
  ),
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
  status: z.string(),
  utfall: z.string(),
  uuid: z.string(),
  tittel: z.string(),
  organisasjonReferanse: z.null(),
  organisasjonNavn: z.string(),
  stillingId: z.string(),
  slettet: z.boolean(),
  utfallsendringer: z.array(
    z.object({
      utfall: z.string(),
      registrertAvIdent: z.string(),
      tidspunkt: z.string(),
      sendtTilArbeidsgiversKandidatliste: z.boolean(),
    }),
  ),
  stillingskategori: z.null(),
  opprettetAvIdent: z.string(),
  erMaskert: z.boolean(),
});
