import { ESStillingsSøkSchema } from './stillingsSøkSchema.zod';
import { z } from 'zod';

// Gjenbruker hits-delen fra eksisterende schema
const hitsOnlySchema = ESStillingsSøkSchema.pick({ hits: true });

export const StillingsSokAntallSchema = z.object({
  statusBuckets: z
    .array(z.object({ key: z.string(), count: z.number() }))
    .optional(),
  stillingskategoriBuckets: z
    .array(z.object({ key: z.string(), count: z.number() }))
    .optional(),
  geografi: z
    .object({
      fylker: z
        .array(z.object({ key: z.string(), count: z.number() }))
        .optional(),
      kommuner: z
        .array(z.object({ key: z.string(), count: z.number() }))
        .optional(),
    })
    .optional(),
});

export const StillingsSokCombinedSchema = z.object({
  hits: hitsOnlySchema.shape.hits, // samme struktur som ES hits
  antall: StillingsSokAntallSchema,
  tookTreff: z.number().optional().nullable(),
  tookAggs: z.number().optional().nullable(),
});

export type StillingsSokCombinedDTO = z.infer<
  typeof StillingsSokCombinedSchema
>;
