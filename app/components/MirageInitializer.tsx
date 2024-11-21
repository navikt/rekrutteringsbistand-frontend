'use client';

import { useEffect, useState } from 'react';
import { makeServer } from '../../mocks/mirage';
import { isLocal } from '../../util/env';
import Sidelaster from './Sidelaster';

export default function MirageInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isLocal && !isInitialized) {
      makeServer({ environment: 'development' });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  if (!isInitialized && isLocal) {
    return <Sidelaster />;
  }

  return <>{children}</>;
}
