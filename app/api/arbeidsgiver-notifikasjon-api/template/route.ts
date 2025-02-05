import { NextRequest, NextResponse } from 'next/server';
import { ArbeidsgiverNotifikasjonAPI } from '../../api-routes';

export async function GET(req: NextRequest) {
  const response = await fetch(
    `${ArbeidsgiverNotifikasjonAPI.api_url}/template`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache, no-store',
      },
    },
  );
  const data = await response.json();
  return NextResponse.json(data);
}
