'use client';

import * as React from 'react';

export type ISideLayout = {
  children: React.ReactNode;
  banner?: React.ReactNode;
};

const SideLayout = ({ banner, children }: ISideLayout) => {
  return (
    <div>
      <div className='mb-8'>{banner && banner}</div>
      {children}
    </div>
  );
};

export default SideLayout;
