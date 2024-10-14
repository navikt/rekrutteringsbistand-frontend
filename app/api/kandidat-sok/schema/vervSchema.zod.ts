import { z } from 'zod';

const VervSchema = z.object({
  fraDato: z.string().nullable().optional(), // Date as ISO string
  tilDato: z.string().nullable().optional(), // Date as ISO string
  organisasjon: z.string().nullable().optional(),
  tittel: z.string().nullable().optional(),
});

export { VervSchema };
