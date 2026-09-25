import { FjernEierRequestBody } from './FjernEierRequestBody';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { deleteApi, putApi } from '@/app/api/fetcher';

export const leggTilMegSomEier = async (
  rekrutteringstreffId: string,
  eierNavn?: string,
  kontorNavn?: string,
): Promise<void> => {
  await putApi(
    `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/eiere/meg`,
    {
      ...(eierNavn ? { eierNavn } : {}),
      ...(kontorNavn ? { kontorNavn } : {}),
    },
  );
};

export const fjernEier = async (
  rekrutteringstreffId: string,
  navIdent: string,
  kontorNavn?: string,
): Promise<void> => {
  await deleteApi(
    `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/eiere/${encodeURIComponent(navIdent)}`,
    kontorNavn ? new FjernEierRequestBody(kontorNavn) : undefined,
  );
};
