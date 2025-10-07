'use client';

import { finnKandidaterWindowConfig } from './finnKandidaterWindow';
import { finnStillingForKandidatWindow } from './finnStillingForKandidatWindow';
import { UrlWindowConfig, useUrlWindow } from './useUrlWindow';
import { visKandidatWindowConfig } from './visKandidatWindow';
import { visPersonTreffWindowConfig } from './visPersonTreffWindow';
import { visStillingWindowConfig } from './visStillingsoppdrag';
import { visEtterregistreringWindowConfig } from '@/app/_windows/visEtterregistreringWindow';

/**
 * Alle URL-vinduer som skal være aktive i applikasjonen.
 * Legg til nye vindu-konfigurasjoner her.
 */
export const urlWindowConfigs: UrlWindowConfig[] = [
  visKandidatWindowConfig,
  visStillingWindowConfig,
  finnKandidaterWindowConfig,
  visEtterregistreringWindowConfig,
  finnStillingForKandidatWindow,
  visPersonTreffWindowConfig,
  // Legg til flere vinduer her...
];

/**
 * Hook som håndterer alle URL-vinduer for WindowWrapper.
 * Denne hooken erstatter den manuelle logikken i WindowWrapper.
 */
export const useAllUrlWindows = (
  addWindow: (props: any) => void,
  removeWindow: (id: string) => void,
) => {
  // Registrer alle URL-vinduer
  useUrlWindow(visKandidatWindowConfig, addWindow, removeWindow);
  useUrlWindow(visStillingWindowConfig, addWindow, removeWindow);
  useUrlWindow(visEtterregistreringWindowConfig, addWindow, removeWindow);
  useUrlWindow(finnKandidaterWindowConfig, addWindow, removeWindow);
  useUrlWindow(finnStillingForKandidatWindow, addWindow, removeWindow);
  useUrlWindow(visPersonTreffWindowConfig, addWindow, removeWindow);

  // Legg til flere vinduer her ved å kalle useUrlWindow for hver konfigurasjon
  // useUrlWindow(anotherWindowConfig, addWindow, removeWindow);
};
