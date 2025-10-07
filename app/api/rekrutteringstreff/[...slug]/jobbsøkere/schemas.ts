import { HendelseSchema } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { z } from 'zod';

export const JobbsøkerSchema = z.object({
  personTreffId: z.string(),
  fødselsnummer: z.string(),
  kandidatnummer: z.string().nullable(),
  fornavn: z.string(),
  etternavn: z.string(),
  navkontor: z.string(),
  veilederNavn: z.string(),
  veilederNavIdent: z.string(),
  hendelser: z.array(HendelseSchema),
});

export const JobbsøkereSchema = z.array(JobbsøkerSchema);

export type JobbsøkerDTO = z.infer<typeof JobbsøkerSchema>;
export type JobbsøkereDTO = z.infer<typeof JobbsøkereSchema>;

export const NyJobbsøkerSchema = z.object({
  fødselsnummer: z.string(),
  fornavn: z.string().nullish(),
  etternavn: z.string().nullish(),
  kandidatnummer: z.string().nullable(),
  navkontor: z.string().nullish(),
  veilederNavn: z.string().nullish(),
  veilederNavIdent: z.string(),
});

export const LeggTilNyeJobbsøkereSchema = z.array(NyJobbsøkerSchema);

export type NyJobbsøkerDTO = z.infer<typeof NyJobbsøkerSchema>;
export type LeggTilNyeJobbsøkereDTO = NyJobbsøkerDTO[];

export const JobbsøkerHendelseSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: z.string(),
  opprettetAvAktørType: z.string(),
  aktørIdentifikasjon: z.string(),
  orgnavn: z.string().optional(),
  orgnr: z.string().optional(),
});

export const JobbsøkerHendelserSchema = z.array(JobbsøkerHendelseSchema);

export type JobbsøkerHendelseDTO = z.infer<typeof JobbsøkerHendelseSchema>;
export type JobbsøkerHendelserDTO = z.infer<typeof JobbsøkerHendelserSchema>;
