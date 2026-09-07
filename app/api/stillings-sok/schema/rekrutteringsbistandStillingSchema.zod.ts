import { ESStillingSchema } from './stillingSchema.zod';
import { StillingsinfoSchema } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { z } from 'zod';

export type RekrutteringsbistandStillingSchemaDTO = z.infer<
  typeof RekrutteringsbistandStillingSchema
>;

export const KandidatlisteInfoSchema = z.object({
  kandidatlisteId: z.string(),
  kandidatlisteStatus: z.string(),
  opprettetDato: z.string(),
  antallKandidater: z.number(),
  eier: z.string(),
});

export const RekrutteringsbistandStillingSchema = z.object({
  stilling: ESStillingSchema,
  stillingsinfo: StillingsinfoSchema.optional().nullable(),
  kandidatlisteInfo: KandidatlisteInfoSchema.optional().nullable(),
});
