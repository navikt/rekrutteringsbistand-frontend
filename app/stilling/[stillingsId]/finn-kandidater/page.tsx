'use client';

import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { stillingensKandidatfilter } from '@/app/stilling/[stillingsId]/_ui/stillingensKandidatfilter';
import FinnKandidaterForStilling from '@/app/stilling/[stillingsId]/finn-kandidater/FinnKandidaterForStilling';
import WindowView from '@/components/window/WindowView';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export default function FinnKandidaterPage() {
  const { stillingsId } = useParams<{ stillingsId: string }>();
  const { stillingsData } = useStillingsContext();
  // Stillingen fyller ut sted og yrke, så standardsøket brukes ikke her. Veilederen kan velge et lagret søk selv,
  // og gå tilbake til stillingens filtre fra menyen.
  const forhåndsutfyltSøk = useMemo(
    () => ({
      navn: 'Fra stillingen',
      merknad: 'Sted og yrke',
      filter: stillingensKandidatfilter(stillingsData),
    }),
    [stillingsData],
  );
  return (
    <WindowView
      param={'visKandidatId'}
      window={(kandidatId) => (
        <VisJobbsøker kandidatId={kandidatId} leggTilKnapp='stilling' />
      )}
    >
      <KandidatSøkProvider
        minnenøkkel={`kandidatsok:stilling:${stillingsId}`}
        forhåndsutfyltSøk={forhåndsutfyltSøk}
      >
        <FinnKandidaterForStilling />
      </KandidatSøkProvider>
    </WindowView>
  );
}
