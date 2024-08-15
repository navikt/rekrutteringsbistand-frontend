'use client';
import * as React from 'react';

export interface IForside {
  children?: React.ReactNode | undefined;
}

const Forside: React.FC<IForside> = ({ children }) => {
  return <div>forside</div>;
};

export default Forside;
