import { z } from 'zod';

export const OpprettNyttRekrutteringstreffSchema = z.object({
  opprettetAvNavkontorEnhetId: z.string().nullable(),
});

export type OpprettNyttRekrutteringstreffDTO = z.infer<
  typeof OpprettNyttRekrutteringstreffSchema
>;
