import { leggTilAntall } from './elastic-search/aggregation-utils';
import { StillingsSøkAPI } from '@/app/api/api-routes';
import { proxyWithOBO } from '@/app/api/oboProxy';
import { isLocal } from '@/util/env';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Brukes for å gå rett mot stillingssøk lokalt
    if (isLocal && process.env.STILLING_ES_PASSWORD) {
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
      return NextResponse.json(leggTilAntall(data));
    }

    // Proxy via OBO for ikke-lokale miljøer (ett enkelt kall)
    const res = await proxyWithOBO(StillingsSøkAPI, req);
    if (!res.ok) {
      return NextResponse.json(
        { error: `Proxy request failed with status ${res.status}` },
        { status: res.status },
      );
    }

    try {
      const json = await res.json();
      return NextResponse.json(leggTilAntall(json));
    } catch {
      return res;
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: `Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 },
    );
  }
}
