import { z } from 'zod';
import {
  GeografiSchema,
  KategoriSchema,
} from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export const OmVirksomhetenSchema = z.object({
  beskrivelse: z.string(),
  employerhomepage: z.string().optional().nullable(),
  facebookpage: z.string().optional().nullable(),
  linkedinpage: z.string().optional().nullable(),
  twitteraddress: z.string().optional().nullable(),
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

export const AdresseLokasjonSchema = z
  .array(GeografiSchema)
  .optional()
  .nullable()
  .refine(
    (data) =>
      !data?.length || data.every((item) => item.postalCode && item.city),
    {
      message: 'Alle adresser må ha både postnummer og poststed',
    },
  );

// export const JanzzSchema = KategoriSchema.refine((data) => !!data.name, {
//   message: 'Yrkesklassifisering må velges',
//   path: ['name'],
// });

export const OmStillingenSchema = z
  .object({
    categoryList: z.array(KategoriSchema),
    beskrivelse: z.string().nullable(),
    adresseLokasjoner: AdresseLokasjonSchema,
    lokasjoner: z.array(GeografiSchema).optional().nullable(),
  })
  .refine(
    (data) => {
      const hasAdresseLokasjoner = (data.adresseLokasjoner ?? []).length > 0;
      const hasLokasjoner = (data.lokasjoner ?? []).length > 0;
      return hasAdresseLokasjoner || hasLokasjoner;
    },
    {
      message: 'Du må velge minst én lokasjon',
      path: ['lokasjoner'], // This will show the error on the lokasjoner field
    },
  );

export const PraktiskInfoSchema = z
  .object({
    sektor: z.string().min(1, 'Sektor må velges').nullable(),
    omfangKode: z.string().min(1, 'Omfang må velges'),
    omfangProsent: z.string().nullable(),
    antallStillinger: z.number().min(1, 'Må ha minst én stilling'),
    oppstart: z.string().nullable(),
    oppstartEtterAvtale: z.boolean(),
    søknadsfrist: z.string().nullable(),
    søknadsfristSnarest: z.boolean(),
    arbeidstidsordning: z.string().nullable(),
    ansettelsesform: z
      .string()
      .nullish()
      .refine((val) => val !== null && val !== '', {
        message: 'Ansettelsesform må velges',
      }),
    dager: z
      .array(z.string(), {
        required_error: 'Arbeidsdager må velges',
      })
      .min(1, 'Velg minst én arbeidsdag'),
    tid: z
      .array(z.string(), {
        required_error: 'Arbeidstid må velges',
      })
      .min(1, 'Velg minst én arbeidstid'),
  })
  .refine(
    (data) => {
      return data.omfangKode === 'Deltid' ? !!data.omfangProsent : true;
    },
    {
      message: 'Du må fylle ut omfang i prosent for deltid',
      path: ['omfangProsent'],
    },
  );

export const InnspurtSchema = z.object({
  publiseres: z.string().min(1, 'Publiseringsdato er påkrevd').nullable(),
  avsluttes: z.string().min(1, 'Avsluttingsdato er påkrevd').nullable(),
  stillingType: z.string().min(1, 'Stillingstype er påkrevd'),
  epost: z.string().email('Ugyldig e-postadresse').optional().nullable(),
  lenke: z.string().url('Ugyldig URL').optional().nullable(),
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
