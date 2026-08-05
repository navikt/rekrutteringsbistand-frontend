import {
  tellRegistreringer,
  harRegistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/møtedagHjelpere';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { beskrivRegistreringer } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/FjernOppmøteBekreftelse';
import { expect, test } from '@playwright/test';

const lagMøtedag = (overstyringer: Partial<MøtedagDTO> = {}): MøtedagDTO => ({
  rekrutteringstreffId: 'treff-1',
  fase: 'OPPMØTE',
  antallRom: 2,
  starttidspunkt: '09:00',
  varighetPerMøteMinutter: 15,
  oppmøte: ['person-1', 'person-2'],
  rom: [],
  arbeidsgiverRekkefølge: [],
  ønsker: [],
  intervjufordelinger: [],
  vurderinger: [],
  ...overstyringer,
});

test.describe('møtedagsregistreringer', () => {
  test('teller ingen registreringer når jobbsøkeren ikke har registrert noe', () => {
    const registreringer = tellRegistreringer(lagMøtedag(), 'person-1');

    expect(registreringer).toEqual({
      ønsker: 0,
      intervjuplasser: 0,
      vurderinger: 0,
    });
    expect(harRegistreringer(registreringer)).toBe(false);
  });

  test('teller ønsker, intervjuplasser og vurderinger for riktig jobbsøker', () => {
    const møtedag = lagMøtedag({
      ønsker: [
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

          andreIntervju: false,

          andreIntervjuDato: null,
          jobbtilbud: false,
        },
        {
          personTreffId: 'person-2',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
          vurdering: 'KANSKJE',
          notater: [],

          andreIntervju: false,

          andreIntervjuDato: null,
          jobbtilbud: false,
        },
      ],
    });

    expect(tellRegistreringer(møtedag, 'person-1')).toEqual({
      ønsker: 2,
      intervjuplasser: 2,
      vurderinger: 1,
    });
  });

  test('teller ikke tomme vurderinger som registrerte data', () => {
    const møtedag = lagMøtedag({
      vurderinger: [
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
          vurdering: null,
          notater: [],

          andreIntervju: false,

          andreIntervjuDato: null,
          jobbtilbud: false,
        },
      ],
    });

    const registreringer = tellRegistreringer(møtedag, 'person-1');

    expect(registreringer.vurderinger).toBe(0);
    expect(harRegistreringer(registreringer)).toBe(false);
  });

  test('teller vurdering som er markert med jobbtilbud uten vurderingsverdi', () => {
    const møtedag = lagMøtedag({
      vurderinger: [
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
          vurdering: null,
          notater: [],

          andreIntervju: false,

          andreIntervjuDato: null,
          jobbtilbud: true,
        },
      ],
    });

    expect(tellRegistreringer(møtedag, 'person-1').vurderinger).toBe(1);
  });

  test('beskriver registreringene med riktig entall og flertall', () => {
    expect(
      beskrivRegistreringer({
        ønsker: 1,
        intervjuplasser: 2,
        vurderinger: 0,
      }),
    ).toEqual(['1 ønsket arbeidsgiver', '2 plasser i intervjufordelingen']);

    expect(
      beskrivRegistreringer({
        ønsker: 0,
        intervjuplasser: 0,
        vurderinger: 1,
      }),
    ).toEqual(['1 vurdering etter speedintervju']);
  });

  test('håndterer at møtedagen ikke er lastet', () => {
    expect(tellRegistreringer(undefined, 'person-1')).toEqual({
      ønsker: 0,
      intervjuplasser: 0,
      vurderinger: 0,
    });
  });
});
