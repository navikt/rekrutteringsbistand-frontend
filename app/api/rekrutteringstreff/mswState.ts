import type { ArbeidsgiverBehovDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { InnleggDTO } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { alleSokTreff } from '@/app/api/rekrutteringstreff/sok/rekrutteringstreffSokMock';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';

export const treffOverrides = new Map<
  string,
  Partial<Record<string, unknown>>
>();
export const innleggStore = new Map<string, InnleggDTO[]>();
export const arbeidsgiverStore = new Map<string, ArbeidsgiverDTO[]>();
export const arbeidsgiverBehovStore = new Map<string, ArbeidsgiverBehovDTO>();

export const erNyopprettetUtkast = (id: string) =>
  id === '1231-1234-1234-1234' ||
  alleSokTreff.some(
    (t) => t.id === id && t.status === RekrutteringstreffStatus.UTKAST,
  );
