import Piktogram from '../../public/ikoner/rekrutteringstreff.svg';
import SVGDarkmode from '../components/SVGDarkmode';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import { RekrutteringstreffSøkSidebar } from './components/sidebar/RekrutteringstreffSøkSidebar';
import * as React from 'react';

interface layoutProps {
  children?: React.ReactNode | undefined;
}

export default async function RekrutteringstreffSøkLayout({
  children,
}: layoutProps) {
  return (
    <SideLayout
      sidepanel={<RekrutteringstreffSøkSidebar />}
      banner={
        <SideTopBanner
          tittel='Rekrutteringstreff'
          ikon={<SVGDarkmode src={Piktogram} alt='Rekrutteringstreff' />}
        />
      }
    >
      {children}
    </SideLayout>
  );
}
