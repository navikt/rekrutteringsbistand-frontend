import {
  erChunkfeil,
  kanLastePåNytt,
  lastPåNyttVedChunkfeil,
} from '@/util/lastPåNyttVedChunkfeil';
import { expect, test } from '@playwright/test';

const NØKKEL = 'sist-omlastet-etter-chunkfeil';
const FEM_MINUTTER = 5 * 60 * 1000;

const turbopackfeil = () =>
  new Error(
    'Failed to load chunk /_next/static/chunks/0abc123.js from module 12345',
  );

const chunkLoadError = () => {
  const feil = new Error('Loading chunk 42 failed.');
  feil.name = 'ChunkLoadError';
  return feil;
};

function lagAvhengigheter(nå = 1_000_000_000) {
  const lagret = new Map<string, string>();
  const avhengigheter = {
    lagring: {
      getItem: (nøkkel: string) => lagret.get(nøkkel) ?? null,
      setItem: (nøkkel: string, verdi: string) => {
        lagret.set(nøkkel, verdi);
      },
    },
    omlastinger: 0,
    tid: nå,
    lastPåNytt: () => {
      avhengigheter.omlastinger++;
    },
    nå: () => avhengigheter.tid,
  };
  return { avhengigheter, lagret };
}

test.describe('erChunkfeil', () => {
  test('kjenner igjen ChunkLoadError fra webpack', () => {
    expect(erChunkfeil(chunkLoadError())).toBe(true);
  });

  test('kjenner igjen "Failed to load chunk" fra Turbopack', () => {
    expect(erChunkfeil(turbopackfeil())).toBe(true);
  });

  test('kjenner igjen "Loading CSS chunk ... failed"', () => {
    expect(erChunkfeil(new Error('Loading CSS chunk 7 failed. (/x.css)'))).toBe(
      true,
    );
  });

  test('kjenner igjen feilobjekter som ikke er Error-instanser', () => {
    expect(
      erChunkfeil({ message: 'Failed to load chunk /_next/static/a.js' }),
    ).toBe(true);
    expect(erChunkfeil({ name: 'ChunkLoadError' })).toBe(true);
  });

  test('ignorerer andre feil og verdier', () => {
    expect(erChunkfeil(new Error('Noe annet gikk galt'))).toBe(false);
    expect(erChunkfeil(new TypeError('Failed to fetch'))).toBe(false);
    expect(erChunkfeil('Failed to load chunk')).toBe(false);
    expect(erChunkfeil(null)).toBe(false);
    expect(erChunkfeil(undefined)).toBe(false);
  });
});

test.describe('kanLastePåNytt', () => {
  const nå = 1_000_000_000;

  test('tillater omlasting når ingen flagg finnes', () => {
    expect(kanLastePåNytt(null, nå)).toBe(true);
  });

  test('sperrer omlasting innenfor sperretiden', () => {
    expect(kanLastePåNytt(String(nå), nå)).toBe(false);
    expect(kanLastePåNytt(String(nå - FEM_MINUTTER + 1), nå)).toBe(false);
  });

  test('tillater omlasting etter sperretiden', () => {
    expect(kanLastePåNytt(String(nå - FEM_MINUTTER), nå)).toBe(true);
  });

  test('tillater omlasting når flagget er ugyldig eller i fremtiden', () => {
    expect(kanLastePåNytt('tull', nå)).toBe(true);
    expect(kanLastePåNytt(String(nå + 1000), nå)).toBe(true);
  });
});

test.describe('lastPåNyttVedChunkfeil', () => {
  test('laster siden på nytt og lagrer tidspunkt ved chunkfeil', () => {
    const { avhengigheter, lagret } = lagAvhengigheter();

    expect(lastPåNyttVedChunkfeil(turbopackfeil(), avhengigheter)).toBe(true);
    expect(avhengigheter.omlastinger).toBe(1);
    expect(lagret.get(NØKKEL)).toBe(String(avhengigheter.tid));
  });

  test('laster ikke på nytt ved andre feil', () => {
    const { avhengigheter, lagret } = lagAvhengigheter();

    expect(lastPåNyttVedChunkfeil(new Error('Annet'), avhengigheter)).toBe(
      false,
    );
    expect(avhengigheter.omlastinger).toBe(0);
    expect(lagret.has(NØKKEL)).toBe(false);
  });

  test('laster bare på nytt én gang når feilen kommer igjen (ingen løkke)', () => {
    const { avhengigheter } = lagAvhengigheter();

    expect(lastPåNyttVedChunkfeil(chunkLoadError(), avhengigheter)).toBe(true);
    avhengigheter.tid += 2_000;
    expect(lastPåNyttVedChunkfeil(chunkLoadError(), avhengigheter)).toBe(false);
    expect(lastPåNyttVedChunkfeil(turbopackfeil(), avhengigheter)).toBe(false);
    expect(avhengigheter.omlastinger).toBe(1);
  });

  test('laster på nytt igjen etter at sperretiden er ute (ny deploy)', () => {
    const { avhengigheter } = lagAvhengigheter();

    lastPåNyttVedChunkfeil(turbopackfeil(), avhengigheter);
    avhengigheter.tid += FEM_MINUTTER;
    expect(lastPåNyttVedChunkfeil(turbopackfeil(), avhengigheter)).toBe(true);
    expect(avhengigheter.omlastinger).toBe(2);
  });

  test('laster ikke på nytt når sessionStorage ikke er tilgjengelig', () => {
    const { avhengigheter } = lagAvhengigheter();
    avhengigheter.lagring.setItem = () => {
      throw new Error('QuotaExceededError');
    };

    expect(lastPåNyttVedChunkfeil(turbopackfeil(), avhengigheter)).toBe(false);
    expect(avhengigheter.omlastinger).toBe(0);
  });

  test('gjør ingenting utenfor nettleseren', () => {
    expect(lastPåNyttVedChunkfeil(turbopackfeil())).toBe(false);
  });
});
