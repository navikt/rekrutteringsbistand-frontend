import { leggTilAntall } from './elastic-search/aggregation-utils';
import { StillingsSøkAPI } from '@/app/api/api-routes';
import { proxyWithOBO } from '@/app/api/oboProxy';
import { isLocal } from '@/util/env';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Valider at body inneholder nødvendige felt
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 },
      );
    }

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
    const res = await proxyWithOBO(StillingsSøkAPI, req, undefined, body);
    if (!res.ok) {
      // Prøv å få mer detaljert feilinfo
      try {
        const errorText = await res.text();
        return NextResponse.json(
          {
            error: `Proxy request failed with status ${res.status}: ${errorText}`,
          },
          { status: res.status },
        );
      } catch {
        return NextResponse.json(
          { error: `Proxy request failed with status ${res.status}` },
          { status: res.status },
        );
      }
    }

    try {
      const json = await res.json();
      return NextResponse.json(leggTilAntall(json));
    } catch (parseError) {
      return NextResponse.json(
        {
          error: `JSON parsing failed: ${parseError instanceof Error ? parseError.message : 'Unknown parsing error'}`,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    // Spesifikk håndtering for JSON parsing feil
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: `Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 },
    );
  }
}
