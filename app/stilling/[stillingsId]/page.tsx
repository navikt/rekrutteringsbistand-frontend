'use client';

import StillingVisning from '@/app/stilling/[stillingsId]/StillingVisning';
import KandidatlisteKandidatView from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteKandidatView';
import WindowView from '@/components/window/WindowView';
import { usePathname } from 'next/navigation';

export interface pageProps {
  kandidatId?: string;
}

export default function FinnStillingPage({ kandidatId }: pageProps) {
  const pathname = usePathname();
  return (
    <WindowView
      param='visKandidatId'
      fullskjermUrl={(id) => `${pathname}/kandidatliste/${id}`}
      window={(kandidatNr) => (
        <KandidatlisteKandidatView kandidatId={kandidatNr} />
      )}
    >
      <StillingVisning kandidatId={kandidatId} />
    </WindowView>
  );
}
