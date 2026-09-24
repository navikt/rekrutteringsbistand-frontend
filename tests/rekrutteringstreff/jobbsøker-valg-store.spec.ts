import type { JobbsøkerSøkTreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { useJobbsøkerValgStore } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/JobbsøkerValgContext';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { expect, test } from '@playwright/test';

const lagJobbsøker = (
  id: string,
  status: string = JobbsøkerStatus.LAGT_TIL,
): JobbsøkerSøkTreffDTO => ({
  personTreffId: id,
  fødselsnummer: `TEST-FNR-${id}`,
  fornavn: 'Testperson',
  etternavn: id,
  status,
  lagtTilDato: null,
  lagtTilAv: null,
  lagtTilAvNavn: null,
  alder: null,
  innsatsgruppe: null,
  minsideHendelser: [],
  kontornummer: null,
});

test.beforeEach(() => {
  useJobbsøkerValgStore.getState().fjernAlleValg();
});

test.afterEach(() => {
  useJobbsøkerValgStore.getState().fjernAlleValg();
});

test('Massevalg dedupliserer både innkommende og eksisterende valg og beholder tidligere sider', () => {
  const tidligereSide = lagJobbsøker('TEST-SIDE-1');
  const førstePåSiden = lagJobbsøker('TEST-SIDE-2-A');
  const andrePåSiden = lagJobbsøker('TEST-SIDE-2-B');
  const { toggleValgt, markerFlere } = useJobbsøkerValgStore.getState();
  toggleValgt(tidligereSide, true);
  toggleValgt(førstePåSiden, true);

  markerFlere([førstePåSiden, andrePåSiden, andrePåSiden]);
  markerFlere([førstePåSiden, andrePåSiden]);

  expect(
    useJobbsøkerValgStore
      .getState()
      .valgteJobbsøkere.map((j) => j.personTreffId),
  ).toEqual(['TEST-SIDE-1', 'TEST-SIDE-2-A', 'TEST-SIDE-2-B']);
  useJobbsøkerValgStore.getState().fjernAlleValg();
  expect(useJobbsøkerValgStore.getState().valgteJobbsøkere).toEqual([]);
});

test('Massevalg utelater alle statuser bortsett fra LAGT_TIL', () => {
  const jobbsøkere = Object.values(JobbsøkerStatus).map((status) =>
    lagJobbsøker(`TEST-${status}`, status),
  );
  useJobbsøkerValgStore.getState().markerFlere(jobbsøkere);

  expect(useJobbsøkerValgStore.getState().valgteJobbsøkere).toEqual([
    {
      personTreffId: 'TEST-LAGT_TIL',
      fødselsnummer: 'TEST-FNR-TEST-LAGT_TIL',
      fornavn: 'Testperson',
      etternavn: 'TEST-LAGT_TIL',
      status: JobbsøkerStatus.LAGT_TIL,
    },
  ]);
});

test('Statussynk oppdaterer lagrede valg uten å fjerne andre sider eller legge til umarkerte', () => {
  const første = lagJobbsøker('TEST-SIDE-1');
  const andre = lagJobbsøker('TEST-SIDE-2');
  const ikkeValgt = lagJobbsøker('TEST-IKKE-VALGT');
  const { markerFlere, synkroniserValgte } = useJobbsøkerValgStore.getState();
  markerFlere([første, andre]);

  synkroniserValgte([
    {
      ...første,
      status: JobbsøkerStatus.INVITERT,
      fornavn: null,
      etternavn: null,
    },
    ikkeValgt,
  ]);
  synkroniserValgte([andre]);
  markerFlere([andre]);

  expect(useJobbsøkerValgStore.getState().valgteJobbsøkere).toEqual([
    {
      personTreffId: første.personTreffId,
      fødselsnummer: første.fødselsnummer,
      fornavn: '',
      etternavn: '',
      status: JobbsøkerStatus.INVITERT,
    },
    {
      personTreffId: andre.personTreffId,
      fødselsnummer: andre.fødselsnummer,
      fornavn: andre.fornavn,
      etternavn: andre.etternavn,
      status: JobbsøkerStatus.LAGT_TIL,
    },
  ]);
});
