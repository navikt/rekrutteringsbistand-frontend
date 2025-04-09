'use client';

import RekrutteringstreffDark from '../../public/ikoner/rekrutteringstreff-dark.svg';
import Rekrutteringstreff from '../../public/ikoner/rekrutteringstreff.svg';
import SVGDarkmode from '../components/SVGDarkmode';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import OpprettRekrutteringstreffKnapp from './components/OpprettRekrutteringstreffKnapp';
import { RekrutteringstreffSøkSidebar } from './components/sidebar/RekrutteringstreffSøkSidebar';
import * as React from 'react';

export interface RekrutteringstreffSøkLayoutProps {
  children?: React.ReactNode | undefined;
}

const RekrutteringstreffSøkLayout: React.FC<
  RekrutteringstreffSøkLayoutProps
> = ({ children }) => {
  return (
    <SideLayout
      sidepanel={<RekrutteringstreffSøkSidebar />}
      banner={
        <div className='flex justify-between items-center'>
          <SideTopBanner
            tittel='Rekrutteringstreff'
            ikon={
              <SVGDarkmode
                light={Rekrutteringstreff}
                dark={RekrutteringstreffDark}
                alt='Rekrutteringstreff'
              />
            }
          />
          <OpprettRekrutteringstreffKnapp />
        </div>
      }
    >
      {children}
    </SideLayout>
  );
};

export default RekrutteringstreffSøkLayout;
