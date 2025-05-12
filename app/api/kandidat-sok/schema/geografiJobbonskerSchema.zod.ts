import { z } from 'zod';

export type GeografiJobbonskerSchemaDTO = z.infer<
  typeof GeografiJobbonskerSchema
>;
const GeografiJobbonskerSchema = z.object({
  geografiKodeTekst: z.string().nullable().optional(),
  geografiKode: z.string().nullable().optional(),
});

export { GeografiJobbonskerSchema };
