import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function GET() {
  const id = nanoid();
  const response = await fetch(
    `${process.env.PAM_GEOGRAFI_URL}/rest/typeahead/lokasjoner`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache, no-store',
        'Nav-CallId': id,
      },
    },
  );
  const data = await response.json();
  return NextResponse.json(data);
}
