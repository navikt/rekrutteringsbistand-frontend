'use client';

import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import KandidatSøkLayout from '@/app/kandidat/KandidatSøkLayout';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';
import KandidatMedContext from '@/app/kandidat/[kandidatNr]/KandidatMedContext';
import WindowView from '@/components/window/WindowView';

export default function KandidatPage() {
  return (
    <WindowView
      param='visKandidatId'
      window={(kandidatId) => <KandidatMedContext kandidatId={kandidatId} />}
    >
      <KandidatSøkProvider>
        <KandidatSøkMarkerteContextProvider>
          <KandidatSøkLayout />
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </WindowView>
  );
}
