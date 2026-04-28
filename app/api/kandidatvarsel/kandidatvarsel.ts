'use client';

import { KandidatvarselAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { RekbisError } from '@/util/rekbisError';

const varselStillingEndepunkt = (stillingId: string) => {
  if (stillingId === undefined)
    throw new RekbisError({ message: 'stillingId === undefined' });
  return `${KandidatvarselAPI.internUrl}/varsler/stilling/${stillingId}`;
};

export enum Meldingsmal {
  VurdertSomAktuell = 'VURDERT_SOM_AKTUELL',
  FunnetPassendeStilling = 'PASSENDE_STILLING',
  Jobbarrangement = 'PASSENDE_JOBBARRANGEMENT',
}

type postSmsTilKandidaterRequest = {
  mal: Meldingsmal;
  fnr: string[];
  stillingId: string;
};
export const usePostSmsTilKandidater = () => {
  return async ({ stillingId, mal, fnr }: postSmsTilKandidaterRequest) => {
    const response = await postApi(varselStillingEndepunkt(stillingId), {
      mal,
      fnr,
    });

    return response;
  };
};
