'use client';
import Image from 'next/image';
import Piktogram from '../../public/ikoner/finn-kandidater.svg';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import KandidatSøkSidebar from './components/kandidat-sok-sidebar/KandidatSøkSidebar';
import { KandidatSøkProvider } from './KandidaSokContext';

export default function KandidatSokLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KandidatSøkProvider>
      <SideLayout
        banner={
          <SideTopBanner
            tittel='Kandidatsøk'
            ikon={<Image src={Piktogram} alt='Kandidatsøk' />}
          />
        }
        sidepanel={<KandidatSøkSidebar />}
      >
        {children}
      </SideLayout>
    </KandidatSøkProvider>
  );
}
