import { z } from 'zod';

const GeografiJobbonskerSchema = z.object({
  geografiKodeTekst: z.string().nullable().optional(),
  geografiKode: z.string().nullable().optional(),
});

export { GeografiJobbonskerSchema };
