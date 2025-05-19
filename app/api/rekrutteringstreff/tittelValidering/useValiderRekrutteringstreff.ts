'use client';

import { postApi } from '../../fetcher';
import { validerRekrutteringstreffMock } from '../mocks/validerRekrutteringstreffMock';
import useSWR, { SWRResponse } from 'swr';
import { z } from 'zod';

export const ValiderRekrutteringstreffDtoSchema = z.object({
  tittel: z.string().min(1, 'Tittel kan ikke være tom'),
  beskrivelse: z.string().nullable(),
});

export type ValiderRekrutteringstreffDto = z.infer<
  typeof ValiderRekrutteringstreffDtoSchema
>;

export const ValiderRekrutteringstreffResponsDtoSchema = z.object({
  bryterRetningslinjer: z.boolean(),
  begrunnelse: z.string(),
});

export type ValiderRekrutteringstreffResponsDto = z.infer<
  typeof ValiderRekrutteringstreffResponsDtoSchema
>;

export const validerRekrutteringstreffEndepunkt = (): string =>
  '/api/rekrutteringstreff/valider';

export const useValiderRekrutteringstreff = (
  tittelInput: string | undefined,
  beskrivelseInput?: string | null,
): SWRResponse<ValiderRekrutteringstreffResponsDto, Error> => {
  const key = tittelInput
    ? [
        validerRekrutteringstreffEndepunkt(),
        tittelInput,
        beskrivelseInput ?? null,
      ]
    : null;

  const fetcher = async (
    swrKey: string[],
  ): Promise<ValiderRekrutteringstreffResponsDto> => {
    const tittelForApiKall = swrKey[1];
    //const beskrivelseForApiKall = swrKey[2] as string | null; // Hvis beskrivelse er med

    if (typeof tittelForApiKall !== 'string' || !tittelForApiKall) {
      throw new Error(
        'SWR fetcher for validerRekrutteringstreff kalt med ugyldig tittel fra nøkkel.', // Oppdatert feilmelding
      );
    }

    const requestData: ValiderRekrutteringstreffDto = {
      tittel: tittelForApiKall,
      beskrivelse: null,
    };
    ValiderRekrutteringstreffDtoSchema.parse(requestData);

    const apiResponse = await postApi(
      validerRekrutteringstreffEndepunkt(),
      requestData,
    );

    return ValiderRekrutteringstreffResponsDtoSchema.parse(apiResponse);
  };

  const swrResponse = useSWR<ValiderRekrutteringstreffResponsDto, Error>(
    key,
    fetcher,
    {},
  );

  return swrResponse;
};

export const validerRekrutteringstreffMirage = (server: any): void => {
  server.post(validerRekrutteringstreffEndepunkt(), () => {
    return validerRekrutteringstreffMock();
  });
};
