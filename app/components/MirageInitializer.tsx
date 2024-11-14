'use client';

import { useEffect, useState } from 'react';
import { makeServer } from '../../mocks/mirage';
import Sidelaster from './Sidelaster';

export default function MirageInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !isInitialized) {
      makeServer({ environment: 'development' });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  if (!isInitialized && process.env.NODE_ENV === 'development') {
    return <Sidelaster />;
  }

  return <>{children}</>;
}
