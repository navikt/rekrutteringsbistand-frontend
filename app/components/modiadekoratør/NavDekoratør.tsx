'use client';

import { isLocal } from '../../../util/env';
import dynamic from 'next/dynamic';
import * as React from 'react';

const NavDekoratør = isLocal
  ? dynamic(() => import('./DevDekoratør'))
  : dynamic(() => import('./ModiaDekoratør'));

const Header: React.FC = () => {
  return (
    <>
      <NavDekoratør />
    </>
  );
};

export default NavDekoratør;
