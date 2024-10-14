import { z } from 'zod';

const ArbeidstidJobbonskerSchema = z.object({
  arbeidstidKode: z.string().nullable().optional(),
  arbeidstidKodeTekst: z.string().nullable().optional(),
});

export { ArbeidstidJobbonskerSchema };
