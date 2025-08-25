import * as React from 'react';

export interface StillingsSideWrapperProps {
  children?: React.ReactNode | undefined;
}

const StillingsSideWrapper: React.FC<StillingsSideWrapperProps> = ({
  children,
}) => {
  return <React.Fragment> {children} </React.Fragment>;
};

export default StillingsSideWrapper;
