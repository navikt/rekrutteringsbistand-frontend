'use client';
import * as React from 'react';
import Hurtiglenker from './components/Hurtiglenker';
import Statistikk from './components/Statistikk';
export interface IForside {
  children?: React.ReactNode | undefined;
}

const Forside: React.FC<IForside> = ({ children }) => {
  return (
    <>
      <Hurtiglenker />
      <Statistikk />
    </>
  );
};

export default Forside;
