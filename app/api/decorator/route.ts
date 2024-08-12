import { getToken, requestOboToken } from '@navikt/oasis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = 'https://modiacontextholder.intern.dev.nav.no/api/decorator';

  const token = getToken(req);

  if (!token) {
    return NextResponse.json(
      { error: 'Failed to retrieve token' },
      { status: 500 }
    );
  }

  let obo;
  try {
    obo = await requestOboToken(token, 'dev-gcp');
  } catch (error) {
    console.error('Error fetching OBO token:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve OBO token' },
      { status: 500 }
    );
  }

  if (!obo) {
    return NextResponse.json(
      { error: 'Invalid OBO token received' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${obo}`, // Ensure the correct format is used here
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
