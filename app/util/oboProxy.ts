import { getToken, OboResult, requestOboToken } from '@navikt/oasis';
import { headers as nextHeaders } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const proxyWithOBO = async (
  url: string | undefined,
  audience: string,
  req: NextRequest
) => {
  const token = getToken(nextHeaders());

  if (!url) {
    return NextResponse.json(
      { error: 'Ingen url oppgitt for proxy' },
      { status: 500 }
    );
  }
  if (!token) {
    return NextResponse.json(
      { error: 'Kunne ikke hente token' },
      { status: 500 }
    );
  }

  let obo: OboResult;
  try {
    obo = await requestOboToken(token, audience);
  } catch (error) {
    console.error('Feil ved henting av OBO-token:', error);
    return NextResponse.json(
      { error: 'Kunne ikke hente OBO-token' },
      { status: 500 }
    );
  }

  if (!obo.ok || !obo.token) {
    console.log('🎺 ', obo);
    return NextResponse.json(
      { error: 'Ugyldig OBO-token mottatt' },
      { status: 500 }
    );
  }

  const originalUrl = new URL(req.url);
  const newUrl = `${url}${originalUrl.pathname}${originalUrl.search}`;

  try {
    const originalHeaders = new Headers(req.headers);
    originalHeaders.set('Authorization', `Bearer ${obo.token}`);
    originalHeaders.set('Content-Type', 'application/json');

    const fetchOptions: RequestInit = {
      method: req.method,
      headers: originalHeaders,
    };

    if (req.method === 'POST' || req.method === 'PUT') {
      const body = await new Response(req.body).json();
      if (body) {
        fetchOptions.body = JSON.stringify(body);
      }
    }

    const response = await fetch(newUrl, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Feil ved proxying av forespørselen:', error);
    return NextResponse.json(
      {
        error: 'En feil oppstod under behandlingen av forespørselen',
      },
      { status: 500 }
    );
  }
};
