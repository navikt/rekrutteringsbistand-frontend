import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../components/tilgangskontroll/roller';
import { useNullableStillingsContext } from '../../stilling/[stillingsId]/StillingsContext';
import { KandidatContextProvider } from './KandidatContext';
import KandidatListeKandidat from './KandidatListeKandidat';
import KandidatSide from './KandidatSide';
import KandidatSideLayout from './KandidatsideLayout';
import * as React from 'react';

export interface VisKandidatProps {
  kandidatnr: string;
}

const VisKandidat: React.FC<VisKandidatProps> = ({ kandidatnr }) => {
  const stillingContext = useNullableStillingsContext();

  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <KandidatContextProvider kandidatId={kandidatnr}>
        <KandidatSideLayout>
          {stillingContext && <KandidatListeKandidat kandidatnr={kandidatnr} />}
          <KandidatSide />
        </KandidatSideLayout>
      </KandidatContextProvider>
    </TilgangskontrollForInnhold>
  );
};

export default VisKandidat;
