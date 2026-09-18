const globalForMsw = globalThis as unknown as {
  __mswListening?: boolean;
  __mswFetchGuarded?: boolean;
  __mswDefinePropertyGuarded?: boolean;
  __mswReinitializing?: boolean;
  __mswInstallingFetchGuard?: boolean;
  __mswOriginalDefineProperty?: typeof Object.defineProperty;
  __mswServer?: {
    close: () => void;
    listen: (o?: Record<string, unknown>) => void;
  };
};

function reetablerMsw() {
  if (globalForMsw.__mswReinitializing || !globalForMsw.__mswListening) return;

  globalForMsw.__mswReinitializing = true;
  const server = globalForMsw.__mswServer;

  try {
    server?.close();
    server?.listen({ onUnhandledRequest: 'bypass' });
    console.warn('MSW re-etablert etter fetch-endring (HMR)');
  } finally {
    globalForMsw.__mswFetchGuarded = false;
    installFetchGuard();
    globalForMsw.__mswReinitializing = false;
  }
}

function installDefinePropertyGuard() {
  if (globalForMsw.__mswDefinePropertyGuarded) return;

  globalForMsw.__mswDefinePropertyGuarded = true;
  globalForMsw.__mswOriginalDefineProperty = Object.defineProperty;

  Object.defineProperty = function (target, property, attributes) {
    const result = globalForMsw.__mswOriginalDefineProperty!(
      target,
      property,
      attributes,
    );

    if (
      target === globalThis &&
      property === 'fetch' &&
      !globalForMsw.__mswInstallingFetchGuard
    ) {
      reetablerMsw();
    }

    return result;
  };
}

function installFetchGuard() {
  if (globalForMsw.__mswFetchGuarded) return;

  globalForMsw.__mswFetchGuarded = true;
  let currentFetch = globalThis.fetch;

  globalForMsw.__mswInstallingFetchGuard = true;
  Object.defineProperty(globalThis, 'fetch', {
    get() {
      return currentFetch;
    },
    set(newFetch: typeof fetch) {
      currentFetch = newFetch;
      reetablerMsw();
    },
    configurable: true,
    enumerable: true,
  });
  globalForMsw.__mswInstallingFetchGuard = false;
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
    installDefinePropertyGuard();
    installFetchGuard();
    console.log('MSW node-server startet');
  }
}
