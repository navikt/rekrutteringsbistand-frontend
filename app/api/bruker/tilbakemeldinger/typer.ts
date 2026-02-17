import { z } from 'zod';

export enum TilbakemeldingKategori {
  Rekrutteringstreff = 'rekrutteringstreff',
  Stillingsoppdrag = 'stillingsoppdrag',
  Etterregistreringer = 'etterregistreringer',
  Jobbsøker = 'jobbsøker',
  Annet = 'annet',
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
});

export const tilbakemeldingerSchema = z.object({
  tilbakemeldinger: z.array(tilbakemeldingSchema),
  side: z.number(),
  totalSider: z.number(),
  totaltAntall: z.number(),
});

export type TilbakemeldingerDTO = z.infer<typeof tilbakemeldingerSchema>;

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
  kategori: z.nativeEnum(TilbakemeldingKategori).optional(),
});

export type OppdaterTilbakemeldingDTO = z.infer<
  typeof oppdaterTilbakemeldingSchema
>;
