import { z } from 'zod';

export enum TilbakemeldingKategori {
  Rekrutteringstreff = 'rekrutteringstreff',
  Stillingsoppdrag = 'stillingsoppdrag',
  Etterregistreringer = 'etterregistreringer',
  Jobbsøker = 'jobbsøker',
}

export enum TilbakemeldingStatus {
  Ny = 'NY',
  Vurdering = 'VURDERING',
  Avvist = 'AVVIST',
  Fullført = 'FULLFORT',
}

export const tilbakemeldingSchema = z.object({
  id: z.string(),
  navn: z.string().nullable(),
  tilbakemelding: z.string(),
  dato: z.string(),
  status: z.nativeEnum(TilbakemeldingStatus),
  trelloLenke: z.string().nullable(),
  kategori: z.nativeEnum(TilbakemeldingKategori),
  url: z.string(),
});

export const tilbakemeldingerSchema = z.array(tilbakemeldingSchema);

export type TilbakemeldingDTO = z.infer<typeof tilbakemeldingSchema>;

export const sendTilbakemeldingSchema = z.object({
  tilbakemelding: z.string().min(1),
  kategori: z.nativeEnum(TilbakemeldingKategori),
  navn: z.string().nullable(),
});

export type SendTilbakemeldingDTO = z.infer<typeof sendTilbakemeldingSchema>;

export const oppdaterTilbakemeldingSchema = z.object({
  status: z.nativeEnum(TilbakemeldingStatus).optional(),
  trelloLenke: z.string().nullable().optional(),
});

export type OppdaterTilbakemeldingDTO = z.infer<
  typeof oppdaterTilbakemeldingSchema
>;
