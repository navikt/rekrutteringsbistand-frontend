'use client';

import KandidatMedContext from '@/app/kandidat/[kandidatNr]/KandidatMedContext';
import StillingVisning from '@/app/stilling/[stillingsId]/StillingVisning';
import WindowView from '@/components/window/WindowView';

export interface pageProps {
  kandidatId?: string;
}

export default function FinnStillingPage({ kandidatId }: pageProps) {
  return (
    <WindowView
      param='visKandidatId'
      window={(kandidatNr) => <KandidatMedContext kandidatId={kandidatNr} />}
    >
      <StillingVisning kandidatId={kandidatId} />
    </WindowView>
  );
}
