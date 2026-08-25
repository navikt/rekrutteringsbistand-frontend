'use client';

import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import TreffgjennomføringSidepanel, {
  TREFFGJENNOMFØRING_SIDEPANEL_TITTEL,
} from '../treffgjennomføring/TreffgjennomføringSidepanel';
import { useTreffgjennomføringFane } from '../treffgjennomføring/useTreffgjennomføringFane';
import type { ReactNode } from 'react';

export interface FaneSidepanel {
  innhold: ReactNode | undefined;
  tittel: string | undefined;
}

const INGEN_SIDEPANEL: FaneSidepanel = {
  innhold: undefined,
  tittel: undefined,
};

/**
 * SideLayout eier plasseringen, bredden og scrollingen av sidepanelet. Faner som
 * trenger sitt eget sidepanel leverer innholdet her, i stedet for å bygge et nytt
 * panel inne i fanepanelet. Da gjelder samme kodeløp for alle faner, og layouten
 * slipper å kjenne innmaten i den enkelte fanen.
 */
export const useFaneSidepanel = (fane: string): FaneSidepanel => {
  const { visTreffgjennomføring } = useTreffgjennomføringFane();

  if (
    fane === RekrutteringstreffTabs.TREFFGJENNOMFØRING &&
    visTreffgjennomføring
  ) {
    return {
      innhold: <TreffgjennomføringSidepanel />,
      tittel: TREFFGJENNOMFØRING_SIDEPANEL_TITTEL,
    };
  }

  return INGEN_SIDEPANEL;
};

/** Jobbsøkerfanen har sin egen scroll-container og skal ikke ligge inni SideInnhold sin. */
export const faneHarEgenScroll = (fane: string) =>
  fane === RekrutteringstreffTabs.JOBBSØKERE;
