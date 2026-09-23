import { skalMocke } from '@/util/env';
import { startMswInstrumentering } from '@navikt/toi-next-frontend/next';

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  if (skalMocke) {
    await startMswInstrumentering({
      hentServer: async () => (await import('@/mocks/server')).server,
    });
  }
}
