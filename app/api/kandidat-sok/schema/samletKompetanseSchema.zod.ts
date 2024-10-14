import { z } from 'zod';

const SamletKompetanseSchema = z.object({
  samletKompetanseTekst: z.string().nullable().optional(),
});

export { SamletKompetanseSchema };
