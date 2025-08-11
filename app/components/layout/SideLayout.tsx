'use client';

import Breadcrumbs from '../Breadcrumbs';
import * as React from 'react';

export type ISideLayout = {
  children: React.ReactNode;
  navigasjon?: React.ReactNode;
  banner?: React.ReactNode;
};

const SideLayout = ({ banner, children, navigasjon }: ISideLayout) => {
  return (
    <div>
      {navigasjon ? (
        navigasjon
      ) : (
        <div className='w-full items-center justify-between  pt-2  sticky top-0 z-10 bg-[var(--ax-bg-neutral)]'>
          <Breadcrumbs />
        </div>
      )}
      {banner && banner}
      {children}
    </div>
  );
};

export default SideLayout;
