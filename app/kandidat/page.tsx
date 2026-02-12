'use client';

import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import KandidatSøkLayout from '@/app/kandidat/KandidatSøkLayout';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';
import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import WindowView from '@/components/window/WindowView';

export default function KandidatPage() {
  return (
    <WindowView
      param='visKandidatId'
      window={(kandidatId) => <VisJobbsøker kandidatId={kandidatId} />}
    >
      <KandidatSøkProvider>
        <KandidatSøkMarkerteContextProvider>
          <KandidatSøkLayout />
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </WindowView>
  );
}
