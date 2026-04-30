import { skalMocke } from '@/util/env';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function pamOntologiFetch(path: string) {
  const id = nanoid();
  const requestUrl = skalMocke
    ? `http://mock-api/api/pam-ontologi/${path}`
    : `${process.env.PAM_ONTOLOGI_URL}/rest/typeahead/${path}`;
  const response = await fetch(requestUrl, {
    method: 'GET',
    credentials: 'include',
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
