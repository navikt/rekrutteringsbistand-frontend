import { z } from 'zod';

export const OmVirksomhetenSchema = z.object({
  beskrivelse: z.string(),
  kontaktPersoner: z
    .array(
      z.object({
        name: z.string().min(1, 'Navn er påkrevd').nullable(),
        title: z.string().min(1, 'Tittel er påkrevd').nullable(),
        email: z.string().email('Ugyldig e-postadresse').nullable(),
        phone: z
          .string()
          .min(8, 'Telefonnummer må være minst 8 siffer')
          .nullable(),
      }),
    )
    .min(1, 'Minst én kontaktperson er påkrevd'),
});

export const OmTilretteleggingSchema = z.object({
  statligeInkluderingsdugnade: z.boolean().nullable(),
  tags: z.array(z.string()),
});

export const OmStillingenSchema = z.object({
  tittel: z.string().min(1, 'Tittel er påkrevd'),
  beskrivelse: z.string().min(1, 'Beskrivelse er påkrevd'),
  arbeidssted: z.object({
    adresse: z.string().nullable(),
    kommuneEllerLand: z.string().nullable(),
  }),
});

export const PraktiskInfoSchema = z.object({
  sektor: z.string(),
  antallStillinger: z.number().min(1, 'Må ha minst én stilling'),
  oppstart: z.string(),
  oppstartSnarest: z.boolean(),
  søknadsfrist: z.string(),
  søknadsfristEtterAvtale: z.boolean(),
  ansettelsesform: z.string(),
  dager: z.array(z.string()),
  tid: z.array(z.string()),
});

export const InnspurtSchema = z.object({
  publiseres: z.string().nullable(),
  avsluttes: z.string().nullable(),
  stillingType: z.string().nullable(),
});

export const StillingsDataFormSchema = z.object({
  omVirksomheten: OmVirksomhetenSchema,
  omTilrettelegging: OmTilretteleggingSchema,
  omStillingen: OmStillingenSchema,
  praktiskInfo: PraktiskInfoSchema,
  innspurt: InnspurtSchema,
});

export type OmVirksomhetenType = z.infer<typeof OmVirksomhetenSchema>;
export type OmStillingenType = z.infer<typeof OmStillingenSchema>;
export type PraktiskInfoType = z.infer<typeof PraktiskInfoSchema>;
export type OmTilretteleggingType = z.infer<typeof OmTilretteleggingSchema>;
export type InnspurtType = z.infer<typeof InnspurtSchema>;

export interface StillingsDataForm {
  omVirksomheten: OmVirksomhetenType;
  omTilrettelegging: OmTilretteleggingType;
  omStillingen: OmStillingenType;
  praktiskInfo: PraktiskInfoType;
  innspurt: InnspurtType;
}
