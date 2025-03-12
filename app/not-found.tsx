'use client';

import { tilUmami, UmamiDomene } from './components/umami/umami';
import { NextPage } from 'next';
import { useEffect } from 'react';

const NotFound: NextPage = () => {
  useEffect(() => {
    tilUmami({
      domene: UmamiDomene.Generell,
      event: 'Fant ikke side (404)',
      data: {
        path: window.location.pathname,
      },
    });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Fant ikke siden!</h1>
    </div>
  );
};

export default NotFound;
