import { z } from 'zod';

const ArbeidstidsordningJobbonskerSchema = z.object({
  arbeidstidsordningKode: z.string().nullable().optional(),
  arbeidstidsordningKodeTekst: z.string().nullable().optional(),
});

export { ArbeidstidsordningJobbonskerSchema };
