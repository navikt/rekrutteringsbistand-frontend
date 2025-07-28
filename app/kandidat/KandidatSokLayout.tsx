'use client';

import Piktogram from '../../public/ikoner/finn-kandidater.svg';
import SVGDarkmode from '../components/SVGDarkmode';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import { SplitScreenLayout } from '../components/layout/SplitScreenLayout';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../components/tilgangskontroll/roller';
import { KandidatSøkProvider } from './KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from './KandidatSøkMarkerteContext';

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
          <SplitScreenLayout>
            <SideLayout
              banner={
                <SideTopBanner
                  tittel='Kandidatsøk'
                  ikon={<SVGDarkmode src={Piktogram} alt='Kandidatsøk' />}
                />
              }
            >
              {children}
            </SideLayout>
          </SplitScreenLayout>
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
};

export default KandidatSokLayout;
