'use client';

import { InviterInternalDto } from './InviterModal';
import { JobbsøkerSøkTreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { create } from 'zustand';

type ValgtJobbsøker = InviterInternalDto &
  Pick<JobbsøkerSøkTreffDTO, 'status'>;

interface JobbsøkerValgState {
  valgteJobbsøkere: ValgtJobbsøker[];
  toggleValgt: (jobbsøker: JobbsøkerSøkTreffDTO, valgt: boolean) => void;
  fjernEn: (personTreffId: string) => void;
  fjernAlleValg: () => void;
  synkroniserValgte: (jobbsøkere: JobbsøkerSøkTreffDTO[]) => void;
}

const tilValgtJobbsøker = (
  jobbsøker: JobbsøkerSøkTreffDTO,
): ValgtJobbsøker => ({
  personTreffId: jobbsøker.personTreffId,
  fornavn: jobbsøker.fornavn ?? '',
  etternavn: jobbsøker.etternavn ?? '',
  fødselsnummer: jobbsøker.fødselsnummer,
  status: jobbsøker.status,
});

export const useJobbsøkerValgStore = create<JobbsøkerValgState>((set) => ({
  valgteJobbsøkere: [],
  toggleValgt: (jobbsøker, valgt) =>
    set((state) => {
      const dto = tilValgtJobbsøker(jobbsøker);
      const finnes = state.valgteJobbsøkere.some(
        (j) => j.personTreffId === dto.personTreffId,
      );
      if (valgt) {
        return finnes
          ? state
          : { valgteJobbsøkere: [...state.valgteJobbsøkere, dto] };
      }
      return {
        valgteJobbsøkere: state.valgteJobbsøkere.filter(
          (j) => j.personTreffId !== dto.personTreffId,
        ),
      };
    }),
  fjernEn: (personTreffId) =>
    set((state) => ({
      valgteJobbsøkere: state.valgteJobbsøkere.filter(
        (j) => j.personTreffId !== personTreffId,
      ),
    })),
  fjernAlleValg: () => set({ valgteJobbsøkere: [] }),
  // Valgte rader er kopier, så valg overlever paginering. Kopiene må friskes
  // opp ved revalidering, ellers viser massehandlingene utdatert status.
  synkroniserValgte: (jobbsøkere) =>
    set((state) => {
      if (state.valgteJobbsøkere.length === 0) {
        return state;
      }

      const jobbsøkerePerId = new Map(
        jobbsøkere.map((jobbsøker) => [jobbsøker.personTreffId, jobbsøker]),
      );
      return {
        valgteJobbsøkere: state.valgteJobbsøkere.map((jobbsøker) => {
          const oppdatertJobbsøker = jobbsøkerePerId.get(
            jobbsøker.personTreffId,
          );
          return oppdatertJobbsøker
            ? tilValgtJobbsøker(oppdatertJobbsøker)
            : jobbsøker;
        }),
      };
    }),
}));

export const useJobbsøkerValg = () => {
  const valgteJobbsøkere = useJobbsøkerValgStore((s) => s.valgteJobbsøkere);
  const toggleValgt = useJobbsøkerValgStore((s) => s.toggleValgt);
  const fjernEn = useJobbsøkerValgStore((s) => s.fjernEn);
  const fjernAlleValg = useJobbsøkerValgStore((s) => s.fjernAlleValg);
  const synkroniserValgte = useJobbsøkerValgStore((s) => s.synkroniserValgte);
  const erValgt = (personTreffId: string) =>
    valgteJobbsøkere.some((j) => j.personTreffId === personTreffId);
  return {
    valgteJobbsøkere,
    erValgt,
    toggleValgt,
    fjernEn,
    fjernAlleValg,
    synkroniserValgte,
  };
};
