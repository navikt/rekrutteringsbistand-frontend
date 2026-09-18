import { fjernEier } from '@/app/api/rekrutteringstreff/[...slug]/eiere/mutations';
import { expect, test } from '@playwright/test';

for (const status of [200, 204]) {
  test(`sender DELETE med Nav-ident i URL og håndterer tomt ${status}-svar`, async () => {
    const originalFetch = globalThis.fetch;
    const kall: { url: string; init?: RequestInit }[] = [];
    globalThis.fetch = async (input, init) => {
      kall.push({ url: String(input), init });
      return new Response(null, { status });
    };
    try {
      await expect(fjernEier('treff-id', 'TestIdent')).resolves.toBeUndefined();
      expect(kall).toHaveLength(1);
      expect(kall[0].url).toBe(
        '/api/rekrutteringstreff/treff-id/eiere/TestIdent',
      );
      expect(kall[0].init?.method).toBe('DELETE');
      expect(kall[0].init?.credentials).toBe('include');
      expect(kall[0].init?.body).toBeUndefined();
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
}
