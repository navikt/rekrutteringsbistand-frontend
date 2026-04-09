'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  HendelseSchema,
  useRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useSWRPost } from '@/app/api/useSWRPost';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { z } from 'zod';

export const JobbsøkerStatusEnum = z.enum(
  Object.values(JobbsøkerStatus) as [string, ...string[]],
);
export type JobbsøkerStatusType = z.infer<typeof JobbsøkerStatusEnum>;

export const JobbsøkerSøkTreffSchema = z.object({
  personTreffId: z.string(),
  fødselsnummer: z.string(),
  fornavn: z.string().nullable(),
  etternavn: z.string().nullable(),
  navkontor: z.string().nullable(),
  veilederNavn: z.string().nullable(),
  veilederNavident: z.string().nullable(),
  status: JobbsøkerStatusEnum,
  lagtTilDato: z.string().nullable(),
  lagtTilAv: z.string().nullable(),
  minsideHendelser: z.array(HendelseSchema),
});

export const JobbsøkerSøkResponsSchema = z.object({
  totalt: z.number(),
  antallSkjulte: z.number(),
  antallSlettede: z.number(),
  side: z.number(),
  jobbsøkere: z.array(JobbsøkerSøkTreffSchema),
  antallPerStatus: z.record(z.string(), z.number()).optional().default({}),
});

export type JobbsøkerSøkTreffDTO = z.output<typeof JobbsøkerSøkTreffSchema>;
export type JobbsøkerSøkResponsDTO = z.output<typeof JobbsøkerSøkResponsSchema>;

export enum JobbsøkerSorteringsfelt {
  NAVN = 'navn',
  LAGT_TIL = 'lagt-til',
}

export enum JobbsøkerSorteringsretning {
  ASC = 'asc',
  DESC = 'desc',
}

export function standardRetningForSorteringsfelt(
  sorteringsfelt: JobbsøkerSorteringsfelt,
): JobbsøkerSorteringsretning {
  switch (sorteringsfelt) {
    case JobbsøkerSorteringsfelt.LAGT_TIL:
      return JobbsøkerSorteringsretning.DESC;
    case JobbsøkerSorteringsfelt.NAVN:
      return JobbsøkerSorteringsretning.ASC;
  }
}

export interface JobbsøkerSøkParams {
  side: number;
  antallPerSide: number;
  sorteringsfelt?: JobbsøkerSorteringsfelt;
  sorteringsretning?: JobbsøkerSorteringsretning;
  fritekst?: string;
  status?: string[];
}

function byggSøkBody(params: JobbsøkerSøkParams): Record<string, any> {
  const body: Record<string, any> = {
    side: params.side,
    antallPerSide: params.antallPerSide,
  };

  if (params.sorteringsfelt) {
    body.sortering = params.sorteringsfelt;
  }
  if (params.sorteringsretning) {
    body.retning = params.sorteringsretning;
  }
  if (params.fritekst) {
    body.fritekst = params.fritekst;
  }
  if (params.status && params.status.length > 0) {
    body.status = params.status;
  }

  return body;
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

  const endpoint =
    id && kanHenteJobbsøkere
      ? `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/sok`
      : null;

  const body = endpoint ? byggSøkBody(params) : null;

  return useSWRPost(endpoint, JobbsøkerSøkResponsSchema, body, {
    nonImmutable: !!refreshInterval,
    refreshInterval,
  });
};
