import { ESStillingSchema } from './stillingSchema.zod';
import { ESStillingsinfoSchema } from './stillingsinfoSchema.zod';
import { z } from 'zod';

export type RekrutteringsbistandStillingSchemaDTO = z.infer<
  typeof RekrutteringsbistandStillingSchema
>;

export const RekrutteringsbistandStillingSchema = z.object({
  stilling: ESStillingSchema,
  stillingsinfo: ESStillingsinfoSchema.optional().nullable(),
});
