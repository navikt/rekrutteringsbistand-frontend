import { z } from 'zod';

const SertifikatSchema = z.object({
  fraDato: z.string().nullable().optional(), // Date as ISO string
  tilDato: z.string().nullable().optional(), // Date as ISO string
  sertifikatKode: z.string().nullable().optional(),
  sertifikatKodeNavn: z.string().nullable().optional(),
  alternativtNavn: z.string().nullable().optional(),
  utsteder: z.string().nullable().optional(),
});

export type SertifikatSchemaDTO = z.infer<typeof SertifikatSchema>;
export { SertifikatSchema };
