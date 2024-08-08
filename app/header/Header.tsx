'use client';
import * as React from 'react';
import Modiadekoratør from './Modiadekoratør';
import { Navigeringsmeny } from './Navigasjon';

export interface IHeader {
  children?: React.ReactNode | undefined;
}

const Header: React.FC<IHeader> = ({ children }) => {
  return (
    <React.Fragment>
      <Modiadekoratør
        navKontor={null}
        onNavKontorChange={(navKontor) => {
          console.log(navKontor);
        }}
      />
      <Navigeringsmeny />
    </React.Fragment>
  );
};

export default Header;
