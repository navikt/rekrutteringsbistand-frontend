import { z } from 'zod';

export const InnleggSchema = z.object({
  id: z.string(),
  treffId: z.string(),
  tittel: z.string(),
  opprettetAvPersonNavident: z.string(),
  opprettetAvPersonNavn: z.string().optional().nullable(),
  opprettetAvPersonBeskrivelse: z.string(),
  sendesTilJobbsokerTidspunkt: z.string().nullable(),
  htmlContent: z.string(),
  opprettetTidspunkt: z.string(),
  sistOppdatertTidspunkt: z.string(),
});

export const InnleggListeSchema = z.array(InnleggSchema);

export type InnleggDTO = z.infer<typeof InnleggSchema>;
export type InnleggListeDTO = z.infer<typeof InnleggListeSchema>;

export const OpprettInnleggDtoSchema = z.object({
  tittel: z.string().min(1, 'Tittel kan ikke være tom'),
  htmlContent: z.string().min(1, 'Innhold kan ikke være tomt'),
  opprettetAvPersonNavn: z.string().nullable().optional(),
  opprettetAvPersonBeskrivelse: z
    .string()
    .min(1, 'OpprettetAvPersonBeskrivelse kan ikke være tomt'),
  sendesTilJobbsokerTidspunkt: z
    .string()
    .min(1, 'SendesTilJobbsokerTidspunkt kan ikke være tomt'),
});

export type OpprettInnleggDto = z.infer<typeof OpprettInnleggDtoSchema>;
export type OppdaterInnleggDto = z.infer<typeof OpprettInnleggDtoSchema>;
