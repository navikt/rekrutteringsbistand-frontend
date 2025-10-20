import Fremdriftspanel from '@/components/fremdriftspanel/Fremdriftspanel';
import MaksBredde from '@/components/layout/MaksBredde';
import RekBisKort from '@/components/layout/RekBisKort';
import * as React from 'react';

export type ISideLayout = {
  header?: React.ReactNode;
  skjulFremdriftspanel?: boolean; // Når true skjules alle fremdriftspanel-varianter
  fremdriftspanel?: React.ReactNode;
  fremdriftspanelTop?: React.ReactNode;
  children: React.ReactNode;
  /** @deprecated Bruk NewProps */
  topBanner?: React.ReactNode | undefined;
  /** @deprecated Bruk NewProps */
  navigasjon?: React.ReactNode;
  /** @deprecated Bruk NewProps */
  banner?: React.ReactNode;
};

export const SideLayoutMobilTop = ({
  children,
}: {
  children: React.ReactNode;
}) => <div className='@2xl:hidden'>{children}</div>;

const SideLayout = ({
  children,
  fremdriftspanel,
  header,
  skjulFremdriftspanel,
}: ISideLayout) => {
  return (
    <RekBisKort>
      {header && header}
      <div className='@container contain-layout'>
        {/* Felles innhold + desktop sidepanel */}
        <div className='flex flex-col @2xl:flex-row'>
          <MaksBredde>{children}</MaksBredde>
          {/* Desktop / stor skjerm: sidepanel til høyre */}
          {!skjulFremdriftspanel && fremdriftspanel && (
            <div className='hidden @2xl:block'>
              <Fremdriftspanel>{fremdriftspanel}</Fremdriftspanel>
            </div>
          )}
        </div>
      </div>
    </RekBisKort>
  );
};

export default SideLayout;
