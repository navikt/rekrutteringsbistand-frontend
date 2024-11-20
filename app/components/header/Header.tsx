'use client';
import dynamic from 'next/dist/shared/lib/dynamic';
import * as React from 'react';
import { isLocal } from '../../../util/env';
import DevDekoratør from '../dev/DevDekoratør';
import { Navigeringsmeny } from './components/navigasjon/Navigasjon';

const Modiadekoratør = dynamic(
  () => import('./components/modia/Modiadekoratør'),
  {
    ssr: false,
    loading: () => <div>Laster Modia dekoratør...</div>,
  },
);

const Header: React.FC = () => {
  return (
    <>
      {isLocal ? <DevDekoratør /> : <Modiadekoratør />}
      <Navigeringsmeny />
    </>
  );
};

export default Header;
