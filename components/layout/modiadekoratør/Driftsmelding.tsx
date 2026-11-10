'use client';

import { isTestMode } from '@/util/env';
import { BodyShort, GlobalAlert, VStack } from '@navikt/ds-react';
import { CSSProperties, useState, useSyncExternalStore } from 'react';

const LUKKET_NØKKEL = 'driftsmelding-lukket-2026-11-11';

// Aksel begrenser bredden til 37.5rem som standard
const bredde = {
  '--__axc-base-alert-header-max-width': '64rem',
} as CSSProperties;

const abonnerPåLagring = (onEndring: () => void) => {
  window.addEventListener('storage', onEndring);
  return () => window.removeEventListener('storage', onEndring);
};

// localStorage kan kaste hvis nettleseren blokkerer lagring
const erLukketILagring = () => {
  try {
    return window.localStorage.getItem(LUKKET_NØKKEL) === 'true';
  } catch {
    return false;
  }
};

const Driftsmelding = () => {
  const [lukket, setLukket] = useState(false);
  const lukketTidligere = useSyncExternalStore(
    abonnerPåLagring,
    erLukketILagring,
    () => false,
  );

  if (isTestMode || lukket || lukketTidligere) {
    return null;
  }

  const lukk = () => {
    setLukket(true);
    try {
      window.localStorage.setItem(LUKKET_NØKKEL, 'true');
    } catch {
      // Banneret lukkes uansett, men vises igjen ved neste innlasting
    }
  };

  return (
    <GlobalAlert status='warning' size='small' style={bredde}>
      <GlobalAlert.Header>
        <VStack className='pb-2'>
          <GlobalAlert.Title>
            Rekrutteringsbistand er delvis utilgjengelig onsdag 11. november kl.
            12.00–14.00
          </GlobalAlert.Title>
          <BodyShort size='small'>
            Vi gjør en teknisk oppgradering. Kandidatlister på stillinger,
            etterregistreringer og formidlinger virker ikke i dette tidsrommet.
            Rekrutteringstreff kan brukes som vanlig. Vi beklager de ulemper
            dette medfører.
          </BodyShort>
        </VStack>
        <GlobalAlert.CloseButton onClick={lukk} />
      </GlobalAlert.Header>
    </GlobalAlert>
  );
};

export default Driftsmelding;
