const SIST_OMLASTET_NØKKEL = 'sist-omlastet-etter-chunkfeil';
const SPERRETID_MS = 10_000;

// Etter en deploy finnes ikke gamle kodefiler lenger; én omlasting henter nye. Sperren hindrer løkke.
export function lastPåNyttVedChunkfeil(feil: unknown): boolean {
  if (typeof window === 'undefined') return false;
  if (!(feil instanceof Error) || feil.name !== 'ChunkLoadError') return false;

  const sistOmlastet = Number(sessionStorage.getItem(SIST_OMLASTET_NØKKEL));
  if (Date.now() - sistOmlastet < SPERRETID_MS) return false;

  sessionStorage.setItem(SIST_OMLASTET_NØKKEL, String(Date.now()));
  window.location.reload();
  return true;
}
