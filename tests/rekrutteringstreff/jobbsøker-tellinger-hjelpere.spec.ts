import {
  Svarstatus,
  type TellbarJobbsøkerHendelse,
  tellJobbsøkere,
  utledJobbsøkertilstander,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/jobbsøkerTellingerHjelpere';
import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_types/constants';
import { expect, test } from '@playwright/test';

/**
 * Hendelsene får stigende tidspunkt i den rekkefølgen de listes, slik at testene
 * beskriver et forløp uten å måtte skrive klokkeslett for hånd.
 */
const forløp = (
  personTreffId: string,
  ...typer: JobbsøkerHendelsestype[]
): TellbarJobbsøkerHendelse[] =>
  typer.map((hendelsestype, i) => ({
    personTreffId,
    hendelsestype,
    tidspunkt: new Date(Date.UTC(2025, 0, 1, 12, i)).toISOString(),
  }));

const tilstandFor = (
  hendelser: TellbarJobbsøkerHendelse[],
  personTreffId: string,
) =>
  utledJobbsøkertilstander(hendelser).find(
    (t) => t.personTreffId === personTreffId,
  );

test('jobbsøker som bare er lagt til er verken invitert eller besvart', () => {
  const tellinger = tellJobbsøkere(
    forløp('person-1', JobbsøkerHendelsestype.OPPRETTET),
  );

  expect(tellinger.antallLagtTil).toBe(1);
  expect(tellinger.antallInviterte).toBe(0);
  expect(tellinger.antallUbesvart).toBe(0);
});

test('invitert uten svar telles som ubesvart', () => {
  const tellinger = tellJobbsøkere(
    forløp(
      'person-1',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
    ),
  );

  expect(tellinger.antallInviterte).toBe(1);
  expect(tellinger.antallUbesvart).toBe(1);
  expect(tellinger.antallSvarJa).toBe(0);
});

test('svart ja telles som svart ja og ikke lenger som ubesvart', () => {
  const tellinger = tellJobbsøkere(
    forløp(
      'person-1',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
    ),
  );

  expect(tellinger.antallSvarJa).toBe(1);
  expect(tellinger.antallUbesvart).toBe(0);
});

/** Kjernen i hele omleggingen: oppmøte ligger på en egen akse og spiser ikke svaret. */
test('registrert oppmøte fjerner ikke svart ja', () => {
  const hendelser = forløp(
    'person-1',
    JobbsøkerHendelsestype.OPPRETTET,
    JobbsøkerHendelsestype.INVITERT,
    JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
    JobbsøkerHendelsestype.REGISTRERT_OPPMØTE,
  );

  const tellinger = tellJobbsøkere(hendelser);

  expect(tellinger.antallSvarJa).toBe(1);
  expect(tellinger.antallMøttOpp).toBe(1);
  expect(tellinger.antallUbesvart).toBe(0);
});

test('fjernet oppmøte lar svaret stå urørt', () => {
  const tellinger = tellJobbsøkere(
    forløp(
      'person-1',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
      JobbsøkerHendelsestype.REGISTRERT_OPPMØTE,
      JobbsøkerHendelsestype.REGISTRERT_OPPMØTE_FJERNET,
    ),
  );

  expect(tellinger.antallSvarJa).toBe(1);
  expect(tellinger.antallMøttOpp).toBe(0);
});

test('fått jobb fjerner ikke svart ja', () => {
  const tellinger = tellJobbsøkere(
    forløp(
      'person-1',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
      JobbsøkerHendelsestype.FÅTT_JOBB,
    ),
  );

  expect(tellinger.antallSvarJa).toBe(1);
  expect(tellinger.antallFåttJobb).toBe(1);
});

test('angret formidling nuller ut fått jobb', () => {
  const tellinger = tellJobbsøkere(
    forløp(
      'person-1',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
      JobbsøkerHendelsestype.FÅTT_JOBB,
      JobbsøkerHendelsestype.ANGRE_FÅTT_JOBB,
    ),
  );

  expect(tellinger.antallFåttJobb).toBe(0);
  expect(tellinger.antallSvarJa).toBe(1);
});

/** «Trekke fra» er unødvendig: siste hendelse på svaraksen vinner. */
test('svar fjernet av eier setter jobbsøkeren tilbake til ubesvart', () => {
  const tellinger = tellJobbsøkere(
    forløp(
      'person-1',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
      JobbsøkerHendelsestype.SVAR_FJERNET_AV_EIER,
    ),
  );

  expect(tellinger.antallSvarJa).toBe(0);
  expect(tellinger.antallUbesvart).toBe(1);
});

test('endret svar teller bare det siste', () => {
  const tellinger = tellJobbsøkere(
    forløp(
      'person-1',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON,
      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON_AV_EIER,
    ),
  );

  expect(tellinger.antallSvarJa).toBe(1);
  expect(tellinger.antallSvarNei).toBe(0);
});

test('ny invitasjon nullstiller svaret og teller personen bare én gang', () => {
  const hendelser = forløp(
    'person-1',
    JobbsøkerHendelsestype.OPPRETTET,
    JobbsøkerHendelsestype.INVITERT,
    JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON,
    JobbsøkerHendelsestype.SVAR_FJERNET_AV_EIER,
    JobbsøkerHendelsestype.INVITERT,
  );

  const tellinger = tellJobbsøkere(hendelser);

  expect(tellinger.antallInviterte).toBe(1);
  expect(tellinger.antallSvarNei).toBe(0);
  expect(tellinger.antallUbesvart).toBe(1);
});

test('slettet jobbsøker holdes utenfor alle tellinger', () => {
  const hendelser = [
    ...forløp(
      'person-1',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
    ),
    ...forløp(
      'person-2',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.SLETTET,
    ),
  ];

  const tellinger = tellJobbsøkere(hendelser);

  expect(tellinger.antallLagtTil).toBe(1);
  expect(tellinger.antallSvarJa).toBe(1);
});

test('svar ja ved avlyst og fullført treff telles hver for seg', () => {
  const hendelser = [
    ...forløp(
      'person-1',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
      JobbsøkerHendelsestype.SVART_JA_TREFF_FULLFØRT,
    ),
    ...forløp(
      'person-2',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
      JobbsøkerHendelsestype.SVART_JA_TREFF_AVLYST,
    ),
  ];

  const tellinger = tellJobbsøkere(hendelser);

  expect(tellinger.antallTreffFullførtJa).toBe(1);
  expect(tellinger.antallTreffAvlystJa).toBe(1);
  expect(tellinger.antallSvarJa).toBe(2);
});

test('vurderingshendelser fra treffgjennomføring påvirker ikke svaraksen', () => {
  const tellinger = tellJobbsøkere(
    forløp(
      'person-1',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
      JobbsøkerHendelsestype.REGISTRERT_OPPMØTE,
      JobbsøkerHendelsestype.VURDERT,
      JobbsøkerHendelsestype.NOTAT_LAGT_TIL,
      JobbsøkerHendelsestype.AVTALT_INTERVJU,
      JobbsøkerHendelsestype.JOBBTILBUD_GITT,
    ),
  );

  expect(tellinger.antallSvarJa).toBe(1);
  expect(tellinger.antallUbesvart).toBe(0);
});

/** API-et leverer nyeste først, så folden må ikke stole på rekkefølgen den får inn. */
test('resultatet er uavhengig av rekkefølgen hendelsene kommer i', () => {
  const hendelser = forløp(
    'person-1',
    JobbsøkerHendelsestype.OPPRETTET,
    JobbsøkerHendelsestype.INVITERT,
    JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON,
    JobbsøkerHendelsestype.SVAR_FJERNET_AV_EIER,
    JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
  );

  const nyesteFørst = [...hendelser].reverse();

  expect(tellJobbsøkere(nyesteFørst)).toEqual(tellJobbsøkere(hendelser));
  expect(tilstandFor(nyesteFørst, 'person-1')?.svar).toBe(Svarstatus.SVART_JA);
});

/**
 * Regresjonen som utløste omleggingen. Den gamle formelen var
 * `ubesvart = antallInviterte - antallSvarJa - antallSvarNei`, der antallInviterte kom
 * fra hendelsene mens svartallene kom fra statuskolonna. Når oppmøte overskrev
 * SVART_JA falt subtrahenden, og de møtte havnet i «ubesvart».
 */
test('ubesvart blåses ikke opp når alle som svarte ja har møtt opp', () => {
  const hendelser = ['person-1', 'person-2', 'person-3'].flatMap((id) =>
    forløp(
      id,
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
      JobbsøkerHendelsestype.REGISTRERT_OPPMØTE,
    ),
  );

  const tellinger = tellJobbsøkere(hendelser);

  expect(tellinger.antallInviterte).toBe(3);
  expect(tellinger.antallSvarJa).toBe(3);
  expect(tellinger.antallUbesvart).toBe(0);
});

test('flere jobbsøkere med ulike forløp telles hver for seg', () => {
  const hendelser = [
    ...forløp(
      'person-1',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
      JobbsøkerHendelsestype.REGISTRERT_OPPMØTE,
    ),
    ...forløp(
      'person-2',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
      JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON,
    ),
    ...forløp(
      'person-3',
      JobbsøkerHendelsestype.OPPRETTET,
      JobbsøkerHendelsestype.INVITERT,
    ),
    ...forløp('person-4', JobbsøkerHendelsestype.OPPRETTET),
  ];

  expect(tellJobbsøkere(hendelser)).toEqual({
    antallLagtTil: 4,
    antallInviterte: 3,
    antallSvarJa: 1,
    antallSvarNei: 1,
    antallUbesvart: 1,
    antallMøttOpp: 1,
    antallFåttJobb: 0,
    antallTreffAvlystJa: 0,
    antallTreffFullførtJa: 0,
  });
});

test('tom hendelsesliste gir nulltellinger', () => {
  expect(tellJobbsøkere([])).toEqual({
    antallLagtTil: 0,
    antallInviterte: 0,
    antallSvarJa: 0,
    antallSvarNei: 0,
    antallUbesvart: 0,
    antallMøttOpp: 0,
    antallFåttJobb: 0,
    antallTreffAvlystJa: 0,
    antallTreffFullførtJa: 0,
  });
});
