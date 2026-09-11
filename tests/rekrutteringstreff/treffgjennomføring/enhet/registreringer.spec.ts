import { lagTreffgjennomføring } from './testdata';
import {
  harRegistreringer,
  tellRegistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/registreringer';
import type { VurderingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { beskrivRegistreringer } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/beskrivRegistreringer';
import { expect, test } from '@playwright/test';

test.describe('treffgjennomføringsregistreringer', () => {
  test('teller ingen registreringer når jobbsøkeren ikke har registrert noe', () => {
    const registreringer = tellRegistreringer(
      lagTreffgjennomføring(),
      'person-1',
    );

    expect(registreringer).toEqual({ interesser: 0, vurderinger: 0 });
    expect(harRegistreringer(registreringer)).toBe(false);
  });

  test('teller interesser og vurderinger for riktig jobbsøker', () => {
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
          vurderingsstatus: 'AKTUELL',
          vurderingsnotat: [],

          avtaltIntervju: false,

          avtaltIntervjuDato: null,
          jobbtilbud: false,
        },
        {
          personTreffId: 'person-2',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
          vurderingsstatus: 'KANSKJE',
          vurderingsnotat: [],

          avtaltIntervju: false,

          avtaltIntervjuDato: null,
          jobbtilbud: false,
        },
      ],
    });

    expect(tellRegistreringer(treffgjennomføring, 'person-1')).toEqual({
      interesser: 2,
      vurderinger: 1,
    });
  });

  test('teller ikke tomme vurderinger som registrerte data', () => {
    const treffgjennomføring = lagTreffgjennomføring({
      vurderinger: [
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
          vurderingsstatus: null,
          vurderingsnotat: [],

          avtaltIntervju: false,

          avtaltIntervjuDato: null,
          jobbtilbud: false,
        },
      ],
    });

    const registreringer = tellRegistreringer(treffgjennomføring, 'person-1');

    expect(registreringer.vurderinger).toBe(0);
    expect(harRegistreringer(registreringer)).toBe(false);
  });

  const vurderingerUtenStatus: {
    navn: string;
    innhold: Partial<VurderingDTO>;
  }[] = [
    { navn: 'jobbtilbud', innhold: { jobbtilbud: true } },
    { navn: 'notater', innhold: { vurderingsnotat: ['AG_VIL_MØTE_FLERE'] } },
    { navn: 'andre intervju', innhold: { avtaltIntervju: true } },
  ];
  for (const { navn, innhold } of vurderingerUtenStatus) {
    test(`blokkerer fjerning av oppmøte med bare ${navn}`, () => {
      const treffgjennomføring = lagTreffgjennomføring({
        vurderinger: [
          {
            personTreffId: 'person-1',
            arbeidsgiverTreffId: 'arbeidsgiver-1',
            vurderingsstatus: null,
            vurderingsnotat: [],

            avtaltIntervju: false,

            avtaltIntervjuDato: null,
            jobbtilbud: false,
            ...innhold,
          },
        ],
      });

      const registreringer = tellRegistreringer(treffgjennomføring, 'person-1');
      expect(registreringer.vurderinger).toBe(1);
      expect(harRegistreringer(registreringer)).toBe(true);
    });
  }

  test('beskriver registreringene med riktig entall og flertall', () => {
    expect(beskrivRegistreringer({ interesser: 1, vurderinger: 0 })).toEqual([
      '1 registrert interesse (steg 3)',
    ]);

    expect(beskrivRegistreringer({ interesser: 2, vurderinger: 1 })).toEqual([
      '2 registrerte interesser (steg 3)',
      '1 registrert status (steg 5)',
    ]);
  });

  test('håndterer at treffgjennomføringen ikke er lastet', () => {
    expect(tellRegistreringer(undefined, 'person-1')).toEqual({
      interesser: 0,
      vurderinger: 0,
    });
  });
});
