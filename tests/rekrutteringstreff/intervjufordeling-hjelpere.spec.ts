import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import {
  finnPlasskonflikter,
  flyttPersonEttSteg,
  flyttPersonTilIndeks,
  flyttPersonTilRad,
  normaliserIntervjufordelinger,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/intervjufordelingHjelpere';
import { expect, test } from '@playwright/test';

const lagFordeling = (
  inkludertePersonTreffIder: string[],
  ekskludertePersonTreffIder: string[] = [],
  arbeidsgiverTreffId = 'arbeidsgiver-1',
): ArbeidsgiverIntervjufordelingDTO => ({
  arbeidsgiverTreffId,
  inkludertePersonTreffIder,
  ekskludertePersonTreffIder,
});

test.describe('intervjufordeling-hjelpere', () => {
  test('normaliserer ønsker i dagens jobbsøkerrekkefølge', () => {
    const fordelinger = normaliserIntervjufordelinger({
      arbeidsgiverTreffIder: ['arbeidsgiver-1', 'arbeidsgiver-2'],
      personTreffIderIRekkefølge: ['person-2', 'person-1', 'person-3'],
      ønsker: [
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
        },
        {
          personTreffId: 'person-2',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
        },
        {
          personTreffId: 'person-3',
          arbeidsgiverTreffId: 'arbeidsgiver-2',
        },
      ],
      intervjufordelinger: [],
    });

    expect(fordelinger).toEqual([
      lagFordeling(['person-2', 'person-1']),
      lagFordeling(['person-3'], [], 'arbeidsgiver-2'),
    ]);
  });

  test('beholder lagret fordeling, fjerner gamle ønsker og legger nye sist inkludert', () => {
    const [fordeling] = normaliserIntervjufordelinger({
      arbeidsgiverTreffIder: ['arbeidsgiver-1'],
      personTreffIderIRekkefølge: ['person-1', 'person-2', 'person-3'],
      ønsker: [
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
        },
        {
          personTreffId: 'person-3',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
        },
      ],
      intervjufordelinger: [lagFordeling(['person-1'], ['person-2'])],
    });

    expect(fordeling).toEqual(lagFordeling(['person-1', 'person-3']));
  });

  test('lager en konfliktfri startrekkefølge når det er mulig', () => {
    const fordelinger = normaliserIntervjufordelinger({
      arbeidsgiverTreffIder: ['arbeidsgiver-1', 'arbeidsgiver-2'],
      personTreffIderIRekkefølge: ['person-1', 'person-2'],
      ønsker: [
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
        },
        {
          personTreffId: 'person-2',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
        },
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-2',
        },
      ],
      intervjufordelinger: [],
    });

    expect(fordelinger).toEqual([
      lagFordeling(['person-2', 'person-1']),
      lagFordeling(['person-1'], [], 'arbeidsgiver-2'),
    ]);
    expect(finnPlasskonflikter(fordelinger)).toEqual([]);
  });

  test('beholder lagret rekkefølge og tilpasser bare ulåste arbeidsgivere', () => {
    const fordelinger = normaliserIntervjufordelinger({
      arbeidsgiverTreffIder: ['arbeidsgiver-1', 'arbeidsgiver-2'],
      personTreffIderIRekkefølge: ['person-1', 'person-2'],
      ønsker: [
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
        },
        {
          personTreffId: 'person-2',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
        },
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-2',
        },
        {
          personTreffId: 'person-2',
          arbeidsgiverTreffId: 'arbeidsgiver-2',
        },
      ],
      intervjufordelinger: [
        lagFordeling(['person-1', 'person-2'], [], 'arbeidsgiver-1'),
      ],
    });

    expect(fordelinger).toEqual([
      lagFordeling(['person-1', 'person-2'], [], 'arbeidsgiver-1'),
      lagFordeling(['person-2', 'person-1'], [], 'arbeidsgiver-2'),
    ]);
    expect(finnPlasskonflikter(fordelinger)).toEqual([]);
  });

  test('beholder varsling når konfliktfri rekkefølge er umulig', () => {
    const fordelinger = normaliserIntervjufordelinger({
      arbeidsgiverTreffIder: ['arbeidsgiver-1', 'arbeidsgiver-2'],
      personTreffIderIRekkefølge: ['person-1'],
      ønsker: [
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-1',
        },
        {
          personTreffId: 'person-1',
          arbeidsgiverTreffId: 'arbeidsgiver-2',
        },
      ],
      intervjufordelinger: [],
    });

    expect(fordelinger).toEqual([
      lagFordeling(['person-1']),
      lagFordeling(['person-1'], [], 'arbeidsgiver-2'),
    ]);
    expect(finnPlasskonflikter(fordelinger)).toHaveLength(1);
  });

  test('omfordeler ikke lagrede lister etter en manuell plasskonflikt', () => {
    const lagredeFordelinger = [
      lagFordeling(['person-1', 'person-2'], [], 'arbeidsgiver-1'),
      lagFordeling(['person-1', 'person-2'], [], 'arbeidsgiver-2'),
    ];
    const fordelinger = normaliserIntervjufordelinger({
      arbeidsgiverTreffIder: ['arbeidsgiver-1', 'arbeidsgiver-2'],
      personTreffIderIRekkefølge: ['person-1', 'person-2'],
      ønsker: lagredeFordelinger.flatMap((fordeling) =>
        fordeling.inkludertePersonTreffIder.map((personTreffId) => ({
          personTreffId,
          arbeidsgiverTreffId: fordeling.arbeidsgiverTreffId,
        })),
      ),
      intervjufordelinger: lagredeFordelinger,
    });

    expect(fordelinger).toEqual(lagredeFordelinger);
    expect(finnPlasskonflikter(fordelinger)).toHaveLength(2);
  });

  test('flytter med piler innenfor og over eller under sperrelinjen', () => {
    const fordeling = lagFordeling(
      ['person-1', 'person-2', 'person-3'],
      ['person-4', 'person-5'],
    );

    expect(
      flyttPersonEttSteg(fordeling, 'person-1', 'ned')
        .inkludertePersonTreffIder,
    ).toEqual(['person-2', 'person-1', 'person-3']);
    expect(
      flyttPersonEttSteg(fordeling, 'person-5', 'opp')
        .ekskludertePersonTreffIder,
    ).toEqual(['person-5', 'person-4']);

    const ekskludert = flyttPersonEttSteg(fordeling, 'person-3', 'ned');
    expect(ekskludert.inkludertePersonTreffIder).toEqual([
      'person-1',
      'person-2',
    ]);
    expect(ekskludert.ekskludertePersonTreffIder).toEqual([
      'person-3',
      'person-4',
      'person-5',
    ]);

    const inkludert = flyttPersonEttSteg(fordeling, 'person-4', 'opp');
    expect(inkludert.inkludertePersonTreffIder).toEqual([
      'person-1',
      'person-2',
      'person-3',
      'person-4',
    ]);
    expect(inkludert.ekskludertePersonTreffIder).toEqual(['person-5']);
  });

  test('flytter til drop-indeks i samme liste', () => {
    const fordeling = flyttPersonTilIndeks(
      lagFordeling(['person-1', 'person-2', 'person-3']),
      'person-1',
      'inkludert',
      3,
    );

    expect(fordeling.inkludertePersonTreffIder).toEqual([
      'person-2',
      'person-3',
      'person-1',
    ]);
  });

  test('plasserer før ved flytting opp og etter ved flytting ned', () => {
    const fordeling = lagFordeling(['person-1', 'person-2', 'person-3']);

    expect(
      flyttPersonTilRad(fordeling, 'person-1', 'person-2')
        .inkludertePersonTreffIder,
    ).toEqual(['person-2', 'person-1', 'person-3']);
    expect(
      flyttPersonTilRad(fordeling, 'person-3', 'person-2')
        .inkludertePersonTreffIder,
    ).toEqual(['person-1', 'person-3', 'person-2']);
  });

  test('finner bare konflikter på samme inkluderte plass', () => {
    const konflikter = finnPlasskonflikter([
      lagFordeling(['person-1', 'person-2'], [], 'arbeidsgiver-1'),
      lagFordeling(['person-1', 'person-3'], [], 'arbeidsgiver-2'),
      lagFordeling(['person-4'], ['person-1'], 'arbeidsgiver-3'),
    ]);

    expect(konflikter).toEqual([
      {
        personTreffId: 'person-1',
        plass: 1,
        arbeidsgiverTreffIder: ['arbeidsgiver-1', 'arbeidsgiver-2'],
      },
    ]);
  });
});
