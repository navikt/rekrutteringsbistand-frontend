import { leggTilAntall } from './elastic-search/aggregation-utils';
import { StillingsSøkAPI } from '@/app/api/api-routes';
import { proxyWithOBO } from '@/app/api/oboProxy';
import { isLocal } from '@/util/env';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Utfører ElasticSearch søk kun for aggregeringer (antall/counts)
 */
async function søkEtterAntall(req: NextRequest, body: any) {
  // Modifiser body for å kun hente aggregeringer - sett size til 0 for å ikke hente hits
  const antallBody = {
    ...body,
    size: 0, // Kun aggregeringer, ikke hits
    from: 0,
  };

  // Brukes for å gå rett mot stillingssøk lokalt
  if (isLocal && process.env.STILLING_ES_PASSWORD) {
    const response = await fetch(`${process.env.STILLING_ES_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${process.env.STILLING_ES_USERNAME}:${process.env.STILLING_ES_PASSWORD}`).toString('base64')}`,
      },
      body: JSON.stringify(antallBody),
    });

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${await response.text()}`,
      );
    }

    const data = await response.json();
    return leggTilAntall(data);
  }

  // Proxy via OBO for ikke-lokale miljøer - send pre-parsed body
  const res = await proxyWithOBO(StillingsSøkAPI, req, undefined, antallBody);
  if (!res.ok) {
    throw new Error(`Proxy request failed with status ${res.status}`);
  }

  const json = await res.json();
  return leggTilAntall(json);
}

/**
 * Utfører ElasticSearch søk kun for hits (resultater)
 */
async function søkEtterHits(req: NextRequest, body: any) {
  // Modifiser body for å kun hente hits - fjern aggregeringer for å redusere størrelse
  const hitsBody = {
    ...body,
    aggs: undefined, // Fjern aggregeringer for å redusere response størrelse
  };

  // Brukes for å gå rett mot stillingssøk lokalt
  if (isLocal && process.env.STILLING_ES_PASSWORD) {
    const response = await fetch(`${process.env.STILLING_ES_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${process.env.STILLING_ES_USERNAME}:${process.env.STILLING_ES_PASSWORD}`).toString('base64')}`,
      },
      body: JSON.stringify(hitsBody),
    });

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${await response.text()}`,
      );
    }

    return await response.json();
  }

  // Proxy via OBO for ikke-lokale miljøer - send pre-parsed body
  const res = await proxyWithOBO(StillingsSøkAPI, req, undefined, hitsBody);
  if (!res.ok) {
    throw new Error(`Proxy request failed with status ${res.status}`);
  }

  return await res.json();
}

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

    try {
      // Utfør to separate kall parallelt
      const [antallResult, hitsResult] = await Promise.all([
        søkEtterAntall(req, body),
        søkEtterHits(req, body),
      ]);

      // Kombiner resultatene i ett objekt
      const combinedResult = {
        antall: antallResult.antall,
        tookTreff: hitsResult.took,
        tookAggs: antallResult.tookAggs || antallResult.took,
        hits: hitsResult.hits,
        _shards: hitsResult._shards,
        timed_out: hitsResult.timed_out,
        took: Math.max(hitsResult.took || 0, antallResult.took || 0),
      };

      return NextResponse.json(combinedResult);
    } catch (searchError) {
      return NextResponse.json(
        {
          error: `Search failed: ${searchError instanceof Error ? searchError.message : 'Unknown search error'}`,
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
