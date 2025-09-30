import { isLocal } from '@/util/env';
import { RekbisError } from '@/util/rekbisError';
import { logger } from '@navikt/next-logger';
import { getToken, requestOboToken, TokenResult } from '@navikt/oasis';

interface hentOboTokenProps {
  headers: Headers;
  scope: string;
  retryAttempt?: number;
  maxRetries?: number;
}

const DEFAULT_MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

export const hentOboToken = async (
  props: hentOboTokenProps,
): Promise<TokenResult> => {
  const { retryAttempt = 0, maxRetries = DEFAULT_MAX_RETRIES } = props;

  const token = isLocal ? 'DEV' : getToken(props.headers);
  if (!token) {
    return {
      ok: false,
      error: new RekbisError({ message: 'Kunne ikke hente token' }),
    };
  }

  if (isLocal) {
    return { ok: true, token: 'DEV' } as TokenResult;
  }

  try {
    const obo = await requestOboToken(token, props.scope);

    if (!obo.ok || !obo.token) {
      return {
        ok: false,
        error: new RekbisError({
          skjulLogger: true,
          message: 'Ugyldig OBO-token mottatt',
        }),
      };
    }

    // Log success if this was after retries
    if (retryAttempt > 0) {
      logger.info(`OBO token hentet på forsøk ${retryAttempt + 1}`);
    }

    return obo;
  } catch (error) {
    const isLastAttempt = retryAttempt >= maxRetries - 1;

    if (isLastAttempt) {
      // Log som error kun når alle forsøk er brukt opp
      logger.error({
        message: `Kunne ikke hente OBO-token etter ${maxRetries} forsøk`,
        error,
      });
      return {
        ok: false,
        error: new RekbisError({ message: 'Kunne ikke hente OBO-token' }),
      };
    } else {
      // Log som warning for retry-forsøk
      logger.warn({
        message: `OBO token request feilet (forsøk ${retryAttempt + 1}/${maxRetries}), prøver igjen...`,
        error,
      });

      // Vent før retry
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY_MS * (retryAttempt + 1)),
      );

      // Retry med økt attempt-teller
      return hentOboToken({
        ...props,
        retryAttempt: retryAttempt + 1,
        maxRetries,
      });
    }
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
