'use client';
import { Suspense, useEffect } from 'react';

import Forside from './forside/Forside';
import Loading from './laoading';

export default function Home() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('../mocks/mirage').then(({ makeServer }) => {
        makeServer();
      });
    }
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Forside />
    </Suspense>
  );
}
