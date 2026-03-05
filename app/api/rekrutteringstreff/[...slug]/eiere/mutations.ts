import { RekrutteringstreffAPI } from '@/app/api/api-routes';

const eiereUrl = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/eiere/meg`;

export const leggTilMegSomEier = async (
  rekrutteringstreffId: string,
): Promise<number> => {
  const response = await fetch(eiereUrl(rekrutteringstreffId), {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok)
    throw new Error(`Feil ved lagring av eier: ${response.status}`);
  return response.status;
};
