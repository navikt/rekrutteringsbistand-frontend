import { skalMocke } from '@/util/env';
import { RekbisError } from '@/util/rekbisError';
import { logger } from '@navikt/next-logger';
import {
  getToken,
  requestOboToken,
  TokenResult,
  validateToken,
} from '@navikt/oasis';

interface hentOboTokenProps {
  headers: Headers;
  scope: string;
}

// sesjonUtløpt er true når brukerens eget token mangler eller er ugyldig,
// og ny innlogging derfor vil løse problemet.
// manglerTilgang er true når Entra ID avviser token-vekslingen fordi brukeren
// ikke er i en gruppe med tilgang til målappen (ny innlogging hjelper ikke).
export type OboTokenResultat = TokenResult & {
  sesjonUtløpt?: boolean;
  manglerTilgang?: boolean;
};

// AADSTS50105: brukeren er ikke tildelt en rolle for applikasjonen.
// Texas svarer da med invalid_grant, og feilbeskrivelsen inneholder koden.
const erManglendeTilgang = (feil: unknown): boolean =>
  feil instanceof Error && feil.message.includes('AADSTS50105');

export const hentOboToken = async (
  props: hentOboTokenProps,
): Promise<OboTokenResultat> => {
  const token = skalMocke ? 'DEV' : getToken(props.headers);
  if (!token) {
    return {
      ok: false,
      sesjonUtløpt: true,
      error: new RekbisError({
        message: 'Kunne ikke hente token',
        skjulLogger: true,
      }),
    };
  }

  if (!skalMocke) {
    const validation = await validateToken(token);
    if (!validation.ok) {
      logger.info('Token-validering feilet — bruker blir redirectet til login');
      return {
        ok: false,
        sesjonUtløpt: true,
        error: new RekbisError({
          message: 'Token-validering feilet',
          skjulLogger: true,
        }),
      };
    }
  }

  let obo: TokenResult;
  try {
    obo = skalMocke
      ? ({ ok: true, token: 'DEV' } as TokenResult)
      : await requestOboToken(token, props.scope);

    if (!obo.ok && erManglendeTilgang(obo.error)) {
      logger.info(
        { scope: props.scope },
        'Bruker mangler tilgang til målappen ved OBO-veksling (AADSTS50105)',
      );
      return {
        ok: false,
        manglerTilgang: true,
        error: new RekbisError({
          message: 'Bruker mangler tilgang til målappen',
          statuskode: 403,
          skjulLogger: true,
        }),
      };
    }

    if (!obo.ok || !obo.token) {
      return {
        ok: false,
        error: new RekbisError({
          skjulLogger: true,
          message: 'Ugyldig OBO-token mottatt',
        }),
      };
    }

    return obo;
  } catch {
    logger.info(
      'Kunne ikke hente OBO-token — bruker blir redirectet til login',
    );
    return {
      ok: false,
      error: new RekbisError({
        message: 'Kunne ikke hente OBO-token',
        skjulLogger: true,
      }),
    };
  }
};

interface setHeaderTokenProps {
  headers: Headers;
  oboToken: string;
}

export const setHeaderToken = ({
  headers,
  oboToken,
}: setHeaderTokenProps): Headers => {
  const originalHeaders = new Headers(headers);
  originalHeaders.set('Authorization', `Bearer ${oboToken}`);
  originalHeaders.set('Content-Type', 'application/json');

  // Filtrer ut AMP_-cookies
  const cookie = originalHeaders.get('cookie');
  if (cookie) {
    const filteredCookies = cookie
      .split(';')
      .filter((c) => !c.trim().startsWith('AMP_'))
      .join(';');
    if (filteredCookies) {
      originalHeaders.set('cookie', filteredCookies);
    } else {
      originalHeaders.delete('cookie');
    }
  }
  return originalHeaders;
};
