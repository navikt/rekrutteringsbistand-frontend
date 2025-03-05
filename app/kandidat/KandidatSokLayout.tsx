'use client';

import Piktogram from '../../public/ikoner/finn-kandidater.svg';
import SVGDarkmode from '../components/SVGDarkmode';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../components/tilgangskontroll/roller';
import { KandidatSøkProvider } from './KandidaSokContext';
import { KandidatSøkMarkerteContextProvider } from './KandidatSøkMarkerteContext';
import KandidatSøkSidebar from './components/kandidat-sok-sidebar/KandidatSøkSidebar';

export interface KandidatSokLayoutProps {
  children?: React.ReactNode | undefined;
}

const KandidatSokLayout: React.FC<KandidatSokLayoutProps> = ({ children }) => {
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
};

export default KandidatSokLayout;
