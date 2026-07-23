import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';

// Syntetisk WorkOp-seed for MSW-mocken. Møtedagen starter i fase OPPMØTE med et
// standard møteoppsett; resten (rom, rotasjon, ønsker, vurderinger) fylles ut
// gjennom PUT-handlerne når arrangøren driver flyten. Ingen realistiske
// fødselsnumre lagres her – jobbsøkerne kommer fra jobbsøker-mocken
// (personTreffId «mock-js-XXX») og arbeidsgiverne fra arbeidsgiver-mocken.

export const WORKOP_TREFF_ID = 'workop';

const STANDARD_STARTTIDSPUNKT = '09:00';
const STANDARD_VARIGHET_MINUTTER = 5;
const STANDARD_PAUSE_MINUTTER = 5;
const ANTALL_FREMMØTTE = 20;

const lagFremmøttePersonTreffIder = () =>
  Array.from(
    { length: ANTALL_FREMMØTTE },
    (_, indeks) => `mock-js-${String(indeks + 1).padStart(3, '0')}`,
  );

export const lagMøtedagSeed = (
  rekrutteringstreffId: string,
  antallArbeidsgivere: number,
): MøtedagDTO => ({
  rekrutteringstreffId,
  fase: 'OPPMØTE',
  antallRom: Math.max(antallArbeidsgivere, 1),
  starttidspunkt: STANDARD_STARTTIDSPUNKT,
  varighetPerMøteMinutter: STANDARD_VARIGHET_MINUTTER,
  pauseMellomMøterMinutter: STANDARD_PAUSE_MINUTTER,
  oppmøte:
    rekrutteringstreffId === WORKOP_TREFF_ID
      ? lagFremmøttePersonTreffIder()
      : [],
  rom: [],
  arbeidsgiverRekkefølge: [],
  ønsker: [],
  intervjufordelinger: [],
  vurderinger: [],
});
