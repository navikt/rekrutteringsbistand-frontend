import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';

export const lagTreffgjennomføring = (
  overstyringer: Partial<TreffgjennomføringDTO> = {},
): TreffgjennomføringDTO => ({
  rekrutteringstreffId: 'test-treff',
  gjeldendeSteg: 'OPPMØTE',
  antallRom: 0,
  starttidspunkt: '09:00',
  varighetPerMøteMinutter: 5,
  oppmøte: [],
  deltakernummer: [],
  rom: [],
  arbeidsgiverRekkefølge: [],
  interesser: [],
  intervjufordelinger: [],
  vurderinger: [],
  ...overstyringer,
});
