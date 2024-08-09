'use client';
import * as React from 'react';
import Modiadekoratør from './Modiadekoratør';
import { Navigeringsmeny } from './Navigasjon';

const Header: React.FC = () => {
  return (
    <React.Fragment>
      <Modiadekoratør />
      <Navigeringsmeny />
    </React.Fragment>
  );
};

export default Header;
