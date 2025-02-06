import { z } from 'zod';

export const ESStillingsinfoSchema = z.object({
  eierNavident: z.string().nullable(),
  eierNavn: z.string().nullable(),
  notat: z.string().nullable(),
  stillingsid: z.string(),
  stillingsinfoid: z.string(),
  stillingskategori: z.string().nullable(),
});
