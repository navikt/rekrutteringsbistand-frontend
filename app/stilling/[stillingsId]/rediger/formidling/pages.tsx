import * as React from 'react';

export interface pagesProps {
  children?: React.ReactNode | undefined;
}

const pages: React.FC<pagesProps> = ({ children }) => {
  return <React.Fragment> Hello Wiklem </React.Fragment>;
};

export default pages;
