import * as React from 'react';
import Piktogram from '../../public/ikoner/rekrutteringstreff.svg';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import SVGDarkmode from '../components/SVGDarkmode';
import { RekrutteringstreffSøkSidebar } from './components/sidebar/RekrutteringstreffSøkSidebar';

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
