'use client';
import * as React from 'react';
import { isLocal } from '../../../util/env';
import DevDekoratør from '../dev/DevDekoratør';
import { Navigeringsmeny } from './components/navigasjon/Navigasjon';

import Modiadekoratør from './components/modia/Modiadekoratør';
// const Modiadekoratør = dynamic(
//   () => import('./components/modia/Modiadekoratør'),
//   {
//     ssr: false,
//     loading: () => <div>Laster Modia dekoratør...</div>,
//   },
// );

const Header: React.FC = () => {
  return (
    <>
      {isLocal ? <DevDekoratør /> : <Modiadekoratør />}
      <Navigeringsmeny />
    </>
  );
};

export default Header;
