import { logger } from '@navikt/next-logger';
import { getToken, requestOboToken, TokenResult } from '@navikt/oasis';
import { isLocal } from '../../util/env';

interface hentOboTokenProps {
  headers: Headers;
  scope: string;
}

export const hentOboToken = async (
  props: hentOboTokenProps,
): Promise<TokenResult> => {
  const token = isLocal ? 'DEV' : getToken(props.headers);
  if (!token) {
    logger.warn('Kunne ikke hente token');
    return {
      ok: false,
      error: new Error('Kunne ikke hente token'),
    };
  }
  let obo: TokenResult;
  try {
    obo = isLocal
      ? ({ ok: true, token: 'DEV' } as TokenResult)
      : await requestOboToken(token, props.scope);

    if (!obo.ok || !obo.token) {
      logger.error('Ugyldig OBO-token mottatt:', obo);
      return {
        ok: false,
        error: new Error('Ugyldig OBO-token mottatt'),
      };
    }

    return obo;
  } catch (error) {
    logger.error('Feil ved henting av OBO-token:', error);
    return {
      ok: false,
      error: new Error('Kunne ikke hente OBO-token'),
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

  // Filter out AMP_ cookies
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
