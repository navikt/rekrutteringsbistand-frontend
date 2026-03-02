import { isLocal } from '@/util/env';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function GET() {
  const id = nanoid();
  const requestUrl = isLocal
    ? 'http://mock-api/api/pam-geografi/typehead/lokasjoner'
    : `${process.env.PAM_GEOGRAFI_URL}/rest/typeahead/lokasjoner`;
  const response = await fetch(requestUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache, no-store',
      'Nav-CallId': id,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
