'use client';

import StillingVisning from '@/app/stilling/[stillingsId]/StillingVisning';
import KandidatlisteKandidatView from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteKandidatView';
import WindowView from '@/components/window/WindowView';
import FullførStillingModal
  from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/FullførStillingModal';

export interface pageProps {
  kandidatId?: string;
}

export default function FinnStillingPage({ kandidatId }: pageProps) {
  return (
    <WindowView
      param='visKandidatId'
      window={(kandidatNr) => (
        <KandidatlisteKandidatView kandidatId={kandidatNr} />
      )}
    >
      <StillingVisning kandidatId={kandidatId} />
      <FullførStillingModal visAutomatisk/>
    </WindowView>
  );
}
