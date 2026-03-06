const globalForMsw = globalThis as unknown as {
  __mswListening?: boolean;
  __mswFetchGuarded?: boolean;
  __mswServer?: {
    close: () => void;
    listen: (o?: Record<string, unknown>) => void;
  };
};

function installFetchGuard() {
  if (globalForMsw.__mswFetchGuarded) return;
  globalForMsw.__mswFetchGuarded = true;

  let currentFetch = globalThis.fetch;
  let isReinitializing = false;

  Object.defineProperty(globalThis, 'fetch', {
    get() {
      return currentFetch;
    },
    set(newFetch: typeof fetch) {
      currentFetch = newFetch;

      if (isReinitializing || !globalForMsw.__mswListening) return;

      isReinitializing = true;
      const server = globalForMsw.__mswServer;
      if (server) {
        try {
          server.close();
        } catch {}
        server.listen({ onUnhandledRequest: 'bypass' });
        console.warn('MSW re-etablert etter fetch-endring (HMR)');
      }
      isReinitializing = false;
    },
    configurable: true,
    enumerable: true,
  });
}

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (globalForMsw.__mswListening) return;

  const testMode = process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE === 'true';
  const isLocal = process.env.NEXT_PUBLIC_DEVELOPER === 'local';

  if (testMode || isLocal) {
    const { server } = await import('@/mocks/server');
    globalForMsw.__mswServer = server;
    server.listen({ onUnhandledRequest: 'bypass' });
    globalForMsw.__mswListening = true;
    installFetchGuard();
    console.log('MSW node-server startet');
  }
}
