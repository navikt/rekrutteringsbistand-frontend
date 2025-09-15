import { StillingsSøkAPI } from '@/app/api/api-routes';
import { proxyWithOBO } from '@/app/api/oboProxy';
import { isLocal } from '@/util/env';
import {
  formaterStedsnavn,
  fylkesnavnTilKode,
} from '@/util/fylkeOgKommuneMapping';
import { NextRequest, NextResponse } from 'next/server';

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

function leggTilAntall(data: any) {
  if (data?.antall || !data?.aggregations?.globalAggregering) return data;
  const aggs = data.aggregations.globalAggregering;
  // Visningsstatus (filters)
  let statusBuckets: Array<{ key: string; doc_count: number }> = [];
  const statusKoder = aggs?.visningsstatus?.koder?.buckets;
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
  const antall = {
    visningsStatusBuckets: statusBuckets.map((b) => ({
      key: b.key,
      count: b.doc_count,
    })),
    stillingskategoriBuckets: stillingskategoriBuckets.map((b) => ({
      key: b.key,
      count: b.doc_count,
    })),
    geografi: mapGeografiBuckets(geografiAggs),
  };
  return {
    ...data,
    antall,
    tookTreff: data?.took,
    tookAggs: data?.took,
  };
}

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

    return NextResponse.json(leggTilAntall(data));
  }
  const res = await proxyWithOBO(StillingsSøkAPI, req);
  if (!res.ok) return res;
  try {
    const json = await res.json();
    return NextResponse.json(leggTilAntall(json));
  } catch {
    return res;
  }
}
