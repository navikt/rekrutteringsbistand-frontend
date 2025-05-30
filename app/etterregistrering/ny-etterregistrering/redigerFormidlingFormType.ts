import { navnSchema } from '../../api/kandidat-sok/useKandidatNavn';
import { ArbeidsgiverSchema } from '../../api/pam-search/underenhet/useArbeidsgiver';
import {
  KategoriSchema,
  LocationSchema,
} from '../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { OmTilretteleggingSchema } from '../../stilling/[stillingsId]/rediger/redigerFormType.zod';
import { z } from 'zod';

export const FormidlingKandidatSchema = z.object({
  fnr: z.string(),
  navn: navnSchema,
});

export const OmFormidlingSchema = z
  .object({
    organisasjon: ArbeidsgiverSchema.optional()
      .nullable()
      .superRefine((val, ctx) => {
        if (!val) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Du må velge en arbeidsgiver',
          });
        }
      }),
    categoryList: z
      .array(KategoriSchema)
      .optional()
      .nullable()
      .superRefine((val, ctx) => {
        if (!val) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Du må velge en yrkeskategori',
          });
        }
      }),
    sektor: z
      .string()
      .optional()
      .nullable()
      .superRefine((val, ctx) => {
        if (!val) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Du må velge sektor',
          });
        }
      }),
    ansettelsesform: z
      .string({
        required_error: 'Du må velge ansettelsesform',
      })
      .min(1, { message: 'Du må velge ansettelsesform' }),
    arbeidstidsordning: z.string().optional().nullable(),
    omfangKode: z
      .string({
        required_error: 'Du må velge omfang',
      })
      .min(1, { message: 'Du må velge omfang' }),
    omfangProsent: z.string().optional().nullable(),
    lokasjoner: z.array(LocationSchema).optional().nullable(),
    adresser: z
      .array(LocationSchema)
      .optional()
      .nullable()
      .superRefine((val, ctx) => {
        if (val && val.length > 0) {
          // Sjekk om noen av adressene mangler påkrevde felter
          const harManglendeFelt = val.some(
            (location) =>
              !location.address || !location.postalCode || !location.city,
          );

          if (harManglendeFelt) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                'Alle adressefelt må fylles ut (adresse, postnummer og poststed)',
            });
          }
        }
      }),
  })
  .superRefine((data, ctx) => {
    if (data.adresser?.length === 0 && data.lokasjoner?.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Du må velge arbeidssted',
        path: ['adresser'],
      });
    }
  });

export const OmKandidateneSchema = z
  .array(FormidlingKandidatSchema)
  .min(1, { message: 'Du må velge minst én kandidat' });

export const FormidlingFormSchema = z.object({
  omKandidatene: OmKandidateneSchema,
  omFormidlingen: OmFormidlingSchema,
  omTilrettelegging: OmTilretteleggingSchema.optional(),
  innspurt: z.string(),
  reportee: z.string(),
  navIdent: z.string(),
  navKontor: z.string(),
});

export type FormidlingDataForm = z.infer<typeof FormidlingFormSchema>;
