const globalForMsw = globalThis as unknown as {
  __mswListening?: boolean;
  __originalFetch?: typeof fetch;
};

function patchFetchMedMockRetry() {
  if (globalForMsw.__originalFetch) return;
  const originalFetch = globalThis.fetch;
  globalForMsw.__originalFetch = originalFetch;

  globalThis.fetch = async function mswSafeFetch(
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.href
          : input.url;
    const erMock = url.includes('mock-api');

    const maksAntallForsøk = erMock ? 3 : 1;
    let sisteFeil: unknown;

    for (let forsøk = 0; forsøk < maksAntallForsøk; forsøk++) {
      try {
        if (forsøk > 0) {
          await new Promise((r) => setTimeout(r, 100 * forsøk));
        }
        return await originalFetch(input, init);
      } catch (error) {
        sisteFeil = error;
        if (!erMock) throw error;
        console.warn(
          `MSW fetch forsøk ${forsøk + 1}/${maksAntallForsøk} feilet:`,
          url,
        );
      }
    }
    throw sisteFeil;
  } as typeof fetch;
}

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (globalForMsw.__mswListening) return;

  const testMode = process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE === 'true';
  const isLocal = process.env.NEXT_PUBLIC_DEVELOPER === 'local';

  if (testMode || isLocal) {
    const { server } = await import('@/mocks/server');
    server.listen({ onUnhandledRequest: 'bypass' });
    globalForMsw.__mswListening = true;
    patchFetchMedMockRetry();
    console.log('MSW node-server startet');
  }
}
