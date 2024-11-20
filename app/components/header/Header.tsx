'use client';
import * as React from 'react';
import { isLocal } from '../../../util/env';
import DevDekoratør from '../dev/DevDekoratør';
import Modiadekoratør from './components/modia/Modiadekoratør';
import { Navigeringsmeny } from './components/navigasjon/Navigasjon';

const Header: React.FC = () => {
  return (
    <>
      {isLocal ? <DevDekoratør /> : <Modiadekoratør />}
      <Navigeringsmeny />
    </>
  );
};

export default Header;
