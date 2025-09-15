import { ESStillingSchema } from './stillingSchema.zod';
import { StillingsinfoSchema } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { z } from 'zod';

export type RekrutteringsbistandStillingSchemaDTO = z.infer<
  typeof RekrutteringsbistandStillingSchema
>;

export const RekrutteringsbistandStillingSchema = z.object({
  stilling: ESStillingSchema,
  stillingsinfo: StillingsinfoSchema.optional().nullable(),
});
