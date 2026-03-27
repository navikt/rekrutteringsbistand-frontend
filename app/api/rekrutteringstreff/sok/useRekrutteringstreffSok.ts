'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

export {
  SokStatus,
  SokStatusLabel,
} from '@/app/rekrutteringstreff/_types/constants';

export const Visning = {
  ALLE: 'alle',
  MINE: 'mine',
  MITT_KONTOR: 'mitt_kontor',
  VALGTE_KONTORER: 'valgte_kontorer',
} as const;
export type Visning = (typeof Visning)[keyof typeof Visning];

export const Sortering = {
  SIST_OPPDATERTE: 'sist_oppdaterte',
  NYESTE: 'nyeste',
  ELDSTE: 'eldste',
} as const;
export type Sortering = (typeof Sortering)[keyof typeof Sortering];

export const SorteringLabel: Record<Sortering, string> = {
  sist_oppdaterte: 'Sist oppdaterte',
  nyeste: 'Nyeste',
  eldste: 'Eldste',
};

const FilterValgSchema = z.object({
  verdi: z.string(),
  antall: z.number(),
});

const RekrutteringstreffSokTreffSchema = z.object({
  id: z.string(),
  tittel: z.string(),
  beskrivelse: z.string().nullable(),
  status: z.enum([
    'utkast',
    'publisert_apen',
    'publisert_frist_utgatt',
    'fullfort',
    'avlyst',
  ]),
  fraTid: z.string().nullable(),
  tilTid: z.string().nullable(),
  svarfrist: z.string().nullable(),
  gateadresse: z.string().nullable(),
  postnummer: z.string().nullable(),
  poststed: z.string().nullable(),
  opprettetAv: z.string(),
  opprettetAvTidspunkt: z.string(),
  sistEndret: z.string(),
  eiere: z.array(z.string()),
  kontorer: z.array(z.string()),
  antallArbeidsgivere: z.number(),
  antallJobbsokere: z.number(),
});

export const RekrutteringstreffSokResponsSchema = z.object({
  treff: z.array(RekrutteringstreffSokTreffSchema),
  antallTotalt: z.number(),
  side: z.number(),
  antallPerSide: z.number(),
  statusaggregering: z.array(FilterValgSchema),
});

export type RekrutteringstreffSokRespons = z.infer<
  typeof RekrutteringstreffSokResponsSchema
>;
export type RekrutteringstreffSokTreff = z.infer<
  typeof RekrutteringstreffSokTreffSchema
>;
export type FilterValg = z.infer<typeof FilterValgSchema>;

function byggSokUrl(params: {
  visning?: Visning;
  statuser?: string[];
  kontorer?: string[];
  sortering?: Sortering;
  side?: number;
  antallPerSide?: number;
}): string {
  const searchParams = new URLSearchParams();

  if (params.visning && params.visning !== Visning.ALLE) {
    searchParams.set('visning', params.visning);
  }
  if (params.statuser && params.statuser.length > 0) {
    searchParams.set('statuser', params.statuser.join(','));
  }
  if (params.kontorer && params.kontorer.length > 0) {
    searchParams.set('kontorer', params.kontorer.join(','));
  }
  if (params.sortering && params.sortering !== Sortering.SIST_OPPDATERTE) {
    searchParams.set('sortering', params.sortering);
  }
  if (params.side !== undefined && params.side > 1) {
    searchParams.set('side', params.side.toString());
  }
  if (params.antallPerSide !== undefined && params.antallPerSide !== 20) {
    searchParams.set('antallPerSide', params.antallPerSide.toString());
  }

  const qs = searchParams.toString();
  return `${RekrutteringstreffAPI.internUrl}/sok${qs ? `?${qs}` : ''}`;
}

export const useRekrutteringstreffSok = (params: {
  visning?: Visning;
  statuser?: string[];
  kontorer?: string[];
  sortering?: Sortering;
  side?: number;
  antallPerSide?: number;
}) =>
  useSWRGet(byggSokUrl(params), RekrutteringstreffSokResponsSchema, {
    nonImmutable: true,
  });
