'use client';

import { FC, type ReactNode } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface MarkertKandidat {
  arenaKandidatnr: string;
  fodselsnummer: string | null;
  fornavn: string | null;
  etternavn: string | null;
  telefonnummer?: string | null;
  navkontor?: string | null;
  veilederNavn?: string | null;
  veilederNavIdent?: string | null;
  innsatsgruppe?: string | null;
  fylke?: string | null;
  kommune?: string | null;
  poststed?: string | null;
}

interface MarkerteKandidaterState {
  markerteKandidater: MarkertKandidat[];
  setMarkert: (kandidat: MarkertKandidat) => void;
  setMarkertListe: (kandidater: MarkertKandidat[]) => void;
  fjernMarkerteKandidater: () => void;
}

const useMarkerteKandidaterStore = create<MarkerteKandidaterState>()(
  persist(
    (set) => ({
      markerteKandidater: [],

      setMarkert: (kandidat) =>
        set((state) => {
          const finnes = state.markerteKandidater.some(
            (k) => k.arenaKandidatnr === kandidat.arenaKandidatnr,
          );
          return {
            markerteKandidater: finnes
              ? state.markerteKandidater.filter(
                  (k) => k.arenaKandidatnr !== kandidat.arenaKandidatnr,
                )
              : [...state.markerteKandidater, kandidat],
          };
        }),

      setMarkertListe: (kandidater) => set({ markerteKandidater: kandidater }),

      fjernMarkerteKandidater: () => set({ markerteKandidater: [] }),
    }),
    {
      name: 'markerte-kandidater',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useKandidatSøkMarkerteContext = () => useMarkerteKandidaterStore();

export interface KandidatSøkMarkerteContextProviderProps {
  children?: ReactNode | undefined;
}

export const KandidatSøkMarkerteContextProvider: FC<
  KandidatSøkMarkerteContextProviderProps
> = ({ children }) => {
  return <>{children}</>;
};
