import { z } from 'zod';

export type DecoratorDTO = z.infer<typeof decoratorSchema>;

export const decoratorSchema = z.object({
  enheter: z.array(z.object({ enhetId: z.string(), navn: z.string() })),
  ident: z.string(),
  navn: z.string(),
  fornavn: z.string(),
  etternavn: z.string(),
});
