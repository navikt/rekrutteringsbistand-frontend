import MaksBredde from '@/components/layout/MaksBredde';
import RekBisKort from '@/components/layout/RekBisKort';
import * as React from 'react';

export type ISideLayout = {
  header?: React.ReactNode;
  sidepanel?: React.ReactNode;
  children: React.ReactNode;
  /** @deprecated Bruk NewProps */
  topBanner?: React.ReactNode | undefined;
  /** @deprecated Bruk NewProps */
  navigasjon?: React.ReactNode;
  /** @deprecated Bruk NewProps */
  banner?: React.ReactNode;
};

const SideLayout = ({
  banner,
  children,
  sidepanel,
  header,
  navigasjon,
  topBanner,
}: ISideLayout) => {
  return (
    <RekBisKort>
      {header && header}
      {topBanner && topBanner}
      {navigasjon && navigasjon}
      {banner && banner}

      <div className='flex flex-row'>
        <MaksBredde>{children}</MaksBredde>
        {sidepanel}
      </div>
    </RekBisKort>
  );
};

export default SideLayout;
