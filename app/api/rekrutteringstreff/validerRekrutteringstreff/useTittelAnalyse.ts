'use client';

import {
  validerRekrutteringstreff,
  ValiderRekrutteringstreffResponsDto,
} from '@/app/api/rekrutteringstreff/validerRekrutteringstreff/validerRekrutteringstreff';
import useSWR, { SWRResponse } from 'swr';

export const useTittelAnalyse = (
  tittelInput: string | undefined,
): SWRResponse<ValiderRekrutteringstreffResponsDto, Error> => {
  const key = tittelInput ? ['validerRekrutteringstreff', tittelInput] : null;

  const fetcher = async (swrKey: string[]) => {
    const tittelForApiKall = swrKey[1];

    if (typeof tittelForApiKall !== 'string' || !tittelForApiKall) {
      throw new Error(
        'SWR fetcher called with an invalid title derived from its key.',
      );
    }
    return validerRekrutteringstreff(tittelForApiKall);
  };

  const swrResponse = useSWR<ValiderRekrutteringstreffResponsDto, Error>(
    key,
    fetcher,
    {},
  );

  return swrResponse;
};
