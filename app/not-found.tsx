'use client';

import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { NextPage } from 'next';
import { useEffect } from 'react';

const NotFound: NextPage = () => {
  const { track } = useUmami();

  useEffect(() => {
    track(UmamiEvent.Generell.fant_ikke_side);
  }, [track]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Fant ikke siden!</h1>
    </div>
  );
};

export default NotFound;
