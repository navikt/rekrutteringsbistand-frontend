import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import {
  finnPlasskonflikter,
  flyttPersonEttSteg,
  flyttPersonTilIndeks,
  flyttPersonTilRad,
  fordelingerForArbeidsgivere,
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
  test('gir én fordeling per arbeidsgiver, også de uten lagret fordeling', () => {
    const fordelinger = fordelingerForArbeidsgivere(
      ['arbeidsgiver-1', 'arbeidsgiver-2'],
      [lagFordeling(['person-1'], ['person-2'], 'arbeidsgiver-2')],
    );

    // Rekkefølgen følger arbeidsgiverlista, ikke serverens.
    expect(fordelinger).toEqual([
      lagFordeling([], [], 'arbeidsgiver-1'),
      lagFordeling(['person-1'], ['person-2'], 'arbeidsgiver-2'),
    ]);
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
