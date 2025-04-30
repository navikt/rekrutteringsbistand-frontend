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
      {navigasjon ? navigasjon : <div className='h-[24px]' />}
      {banner && banner}
      {children}
    </div>
  );
};

export default SideLayout;
