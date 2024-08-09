import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = 'https://modiacontextholder.intern.dev.nav.no/api/decorator';

  const authHeader = req.headers.get('authorization');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `${authHeader}`,
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
