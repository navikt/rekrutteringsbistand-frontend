import { z } from 'zod';

export type YrkeJobbonske = z.infer<typeof YrkesErfaringSchema>;

const YrkesErfaringSchema = z.object({
  fraDato: z.string().nullable().optional(), // Date as ISO string
  tilDato: z.string().nullable().optional(), // Date as ISO string
  arbeidsgiver: z.string().nullable().optional(),
  styrkKode: z.string().nullable().optional(),
  styrkKode4Siffer: z.string().nullable().optional(),
  styrkKode3Siffer: z.string().nullable().optional(),
  stillingstittel: z.string().nullable().optional(),
  stillingstitlerForTypeahead: z.array(z.string()).nullable().optional(),
  alternativStillingstittel: z.string().nullable().optional(),
  sokeTitler: z.array(z.string()).nullable().optional(),
  organisasjonsnummer: z.string().nullable().optional(),
  naceKode: z.string().nullable().optional(),
  yrkeserfaringManeder: z.number().optional().default(0),
  utelukketForFremtiden: z.boolean().nullable().optional(),
  beskrivelse: z.string().nullable().optional(),
  sted: z.string().nullable().optional(),
});

export { YrkesErfaringSchema };
