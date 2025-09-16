import {
  formaterStedsnavn,
  fylkesnavnTilKode,
} from '@/util/fylkeOgKommuneMapping';

/**
 * Mapper geografi buckets fra ElasticSearch til strukturert format
 */
export function mapGeografiBuckets(geografiAggs: any) {
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

/**
 * Legger til antall aggregering på ElasticSearch respons
 */
export function leggTilAntall(data: any) {
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
