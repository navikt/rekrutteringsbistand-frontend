'use client';

import Sidelaster from '@/components/layout/Sidelaster';
import { isLocal } from '@/util/env';
import { useEffect, useState } from 'react';

let mswStarted = false;

export default function MSWInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const testMode = process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE === 'true';
    const skalMocke = isLocal || testMode;
    const onUnhandled: 'bypass' | 'warn' | 'error' = skalMocke
      ? 'warn'
      : 'bypass';

    if (!skalMocke) {
      setReady(true);
      return;
    }

    async function start() {
      if (typeof window === 'undefined') {
        // SSR (node) – start server én gang
        if (!(globalThis as any).__mswNodeServerStarted) {
          try {
            const { server } = await import('@/mocks/server');
            server.listen({ onUnhandledRequest: onUnhandled });
            (globalThis as any).__mswNodeServerStarted = true;
            // eslint-disable-next-line no-console
            console.log('MSW node server startet');
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Klarte ikke å starte MSW node server', e);
          }
        }
        setReady(true);
        return;
      }

      if (!mswStarted) {
        try {
          const { worker } = await import('@/mocks/browser');
          await worker.start({ onUnhandledRequest: onUnhandled });
          mswStarted = true;
          // eslint-disable-next-line no-console
          console.log('MSW browser worker startet');
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Klarte ikke å starte MSW browser worker', e);
        }
      }
      setReady(true);
    }
    start();
  }, []);

  if (!ready) return <Sidelaster />;
  return <>{children}</>;
}
