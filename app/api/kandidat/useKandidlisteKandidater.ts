'use client';

import { kandidatlisteKandidaterResponseSchema } from './schema.zod';
import { KandidatAPI } from '@/app/api/api-routes';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import { useSWRPost } from '@/app/api/useSWRPost';
import { KandidatlisteSortering } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatlisteFilter/KandidatlisteFilterContext';
import { mutate } from 'swr';

function mapSortering(sortering: string): {
  sorteringKolonne: string;
  sorteringRetning: string;
} {
  switch (sortering) {
    case KandidatlisteSortering.NAVN_ASC:
      return { sorteringKolonne: 'Navn', sorteringRetning: 'ASC' };
    case KandidatlisteSortering.NAVN_DESC:
      return { sorteringKolonne: 'Navn', sorteringRetning: 'DESC' };
    case KandidatlisteSortering.LAGT_TIL_ASC:
      return { sorteringKolonne: 'LagtTil', sorteringRetning: 'ASC' };
    case KandidatlisteSortering.LAGT_TIL_DESC:
      return { sorteringKolonne: 'LagtTil', sorteringRetning: 'DESC' };
    case KandidatlisteSortering.HENDELSE_ASC:
      return { sorteringKolonne: 'SisteHendelse', sorteringRetning: 'ASC' };
    case KandidatlisteSortering.HENDELSE_DESC:
      return { sorteringKolonne: 'SisteHendelse', sorteringRetning: 'DESC' };
    case KandidatlisteSortering.VARSEL_ASC:
      return { sorteringKolonne: 'Varsel', sorteringRetning: 'ASC' };
    case KandidatlisteSortering.VARSEL_DESC:
      return { sorteringKolonne: 'Varsel', sorteringRetning: 'DESC' };
    case KandidatlisteSortering.INTERN_STATUS_ASC:
      return { sorteringKolonne: 'InternStatus', sorteringRetning: 'ASC' };
    case KandidatlisteSortering.INTERN_STATUS_DESC:
      return { sorteringKolonne: 'InternStatus', sorteringRetning: 'DESC' };
    default:
      return { sorteringKolonne: 'LagtTil', sorteringRetning: 'DESC' };
  }
}

export const kandidatlisteKandidaterEndepunkt = (
  stillingsId: string,
  params: {
    antallPerSide: number;
    sorteringKolonne: string;
    sorteringRetning: string;
    side: number;
  },
) => {
  const sp = new URLSearchParams();
  sp.set('antallPerSide', String(params.antallPerSide));
  sp.set('sorteringKolonne', params.sorteringKolonne);
  sp.set('sorteringRetning', params.sorteringRetning);
  sp.set('side', String(params.side));
  return `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidater?${sp.toString()}`;
};

interface KandidatlisteKandidaterBody {
  fritekst?: string;
  internStatus?: string[];
  kandidatlisteHendelseType?: string[];
  visSlettede: boolean;
}

const KANDIDATLISTE_KANDIDATER_PREFIX = `${KandidatAPI.internUrl}/veileder/stilling/`;

export function mutateKandidlisteKandidater(stillingsId: string) {
  return mutate(
    (key) =>
      Array.isArray(key) &&
      typeof key[0] === 'string' &&
      key[0].startsWith(KANDIDATLISTE_KANDIDATER_PREFIX) &&
      key[0].includes(`/stilling/${stillingsId}/kandidater`),
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
      })
    : null;

  const body: KandidatlisteKandidaterBody = {
    fritekst: fritekst || undefined,
    internStatus: internStatus.length > 0 ? internStatus : undefined,
    kandidatlisteHendelseType:
      kandidatlisteHendelseType.length > 0
        ? kandidatlisteHendelseType
        : undefined,
    visSlettede,
  };

  return useSWRPost(endpoint, kandidatlisteKandidaterResponseSchema, body, {
    keepPreviousData: true,
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
