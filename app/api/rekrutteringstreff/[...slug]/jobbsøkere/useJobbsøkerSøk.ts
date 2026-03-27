'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  parseHendelseData,
  useRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useSWRGet } from '@/app/api/useSWRGet';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { z } from 'zod';

export const JobbsøkerStatusEnum = z.enum(
  Object.values(JobbsøkerStatus) as [string, ...string[]],
);
export type JobbsøkerStatusType = z.infer<typeof JobbsøkerStatusEnum>;

const MinsideHendelseSchema = z
  .object({
    id: z.string(),
    tidspunkt: z.string(),
    hendelsestype: z.string(),
    opprettetAvAktørType: z.string(),
    aktørIdentifikasjon: z.string().nullable(),
    hendelseData: z.unknown().nullable().optional(),
  })
  .transform((h) => ({
    ...h,
    hendelseData: parseHendelseData(h.hendelsestype, h.hendelseData),
  }));

export const JobbsøkerSøkTreffSchema = z.object({
  personTreffId: z.string(),
  fornavn: z.string().nullable(),
  etternavn: z.string().nullable(),
  innsatsgruppe: z.string().nullable(),
  fylke: z.string().nullable(),
  kommune: z.string().nullable(),
  poststed: z.string().nullable(),
  navkontor: z.string().nullable(),
  veilederNavn: z.string().nullable(),
  veilederNavident: z.string().nullable(),
  status: JobbsøkerStatusEnum,
  invitertDato: z.string().nullable(),
  lagtTilDato: z.string().nullable(),
  lagtTilAv: z.string().nullable(),
  minsideHendelser: z.array(MinsideHendelseSchema),
});

export const JobbsøkerSøkResponsSchema = z.object({
  totalt: z.number(),
  antallSkjulte: z.number(),
  antallSlettede: z.number(),
  side: z.number(),
  antallPerSide: z.number(),
  jobbsøkere: z.array(JobbsøkerSøkTreffSchema),
});

export type JobbsøkerSøkTreffDTO = z.output<typeof JobbsøkerSøkTreffSchema>;
export type JobbsøkerSøkResponsDTO = z.output<typeof JobbsøkerSøkResponsSchema>;

export type JobbsøkerSortering = 'navn' | 'lagt_til_dato';

export interface JobbsøkerSøkParams {
  side: number;
  antallPerSide: number;
  sortering?: JobbsøkerSortering;
  fritekst?: string;
  status?: string[];
  innsatsgruppe?: string[];
  navkontor?: string;
  fylke?: string;
  kommune?: string;
  veileder?: string;
}

function byggEndepunkt(id: string, params: JobbsøkerSøkParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set('side', String(params.side));
  searchParams.set('antallPerSide', String(params.antallPerSide));

  if (params.sortering) {
    searchParams.set('sortering', params.sortering);
  }
  if (params.fritekst) {
    searchParams.set('fritekst', params.fritekst);
  }
  if (params.status && params.status.length > 0) {
    searchParams.set('status', params.status.join(','));
  }
  if (params.innsatsgruppe && params.innsatsgruppe.length > 0) {
    searchParams.set('innsatsgruppe', params.innsatsgruppe.join(','));
  }
  if (params.navkontor) {
    searchParams.set('navkontor', params.navkontor);
  }
  if (params.fylke) {
    searchParams.set('fylke', params.fylke);
  }
  if (params.kommune) {
    searchParams.set('kommune', params.kommune);
  }
  if (params.veileder) {
    searchParams.set('veileder', params.veileder);
  }

  return `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker?${searchParams.toString()}`;
}

export const useJobbsøkerSøk = (
  id: string | undefined,
  params: JobbsøkerSøkParams,
  refreshInterval?: number,
) => {
  const applikasjonskontekst = useApplikasjonContext();
  const eiere = useRekrutteringstreff(id)?.data?.eiere;

  const kanHenteJobbsøkere =
    eiere?.includes(applikasjonskontekst.brukerData.ident) ||
    applikasjonskontekst.harRolle([
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
    ]);

  const key = id && kanHenteJobbsøkere ? byggEndepunkt(id, params) : null;

  return useSWRGet(key, JobbsøkerSøkResponsSchema, {
    nonImmutable: !!refreshInterval,
    refreshInterval,
  });
};
