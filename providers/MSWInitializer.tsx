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
    if (typeof window === 'undefined') return;
    if (!isLocal) {
      setReady(true);
      return;
    }

    async function start() {
      if (!mswStarted) {
        try {
          // Dynamisk import for å unngå bundling i prod
          const { worker } = await import('@/mocks/browser');
          await worker.start({ onUnhandledRequest: 'bypass' });
          mswStarted = true;
          // eslint-disable-next-line no-console
          console.log('MSW startet');
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Klarte ikke å starte MSW', e);
        }
      }
      setReady(true);
    }
    start();
  }, []);

  if (!ready) return <Sidelaster />;
  return <>{children}</>;
}
