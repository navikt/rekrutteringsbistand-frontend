'use client';

import { kandidatlisteKandidaterResponseSchema } from './schema.zod';
import { KandidatAPI } from '@/app/api/api-routes';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import { useSWRGet } from '@/app/api/useSWRGet';
import { KandidatlisteSortering } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatlisteFilter/KandidatlisteFilterContext';
import { mutate } from 'swr';

function mapSortering(sortering: string): {
  sorteringKolonne: string;
  sorteringRetning: string;
} {
  switch (sortering) {
    case KandidatlisteSortering.NAVN_ASC:
      return { sorteringKolonne: 'navn', sorteringRetning: 'asc' };
    case KandidatlisteSortering.NAVN_DESC:
      return { sorteringKolonne: 'navn', sorteringRetning: 'desc' };
    case KandidatlisteSortering.LAGT_TIL_ASC:
      return { sorteringKolonne: 'lagtTil', sorteringRetning: 'asc' };
    case KandidatlisteSortering.LAGT_TIL_DESC:
      return { sorteringKolonne: 'lagtTil', sorteringRetning: 'desc' };
    case KandidatlisteSortering.HENDELSE_ASC:
      return { sorteringKolonne: 'hendelse', sorteringRetning: 'asc' };
    case KandidatlisteSortering.HENDELSE_DESC:
      return { sorteringKolonne: 'hendelse', sorteringRetning: 'desc' };
    case KandidatlisteSortering.VARSEL_ASC:
      return { sorteringKolonne: 'varsel', sorteringRetning: 'asc' };
    case KandidatlisteSortering.VARSEL_DESC:
      return { sorteringKolonne: 'varsel', sorteringRetning: 'desc' };
    case KandidatlisteSortering.INTERN_STATUS_ASC:
      return { sorteringKolonne: 'internStatus', sorteringRetning: 'asc' };
    case KandidatlisteSortering.INTERN_STATUS_DESC:
      return { sorteringKolonne: 'internStatus', sorteringRetning: 'desc' };
    default:
      return { sorteringKolonne: 'lagtTil', sorteringRetning: 'desc' };
  }
}

export const kandidatlisteKandidaterEndepunkt = (
  stillingsId: string,
  params: {
    antallPerSide: number;
    sorteringKolonne: string;
    sorteringRetning: string;
    side: number;
    fritekst?: string;
    internStatus?: string[];
    kandidatlisteHendelseType?: string[];
    visSlettede: boolean;
  },
) => {
  const sp = new URLSearchParams();
  sp.set('antallPerSide', String(params.antallPerSide));
  sp.set('sorteringKolonne', params.sorteringKolonne);
  sp.set('sorteringRetning', params.sorteringRetning);
  sp.set('side', String(params.side));
  sp.set('visSlettede', String(params.visSlettede));
  if (params.fritekst) sp.set('fritekst', params.fritekst);
  if (params.internStatus && params.internStatus.length > 0) {
    params.internStatus.forEach((s) => sp.append('internStatus', s));
  }
  if (
    params.kandidatlisteHendelseType &&
    params.kandidatlisteHendelseType.length > 0
  ) {
    params.kandidatlisteHendelseType.forEach((h) =>
      sp.append('kandidatlisteHendelseType', h),
    );
  }
  return `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidater?${sp.toString()}`;
};

const KANDIDATLISTE_KANDIDATER_PREFIX = `${KandidatAPI.internUrl}/veileder/stilling/`;

export function mutateKandidlisteKandidater(stillingsId: string) {
  return mutate(
    (key) =>
      typeof key === 'string' &&
      key.startsWith(KANDIDATLISTE_KANDIDATER_PREFIX) &&
      key.includes(`/stilling/${stillingsId}/kandidater`),
  );
}

export const useKandidlisteKandidater = (
  stillingsData:
    | RekrutteringsbistandStillingSchemaDTO
    | StillingsDataDTO
    | undefined,
  erEier: boolean | undefined,
  options: {
    side?: number;
    antallPerSide?: number;
    sortering?: string;
    fritekst?: string;
    internStatus?: string[];
    kandidatlisteHendelseType?: string[];
    visSlettede?: boolean;
  } = {},
) => {
  const {
    side = 1,
    antallPerSide = 25,
    sortering = '',
    fritekst = '',
    internStatus = [],
    kandidatlisteHendelseType = [],
    visSlettede = false,
  } = options;

  const kanHenteKandidater: boolean = Boolean(
    erEier &&
    stillingsData?.stilling.uuid &&
    stillingsData?.stilling?.publishedByAdmin,
  );

  const { sorteringKolonne, sorteringRetning } = mapSortering(sortering);

  const endpoint = kanHenteKandidater
    ? kandidatlisteKandidaterEndepunkt(stillingsData!.stilling.uuid!, {
        antallPerSide,
        sorteringKolonne,
        sorteringRetning,
        side,
        fritekst,
        internStatus,
        kandidatlisteHendelseType,
        visSlettede,
      })
    : null;

  return useSWRGet(endpoint, kandidatlisteKandidaterResponseSchema, {
    shouldRetryOnError: (error: { status?: number }) => {
      if (error?.status === 404) return false;
      const status = error?.status ?? 0;
      return !(status >= 400 && status < 500);
    },
    errorRetryCount: 2,
    errorRetryInterval: 5000,
    fetchOptions: { skjulFeilmelding: true },
  });
};
