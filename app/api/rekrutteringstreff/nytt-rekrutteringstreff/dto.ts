import { z } from 'zod';

export const OpprettNyttRekrutteringstreffSchema = z.object({
  tittel: z.string(),
});

export type OpprettNyttRekrutteringstreffDTO = z.infer<
  typeof OpprettNyttRekrutteringstreffSchema
>;
