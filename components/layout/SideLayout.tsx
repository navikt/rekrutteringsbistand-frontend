import MaksBredde from '@/components/layout/MaksBredde';
import RekBisKort from '@/components/layout/RekBisKort';
import * as React from 'react';

export type ISideLayout = {
  header?: React.ReactNode;
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

      <MaksBredde>{children}</MaksBredde>
    </RekBisKort>
  );
};

export default SideLayout;
