import { z } from 'zod';

const YrkejobbOnskerSchema = z.object({
  styrkKode: z.string().nullable().optional(),
  styrkBeskrivelse: z.string().nullable().optional(),
  sokeTitler: z.array(z.string()).optional().default([]),
  primaertJobbonske: z.boolean().optional().default(false),
});

export { YrkejobbOnskerSchema };
