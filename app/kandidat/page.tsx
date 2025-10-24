'use client';

import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import KandidatSøkLayout from '@/app/kandidat/KandidatSøkLayout';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';

export default function KandidatPage() {
  return (
    <KandidatSøkProvider>
      <KandidatSøkMarkerteContextProvider>
        <KandidatSøkLayout />
      </KandidatSøkMarkerteContextProvider>
    </KandidatSøkProvider>
  );
}
