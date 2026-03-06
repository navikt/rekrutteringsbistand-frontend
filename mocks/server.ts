import { mswHandlers } from './handlers';
import { setupServer } from 'msw/node';

const globalForMsw = globalThis as unknown as {
  __mswServer: ReturnType<typeof setupServer> | undefined;
};

if (globalForMsw.__mswServer) {
  try {
    globalForMsw.__mswServer.close();
  } catch {}
  globalForMsw.__mswServer = setupServer(...mswHandlers);
  globalForMsw.__mswServer.listen({ onUnhandledRequest: 'bypass' });
  console.log('MSW re-startet etter HMR');
} else {
  globalForMsw.__mswServer = setupServer(...mswHandlers);
}

export const server = globalForMsw.__mswServer;
