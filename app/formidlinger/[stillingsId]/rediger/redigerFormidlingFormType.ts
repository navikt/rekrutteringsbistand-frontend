import { z } from 'zod';
import { navnSchema } from '../../../api/kandidat-sok/useKandidatNavn';
import {
  GeografiSchema,
  KategoriSchema,
} from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import {
  AdresseLokasjonSchema,
  OmTilretteleggingSchema,
} from '../../../stilling/[stillingsId]/rediger/redigerFormType.zod';

export const FormidlingKandidatSchema = z.object({
  fnr: z.string(),
  navn: navnSchema,
});

export const OmFormidlingSchema = z.object({
  categoryList: z.array(KategoriSchema),
  adresseLokasjoner: AdresseLokasjonSchema,
  lokasjoner: z.array(GeografiSchema).optional().nullable(),
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
  omTilrettelegging: OmTilretteleggingSchema,
  innspurt: z.string(),
});

export type FormidlingDataForm = z.infer<typeof FormidlingFormSchema>;
