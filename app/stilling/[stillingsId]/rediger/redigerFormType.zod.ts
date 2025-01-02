import { z } from 'zod';
import { stillingsTittelTreffSchema } from '../../../api/pam-ontologi/stillingsTittel/useStillingsTittel';
import { GeografiSchema } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export const OmVirksomhetenSchema = z.object({
  beskrivelse: z.string(),
  kontaktPersoner: z
    .array(
      z
        .object({
          name: z.string().min(1, 'Navn er påkrevd').nullable(),
          title: z.string().min(1, 'Tittel er påkrevd').nullable(),
          email: z
            .string()
            .refine(
              (val) => !val || /^[^@]+@[^@]+\.[^@]+$/.test(val),
              'Ugyldig e-postadresse',
            )
            .optional()
            .nullable(),
          phone: z
            .string()
            .refine(
              (val) => !val || val.length >= 8,
              'Telefonnummer må være minst 8 siffer',
            )
            .optional()
            .nullable(),
        })
        .refine(
          (data) => {
            return !!(data.email || data.phone);
          },
          {
            message: 'Du må fylle ut enten e-post eller telefonnummer',
            path: ['email'],
          },
        ),
    )
    .min(1, 'Minst én kontaktperson er påkrevd'),
});

export const OmTilretteleggingSchema = z.object({
  statligeInkluderingsdugnade: z.boolean().nullable(),
  tags: z.array(z.string()),
});

export const OmStillingenSchema = z.object({
  janzz: stillingsTittelTreffSchema,
  beskrivelse: z.string().nullable(),
  adresse: z.string().nullable(),
  locationList: z.array(GeografiSchema).nullable(),
  kommuneEllerLand: z.string().nullable(),
});

export const PraktiskInfoSchema = z.object({
  sektor: z.string(),
  antallStillinger: z.number().min(1, 'Må ha minst én stilling'),
  oppstart: z.string(),
  oppstartSnarest: z.boolean(),
  søknadsfrist: z.string(),
  søknadsfristEtterAvtale: z.boolean(),
  ansettelsesform: z.string().min(1, 'Ansettelsesform må velges'),
  dager: z.array(z.string()),
  tid: z.array(z.string()),
});

export const InnspurtSchema = z.object({
  publiseres: z.string(),
  avsluttes: z.string(),
  stillingType: z.string(),
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
