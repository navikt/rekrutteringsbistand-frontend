import { z } from 'zod';

const FagdokumentasjonSchema = z.object({
  type: z.string().nullable().optional(),
  tittel: z.string().nullable().optional(),
  beskrivelse: z.string().nullable().optional(),
});

export { FagdokumentasjonSchema };
