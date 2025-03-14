import { z } from 'zod';

export const LeggTilNyArbeidsgiverSchema = z.object({
  organisasjonsnummer: z.number(),
  navn: z.string(),
  status: z.string(),
});

export type LeggTilNyArbeidsgiverDTO = z.infer<
  typeof LeggTilNyArbeidsgiverSchema
>;
