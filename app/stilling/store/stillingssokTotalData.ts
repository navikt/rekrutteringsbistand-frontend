import { create } from 'zustand';

// Antall ulike stillingsoppdrag per kategori.
export type IAntallStillingsoppdrag = Record<string, never>; // Ingen felter per nå

interface SøkDataState {
  antall: IAntallStillingsoppdrag | null;
  setAntall: (t: IAntallStillingsoppdrag) => void; // Overstyr hele objektet
  patchAntall: (t: Partial<IAntallStillingsoppdrag>) => void; // Flett inn endringer
  resetAntall: () => void;
}

export const useStillingssokTotalData = create<SøkDataState>((set) => ({
  antall: null,
  setAntall: (t) => set({ antall: t }),
  patchAntall: () => undefined,
  resetAntall: () => set({ antall: null }),
}));
