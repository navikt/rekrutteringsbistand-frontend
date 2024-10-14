import { z } from 'zod';

const ForerkortSchema = z.object({
  fraDato: z.string().nullable().optional(), // Date as ISO string
  tilDato: z.string().nullable().optional(),
  forerkortKode: z.string().nullable().optional(),
  forerkortKodeKlasse: z.string().nullable().optional(),
  alternativKlasse: z.string().nullable().optional(),
  utsteder: z.string().nullable().optional(),
});

export type FørerkortSchemaDTO = z.infer<typeof ForerkortSchema>;
export { ForerkortSchema };
