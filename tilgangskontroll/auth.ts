import { logger } from '@navikt/next-logger';
import { getToken, validateToken } from '@navikt/oasis';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { isLocal } from '../util/env';

export async function verifyAPIAuthenticated(): Promise<boolean> {
  if (isLocal) return true;

  const requestHeaders = headers();
  const token = getToken(requestHeaders);
  if (!token) {
    return false;
  }

  const validationResult = await validateToken(token);
  return validationResult.ok;
}

export async function verifyUserLoggedIn(): Promise<{
  accessToken: string;
}> {
  const requestHeaders = headers();

  if (isLocal) {
    logger.warn('Is running locally, skipping RSC auth');
    return {
      accessToken: 'fake-local-token',
    };
  }

  const redirectPath = requestHeaders.get('x-path');
  if (!redirectPath == null) {
    logger.warn("Missing 'x-path' header, is middleware middlewaring?");
  }
  logger.info(`Redirect path is ${redirectPath}`);

  const token = getToken(requestHeaders);
  if (!token) {
    logger.info('Found no token, redirecting to login');
    redirect(`/oauth2/login?redirect=${redirectPath}`);
  }

  const validationResult = await validateToken(token);
  if (!validationResult.ok) {
    if (validationResult.errorType !== 'token expired') {
      logger.error(
        new Error(
          `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.error.message}, redirecting to login.`,
          { cause: validationResult.error },
        ),
      );
    }

    redirect(`/oauth2/login?redirect=${redirectPath}`);
  }

  return {
    accessToken: token,
  };
}
