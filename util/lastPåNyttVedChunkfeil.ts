const SIST_OMLASTET_NØKKEL = 'sist-omlastet-etter-chunkfeil';
// Feiler det igjen innen sperretiden etter en omlasting, vises vanlig feilside i stedet.
const SPERRETID_MS = 5 * 60 * 1000;

type Lagring = Pick<Storage, 'getItem' | 'setItem'>;

interface Avhengigheter {
  lagring: Lagring;
  lastPåNytt: () => void;
  nå: () => number;
}

export function erChunkfeil(feil: unknown): boolean {
  if (typeof feil !== 'object' || feil === null) return false;
  const { name, message } = feil as { name?: unknown; message?: unknown };
  if (name === 'ChunkLoadError') return true;
  return (
    typeof message === 'string' &&
    (message.includes('Failed to load chunk') ||
      /Loading (CSS )?chunk .+ failed/.test(message))
  );
}

export function kanLastePåNytt(
  sistOmlastet: string | null,
  nå: number,
): boolean {
  const tidspunkt = Number(sistOmlastet);
  if (!sistOmlastet || !Number.isFinite(tidspunkt)) return true;
  return nå - tidspunkt >= SPERRETID_MS || tidspunkt > nå;
}

function nettleseravhengigheter(): Avhengigheter | null {
  if (typeof window === 'undefined') return null;
  try {
    return {
      lagring: window.sessionStorage,
      lastPåNytt: () => window.location.reload(),
      nå: Date.now,
    };
  } catch {
    return null;
  }
}

// Etter en deploy finnes ikke gamle kodefiler lenger; én omlasting henter nye. Sperren hindrer løkke.
export function lastPåNyttVedChunkfeil(
  feil: unknown,
  avhengigheter: Avhengigheter | null = nettleseravhengigheter(),
): boolean {
  if (!avhengigheter || !erChunkfeil(feil)) return false;
  const { lagring, lastPåNytt, nå } = avhengigheter;

  try {
    const tidspunkt = nå();
    if (!kanLastePåNytt(lagring.getItem(SIST_OMLASTET_NØKKEL), tidspunkt)) {
      return false;
    }
    lagring.setItem(SIST_OMLASTET_NØKKEL, String(tidspunkt));
  } catch {
    // Uten sessionStorage kan vi ikke hindre en løkke, så vi lar være å laste på nytt.
    return false;
  }

  lastPåNytt();
  return true;
}
