import * as React from 'react';

export interface NavigasjonWrapperProps {
  children?: React.ReactNode | undefined;
}

const NavigasjonWrapper: React.FC<NavigasjonWrapperProps> = ({ children }) => {
  return <React.Fragment> {children} </React.Fragment>;
};

export default NavigasjonWrapper;
