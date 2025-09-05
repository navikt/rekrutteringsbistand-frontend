import { StillingsSøkAPI } from '@/app/api/api-routes';
import { proxyWithOBO } from '@/app/api/oboProxy';
import { isLocal } from '@/util/env';
import { NextRequest, NextResponse } from 'next/server';

// Endepunkt: /api/stillings-sok/esAggs
// Forventer en body (ElasticSearch DSL) og proxier videre for kun aggregeringer (size:0)
export async function POST(req: NextRequest) {
  if (isLocal && process.env.STILLING_ES_PASSWORD) {
    const body = await req.json();
    const response = await fetch(`${process.env.STILLING_ES_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${process.env.STILLING_ES_USERNAME}:${process.env.STILLING_ES_PASSWORD}`).toString('base64')}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `Request failed with status ${response.status}: ${errorText}`,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  }

  // Sørg for at upstream-path ikke får /esAggs suffix
  return proxyWithOBO(StillingsSøkAPI, req, StillingsSøkAPI.api_route);
}
