import { z } from 'zod';

const SprakSchema = z.object({
  fraDato: z.string().nullable().optional(), // Date as ISO string
  sprakKode: z.string().nullable().optional(),
  sprakKodeTekst: z.string().nullable().optional(),
  alternativTekst: z.string().nullable().optional(),
  beskrivelse: z.string().nullable().optional(),
  ferdighetMuntlig: z.string().nullable().optional(),
  ferdighetSkriftlig: z.string().nullable().optional(),
});

export type SprakSchemaDTO = z.infer<typeof SprakSchema>;
export { SprakSchema };
