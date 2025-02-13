import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const søkeord = req.nextUrl.searchParams.get('q');
  const id = nanoid();
  const response = await fetch(
    `${process.env.PAM_SEARCH_URL}/underenhet/_search`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache, no-store',
        'Nav-CallId': id,
      },
      body: JSON.stringify({
        query: {
          bool: {
            should: [
              {
                match_phrase: {
                  navn_ngram_completion: {
                    query: søkeord,
                    slop: 5,
                  },
                },
              },
              {
                regexp: {
                  organisasjonsnummer: {
                    value: `${søkeord}.*`,
                  },
                },
              },
            ],
          },
        },
        size: 50,
      }),
    },
  );
  const data = await response.json();
  return NextResponse.json(data);
}
