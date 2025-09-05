import { StillingsSøkAPI } from '@/app/api/api-routes';
import { proxyWithOBO } from '@/app/api/oboProxy';
import { isLocal } from '@/util/env';
import {
  formaterStedsnavn,
  fylkesnavnTilKode,
} from '@/util/fylkeOgKommuneMapping';
import { RekbisError } from '@/util/rekbisError';
import { NextRequest, NextResponse } from 'next/server';

interface ESCombinedBody {
  treff: any;
  aggs: any;
}

function byggKombinertQuery(treff: any, aggs: any) {
  const treffClone = { ...(treff || {}) };
  const aggsNode = aggs?.aggs || aggs?.aggregations || {};
  const merged = { ...treffClone, aggs: aggsNode };
  if (merged.track_total_hits === undefined) merged.track_total_hits = true;
  return merged;
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

  const mergedQuery = byggKombinertQuery(body.treff, body.aggs);

  // Lokal enkel basic auth
  if (isLocal && process.env.STILLING_ES_PASSWORD) {
    const authHeader = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${process.env.STILLING_ES_USERNAME}:${process.env.STILLING_ES_PASSWORD}`).toString('base64')}`,
    };
    try {
      const res = await fetch(`${process.env.STILLING_ES_URI}`, {
        method: 'POST',
        headers: authHeader,
        body: JSON.stringify(mergedQuery),
      });
      if (!res.ok) {
        const txt = await res.text();
        return NextResponse.json(
          { error: `Kombinert spørring feilet: ${res.status}`, body: txt },
          { status: res.status },
        );
      }
      const data = await res.json();
      return NextResponse.json(byggRespons(data, data));
    } catch (e: any) {
      new RekbisError({
        message: 'Nettverksfeil lokalt kombinert søk',
        error: e,
      });
      return NextResponse.json(
        { error: 'Nettverksfeil lokalt kombinert søk' },
        { status: 500 },
      );
    }
  }

  // PROD / miljø: OBO-token + ett kall
  const correlationId = crypto.randomUUID();
  try {
    const proxyRes = await proxyWithOBO(
      StillingsSøkAPI,
      req,
      StillingsSøkAPI.api_route,
      mergedQuery,
    );
    // proxyWithOBO returnerer allerede JSON-respons eller error; vi må pakke om suksess til vårt combined-format
    if (!proxyRes.ok) {
      return proxyRes; // feilformat håndteres av proxy
    }
    let raw: any;
    try {
      raw = await proxyRes.json();
    } catch (e: any) {
      return NextResponse.json(
        { error: 'Klarte ikke parse JSON', original: e?.message },
        { status: 502 },
      );
    }
    try {
      return NextResponse.json(byggRespons(raw, raw));
    } catch (mapErr: any) {
      new RekbisError({
        message: 'Feil ved mapping av combined respons',
        error: mapErr,
      });
      return NextResponse.json(
        { error: 'Feil ved mapping av respons', original: mapErr?.message },
        { status: 500 },
      );
    }
  } catch (error: any) {
    new RekbisError({ message: 'Feil i kombinert stillingssøk', error });
    return NextResponse.json(
      { error: 'Uventet feil i kombinert stillingssøk', correlationId },
      { status: 500 },
    );
  }
}

function byggRespons(treffData: any, aggsData: any) {
  const aggs = aggsData?.aggregations?.globalAggregering;
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
    statusBuckets = statusKoder;
  }
  const stillingskategoriBuckets: Array<{ key: string; doc_count: number }> =
    aggs?.stillingskategori?.koder?.buckets || [];
  const geografiAggs = aggs?.geografi?.nested_geografi;
  const antall = aggs
    ? {
        statusBuckets: statusBuckets.map((b) => ({
          key: b.key,
          count: b.doc_count,
        })),
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

function mapGeografiBuckets(geografiAggs: any) {
  if (!geografiAggs) return { fylker: [], kommuner: [] };
  const fylker =
    geografiAggs?.fylker?.buckets?.map((b: any) => {
      const idBuckets = b?.stillinger?.ids?.buckets;
      const parentDocCount = b?.stillinger?.doc_count;
      const uniqueCount =
        typeof parentDocCount === 'number'
          ? parentDocCount
          : Array.isArray(idBuckets)
            ? idBuckets.length
            : b.doc_count;
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
              : b.doc_count;
        fylker.push({
          key: kode,
          count: initialCount,
          _ids: new Set(bucketIds),
        });
      }
    });
  }
  const rensetFylker = fylker
    .filter((f: any) => String(f.key) !== '')
    .map((f: any) => ({ key: f.key, count: f.count }));
  return { fylker: rensetFylker, kommuner };
}
