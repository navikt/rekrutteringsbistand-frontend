import {
  formaterStedsnavn,
  fylkesnavnTilKode,
} from '@/util/fylkeOgKommuneMapping';

interface ESBucket {
  key: string;
  doc_count: number;
  stillinger?: { unique_count?: { value?: number } };
}

interface GeografiAggs {
  fylker?: { buckets?: ESBucket[] };
  kommuner?: { buckets?: ESBucket[] };
  utenCountyCode?: { fylker?: { buckets?: ESBucket[] } };
}

interface ESData {
  antall?: unknown;
  took?: number;
  aggregations?: {
    globalAggregering?: {
      visningsstatus?: {
        koder?: {
          buckets?: ESBucket[] | Record<string, { doc_count: number }>;
        };
      };
      kategori?: {
        buckets?: {
          stilling?: { doc_count: number };
          jobbmesse?: { doc_count: number };
        };
      };
      geografi?: { nested_geografi?: GeografiAggs };
    };
  };
}

/**
 * Mapper geografi buckets fra ElasticSearch til strukturert format
 */
export function mapGeografiBuckets(
  geografiAggs: GeografiAggs | undefined | null,
) {
  if (!geografiAggs) return { fylker: [], kommuner: [] };

  const fylker =
    geografiAggs?.fylker?.buckets?.map((b) => {
      const uniqueCount = b?.stillinger?.unique_count?.value ?? b.doc_count;
      return { key: b.key, count: uniqueCount };
    }) || [];

  const kommuner =
    geografiAggs?.kommuner?.buckets?.map((b) => ({
      key: b.key,
      count: b.doc_count,
    })) || [];

  const utenCountyCodeBuckets: ESBucket[] =
    geografiAggs?.utenCountyCode?.fylker?.buckets || [];

  if (utenCountyCodeBuckets.length > 0) {
    utenCountyCodeBuckets.forEach((b) => {
      const navn = formaterStedsnavn(b.key).toUpperCase();
      const kode = fylkesnavnTilKode(navn);
      if (!kode) return;

      const uniqueCount = b?.stillinger?.unique_count?.value ?? b.doc_count;

      const eksisterende = fylker.find((f) => String(f.key) === String(kode));

      if (eksisterende) {
        eksisterende.count += uniqueCount;
      } else {
        fylker.push({
          key: kode,
          count: uniqueCount,
        });
      }
    });
  }

  const rensetFylker = fylker
    .filter((f) => String(f.key) !== '')
    .map((f) => ({ key: f.key, count: f.count }));

  return { fylker: rensetFylker, kommuner };
}

/**
 * Legger til antall aggregering på ElasticSearch respons
 */
export function leggTilAntall(data: ESData | undefined | null) {
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
    statusBuckets = Object.entries(statusKoder).map(([key, val]) => ({
      key,
      doc_count: val?.doc_count ?? 0,
    }));
  } else if (Array.isArray(statusKoder)) {
    statusBuckets = statusKoder;
  }

  const kategoriBuckets = aggs?.kategori?.buckets || {};

  const geografiAggs = aggs?.geografi?.nested_geografi;

  const antall = {
    visningsStatusBuckets: statusBuckets.map((b) => ({
      key: b.key,
      count: b.doc_count,
    })),
    kategoriBuckets: {
      stilling: kategoriBuckets?.stilling?.doc_count || 0,
      jobbmesse: kategoriBuckets?.jobbmesse?.doc_count || 0,
    },
    geografi: mapGeografiBuckets(geografiAggs),
  };

  return {
    ...data,
    antall,
    tookTreff: data?.took,
    tookAggs: data?.took,
  };
}
