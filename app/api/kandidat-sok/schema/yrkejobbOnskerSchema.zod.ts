import { z } from 'zod';

export type YrkejobbOnskerSchemaDTO = z.infer<typeof YrkejobbOnskerSchema>;
const YrkejobbOnskerSchema = z.object({
  styrkKode: z.string().nullable().optional(),
  styrkBeskrivelse: z.string().nullable().optional(),
  sokeTitler: z.array(z.string()).optional().default([]),
  primaertJobbonske: z.boolean().optional().default(false),
});

export { YrkejobbOnskerSchema };
