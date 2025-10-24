import { KandidatContextProvider } from '../app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import React from 'react';

// Enkel mock: Vi forventer at SWR hook i provider slår feil uten backend.
// For nå lager vi en very-light shim ved å monkeypatch'e provider med statisk data hvis window.__STORYBOOK_MOCK_KANDIDAT__ finnes.
// (Rask løsning: kunne senere erstattes av egen MockKandidatContext uten SWR.)

export const withKandidatContext = (fn: () => React.ReactNode) => {
  // Midlertidig: Bruker kandidatId 'demo-kandidat'
  return (
    <KandidatContextProvider kandidatId='demo-kandidat'>
      {fn()}
    </KandidatContextProvider>
  );
};
