import * as React from 'react';

export interface Ipage {
  children?: React.ReactNode | undefined;
}

const page: React.FC<Ipage> = ({ children }) => {
  return <React.Fragment> Stillinger </React.Fragment>;
};

export default page;
