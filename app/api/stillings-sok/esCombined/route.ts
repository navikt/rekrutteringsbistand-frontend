import { StillingsSøkAPI } from '@/app/api/api-routes';
import { hentOboToken, setHeaderToken } from '@/app/api/oboToken';
import { isLocal } from '@/util/env';
import { RekbisError } from '@/util/rekbisError';
import { NextRequest, NextResponse } from 'next/server';

interface ESCombinedBody {
  treff: any; // ES DSL for treff (med size > 0, uten aggs)
  aggs: any; // ES DSL for aggregeringer (typisk size 0 med aggs)
}

export async function POST(req: NextRequest) {
  let body: ESCombinedBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Ugyldig JSON-body for kombinert stillingssøk' },
      { status: 400 },
    );
  }

  if (!body || typeof body !== 'object' || !body.treff || !body.aggs) {
    return NextResponse.json(
      { error: 'Body må inneholde både "treff" og "aggs"' },
      { status: 400 },
    );
  }

  try {
    if (isLocal && process.env.STILLING_ES_PASSWORD) {
      const authHeader = {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${process.env.STILLING_ES_USERNAME}:${process.env.STILLING_ES_PASSWORD}`).toString('base64')}`,
      };

      const [treffRes, aggsRes] = await Promise.all([
        fetch(`${process.env.STILLING_ES_URI}`, {
          method: 'POST',
          headers: authHeader,
          body: JSON.stringify(body.treff),
        }),
        fetch(`${process.env.STILLING_ES_URI}`, {
          method: 'POST',
          headers: authHeader,
          body: JSON.stringify(body.aggs),
        }),
      ]);

      if (!treffRes.ok) {
        return NextResponse.json(
          { error: `Treff-spørring feilet: ${treffRes.status}` },
          { status: treffRes.status },
        );
      }
      if (!aggsRes.ok) {
        return NextResponse.json(
          { error: `Aggregerings-spørring feilet: ${aggsRes.status}` },
          { status: aggsRes.status },
        );
      }

      const [treffData, aggsData] = await Promise.all([
        treffRes.json(),
        aggsRes.json(),
      ]);

      return NextResponse.json(byggRespons(treffData, aggsData));
    }

    // PROD / ikke-lokal: bruk OBO-token og kall stillingssøk-proxy to ganger
    const obo = await hentOboToken({
      headers: req.headers,
      scope: StillingsSøkAPI.scope,
    });
    if (!obo.ok || !obo.token) {
      return NextResponse.json(
        { error: 'Kunne ikke hente OBO-token' },
        { status: 500 },
      );
    }

    const headers = setHeaderToken({
      headers: req.headers,
      oboToken: obo.token,
    });

    const baseUrl = `${StillingsSøkAPI.api_url}${StillingsSøkAPI.api_route}`; // /stilling/_search

    const [treffRes, aggsRes] = await Promise.all([
      fetch(baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(body.treff),
      }),
      fetch(baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(body.aggs),
      }),
    ]);

    if (!treffRes.ok) {
      return NextResponse.json(
        { error: `Treff-spørring feilet: ${treffRes.status}` },
        { status: treffRes.status },
      );
    }
    if (!aggsRes.ok) {
      return NextResponse.json(
        { error: `Aggregerings-spørring feilet: ${aggsRes.status}` },
        { status: aggsRes.status },
      );
    }

    const [treffData, aggsData] = await Promise.all([
      treffRes.json(),
      aggsRes.json(),
    ]);
    return NextResponse.json(byggRespons(treffData, aggsData));
  } catch (error: any) {
    new RekbisError({ message: 'Feil i kombinert stillingssøk', error });
    return NextResponse.json(
      { error: 'Uventet feil i kombinert stillingssøk' },
      { status: 500 },
    );
  }
}

function byggRespons(treffData: any, aggsData: any) {
  // Alle våre aggregeringer ligger under globalAggregering (definert i buildStandardAggregation)
  const aggs = aggsData?.aggregations?.globalAggregering;
  const statusBuckets: Array<{ key: string; doc_count: number }> =
    aggs?.status?.koder?.buckets || [];
  const stillingskategoriBuckets: Array<{ key: string; doc_count: number }> =
    aggs?.stillingskategori?.koder?.buckets || [];
  const geografiAggs = aggs?.geografi?.nested_geografi; // nested agg flyttet ett nivå ned
  const antall = aggs
    ? {
        statusBuckets:
          statusBuckets?.map((b) => ({ key: b.key, count: b.doc_count })) ?? [],
        stillingskategoriBuckets: stillingskategoriBuckets.map((b) => ({
          key: b.key,
          count: b.doc_count,
        })),
        geografi: mapGeografiBuckets(geografiAggs),
      }
    : {};

  return {
    hits: treffData?.hits ?? {},
    antall,
    tookTreff: treffData?.took,
    tookAggs: aggsData?.took,
  };
}

// mapStatusBuckets fjernet – vi eksponerer bare rå buckets nå

function mapGeografiBuckets(geografiAggs: any) {
  if (!geografiAggs) {
    return { fylker: [], kommuner: [] };
  }
  const fylker =
    geografiAggs?.fylker?.buckets?.map((b: any) => ({
      key: b.key,
      count: b.doc_count,
    })) || [];
  const kommuner =
    geografiAggs?.kommuner?.buckets?.map((b: any) => ({
      key: b.key,
      count: b.doc_count,
    })) || [];
  return { fylker, kommuner };
}
