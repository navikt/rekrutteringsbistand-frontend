import { z } from 'zod';

export const EierOgKontorSchema = z.object({
  navIdent: z.string(),
  eierNavn: z.string().nullable(),
  kontorEnhetId: z.string(),
});

export type EierOgKontor = z.infer<typeof EierOgKontorSchema>;
