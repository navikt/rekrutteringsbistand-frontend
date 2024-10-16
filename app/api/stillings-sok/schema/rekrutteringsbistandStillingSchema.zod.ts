import { z } from 'zod';
import { StillingSchema } from './stillingSchema.zod';
import { StillingsinfoSchema } from './stillingsinfoSchema.zod';

export type RekrutteringsbistandStillingSchemaDTO = z.infer<
  typeof RekrutteringsbistandStillingSchema
>;

export const RekrutteringsbistandStillingSchema = z.object({
  stilling: StillingSchema,
  stillingsinfo: StillingsinfoSchema.optional().nullable(),
});
