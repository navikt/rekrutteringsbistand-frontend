import {
  tellRegistreringer,
  harRegistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringHjelpere';
import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { beskrivRegistreringer } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/FjernOppmøteBekreftelse';
import { expect, test } from '@playwright/test';

const lagTreffgjennomføring = (
  overstyringer: Partial<TreffgjennomføringDTO> = {},
): TreffgjennomføringDTO => ({
  rekrutteringstreffId: 'treff-1',
  fase: 'OPPMØTE',
  antallRom: 2,
  starttidspunkt: '09:00',
  varighetPerMøteMinutter: 15,
  oppmøte: ['person-1', 'person-2'],
  deltakernummer: [],
  rom: [],
  arbeidsgiverRekkefølge: [],
  interesser: [],
  intervjufordelinger: [],
  vurderinger: [],
  ...overstyringer,
});

test.describe('treffgjennomføringsregistreringer', () => {
  test('teller ingen registreringer når jobbsøkeren ikke har registrert noe', () => {
    const registreringer = tellRegistreringer(
      lagTreffgjennomføring(),
      'person-1',
    );

    expect(registreringer).toEqual({
      interesser: 0,
      intervjuplasser: 0,
      vurderinger: 0,
    });
    expect(harRegistreringer(registreringer)).toBe(false);
  });

  test('teller interesser, intervjuplasser og vurderinger for riktig jobbsøker', () => {
    const treffgjennomføring = lagTreffgjennomføring({
      interesser: [
        { personTreffId: 'person-1', arbeidsgiverTreffId: 'arbeidsgiver-1' },
        { personTreffId: 'person-1', arbeidsgiverTreffId: 'arbeidsgiver-2' },
        { personTreffId: 'person-2', arbeidsgiverTreffId: 'arbeidsgiver-1' },
      ],
      intervjufordelinger: [
        {
          arbeidsgiverTreffId: 'arbeidsgiver-1',
          inkludertePersonTreffIder: ['person-1'],
          ekskludertePersonTreffIder: [],
        },
        {
          arbeidsgiverTreffId: 'arbeidsgiver-2',
          inkludertePersonTreffIder: [],
          ekskludertePersonTreffIder: ['person-1'],
        },
        {
          arbeidsgiverTreffId: 'arbeidsgiver-3',
          inkludertePersonTreffIder: ['person-2'],
          ekskludertePersonTreffIder: [],
        },
      ],
      vurderinger: [
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
          vurdering: 'AKTUELL',
          notater: [],

          andregangsintervju: false,

          andregangsintervjuDato: null,
          jobbtilbud: false,
        },
        {
          personTreffId: 'person-2',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
          vurdering: 'KANSKJE',
          notater: [],

          andregangsintervju: false,

          andregangsintervjuDato: null,
          jobbtilbud: false,
        },
      ],
    });

    expect(tellRegistreringer(treffgjennomføring, 'person-1')).toEqual({
      interesser: 2,
      intervjuplasser: 2,
      vurderinger: 1,
    });
  });

  test('teller ikke tomme vurderinger som registrerte data', () => {
    const treffgjennomføring = lagTreffgjennomføring({
      vurderinger: [
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
          vurdering: null,
          notater: [],

          andregangsintervju: false,

          andregangsintervjuDato: null,
          jobbtilbud: false,
        },
      ],
    });

    const registreringer = tellRegistreringer(treffgjennomføring, 'person-1');

    expect(registreringer.vurderinger).toBe(0);
    expect(harRegistreringer(registreringer)).toBe(false);
  });

  test('teller vurdering som er markert med jobbtilbud uten vurderingsverdi', () => {
    const treffgjennomføring = lagTreffgjennomføring({
      vurderinger: [
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
          vurdering: null,
          notater: [],

          andregangsintervju: false,

          andregangsintervjuDato: null,
          jobbtilbud: true,
        },
      ],
    });

    expect(tellRegistreringer(treffgjennomføring, 'person-1').vurderinger).toBe(
      1,
    );
  });

  test('teller vurdering som bare har notater', () => {
    const treffgjennomføring = lagTreffgjennomføring({
      vurderinger: [
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
          vurdering: null,
          notater: ['AG_VIL_MØTE_FLERE'],
          andregangsintervju: false,
          andregangsintervjuDato: null,
          jobbtilbud: false,
        },
      ],
    });

    expect(tellRegistreringer(treffgjennomføring, 'person-1').vurderinger).toBe(
      1,
    );
  });

  test('beskriver registreringene med riktig entall og flertall', () => {
    expect(
      beskrivRegistreringer({
        interesser: 1,
        intervjuplasser: 2,
        vurderinger: 0,
      }),
    ).toEqual(['1 registrert interesse', '2 plasser i intervjufordelingen']);

    expect(
      beskrivRegistreringer({
        interesser: 0,
        intervjuplasser: 0,
        vurderinger: 1,
      }),
    ).toEqual(['1 vurdering']);
  });

  test('håndterer at treffgjennomføringen ikke er lastet', () => {
    expect(tellRegistreringer(undefined, 'person-1')).toEqual({
      interesser: 0,
      intervjuplasser: 0,
      vurderinger: 0,
    });
  });
});
