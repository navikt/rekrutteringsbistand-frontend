import { z } from 'zod';

const OmfangJobbonskerSchema = z.object({
  omfangKode: z.string().nullable().optional(),
  omfangKodeTekst: z.string().nullable().optional(),
});

export { OmfangJobbonskerSchema };
