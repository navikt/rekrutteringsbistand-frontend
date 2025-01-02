import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const søkeord = req.nextUrl.searchParams.get('q');
  const id = nanoid();
  const response = await fetch(
    `${process.env.PAM_ONTOLOGI_URL}/rest/typeahead/stilling?stillingstittel=${søkeord}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache, no-store',
        'Nav-CallId': id,
      },
    },
  );
  const data = await response.json();
  return NextResponse.json(data);
}
