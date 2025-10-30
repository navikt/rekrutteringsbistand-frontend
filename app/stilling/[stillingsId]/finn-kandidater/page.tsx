'use client';

import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';
import KandidatMedContext from '@/app/kandidat/[kandidatNr]/KandidatMedContext';
import FinnKandidaterForStilling from '@/app/stilling/[stillingsId]/finn-kandidater/FinnKandidaterForStilling';
import WindowView from '@/components/window/WindowView';

export default function FinnKandidaterPage() {
  return (
    <WindowView
      param={'visKandidatId'}
      window={(kandidatId) => <KandidatMedContext kandidatId={kandidatId} />}
    >
      <KandidatSøkProvider>
        <KandidatSøkMarkerteContextProvider>
          <FinnKandidaterForStilling />
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </WindowView>
  );
}
