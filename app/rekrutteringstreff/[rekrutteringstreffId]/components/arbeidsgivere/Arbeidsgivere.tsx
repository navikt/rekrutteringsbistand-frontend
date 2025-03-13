import * as React from 'react';

export interface ArbeidsgivereProps {
  children?: React.ReactNode | undefined;
}

const Arbeidsgivere: React.FC<ArbeidsgivereProps> = ({ children }) => {
  return <React.Fragment> Hello Wiklem </React.Fragment>;
};

export default Arbeidsgivere;
