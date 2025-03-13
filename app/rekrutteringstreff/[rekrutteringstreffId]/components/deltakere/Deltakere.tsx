import * as React from 'react';

export interface DeltakereProps {
  children?: React.ReactNode | undefined;
}

const Deltakere: React.FC<DeltakereProps> = ({ children }) => {
  return <React.Fragment> Hello Wiklem </React.Fragment>;
};

export default Deltakere;
