'use client';

import * as React from 'react';

export type ISideLayout = {
  children: React.ReactNode;
  navigasjon?: React.ReactNode;
  banner?: React.ReactNode;
};

const SideLayout = ({ banner, children, navigasjon }: ISideLayout) => {
  return (
    <div>
      {navigasjon && navigasjon}
      {banner && banner}
      {children}
    </div>
  );
};

export default SideLayout;
