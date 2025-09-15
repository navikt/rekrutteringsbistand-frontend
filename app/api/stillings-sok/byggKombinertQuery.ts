'use client';

// Klientvennlig funksjon som bare merger treff- og aggs-spørringer til ett ES-kall
export function byggKombinertQuery(treff: any, aggs: any) {
  const treffClone = { ...(treff || {}) };
  const aggsNode = aggs?.aggs || aggs?.aggregations || {};
  const merged = { ...treffClone, aggs: aggsNode };
  if (merged.track_total_hits === undefined) merged.track_total_hits = true;
  return merged;
}
