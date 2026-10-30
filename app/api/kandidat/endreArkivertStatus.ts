import { KandidatAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';
import { RekbisError } from '@/util/rekbisError';

export const endreArkivertStatus = async (
  kandidatlisteId: string,
  kandidatnr: string,
  arkivert: boolean,
  navKontor?: string,
): Promise<'oppdatert' | 'finnes-ikke'> => {
  try {
    await putApi(
      `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/kandidater/${kandidatnr}/arkivert`,
      { arkivert, navKontor },
      // Utsett logging av 400 til vi vet om kandidaten mangler i listen.
      { skjulFeilmelding: 400 },
    );
    return 'oppdatert';
  } catch (error) {
    if (error instanceof RekbisError && error.statuskode === 400) {
      if (error.details.includes('finnes ikke i arbeidsgivers kandidatliste')) {
        return 'finnes-ikke';
      }
      throw new RekbisError({
        message: error.message,
        statuskode: error.statuskode,
        details: error.details,
        url: error.url,
        error,
      });
    }
    throw error;
  }
};
