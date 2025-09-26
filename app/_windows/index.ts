'use client';

import { finnKandidaterWindowConfig } from './finnKandidaterWindow';
import { finnStillingForKandidatWindow } from './finnStillingForKandidatWindow';
import { UrlWindowConfig, useUrlWindow } from './useUrlWindow';
import { visKandidatWindowConfig } from './visKandidatWindow';
import { visStillingWindowConfig } from './visStillingWindow';
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
  // Legg til flere vinduer her...
];

/**
 * Hook som håndterer alle URL-vinduer for WindowWrapper.
 * Denne hooken erstatter den manuelle logikken i WindowWrapper.
 */
export const useAllUrlWindows = (
  addWindow: (props: any) => void,
  removeWindow: (id: string) => void,
  updateWindowState?: (id: string, state: any) => void,
) => {
  // Registrer alle URL-vinduer
  useUrlWindow(
    visKandidatWindowConfig,
    addWindow,
    removeWindow,
    updateWindowState,
  );
  useUrlWindow(
    visStillingWindowConfig,
    addWindow,
    removeWindow,
    updateWindowState,
  );
  useUrlWindow(
    visEtterregistreringWindowConfig,
    addWindow,
    removeWindow,
    updateWindowState,
  );
  useUrlWindow(
    finnKandidaterWindowConfig,
    addWindow,
    removeWindow,
    updateWindowState,
  );
  useUrlWindow(
    finnStillingForKandidatWindow,
    addWindow,
    removeWindow,
    updateWindowState,
  );

  // Legg til flere vinduer her ved å kalle useUrlWindow for hver konfigurasjon
  // useUrlWindow(anotherWindowConfig, addWindow, removeWindow, updateWindowState);
};
