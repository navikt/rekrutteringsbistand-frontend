'use client';

import { UmamiDomene } from './components/umami/umami';
import { useUmami } from './providers/UmamiContext';
import { NextPage } from 'next';
import { useEffect } from 'react';

const NotFound: NextPage = () => {
  const { track } = useUmami();

  useEffect(() => {
    track('Fant ikke side (404)', {
      domene: UmamiDomene.Generell,
      path: window.location.pathname,
    });
  }, [track]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Fant ikke siden!</h1>
    </div>
  );
};

export default NotFound;
