import Fremdriftspanel from '@/components/Fremdriftspanel';
import MaksBredde from '@/components/layout/MaksBredde';
import RekBisKort from '@/components/layout/RekBisKort';
import * as React from 'react';

export type ISideLayout = {
  header?: React.ReactNode;
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

const SideLayout = ({
  children,
  fremdriftspanel,
  fremdriftspanelTop,
  header,
}: ISideLayout) => {
  return (
    <RekBisKort>
      {header && header}

      <div className='@container'>
        <div className='hidden @2xl:block'>
          <div className='flex flex-row'>
            <MaksBredde>{children}</MaksBredde>
            {fremdriftspanel && (
              <Fremdriftspanel>{fremdriftspanel}</Fremdriftspanel>
            )}
          </div>
        </div>
        <div className='blcok @2xl:hidden'>
          <div className='flex flex-col'>
            {fremdriftspanelTop ||
              (fremdriftspanel && (
                <Fremdriftspanel>
                  {fremdriftspanelTop ? fremdriftspanelTop : fremdriftspanel}
                </Fremdriftspanel>
              ))}
            <MaksBredde>{children}</MaksBredde>
          </div>
        </div>
      </div>
    </RekBisKort>
  );
};

export default SideLayout;
