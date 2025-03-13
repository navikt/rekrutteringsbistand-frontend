'use client';

import { UmamiDomene, useUmami } from './providers/UmamiContext';
import { NextPage } from 'next';
import { useEffect } from 'react';

const NotFound: NextPage = () => {
  const { track } = useUmami();

  useEffect(() => {
    track('Fant ikke side (404)', UmamiDomene.Generell);
  }, [track]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Fant ikke siden!</h1>
    </div>
  );
};

export default NotFound;
