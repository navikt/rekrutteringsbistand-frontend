import { Iroute } from './api-routes';
import { hentOboToken, setHeaderToken } from './oboToken';
import { isLocal } from '@/util/env';
import { RekbisError } from '@/util/rekbisError';
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
        new RekbisError({
          message: 'Failed to parse request body as JSON:',
          error,
        });
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

    // Handle 204 No Content responses properly
    if (response.status === 204) {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Continue with successful response handling
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const text = await response.text();
      if (!text || text.trim() === '') {
        // Handle empty responses properly based on status code
        if (response.status === 200) {
          // 200 OK with empty body should return null or empty object
          return NextResponse.json(
            req.method === 'GET' ? null : { success: true },
          );
        } else if (response.status >= 200 && response.status < 300) {
          // Other 2xx responses with empty body
          return new NextResponse(null, {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
          });
        } else {
          // Fallback for other empty responses
          return NextResponse.json(null, { status: response.status });
        }
      }
      try {
        const data = JSON.parse(text);
        return NextResponse.json(data);
      } catch (parseError) {
        // If JSON parsing fails, return the text as-is with proper error
        new RekbisError({
          message: `Failed to parse JSON response from ${requestUrl}`,
          error: parseError,
        });
        return NextResponse.json(
          { beskrivelse: 'Invalid JSON response from backend' },
          { status: 502 },
        );
      }
    } else {
      const text = await response.text();

      // Handle empty text responses properly
      if (
        response.status === 204 ||
        (!text && response.status >= 200 && response.status < 300)
      ) {
        return new NextResponse(null, {
          status: response.status,
          headers: {
            'Content-Type': contentType || 'text/plain',
          },
        });
      }

      return new NextResponse(text || '', {
        status: response.status,
        headers: {
          'Content-Type': contentType || 'text/plain',
        },
      });
    }
  } catch (error: any) {
    if (error instanceof Error) {
      new RekbisError({
        message: `Feil ved proxying av forespørselen til url: ${requestUrl} fra url: ${originalUrl}`,
        error,
      });
    } else {
      new RekbisError({
        error,
        message: `Feil ved proxying av forespørselen til url: ${requestUrl} fra url: ${originalUrl}`,
      });
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
