import { RekrutteringsbistandStillingSchema } from './rekrutteringsbistandStillingSchema.zod';
import { z } from 'zod';

export const shardsSchema = z.object({
  total: z.number(),
  successful: z.number(),
  skipped: z.number(),
  failed: z.number(),
});

export const totalSchema = z.object({
  value: z.number(),
  relation: z.string(),
});

export type ESStillingsSøkSchemaDTO = z.infer<typeof ESStillingsSøkSchema>;

export const hitSchema = z.object({
  _index: z.string(),
  _type: z.string(),
  _id: z.string(),
  _score: z.any(),
  _source: RekrutteringsbistandStillingSchema,
  sort: z.array(z.number()),
});

export const hitsSchema = z.object({
  total: totalSchema,
  max_score: z.any(),
  hits: z.array(hitSchema),
});

export const ESStillingsSøkSchema = z.object({
  took: z.number(),
  timed_out: z.boolean(),
  _shards: shardsSchema,
  hits: hitsSchema,
});
