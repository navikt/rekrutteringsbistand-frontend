import { create } from 'zustand';

// Antall ulike stillingsoppdrag per kategori.
export interface IAntallStillingsoppdrag {
  alleOppdrag?: number; // Total for valgt filter "Alle oppdrag"
  arbeidsplassen?: number; // Total for arbeidsplassen.no
  mineOppdrag?: number; // Total for "Mine"
  mittKontor?: number; // Total for "Mitt kontor"
}

interface SøkDataState {
  antall: IAntallStillingsoppdrag | null;
  setAntall: (t: IAntallStillingsoppdrag) => void; // Overstyr hele objektet
  patchAntall: (t: Partial<IAntallStillingsoppdrag>) => void; // Flett inn endringer
  resetAntall: () => void;
}

const isEqual = (
  a: IAntallStillingsoppdrag | null,
  b: IAntallStillingsoppdrag | null,
) => {
  if (a === b) return true;
  if (!a || !b) return false;
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    // @ts-expect-error dynamic index
    if (a[k] !== b[k]) return false;
  }
  return true;
};

export const useStillingssokTotalData = create<SøkDataState>((set) => ({
  antall: null,
  setAntall: (t) => set((s) => (isEqual(s.antall, t) ? s : { antall: t })),
  patchAntall: (t) =>
    set((s) => {
      const next = { ...(s.antall ?? {}), ...t } as IAntallStillingsoppdrag;
      return isEqual(s.antall, next) ? s : { antall: next };
    }),
  resetAntall: () => set({ antall: null }),
}));
