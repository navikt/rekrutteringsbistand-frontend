import { z } from 'zod';

export const ArbeidsgiverHendelseSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: z.string(),
  opprettetAvAktørType: z.string(),
  aktøridentifikasjon: z.string(),
  orgnr: z.string(),
  orgnavn: z.string(),
});

export const ArbeidsgiverSchema = z.object({
  arbeidsgiverTreffId: z.string().optional(),
  organisasjonsnummer: z.string(),
  navn: z.string(),
  status: z.string().optional(),
  hendelser: z.array(ArbeidsgiverHendelseSchema),
});

export const ArbeidsgivereSchema = z.array(ArbeidsgiverSchema);

export type ArbeidsgiverDTO = z.infer<typeof ArbeidsgiverSchema>;
export type ArbeidsgivereDTO = z.infer<typeof ArbeidsgivereSchema>;
export type ArbeidsgiverHendelseDTO = z.infer<
  typeof ArbeidsgiverHendelseSchema
>;

export const LeggTilNyArbeidsgiverSchema = z.object({
  organisasjonsnummer: z.string(),
  navn: z.string(),
});

export type LeggTilNyArbeidsgiverDTO = z.infer<
  typeof LeggTilNyArbeidsgiverSchema
>;
