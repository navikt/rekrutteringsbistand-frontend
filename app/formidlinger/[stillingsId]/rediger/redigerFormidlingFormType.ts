import { z } from 'zod';
import { navnSchema } from '../../../api/kandidat-sok/useKandidatNavn';
import { GeografiSchema } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import {
  AdresseLokasjonSchema,
  JanzzSchema,
  OmTilretteleggingSchema,
} from '../../../stilling/[stillingsId]/rediger/redigerFormType.zod';

export const FormidlingKandidaeSchema = z.object({
  fnr: z.string(),
  navn: navnSchema,
});

export const OmFormidlingSchema = z.object({
  janzz: JanzzSchema,
  adresseLokasjoner: AdresseLokasjonSchema,
  lokasjoner: z.array(GeografiSchema).optional().nullable(),
  sektor: z.string().min(1, 'Sektor må velges').nullable(),
});

export const FormidlingFormSchema = z.object({
  omKandiatene: z.array(FormidlingKandidaeSchema),
  omFormidling: OmFormidlingSchema,
  omTilrettelegging: OmTilretteleggingSchema,
  innspurt: z.string(),
});
