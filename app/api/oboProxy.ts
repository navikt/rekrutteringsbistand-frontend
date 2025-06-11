import { isLocal } from '../../util/env';
import { Iroute } from './api-routes';
import { hentOboToken, setHeaderToken } from './oboToken';
import { logger } from '@navikt/next-logger';
import { NextRequest, NextResponse } from 'next/server';

export const proxyWithOBO = async (
  proxy: Iroute,
  req: NextRequest,
  customRoute?: string,
  customBody?: any,
) => {
  const obo = await hentOboToken({ headers: req.headers, scope: proxy.scope });
  const originalUrl = new URL(req.url);

  const path =
    proxy.api_route + originalUrl.pathname.replace(proxy.internUrl, '');
  const newUrl = customRoute
    ? proxy.api_url + customRoute
    : `${proxy.api_url}${path}${originalUrl.search}`;

  const requestUrl = isLocal ? originalUrl : newUrl;

  if (!obo.ok) {
    return NextResponse.json(
      { beskrivelse: 'Kunne ikke hente OBO-token' },
      { status: 500 },
    );
  }

  try {
    const nyHeader = setHeaderToken({
      headers: req.headers,
      oboToken: obo.token,
    });

    const fetchOptions: any = {
      method: req.method,
      headers: nyHeader,
    };

    if (req.method === 'POST' || req.method === 'PUT' || customBody) {
      try {
        const body = customBody ?? (await new Response(req.body).json());
        if (body) {
          fetchOptions.body = JSON.stringify(body);
        }
      } catch (error) {
        logger.error('Failed to parse request body as JSON:', error);
        return NextResponse.json(
          { beskrivelse: 'Invalid JSON in request body' },
          { status: 400 },
        );
      }
    }

    const response = await fetch(requestUrl, fetchOptions);

    if (!response.ok) {
      return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }

    // Continue with successful response handling
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const text = await response.text();
      return new NextResponse(text || '', {
        status: response.status,
        headers: {
          'Content-Type': contentType || 'text/plain',
        },
      });
    }
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

    // Use a consistent error response structure matching rekbisError properties
    return NextResponse.json(
      {
        name: 'rekbisError',
        statuskode: error.status || 500,
        tittel: error.tittel || 'Feil i proxy',
        beskrivelse: error.message || 'Feil ved proxying av forespørselen',
        url: requestUrl,
        stack: error.stack || JSON.stringify(error),
      },
      { status: error.status || 500 },
    );
  }
};
