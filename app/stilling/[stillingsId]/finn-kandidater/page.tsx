'use client';

import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';
import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import FinnKandidaterForStilling from '@/app/stilling/[stillingsId]/finn-kandidater/FinnKandidaterForStilling';
import WindowView from '@/components/window/WindowView';

export default function FinnKandidaterPage() {
  return (
    <WindowView
      param={'visKandidatId'}
      window={(kandidatId) => (
        <VisJobbsøker kandidatId={kandidatId} leggTilKnapp='stilling' />
      )}
    >
      <KandidatSøkProvider>
        <KandidatSøkMarkerteContextProvider>
          <FinnKandidaterForStilling />
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </WindowView>
  );
}
