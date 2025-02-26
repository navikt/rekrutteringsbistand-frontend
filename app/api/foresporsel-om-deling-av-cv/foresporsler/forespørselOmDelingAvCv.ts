import { ForespørselDelingAvCvAPI } from '../../api-routes';
import { postApi } from '../../fetcher';

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
  );
};
