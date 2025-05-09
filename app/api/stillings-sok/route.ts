import { isLocal } from '../../../util/env';
import { StillingsSøkAPI } from '../api-routes';
import { proxyWithOBO } from '../oboProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Brukes for å gå rett mot stillingssøk lokalt
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
  return proxyWithOBO(StillingsSøkAPI, req);
}
