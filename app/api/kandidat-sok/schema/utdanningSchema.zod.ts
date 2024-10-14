import { z } from 'zod';

const UtdanningSchema = z.object({
  fraDato: z.string().nullable().optional(), // Date as ISO string
  tilDato: z.string().nullable().optional(), // Date as ISO string
  utdannelsessted: z.string().nullable().optional(),
  nusKode: z.string().nullable().optional(),
  nusKodeGrad: z.string().nullable().optional(),
  alternativGrad: z.string().nullable().optional(),
  yrkestatus: z.string().nullable().optional(),
  beskrivelse: z.string().nullable().optional(),
});

export { UtdanningSchema };
