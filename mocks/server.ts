import { mswHandlers } from './handlers';
import { setupServer } from 'msw/node';

const globalForMsw = globalThis as unknown as {
  __mswServer: ReturnType<typeof setupServer> | undefined;
};

if (!globalForMsw.__mswServer) {
  globalForMsw.__mswServer = setupServer(...mswHandlers);
} else {
  globalForMsw.__mswServer.resetHandlers(...mswHandlers);
}

export const server = globalForMsw.__mswServer;
