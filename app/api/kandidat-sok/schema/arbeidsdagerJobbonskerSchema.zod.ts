import { z } from 'zod';

const ArbeidsdagerJobbonskerSchema = z.object({
  arbeidsdagerKode: z.string().nullable().optional(),
  arbeidsdagerKodeTekst: z.string().nullable().optional(),
});

export { ArbeidsdagerJobbonskerSchema };
