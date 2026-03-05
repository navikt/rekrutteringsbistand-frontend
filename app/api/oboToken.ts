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

export const hentOboToken = async (
  props: hentOboTokenProps,
): Promise<TokenResult> => {
  const token = skalMocke ? 'DEV' : getToken(props.headers);
  if (!token) {
    return {
      ok: false,
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
