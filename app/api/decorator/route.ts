import { getToken, requestOboToken } from '@navikt/oasis';
import { NextRequest, NextResponse } from 'next/server';
import { getMiljø } from '../../util/miljø';

export async function GET(req: NextRequest) {
  const url = 'https://modiacontextholder.intern.dev.nav.no/api/decorator';

  const token = getToken(req);

  if (!token) {
    return NextResponse.json(
      { error: 'Klarte ikke hente token' },
      { status: 500 }
    );
  }
  const obo = await requestOboToken(token, getMiljø());

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `${obo}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in proxying request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 }
    );
  }
}
