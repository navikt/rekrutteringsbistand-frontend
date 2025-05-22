import { StillingsinfoSchema } from '../../stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { ESStillingSchema } from './stillingSchema.zod';
import { z } from 'zod';

export type RekrutteringsbistandStillingSchemaDTO = z.infer<
  typeof RekrutteringsbistandStillingSchema
>;

export const RekrutteringsbistandStillingSchema = z.object({
  stilling: ESStillingSchema,
  stillingsinfo: StillingsinfoSchema.optional().nullable(),
});
