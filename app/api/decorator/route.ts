import { getToken, OboResult, requestOboToken } from '@navikt/oasis';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = process.env.MODIA_CONTEXT_HOLDER_API;

  const token = getToken(headers());

  if (!url) {
    return NextResponse.json(
      {
        error: 'Kunne ikke hente MODIA_CONTEXT_HOLDER_API fra miljøvariablene.',
      },
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
    obo = await requestOboToken(
      token,
      //TODO Bytt ut dev-gcp basert på env.
      'dev-gcp:personoversikt:modiacontextholder'
    );
  } catch (error) {
    console.error('Feil ved henting av OBO-token:', error);
    return NextResponse.json(
      { error: 'Kunne ikke hente OBO-token' },
      { status: 500 }
    );
  }

  if (!obo.ok || !obo.token) {
    return NextResponse.json(
      { error: 'Ugyldig OBO-token mottatt' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${obo.token}`,
        'Content-Type': 'application/json',
      },
    });

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
}
