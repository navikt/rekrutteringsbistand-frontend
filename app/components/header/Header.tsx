'use client';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { Suspense } from 'react';
// import { isLocal } from '../../../util/env';
// import DevDekoratør from '../dev/DevDekoratør';
import { Navigeringsmeny } from './components/navigasjon/Navigasjon';

const ProdDekoratør = dynamic(
  () => import('./components/modia/Modiadekoratør'),
  {
    ssr: false,
    loading: () => <div>Laster Modia dekoratør...</div>,
  },
);

const Header: React.FC = () => {
  return (
    <Suspense fallback={<div>Laster Modia dekoratør...</div>}>
      {/* {isLocal ? <DevDekoratør /> : <ProdDekoratør />} */}
      <Navigeringsmeny />
    </Suspense>
  );
};

export default Header;
