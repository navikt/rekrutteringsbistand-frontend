'use client';

interface ElasticQuery {
  aggs?: Record<string, unknown>;
  aggregations?: Record<string, unknown>;
  track_total_hits?: boolean;
  [key: string]: unknown;
}

// Klientvennlig funksjon som bare merger treff- og aggs-spørringer til ett ES-kall
export function byggKombinertQuery(
  treff: ElasticQuery | null | undefined,
  aggs: ElasticQuery | null | undefined,
) {
  const treffClone = { ...(treff || {}) };
  const aggsNode = aggs?.aggs || aggs?.aggregations || {};
  const merged = { ...treffClone, aggs: aggsNode };
  if (merged.track_total_hits === undefined) merged.track_total_hits = true;
  return merged;
}
