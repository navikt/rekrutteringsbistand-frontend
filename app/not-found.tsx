'use client';

import { useApplikasjonContext } from './providers/ApplikasjonContext';
import { NextPage } from 'next';
import { useEffect } from 'react';

const NotFound: NextPage = () => {
  const { tilUmami } = useApplikasjonContext();

  useEffect(() => {
    tilUmami('Fant ikke side (404)', {
      path: window.location.pathname,
    });
  }, [tilUmami]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Fant ikke siden!</h1>
    </div>
  );
};

export default NotFound;
