'use client';

import { KandidatContextProvider } from '@/app/kandidat/vis-kandidat/KandidatContext';
import VisKandidat from '@/app/kandidat/vis-kandidat/VisKandidat';
import StillingVisning from '@/app/stilling/[stillingsId]/StillingVisning';
import WindowView from '@/components/WindowView';

export interface pageProps {
  kandidatId?: string;
}

export default function FinnStillingPage({ kandidatId }: pageProps) {
  return (
    <WindowView
      param='visKandidatId'
      window={(kandidatNr) => (
        <KandidatContextProvider kandidatId={kandidatNr}>
          <VisKandidat />
        </KandidatContextProvider>
      )}
    >
      <StillingVisning kandidatId={kandidatId} />
    </WindowView>
  );
}
