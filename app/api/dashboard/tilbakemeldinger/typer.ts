import { z } from 'zod';

export enum TilbakemeldingKategori {
  Rekrutteringstreff = 'rekrutteringstreff',
  Stillingsoppdrag = 'stillingsoppdrag',
  Etterregistreringer = 'etterregistreringer',
  Jobbsøker = 'jobbsøker',
}

export const tilbakemeldingSchema = z.object({
  id: z.string(),
  navn: z.string(),
  tilbakemelding: z.string(),
  dato: z.string(),
  avvist: z.boolean(),
  trelloLenke: z.string().nullable(),
  kategori: z.nativeEnum(TilbakemeldingKategori),
  url: z.string(),
});

export const tilbakemeldingerSchema = z.array(tilbakemeldingSchema);

export type TilbakemeldingDTO = z.infer<typeof tilbakemeldingSchema>;
