import { logger } from '@navikt/next-logger';
import { getToken, requestOboToken, TokenResult } from '@navikt/oasis';
import { NextRequest, NextResponse } from 'next/server';
import { Iroute } from '../app/api/api-routes';
import { isLocal } from './env';

export const proxyWithOBO = async (
  proxy: Iroute,
  req: NextRequest,
  customRoute?: string,
) => {
  const token = isLocal ? 'DEV' : getToken(req.headers);
  if (!proxy.api_url) {
    return NextResponse.json(
      { beskrivelse: 'Ingen url oppgitt for proxy' },
      { status: 500 },
    );
  }
  if (!token) {
    logger.warn('Kunne ikke hente token');
    return NextResponse.json(
      { beskrivelse: 'Kunne ikke hente token' },
      { status: 500 },
    );
  }

  let obo: TokenResult;
  try {
    obo = isLocal
      ? ({ ok: true, token: 'DEV' } as TokenResult)
      : await requestOboToken(token, proxy.scope);
  } catch (error) {
    logger.error('Feil ved henting av OBO-token:', error);
    return NextResponse.json(
      { beskrivelse: 'Kunne ikke hente OBO-token' },
      { status: 500 },
    );
  }

  if (!obo.ok || !obo.token) {
    logger.error('Ugyldig OBO-token mottatt:', obo);
    return NextResponse.json(
      { beskrivelse: 'Ugyldig OBO-token mottatt' },
      { status: 500 },
    );
  }
  const originalUrl = new URL(req.url);

  const path =
    proxy.api_route + originalUrl.pathname.replace(proxy.internUrl, '');
  const newUrl = customRoute
    ? proxy.api_url + customRoute
    : `${proxy.api_url}${path}${originalUrl.search}`;

  const requestUrl = isLocal ? originalUrl : newUrl;

  try {
    const originalHeaders = new Headers(req.headers);
    originalHeaders.set('Authorization', `Bearer ${obo.token}`);
    originalHeaders.set('Content-Type', 'application/json');

    const fetchOptions: any = {
      method: req.method,
      headers: originalHeaders,
    };

    if (req.method === 'POST' || req.method === 'PUT') {
      const body = await new Response(req.body).json();
      if (body) {
        fetchOptions.body = JSON.stringify(body);
      }
    }

    const response = await fetch(requestUrl, fetchOptions);

    if (!response.ok) {
      const { status, statusText, url, body, ok, headers } = response;

      logger.error(
        {
          headers,
          status,
          statusText,
          url,
          tilUrl: requestUrl,
          fraUrl: originalUrl,
          body,
          ok,
        },
        'Responsen er ikke OK i proxy',
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    if (error instanceof Error) {
      logger.error(
        error,
        `Feil ved proxying av forespørselen til url: ${requestUrl} fra url: ${originalUrl}`,
      );
    } else {
      logger.error(
        { msg: 'Unknown error', error },
        `Feil ved proxying av forespørselen til url: ${requestUrl} fra url: ${originalUrl}`,
      );
    }
    return NextResponse.json(
      { beskrivelse: error.message || 'Feil i proxy' },
      { status: error.status || 500 },
    );
  }
};
