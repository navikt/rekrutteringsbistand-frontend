'use client';

import { postApi } from '../../fetcher';
import { validerRekrutteringstreffMock } from '../mocks/validerRekrutteringstreffMock';
import useSWR, { SWRResponse } from 'swr';
import { z } from 'zod';

export const RekrutteringstreffTittelValideringRequestDtoSchema = z.object({
  tittel: z.string().min(1, 'Tittel kan ikke være tom'),
  beskrivelse: z.string().nullable(),
});

export type RekrutteringstreffTittelValideringRequestDto = z.infer<
  typeof RekrutteringstreffTittelValideringRequestDtoSchema
>;

export const RekrutteringstreffTittelValideringResponsDtoSchema = z.object({
  bryterRetningslinjer: z.boolean(),
  begrunnelse: z.string(),
});

export type RekrutteringstreffTittelValideringResponsDto = z.infer<
  typeof RekrutteringstreffTittelValideringResponsDtoSchema
>;

export const rekrutteringstreffTittelValideringEndepunkt = (): string =>
  '/api/rekrutteringstreff/tittel/valider'; // Justert endepunkt for klarhet

export const useRekruttteringstreffTittelValidering = (
  tittelInput: string | undefined,
): SWRResponse<RekrutteringstreffTittelValideringResponsDto, Error> => {
  const key = tittelInput
    ? [rekrutteringstreffTittelValideringEndepunkt(), tittelInput]
    : null;

  const fetcher = async (
    swrKey: string[],
  ): Promise<RekrutteringstreffTittelValideringResponsDto> => {
    const tittelForApiKall = swrKey[1];

    if (typeof tittelForApiKall !== 'string' || !tittelForApiKall) {
      throw new Error(
        'SWR fetcher for rekrutteringstreff tittelvalidering kalt med ugyldig tittel fra nøkkel.',
      );
    }

    const requestData: RekrutteringstreffTittelValideringRequestDto = {
      tittel: tittelForApiKall,
      beskrivelse: null,
    };
    RekrutteringstreffTittelValideringRequestDtoSchema.parse(requestData);

    const apiResponse = await postApi(
      rekrutteringstreffTittelValideringEndepunkt(),
      requestData,
    );

    return RekrutteringstreffTittelValideringResponsDtoSchema.parse(
      apiResponse,
    );
  };

  const swrResponse = useSWR<
    RekrutteringstreffTittelValideringResponsDto,
    Error
  >(key, fetcher, {});

  return swrResponse;
};

export const rekrutteringstreffTittelValideringMirageMock = (
  server: any,
): void => {
  server.post(rekrutteringstreffTittelValideringEndepunkt(), () => {
    return validerRekrutteringstreffMock();
  });
};
