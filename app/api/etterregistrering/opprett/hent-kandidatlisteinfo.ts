import { KandidatAPI } from '@/app/api/api-routes';
import { KandidatlisteInfoDTO } from '@/app/api/kandidat/useKandidatlisteInfo';
import { RekbisError } from '@/util/rekbisError';

interface hentKandidatlisteInfoProps {
  stillingsId: string;
  reqHeaders: Headers;
}

interface Success {
  success: true;
  data: KandidatlisteInfoDTO;
}

interface Failure {
  success: false;
  error: string;
}

type Result = Success | Failure;

export const hentKandidatlisteInfo = async ({
  stillingsId,
  reqHeaders,
}: hentKandidatlisteInfoProps): Promise<Result> => {
  try {
    // Bruk intern proxy-route slik at OBO-token håndteres sentralt og fungerer lokalt
    const response = await fetch(
      `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatlisteinfo`,
      {
        method: 'GET',
        // Videresend originale headers (inkl. cookies) slik at proxy kan hente token
        headers: reqHeaders,
      },
    );

    if (!response.ok) {
      return {
        success: false,
        error:
          '[Opprett etterregistrering] Feil respons ved henting av kandidatlisteinfo',
      };
    }
    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    new RekbisError({
      message:
        '[Opprett etterregistrering] Feil ved henting av kandidatlisteinfo:',
      error,
    });
    return {
      success: false,
      error:
        '[Opprett etterregistrering] Feil ved henting av kandidatlisteinfo',
    };
  }
};
