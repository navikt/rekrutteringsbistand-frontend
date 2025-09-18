import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const søkeord = req.nextUrl.searchParams.get('q');
  const id = nanoid();
  const response = await fetch(
    `${process.env.PAM_SEARCH_URL}/underenhet/_search?q=${encodeURIComponent(søkeord || '')}`,
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
