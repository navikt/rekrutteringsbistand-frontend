import { KandidatVisningProps } from './_ui/KandidatlisteFilter/useFiltrerteKandidater';
import { create } from 'zustand';

interface MarkerteKandidaterStore {
  perKandidatliste: Record<string, KandidatVisningProps[]>;
  aktivKandidatlisteId: string | null;
  setAktivKandidatlisteId: (id: string | null) => void;
  setMarkerteKandidater: (
    kandidatlisteId: string,
    val: KandidatVisningProps[],
  ) => void;
  toggleMarkerKandidat: (
    kandidatlisteId: string,
    kandidat: KandidatVisningProps,
  ) => void;
}

export const useMarkerteKandidaterStore = create<MarkerteKandidaterStore>(
  (set) => ({
    perKandidatliste: {},
    aktivKandidatlisteId: null,
    setAktivKandidatlisteId: (id) => set({ aktivKandidatlisteId: id }),
    setMarkerteKandidater: (kandidatlisteId, val) =>
      set((state) => ({
        perKandidatliste: { ...state.perKandidatliste, [kandidatlisteId]: val },
      })),
    toggleMarkerKandidat: (kandidatlisteId, kandidat) =>
      set((state) => {
        const eksisterende = state.perKandidatliste[kandidatlisteId] ?? [];
        const finnes = eksisterende.some(
          (k) => k.fodselsnr === kandidat.fodselsnr,
        );
        return {
          perKandidatliste: {
            ...state.perKandidatliste,
            [kandidatlisteId]: finnes
              ? eksisterende.filter((k) => k.fodselsnr !== kandidat.fodselsnr)
              : [...eksisterende, kandidat],
          },
        };
      }),
  }),
);
