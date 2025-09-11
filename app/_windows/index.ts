'use client';

import { finnKandidaterWindowConfig } from './finnKandidaterWindow';
import { UrlWindowConfig, useUrlWindow } from './useUrlWindow';
import { visKandidatWindowConfig } from './visKandidatWindow';
import { visStillingWindowConfig } from './visStillingWindow';

/**
 * Alle URL-vinduer som skal være aktive i applikasjonen.
 * Legg til nye vindu-konfigurasjoner her.
 */
export const urlWindowConfigs: UrlWindowConfig[] = [
  visKandidatWindowConfig,
  visStillingWindowConfig,
  finnKandidaterWindowConfig,
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
  useUrlWindow(finnKandidaterWindowConfig, addWindow, removeWindow);

  // Legg til flere vinduer her ved å kalle useUrlWindow for hver konfigurasjon
  // useUrlWindow(anotherWindowConfig, addWindow, removeWindow);
};
