import { FjernEierRequestBody } from './FjernEierRequestBody';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { deleteApi, putApi } from '@/app/api/fetcher';

export const leggTilMegSomEier = async (
  rekrutteringstreffId: string,
  eierNavn?: string,
): Promise<void> => {
  const navn = eierNavn?.trim();
  await putApi(
    `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/eiere/meg`,
    navn ? { eierNavn: navn } : {},
  );
};

export const fjernEier = async (
  rekrutteringstreffId: string,
  navIdent: string,
  kontorNavn?: string,
): Promise<void> => {
  const navn = kontorNavn?.trim();
  await deleteApi(
    `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/eiere/${encodeURIComponent(navIdent)}`,
    navn ? new FjernEierRequestBody(navn) : undefined,
  );
};
