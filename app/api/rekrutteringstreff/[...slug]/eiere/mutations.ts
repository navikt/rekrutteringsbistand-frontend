import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';

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
