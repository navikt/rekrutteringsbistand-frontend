import { z } from 'zod';
import { navnSchema } from '../../api/kandidat-sok/useKandidatNavn';
import { ArbeidsgiverSchema } from '../../api/pam-search/underenhet/useArbeidsgiver';
import {
  KategoriSchema,
  LocationSchema,
} from '../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { OmTilretteleggingSchema } from '../../stilling/[stillingsId]/rediger/redigerFormType.zod';

export const FormidlingKandidatSchema = z.object({
  fnr: z.string(),
  navn: navnSchema,
});

export const OmFormidlingSchema = z.object({
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
  locationList: z.array(LocationSchema).min(1, 'Velg minst én lokasjon'),
});

export const FormidlingFormSchema = z.object({
  omKandidatene: z
    .array(FormidlingKandidatSchema)
    .min(1, { message: 'Du må velge minst én kandidat' }),
  omFormidlingen: OmFormidlingSchema,
  omTilrettelegging: OmTilretteleggingSchema.optional(),
  innspurt: z.string(),
  reportee: z.string(),
  navIdent: z.string(),
  navKontor: z.string(),
});

export type FormidlingDataForm = z.infer<typeof FormidlingFormSchema>;
