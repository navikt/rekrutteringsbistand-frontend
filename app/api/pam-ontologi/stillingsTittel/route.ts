import { skalMocke } from '@/util/env';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const søkeord = req.nextUrl.searchParams.get('q');
  const id = nanoid();
  const requestUrl = skalMocke
    ? `http://mock-api/api/pam-ontologi/stillingsTittel?q=${søkeord}`
    : `${process.env.PAM_ONTOLOGI_URL}/rest/typeahead/stilling?stillingstittel=${søkeord}`;
  const response = await fetch(requestUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache, no-store',
      'Nav-CallId': id,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
