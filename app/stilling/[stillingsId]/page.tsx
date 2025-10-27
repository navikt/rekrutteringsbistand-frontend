'use client';

import StillingVisning from '@/app/stilling/[stillingsId]/StillingVisning';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import KandidatlisteKandidatIndex from '@/app/stilling/[stillingsId]/kandidatliste/[kandidatId]/page';
import WindowView from '@/components/window/WindowView';

export interface pageProps {
  kandidatId?: string;
}

export default function FinnStillingPage({ kandidatId }: pageProps) {
  const { stillingsId } = useStillingsContext();
  return (
    <WindowView
      param='visKandidatId'
      window={(kandidatNr) => (
        <KandidatlisteKandidatIndex
          params={{
            stillingsId: stillingsId,
            kandidatId: kandidatNr,
          }}
        />
      )}
    >
      <StillingVisning kandidatId={kandidatId} />
    </WindowView>
  );
}
