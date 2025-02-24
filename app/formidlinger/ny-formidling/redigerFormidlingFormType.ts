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
  organisasjon: ArbeidsgiverSchema,
  categoryList: z.array(KategoriSchema).min(1, 'Yrkestittel må velges'),
  locationList: z.array(LocationSchema).optional().nullable(),
  sektor: z.string().min(1, 'Sektor må velges').nullable(),
  arbeidstidsordning: z.string().optional(),
  ansettelsesform: z
    .string()
    .nullish()
    .refine((val) => val !== null && val !== '', {
      message: 'Ansettelsesform må velges',
    }),
  omfangKode: z.string().min(1, 'Omfang må velges'),
  omfangProsent: z.string().optional(),
});

export const FormidlingFormSchema = z.object({
  omKandiatene: z
    .array(FormidlingKandidatSchema)
    .min(1, { message: 'Du må velge minst én kandidat' }),
  omFormidling: OmFormidlingSchema,
  omTilrettelegging: OmTilretteleggingSchema.optional(),
  innspurt: z.string(),
  reportee: z.string(),
  navIdent: z.string(),
  navKontor: z.string(),
});

export type FormidlingDataForm = z.infer<typeof FormidlingFormSchema>;
