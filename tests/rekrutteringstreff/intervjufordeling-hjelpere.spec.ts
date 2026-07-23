import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import {
  finnPlasskonflikter,
  flyttPersonEttSteg,
  flyttPersonOverSperre,
  flyttPersonTilIndeks,
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

  test('flytter med piler og over eller under sperrelinjen', () => {
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

    const ekskludert = flyttPersonOverSperre(fordeling, 'person-2');
    expect(ekskludert.inkludertePersonTreffIder).toEqual([
      'person-1',
      'person-3',
    ]);
    expect(ekskludert.ekskludertePersonTreffIder).toEqual([
      'person-2',
      'person-4',
      'person-5',
    ]);

    const inkludert = flyttPersonOverSperre(fordeling, 'person-5');
    expect(inkludert.inkludertePersonTreffIder).toEqual([
      'person-1',
      'person-2',
      'person-3',
      'person-5',
    ]);
    expect(inkludert.ekskludertePersonTreffIder).toEqual(['person-4']);
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
