import { RekrutteringstreffAPI } from '@/app/api/api-routes';

export const leggTilMittKontor = async (
  rekrutteringstreffId: string,
): Promise<number> => {
  const response = await fetch(
    `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/kontorer/mitt`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(30000),
    },
  );
  if (!response.ok)
    throw new Error(`Feil ved lagring av kontor: ${response.status}`);
  return response.status;
};
