import { z } from 'zod';

const AnnenErfaringSchema = z.object({
  fraDato: z.string().nullable().optional(), // Date as ISO string
  tilDato: z.string().nullable().optional(), // Date as ISO string
  beskrivelse: z.string().nullable().optional(),
  rolle: z.string().nullable().optional(),
});

export { AnnenErfaringSchema };
