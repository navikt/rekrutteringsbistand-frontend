'use client';
import Piktogram from '../../public/ikoner/finn-kandidater.svg';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import SVGDarkmode from '../components/SVGDarkmode';
import { Roller } from '../components/tilgangskontroll/roller';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import KandidatSøkSidebar from './components/kandidat-sok-sidebar/KandidatSøkSidebar';
import { KandidatSøkProvider } from './KandidaSokContext';
import { KandidatSøkMarkerteContextProvider } from './KandidatSøkMarkerteContext';

export default function KandidatSokLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <KandidatSøkProvider>
        <KandidatSøkMarkerteContextProvider>
          <SideLayout
            banner={
              <SideTopBanner
                tittel='Kandidatsøk'
                ikon={<SVGDarkmode src={Piktogram} alt='Kandidatsøk' />}
              />
            }
            sidepanel={<KandidatSøkSidebar />}
          >
            {children}
          </SideLayout>
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
}
