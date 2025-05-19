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
      const { status, statusText, url, ok, headers } = response;
      const responseClone = response.clone(); // Clone before consuming

      let errorContent;
      const contentType = headers.get('content-type');

      try {
        if (contentType && contentType.includes('application/json')) {
          // For JSON responses
          const errorData = await responseClone.json();
          errorContent = errorData;
        } else {
          // For text/other responses
          const text = await responseClone.text();
          errorContent = { message: text || 'No error message provided' };
        }
      } catch (error) {
        // Log the specific error for debugging
        logger.error({ error }, 'Failed to parse error response in proxy');

        // Attempt to read the body as text as a last resort
        try {
          const backupText = await response.clone().text();
          errorContent = {
            message: backupText || 'Could not parse response',
            parseError: true,
          };
        } catch {
          // If all reading attempts fail
          errorContent = {
            message: 'Failed to read error response body',
            status,
            statusText,
          };
        }
      }

      logger.error(
        {
          headers,
          status,
          statusText,
          url,
          tilUrl: requestUrl,
          fraUrl: originalUrl,
          ok,
          errorContent,
        },
        'Responsen er ikke OK i proxy',
      );

      // For 409 specifically, provide more context
      if (status === 409) {
        return NextResponse.json(
          {
            beskrivelse:
              'Konflikt oppdaget. Ressursen kan være låst eller endret av en annen bruker.',
            details: errorContent,
          },
          { status: status },
        );
      }

      // Return a new NextResponse with the error data
      return NextResponse.json(errorContent, { status: status });
    }

    // Continue with successful response handling
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      // Handle non-JSON responses (empty body, text, etc.)
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
    return NextResponse.json(
      { beskrivelse: error.message || 'Feil i proxy' },
      { status: error.status || 500 },
    );
  }
};
