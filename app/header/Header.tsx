'use client';
import * as React from 'react';
import { Interndekoratør } from './Interndekoratør';
import { Navigeringsmeny } from './Navigasjon';

export interface IHeader {
  children?: React.ReactNode | undefined;
}

const Header: React.FC<IHeader> = ({ children }) => {
  return (
    <React.Fragment>
      <Interndekoratør />
      <Navigeringsmeny />
    </React.Fragment>
  );
};

export default Header;
