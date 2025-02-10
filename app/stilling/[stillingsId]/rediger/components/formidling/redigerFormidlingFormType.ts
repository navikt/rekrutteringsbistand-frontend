import { z } from 'zod';
import { navnSchema } from '../../../../../api/kandidat-sok/useKandidatNavn';
import { OmTilretteleggingSchema } from '../../redigerFormType.zod';

export const FormidlingKandidaeSchema = z.object({
  fnr: z.string(),
  navn: navnSchema,
});

export const FormidlingFormSchema = z.object({
  omKandiatene: z.array(FormidlingKandidaeSchema),
  omFormidling: z.string(),
  omTilrettelegging: OmTilretteleggingSchema,
  innspurt: z.string(),
});
