'use client';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { Navigeringsmeny } from './Navigasjon';

const Modiadekoratør = dynamic(() => import('./Modiadekoratør'));

const Header: React.FC = () => {
  return (
    <React.Fragment>
      <Modiadekoratør />
      <Navigeringsmeny />
    </React.Fragment>
  );
};

export default Header;
