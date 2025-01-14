import Image from 'next/image';
import * as React from 'react';
import Piktogram from '../../public/ikoner/rekrutteringstreff.svg';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import { RekrutteringstreffSøkSidebar } from './components/sidebar/RekrutteringstreffSøkSidebar';

interface layoutProps {
  children?: React.ReactNode | undefined;
}

const RekrutteringstreffSøkLayout: React.FC<layoutProps> = ({ children }) => {
  return (
    <SideLayout
      sidepanel={<RekrutteringstreffSøkSidebar />}
      banner={
        <SideTopBanner
          tittel='Rekrutteringstreff'
          ikon={<Image src={Piktogram} alt='Rekrutteringstreff' />}
        />
      }
    >
      {children}
    </SideLayout>
  );
};

export default RekrutteringstreffSøkLayout;
