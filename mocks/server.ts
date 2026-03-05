import { mswHandlers } from './handlers';
import { setupServer } from 'msw/node';

const globalForMsw = globalThis as unknown as {
  __mswServer: ReturnType<typeof setupServer> | undefined;
  __mswListening?: boolean;
};

if (globalForMsw.__mswServer) {
  globalForMsw.__mswServer.resetHandlers(...mswHandlers);
  console.log('MSW handlere oppdatert etter HMR');
} else {
  globalForMsw.__mswServer = setupServer(...mswHandlers);
}

export const server = globalForMsw.__mswServer;
