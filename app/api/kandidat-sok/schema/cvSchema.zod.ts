import { z } from 'zod';
import { AnnenErfaringSchema } from './annenErfaringSchema.zod';
import { AnsettelsesformJobbonskerSchema } from './ansettelsesformJobbonskerSchema.zod';
import { ArbeidsdagerJobbonskerSchema } from './arbeidsdagerJobbonskerSchema.zod';
import { ArbeidstidJobbonskerSchema } from './arbeidstidJobbonskerSchema.zod';
import { ArbeidstidsordningJobbonskerSchema } from './arbeidstidsordningJobbonskerShema.zod';
import { FagdokumentasjonSchema } from './fagdokumentasjonSchema.zod';
import { ForerkortSchema } from './forerkortSchema.zod';
import { GeografiJobbonskerSchema } from './geografiJobbonskerSchema.zod';
import { GodkjenningSchema } from './godkjenningSchema.zod';
import { KompetanseSchema } from './kompetanseSchema.zod';
import { KursSchema } from './kursSchema.zod';
import { OmfangJobbonskerSchema } from './omfangJobbonskerSchema.zod';
import { SamletKompetanseSchema } from './samletKompetanseSchema.zod';
import { SertifikatSchema } from './sertifikatSchema.zod';
import { SprakSchema } from './sprakSchema.zod';
import { UtdanningSchema } from './utdanningSchema.zod';
import { VervSchema } from './vervSchema.zod';
import { YrkejobbOnskerSchema } from './yrkejobbOnskerSchema.zod';
import { YrkesErfaringSchema } from './yrkesErfaringSchema.zod';

export type KandidatDataSchemaDTO = z.infer<typeof KandidatDataSchema>;

const KandidatDataSchema = z.object({
  fritekst: z.string().nullable().optional(),
  aktorId: z.string().nullable().optional(),
  fodselsnummer: z.string().nullable().optional(),
  fornavn: z.string().nullable().optional(),
  etternavn: z.string().nullable().optional(),
  fodselsdato: z.string().nullable().optional(), // Date as ISO string
  fodselsdatoErDnr: z.boolean().nullable().optional(),
  formidlingsgruppekode: z.string().nullable().optional(),
  epostadresse: z.string().nullable().optional(),
  mobiltelefon: z.string().nullable().optional(),
  harKontaktinformasjon: z.boolean().optional().default(false),
  telefon: z.string().nullable().optional(),
  statsborgerskap: z.string().nullable().optional(),
  kandidatnr: z.string().nullable().optional(),
  arenaKandidatnr: z.string().nullable().optional(),
  beskrivelse: z.string().nullable().optional(),
  samtykkeStatus: z.string().nullable().optional(),
  samtykkeDato: z.string().nullable().optional(), // Date as ISO string
  adresselinje1: z.string().nullable().optional(),
  adresselinje2: z.string().nullable().optional(),
  adresselinje3: z.string().nullable().optional(),
  postnummer: z.string().nullable().optional(),
  poststed: z.string().nullable().optional(),
  landkode: z.string().nullable().optional(),
  kommunenummer: z.number().nullable().optional(),
  kommunenummerkw: z.number().nullable().optional(),
  kommunenummerstring: z.string().nullable().optional(),
  fylkeNavn: z.string().nullable().optional(),
  kommuneNavn: z.string().nullable().optional(),
  disponererBil: z.boolean().nullable().optional(),
  tidsstempel: z.string().nullable().optional(), // Date as ISO string
  doed: z.boolean().nullable().optional(),
  frKode: z.string().nullable().optional(),
  kvalifiseringsgruppekode: z.string().nullable().optional(),
  hovedmaalkode: z.string().nullable().optional(),
  orgenhet: z.string().nullable().optional(),
  navkontor: z.string().nullable().optional(),
  fritattKandidatsok: z.boolean().nullable().optional(),
  fritattAgKandidatsok: z.boolean().nullable().optional(),
  utdanning: z.array(UtdanningSchema).nullable().optional(),
  fagdokumentasjon: z.array(FagdokumentasjonSchema).nullable().optional(),
  yrkeserfaring: z.array(YrkesErfaringSchema).nullable().optional(),
  kompetanseObj: z.array(KompetanseSchema).nullable().optional(),
  annenerfaringObj: z.array(AnnenErfaringSchema).nullable().optional(),
  sertifikatObj: z.array(SertifikatSchema).nullable().optional(),
  forerkort: z.array(ForerkortSchema).nullable().optional(),
  sprak: z.array(SprakSchema).nullable().optional(),
  kursObj: z.array(KursSchema).nullable().optional(),
  vervObj: z.array(VervSchema).nullable().optional(),
  geografiJobbonsker: z.array(GeografiJobbonskerSchema).nullable().optional(),
  yrkeJobbonskerObj: z.array(YrkejobbOnskerSchema).nullable().optional(),
  omfangJobbonskerObj: z.array(OmfangJobbonskerSchema).nullable().optional(),
  ansettelsesformJobbonskerObj: z
    .array(AnsettelsesformJobbonskerSchema)
    .nullable()
    .optional(),
  arbeidstidsordningJobbonskerObj: z
    .array(ArbeidstidsordningJobbonskerSchema)
    .nullable()
    .optional(),
  arbeidsdagerJobbonskerObj: z
    .array(ArbeidsdagerJobbonskerSchema)
    .nullable()
    .optional(),
  arbeidstidJobbonskerObj: z
    .array(ArbeidstidJobbonskerSchema)
    .nullable()
    .optional(),
  samletKompetanseObj: z.array(SamletKompetanseSchema).nullable().optional(),
  totalLengdeYrkeserfaring: z.number().optional().default(0),
  synligForArbeidsgiverSok: z.boolean().nullable().optional(),
  synligForVeilederSok: z.boolean().optional(),
  oppstartKode: z.string().nullable().optional(),
  veileder: z.string().nullable().optional(),
  veilederIdent: z.string().nullable().optional(),
  veilederVisningsnavn: z.string().nullable().optional(),
  veilederEpost: z.string().nullable().optional(),
  godkjenninger: z.array(GodkjenningSchema).nullable().optional(),
  // perioderMedInaktivitet: PerioderMedInaktivitetSchema.nullable().optional(),
});

export { KandidatDataSchema };
