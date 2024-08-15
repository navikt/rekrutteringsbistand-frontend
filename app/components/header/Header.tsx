'use client';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { isLocal } from '../../util/env';
import { Navigeringsmeny } from './components/navigasjon/Navigasjon';

const Modiadekoratør = isLocal
  ? dynamic(() => import('./components/modia/DevDekoratør'))
  : dynamic(() => import('./components/modia/Modiadekoratør'));

const Header: React.FC = () => {
  return (
    <>
      <Modiadekoratør />
      <Navigeringsmeny />
    </>
  );
};

export default Header;
