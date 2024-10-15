import { z } from 'zod';

const KursSchema = z.object({
  fraDato: z.string().nullable().optional(), // Date as ISO string (deprecated)
  tilDato: z.string().nullable().optional(), // Date as ISO string
  tittel: z.string().nullable().optional(),
  arrangor: z.string().nullable().optional(),
  omfangEnhet: z.string().nullable().optional(),
  omfangVerdi: z.number().nullable().optional(),
  beskrivelse: z.string().nullable().optional(), // Deprecated field
});

export type KursSchemaDTO = z.infer<typeof KursSchema>;
export { KursSchema };
