import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import {
  finnPlasskonflikter,
  flyttPersonEttSteg,
  flyttPersonTilIndeks,
  flyttPersonTilRad,
  fordelingerForArbeidsgivere,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordeling/intervjurekkefølge';
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

test.describe('intervjurekkefølge', () => {
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

  test('flytter til en tom liste uten å miste eller duplisere personen', () => {
    const fordeling = lagFordeling(['test-person']);
    const ekskludert = flyttPersonTilIndeks(
      fordeling,
      'test-person',
      'ekskludert',
      0,
    );
    expect(ekskludert).toEqual(lagFordeling([], ['test-person']));
    expect(flyttPersonEttSteg(ekskludert, 'test-person', 'opp')).toEqual(
      fordeling,
    );
    expect(fordeling).toEqual(lagFordeling(['test-person']));
  });

  test('lar rekkefølgen stå ved yttergrensene eller en ukjent person', () => {
    const fordeling = lagFordeling(['test-person-1'], ['test-person-2']);
    expect(flyttPersonEttSteg(fordeling, 'test-person-1', 'opp')).toEqual(
      fordeling,
    );
    expect(flyttPersonEttSteg(fordeling, 'test-person-2', 'ned')).toEqual(
      fordeling,
    );
    expect(
      flyttPersonTilRad(fordeling, 'test-ukjent', 'test-person-1'),
    ).toEqual(fordeling);
    expect(
      flyttPersonTilRad(fordeling, 'test-person-1', 'test-ukjent'),
    ).toEqual(fordeling);
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

  test('gir ingen konflikt når samme person har ulike intervjutider', () => {
    expect(
      finnPlasskonflikter([
        lagFordeling(
          ['test-person-1', 'test-person-2'],
          [],
          'test-arbeidsgiver-1',
        ),
        lagFordeling(
          ['test-person-2', 'test-person-1'],
          [],
          'test-arbeidsgiver-2',
        ),
      ]),
    ).toEqual([]);
  });
});
