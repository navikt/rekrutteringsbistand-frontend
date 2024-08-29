import * as React from 'react';

export interface IStilling {
  children?: React.ReactNode | undefined;
}

const Stilling: React.FC<IStilling> = ({ children }) => {
  return <React.Fragment> Hello Wiklem </React.Fragment>;
};

export default Stilling;
