'use client';

import Piktogram from '../../public/ikoner/finn-kandidater.svg';
import SVGDarkmode from '../components/SVGDarkmode';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import LayoutMedSidebar from '../components/layout/SplitScreenLayout';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../components/tilgangskontroll/roller';
import { KandidatSøkProvider } from './KandidaSokFilterContext';
import KandidatSøkFilter from './KandidatSøkFilter/KandidatSøkFilter';
import { KandidatSøkMarkerteContextProvider } from './KandidatSøkMarkerteContext';
import VisKandidat from './VisKandidat/VisKandidat';
import { useQueryState } from 'nuqs';

export interface KandidatSokLayoutProps {
  children?: React.ReactNode | undefined;
}

const KandidatSokLayout: React.FC<KandidatSokLayoutProps> = ({ children }) => {
  const [visKandidatnr, settKandidatnr] = useQueryState('visKandidat', {
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
          <LayoutMedSidebar
            lukkSidebar={() => settKandidatnr('')}
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
              <KandidatSøkFilter />
              {children}
            </SideLayout>
          </LayoutMedSidebar>
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
};

export default KandidatSokLayout;
