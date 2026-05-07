import { skalMocke } from '@/util/env';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function pamOntologiFetch(
  endepunkt: string,
  søkeord: string | null,
) {
  const id = nanoid();
  const trygtSøkeord = encodeURIComponent(søkeord ?? '');
  const requestUrl = skalMocke
    ? `http://mock-api/api/pam-ontologi/${endepunkt}?q=${trygtSøkeord}`
    : `${process.env.PAM_ONTOLOGI_URL}/rest/typeahead/${endepunkt}?q=${trygtSøkeord}`;
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache, no-store',
      'Nav-CallId': id,
    },
  });
  if (!response.ok) {
    return NextResponse.json([], {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
  const data = await response.json();
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
