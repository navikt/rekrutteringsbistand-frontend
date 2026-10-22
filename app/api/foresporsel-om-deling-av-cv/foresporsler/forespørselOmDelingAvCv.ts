import { ForespørselDelingAvCvAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';

export type ForespørselOmDelingAvCvOutboundDto = {
  stillingsId: string;
  svarfrist: string;
  aktorIder: string[];
  navKontor: string;
};

export const sendForespørselOmDelingAvCv = async (
  forespørsel: ForespørselOmDelingAvCvOutboundDto,
): Promise<Response> => {
  return postApi(
    `${ForespørselDelingAvCvAPI.internUrl}/foresporsler`,
    forespørsel,
    // 409 betyr at forespørselen allerede er sendt, og er forventet
    { skjulFeilmelding: 409 },
  );
};

export type ForespørselOmDelingAvCvPåNyttOutboundDto = {
  stillingsId: string;
  svarfrist: string;
  navKontor: string;
};

export const sendNyForespørselOmDelingAvCv = async (
  aktørId: string,
  forespørsel: ForespørselOmDelingAvCvPåNyttOutboundDto,
): Promise<Response> => {
  return postApi(
    `${ForespørselDelingAvCvAPI.internUrl}/foresporsler/kandidat/${aktørId}`,
    forespørsel,
  );
};
