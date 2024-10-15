import { z } from 'zod';

const KompetanseSchema = z.object({
  fraDato: z.string().nullable().optional(), // Date as ISO string
  kompKode: z.string().nullable().optional(),
  kompKodeNavn: z.string().nullable().optional(),
  sokeNavn: z.array(z.string()).nullable().optional(),
  alternativtNavn: z.string().nullable().optional(),
  beskrivelse: z.string().nullable().optional(),
});

export type KompetanseSchemaDTO = z.infer<typeof KompetanseSchema>;
export { KompetanseSchema };
