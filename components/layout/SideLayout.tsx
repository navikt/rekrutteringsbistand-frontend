import * as React from 'react';

export type ISideLayout = {
  children: React.ReactNode;
  topBanner?: React.ReactNode | undefined;
  navigasjon?: React.ReactNode;
  banner?: React.ReactNode;
};

const SideLayout = ({
  banner,
  children,
  navigasjon,
  topBanner,
}: ISideLayout) => {
  return (
    <div>
      {topBanner && topBanner}
      {navigasjon && navigasjon}
      {banner && banner}
      {children}
    </div>
  );
};

export default SideLayout;
