'use client';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import Piktogram from './components/icons/finn-kandidater.svg';
import KandidatSøkSidebar from './components/KandidatSøkSidebar';

export default function KandidatSokLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideLayout
      banner={<SideTopBanner tittel='Kandidatsøk' ikon={<Piktogram />} />}
      sidepanel={<KandidatSøkSidebar />}
    >
      {children}
    </SideLayout>
  );
}
