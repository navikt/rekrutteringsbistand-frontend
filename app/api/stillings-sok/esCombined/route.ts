import { StillingsSøkAPI } from '@/app/api/api-routes';
import { hentOboToken, setHeaderToken } from '@/app/api/oboToken';
import { isLocal } from '@/util/env';
// Removed unused import
import {
  formaterStedsnavn,
  fylkesnavnTilKode,
} from '@/util/fylkeOgKommuneMapping';
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

    // PROD / ikke-lokal: bruk proxyWithOBO med customRoute = api_route for å unngå /esCombined i upstream-path
    // PROD / ikke-lokal: ett OBO-token, to kall mot upstream /stilling/_search
    const correlationId = crypto.randomUUID();
    const debug = new URL(req.url).searchParams.get('debug') === '1';

    const obo = await hentOboToken({
      headers: req.headers,
      scope: StillingsSøkAPI.scope,
    });
    if (!obo.ok || !obo.token) {
      return NextResponse.json(
        { error: 'Kunne ikke hente OBO-token', correlationId },
        { status: 500 },
      );
    }
    const headers = setHeaderToken({
      headers: req.headers,
      oboToken: obo.token,
    });
    headers.set('content-type', 'application/json');
    headers.set('x-correlation-id', correlationId);

    const baseUrl = `${StillingsSøkAPI.api_url}${StillingsSøkAPI.api_route}`;

    const fetchWithRetry = async (
      payload: any,
      label: string,
      attempts = 2,
    ): Promise<Response> => {
      let lastErr: any;
      for (let i = 0; i < attempts; i++) {
        try {
          const res = await fetch(baseUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
          });
          if (
            !res.ok &&
            (res.status >= 500 || res.status === 429) &&
            i + 1 < attempts
          ) {
            await new Promise((r) => setTimeout(r, 120 * (i + 1)));
            continue;
          }
          return res;
        } catch (e: any) {
          lastErr = e;
          if (i + 1 < attempts) {
            await new Promise((r) => setTimeout(r, 120 * (i + 1)));
            continue;
          }
        }
      }
      throw new RekbisError({
        message: `Nettverksfeil etter retry (${label})`,
        error: lastErr,
        details: debug
          ? JSON.stringify({ correlationId }).slice(0, 800)
          : undefined,
      });
    };

    const treffRes = await fetchWithRetry(body.treff, 'treff');
    if (!treffRes.ok) {
      const txt = await treffRes.text();
      return NextResponse.json(
        {
          error: 'Treff-spørring feilet',
          status: treffRes.status,
          correlationId,
          ...(debug && { body: txt }),
        },
        { status: treffRes.status },
      );
    }
    const aggsRes = await fetchWithRetry(body.aggs, 'aggs');
    if (!aggsRes.ok) {
      const txt = await aggsRes.text();
      return NextResponse.json(
        {
          error: 'Aggregerings-spørring feilet',
          status: aggsRes.status,
          correlationId,
          ...(debug && { body: txt }),
        },
        { status: aggsRes.status },
      );
    }
    let treffData: any;
    let aggsData: any;
    try {
      [treffData, aggsData] = await Promise.all([
        treffRes.json(),
        aggsRes.json(),
      ]);
    } catch (parseErr: any) {
      return NextResponse.json(
        {
          error: 'Klarte ikke parse JSON',
          correlationId,
          ...(debug && { original: parseErr?.message }),
        },
        { status: 502 },
      );
    }
    try {
      return NextResponse.json(byggRespons(treffData, aggsData));
    } catch (mapErr: any) {
      new RekbisError({
        message: 'Feil ved mapping av combined respons',
        error: mapErr,
      });
      return NextResponse.json(
        {
          error: 'Feil ved mapping av respons',
          correlationId,
          ...(debug && { original: mapErr?.message }),
        },
        { status: 500 },
      );
    }
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
  // status.koder er nå en filters-aggregasjon: buckets: { ACTIVE: {doc_count}, ... }
  let statusBuckets: Array<{ key: string; doc_count: number }> = [];
  const statusKoder = aggs?.status?.koder?.buckets;
  if (
    statusKoder &&
    typeof statusKoder === 'object' &&
    !Array.isArray(statusKoder)
  ) {
    statusBuckets = Object.entries(statusKoder).map(([key, val]: any) => ({
      key,
      doc_count: val?.doc_count ?? 0,
    }));
  } else if (Array.isArray(statusKoder)) {
    // fallback hvis format ikke er endret som forventet
    statusBuckets = statusKoder;
  }
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
  // Bygg unik telling per fylke basert på reverse_nested stillinger.ids (dersom tilstede), fall tilbake til doc_count
  const fylker =
    geografiAggs?.fylker?.buckets?.map((b: any) => {
      const idBuckets = b?.stillinger?.ids?.buckets;
      const parentDocCount = b?.stillinger?.doc_count; // reverse_nested gir unike parent docs
      const uniqueCount =
        typeof parentDocCount === 'number'
          ? parentDocCount
          : Array.isArray(idBuckets)
            ? idBuckets.length
            : b.doc_count; // ultimate fallback (kan være overcount)
      const idSet = new Set(
        Array.isArray(idBuckets)
          ? idBuckets.map((ib: any) => ib.key as string)
          : [],
      );
      return { key: b.key, count: uniqueCount, _ids: idSet };
    }) || [];
  const kommuner =
    geografiAggs?.kommuner?.buckets?.map((b: any) => ({
      key: b.key,
      count: b.doc_count,
    })) || [];

  // Slå sammen dokumenter uten countyCode (utenCountyCode.fylker) inn i fylker-listen basert på navn → kode heuristikk
  const utenCountyCodeBuckets: Array<{ key: string; doc_count: number }> =
    geografiAggs?.utenCountyCode?.fylker?.buckets || [];

  if (utenCountyCodeBuckets.length > 0) {
    utenCountyCodeBuckets.forEach((b: any) => {
      const navn = formaterStedsnavn(b.key).toUpperCase();
      const kode = fylkesnavnTilKode(navn);
      if (!kode) return;
      const idBuckets = b?.stillinger?.ids?.buckets;
      const parentDocCount = b?.stillinger?.doc_count;
      const bucketIds: string[] = Array.isArray(idBuckets)
        ? idBuckets.map((ib: any) => ib.key as string)
        : [];
      const eksisterende: any = fylker.find(
        (f: { key: string; _ids?: Set<string> }) =>
          String(f.key) === String(kode),
      );
      if (eksisterende) {
        // Legg til bare nye stillings-id'er for å unngå dobbelttelling dersom samme stilling også har countyCode
        if (bucketIds.length > 0) {
          let nye = 0;
          bucketIds.forEach((id) => {
            if (!eksisterende._ids.has(id)) {
              eksisterende._ids.add(id);
              nye++;
            }
          });
          eksisterende.count += nye;
        } else if (typeof parentDocCount === 'number') {
          // Vi kan ikke dedupe uten ID-liste; anta at reverse_nested teller unike og at disse mangler i eksisterende sett.
          // For sikkerhet: hvis vi allerede har noen id'er, ikke legg til hele parentDocCount blindt.
          if (eksisterende._ids.size === 0) {
            eksisterende.count += parentDocCount;
          }
        }
      } else {
        const initialCount =
          bucketIds.length > 0
            ? bucketIds.length
            : typeof parentDocCount === 'number'
              ? parentDocCount
              : b.doc_count; // fallback
        fylker.push({
          key: kode,
          count: initialCount,
          _ids: new Set(bucketIds),
        });
      }
    });
  }

  // Fjern interne _ids før vi returnerer
  // Fjern bucket med tom key ('') – slike dokumenter (countyCode='') er allerede håndtert via utenCountyCode
  // og slått inn i korrekt fylke basert på navn. Å vise den tomme nøkkelen skaper forvirring.
  const rensetFylker = fylker
    .filter((f: any) => String(f.key) !== '')
    .map((f: any) => ({ key: f.key, count: f.count }));

  return { fylker: rensetFylker, kommuner };
}
