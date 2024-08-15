'use client';
import * as React from 'react';
import Hurtiglenker from './components/Hurtiglenker';
export interface IForside {
  children?: React.ReactNode | undefined;
}

const Forside: React.FC<IForside> = ({ children }) => {
  return (
    <>
      <Hurtiglenker />
    </>
  );
};

export default Forside;
