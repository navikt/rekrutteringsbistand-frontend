'use client';

import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import KandidatSøkLayout from '@/app/kandidat/KandidatSøkLayout';
import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import WindowView from '@/components/window/WindowView';

export default function KandidatPage() {
  return (
    <WindowView
      param='visKandidatId'
      window={(kandidatId) => <VisJobbsøker kandidatId={kandidatId} />}
    >
      <KandidatSøkProvider>
        <KandidatSøkLayout />
      </KandidatSøkProvider>
    </WindowView>
  );
}
