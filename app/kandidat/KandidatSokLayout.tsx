'use client';

import Piktogram from '../../public/ikoner/finn-kandidater.svg';
import SVGDarkmode from '../components/SVGDarkmode';
import KandidatSplitScreenLayout from '../components/layout/KandidatSplitScreenLayout';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../components/tilgangskontroll/roller';
import { KandidatSøkProvider } from './KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from './KandidatSøkMarkerteContext';
import VisKandidat from './VisKandidat/VisKandidat';
import { useQueryState } from 'nuqs';

export interface KandidatSokLayoutProps {
  children?: React.ReactNode | undefined;
}

const KandidatSokLayout: React.FC<KandidatSokLayoutProps> = ({ children }) => {
  const [visKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });
  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <KandidatSøkProvider>
        <KandidatSøkMarkerteContextProvider>
          <KandidatSplitScreenLayout
            sidebar={
              visKandidatnr && <VisKandidat kandidatnr={visKandidatnr} />
            }
          >
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
          </KandidatSplitScreenLayout>
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
};

export default KandidatSokLayout;
