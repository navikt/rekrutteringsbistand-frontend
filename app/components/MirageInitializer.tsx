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
    if (!isInitialized) {
      makeServer({ environment: 'development' });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  if (!isInitialized) {
    return <Sidelaster />;
  }

  return <>{children}</>;
}
