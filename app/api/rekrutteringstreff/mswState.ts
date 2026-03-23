import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { InnleggDTO } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg';
import { alleSokTreff } from '@/app/api/rekrutteringstreff/sok/rekrutteringstreffSokMock';

export const treffOverrides = new Map<
  string,
  Partial<Record<string, unknown>>
>();
export const innleggStore = new Map<string, InnleggDTO[]>();
export const arbeidsgiverStore = new Map<string, ArbeidsgiverDTO[]>();

export const erNyopprettetUtkast = (id: string) =>
  id === '1231-1234-1234-1234' ||
  alleSokTreff.some((t) => t.id === id && t.status === 'utkast');
