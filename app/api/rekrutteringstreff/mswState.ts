import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { ArbeidsgiversBehovDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import type { InnleggDTO } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';

export const treffOverrides = new Map<
  string,
  Partial<Record<string, unknown>>
>();
export const innleggStore = new Map<string, InnleggDTO[]>();
export const arbeidsgiverStore = new Map<string, ArbeidsgiverDTO[]>();
export const ArbeidsgiversBehovStore = new Map<string, ArbeidsgiversBehovDTO>();

// Sentinel-id som returneres av opprettelse-mocken. Bare nyopprettede utkast
// skal starte uten arbeidsgivere/innlegg – navngitte test-treff i søke-mocken
// (f.eks. id='utkast') skal bruke standard mock-data.
export const erNyopprettetUtkast = (id: string) => id === '1231-1234-1234-1234';
