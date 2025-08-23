import { navnSchema } from '@/app/api/kandidat-sok/useKandidatNavn';
import { ArbeidsgiverSchema } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import {
  KategoriSchema,
  LocationSchema,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { OmTilretteleggingSchema } from '@/app/stilling/[stillingsId]/rediger/redigerFormType.zod';
import { z } from 'zod';

export const FormidlingKandidatSchema = z.object({
  fnr: z.string(),
  navn: navnSchema,
});

export const OmFormidlingSchema = z
  .object({
    organisasjon: ArbeidsgiverSchema.optional()
      .nullable()
      .refine((v) => !!v, {
        error: 'Du må velge en arbeidsgiver',
      }),
    categoryList: z
      .array(KategoriSchema)
      .optional()
      .nullable()
      .refine((v) => !!v && v.length > 0, {
        error: 'Du må velge en yrkeskategori',
      }),
    sektor: z
      .string()
      .optional()
      .nullable()
      .refine((v) => !!v, {
        error: 'Du må velge sektor',
      }),
    ansettelsesform: z.string({ error: 'Du må velge ansettelsesform' }),
    arbeidstidsordning: z.string().optional().nullable(),
    omfangKode: z.string({ error: 'Du må velge omfang' }),
    omfangProsent: z.string().optional().nullable(),
    lokasjoner: z.array(LocationSchema).optional().nullable(),
    adresser: z
      .array(LocationSchema)
      .optional()
      .nullable()
      .refine(
        (val) =>
          !val ||
          val.length === 0 ||
          !val.some((l) => !l.address || !l.postalCode || !l.city),
        {
          message:
            'Alle adressefelt må fylles ut (adresse, postnummer og poststed)',
        },
      ),
  })
  .superRefine((data, ctx) => {
    const lokEmpty = !data.lokasjoner || data.lokasjoner.length === 0;
    const adrEmpty = !data.adresser || data.adresser.length === 0;
    if (lokEmpty && adrEmpty) {
      ctx.addIssue({
        code: 'custom',
        path: ['lokasjoner'],
        message: 'Du må fylle ut minst én lokasjon eller adresse',
      });
    }
  });

export const OmKandidateneSchema = z
  .array(FormidlingKandidatSchema)
  .min(1, { error: 'Du må velge minst én kandidat' });

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
