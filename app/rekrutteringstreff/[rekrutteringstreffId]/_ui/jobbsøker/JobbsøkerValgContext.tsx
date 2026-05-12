'use client';

import { InviterInternalDto } from './InviterModal';
import { JobbsøkerSøkTreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { create } from 'zustand';

interface JobbsøkerValgState {
  valgteJobbsøkere: InviterInternalDto[];
  toggleValgt: (jobbsøker: JobbsøkerSøkTreffDTO, valgt: boolean) => void;
  fjernEn: (personTreffId: string) => void;
  fjernAlleValg: () => void;
}

const tilDto = (j: JobbsøkerSøkTreffDTO): InviterInternalDto => ({
  personTreffId: j.personTreffId,
  fornavn: j.fornavn ?? '',
  etternavn: j.etternavn ?? '',
  fødselsnummer: j.fødselsnummer,
});

export const useJobbsøkerValgStore = create<JobbsøkerValgState>((set) => ({
  valgteJobbsøkere: [],
  toggleValgt: (jobbsøker, valgt) =>
    set((state) => {
      const dto = tilDto(jobbsøker);
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
}));

export const useJobbsøkerValg = () => {
  const valgteJobbsøkere = useJobbsøkerValgStore((s) => s.valgteJobbsøkere);
  const toggleValgt = useJobbsøkerValgStore((s) => s.toggleValgt);
  const fjernEn = useJobbsøkerValgStore((s) => s.fjernEn);
  const fjernAlleValg = useJobbsøkerValgStore((s) => s.fjernAlleValg);
  const erValgt = (personTreffId: string) =>
    valgteJobbsøkere.some((j) => j.personTreffId === personTreffId);
  return { valgteJobbsøkere, erValgt, toggleValgt, fjernEn, fjernAlleValg };
};
