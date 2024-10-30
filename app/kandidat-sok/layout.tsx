'use client';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import Piktogram from './components/icons/finn-kandidater.svg';
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
        banner={<SideTopBanner tittel='Kandidatsøk' ikon={<Piktogram />} />}
        sidepanel={<KandidatSøkSidebar />}
      >
        {children}
      </SideLayout>
    </KandidatSøkProvider>
  );
}
