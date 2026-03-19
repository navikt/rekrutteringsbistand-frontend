import { RekrutteringstreffDTO } from './useRekrutteringstreff';
import { alleSokTreff } from '@/app/api/rekrutteringstreff/sok/rekrutteringstreffSokMock';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { addDays, subDays } from 'date-fns';

const morgendagensDato = addDays(new Date(), 1);
const morgendagensÅr = morgendagensDato.getFullYear();
const morgendagensMåned = String(morgendagensDato.getMonth() + 1).padStart(
  2,
  '0',
);
const morgendagensDag = String(morgendagensDato.getDate()).padStart(2, '0');

const gårsdagensDato = subDays(new Date(), 1);
const gårsdagensÅr = gårsdagensDato.getFullYear();
const gårsdagensMåned = String(gårsdagensDato.getMonth() + 1).padStart(2, '0');
const gårsdagensDag = String(gårsdagensDato.getDate()).padStart(2, '0');

const baseTreff: RekrutteringstreffDTO = {
  id: 'd6a587cd-8797-4b9a-a68b-575373f16d65',
  tittel: 'Treff med navn',
  beskrivelse: null,
  fraTid: `${morgendagensÅr}-${morgendagensMåned}-${morgendagensDag}T08:00:00+02:00`,
  tilTid: `${morgendagensÅr}-${morgendagensMåned}-${morgendagensDag}T10:00:00+02:00`,
  svarfrist: `${morgendagensÅr}-${morgendagensMåned}-${morgendagensDag}T07:00:00+02:00`,
  gateadresse: 'Malmøgata 1',
  postnummer: '5555',
  poststed: 'Kristiansand S',
  kommune: 'Kristiansand',
  kommunenummer: '4204',
  fylke: 'Agder',
  fylkesnummer: '42',
  status: RekrutteringstreffStatus.UTKAST,
  opprettetAvPersonNavident: 'A123456',
  opprettetAvNavkontorEnhetId: '0318',
  opprettetAvTidspunkt: '2025-10-08T09:35:42+02:00',
  antallArbeidsgivere: 3,
  antallJobbsøkere: 4,
  eiere: ['A123456', 'B654321', 'C654321', 'TestIdent'],
  kontorer: ['0318'],
  sistEndret: '2025-10-11T10:37:28+02:00',
  sistEndretAv: 'A123456',
};

export const rekrutteringstreffMockPerStatus: Record<
  (typeof RekrutteringstreffStatus)[keyof typeof RekrutteringstreffStatus],
  RekrutteringstreffDTO
> = {
  [RekrutteringstreffStatus.UTKAST]: {
    ...baseTreff,
    id: 'utkast',
    tittel: 'Rekrutteringstreff – utkast',
    beskrivelse: null,
    fraTid: null,
    tilTid: null,
    svarfrist: null,
    gateadresse: null,
    postnummer: null,
    poststed: null,
    kommune: null,
    kommunenummer: null,
    fylke: null,
    fylkesnummer: null,
    status: RekrutteringstreffStatus.UTKAST,
    antallArbeidsgivere: 0,
    antallJobbsøkere: 0,
  },
  [RekrutteringstreffStatus.PUBLISERT]: {
    ...baseTreff,
    id: 'publisert',
    tittel: 'Rekrutteringstreff i Kristiansand',
    beskrivelse:
      'Møt arbeidsgivere innen bygg og anlegg. Alle jobbsøkere er velkommen!',
    status: RekrutteringstreffStatus.PUBLISERT,
    antallArbeidsgivere: 5,
    antallJobbsøkere: 12,
  },
  [RekrutteringstreffStatus.FULLFØRT]: {
    ...baseTreff,
    id: 'fullfort',
    tittel: 'Gjennomført treff – restaurant og hotell',
    beskrivelse: 'Treffet ble gjennomført med godt oppmøte.',
    fraTid: '2025-09-15T09:00:00+02:00',
    tilTid: '2025-09-15T12:00:00+02:00',
    svarfrist: '2025-09-14T23:59:00+02:00',
    status: RekrutteringstreffStatus.FULLFØRT,
    antallArbeidsgivere: 4,
    antallJobbsøkere: 18,
    opprettetAvTidspunkt: '2025-08-20T10:00:00+02:00',
    sistEndret: '2025-09-15T13:00:00+02:00',
  },
  [RekrutteringstreffStatus.AVLYST]: {
    ...baseTreff,
    id: 'avlyst',
    tittel: 'Avlyst treff – transport og logistikk',
    beskrivelse: 'Treffet ble avlyst grunnet manglende påmeldinger.',
    fraTid: '2025-10-20T10:00:00+02:00',
    tilTid: '2025-10-20T13:00:00+02:00',
    svarfrist: '2025-10-19T23:59:00+02:00',
    status: RekrutteringstreffStatus.AVLYST,
    antallArbeidsgivere: 1,
    antallJobbsøkere: 0,
    opprettetAvTidspunkt: '2025-09-25T08:00:00+02:00',
    sistEndret: '2025-10-18T14:30:00+02:00',
  },
  [RekrutteringstreffStatus.SLETTET]: {
    ...baseTreff,
    id: 'slettet',
    tittel: 'Slettet treff – duplikat',
    beskrivelse: 'Ble opprettet ved en feil og deretter slettet.',
    fraTid: null,
    tilTid: null,
    svarfrist: null,
    gateadresse: null,
    postnummer: null,
    poststed: null,
    kommune: null,
    kommunenummer: null,
    fylke: null,
    fylkesnummer: null,
    status: RekrutteringstreffStatus.SLETTET,
    antallArbeidsgivere: 0,
    antallJobbsøkere: 0,
    opprettetAvTidspunkt: '2025-10-01T11:00:00+02:00',
    sistEndret: '2025-10-01T11:05:00+02:00',
  },
};

export const ikkeEierTreffMock: Record<string, RekrutteringstreffDTO> = {
  'ikke-eier-utkast': {
    ...baseTreff,
    id: 'ikke-eier-utkast',
    tittel: 'Utkast treff – noen andre sitt',
    beskrivelse: 'Et utkast du ikke eier.',
    fraTid: null,
    tilTid: null,
    svarfrist: null,
    gateadresse: null,
    postnummer: null,
    poststed: null,
    kommune: null,
    kommunenummer: null,
    fylke: null,
    fylkesnummer: null,
    status: RekrutteringstreffStatus.UTKAST,
    opprettetAvPersonNavident: 'X999999',
    eiere: ['X999999'],
    antallArbeidsgivere: 0,
    antallJobbsøkere: 0,
  },
  'ikke-eier-publisert': {
    ...baseTreff,
    id: 'ikke-eier-publisert',
    tittel: 'Publisert treff – noen andre sitt',
    beskrivelse: 'Et publisert treff du ikke eier.',
    status: RekrutteringstreffStatus.PUBLISERT,
    opprettetAvPersonNavident: 'X999999',
    eiere: ['X999999'],
    antallArbeidsgivere: 2,
    antallJobbsøkere: 5,
  },
  'ikke-eier-fullfort': {
    ...baseTreff,
    id: 'ikke-eier-fullfort',
    tittel: 'Fullført treff – noen andre sitt',
    beskrivelse: 'Et fullført treff du ikke eier.',
    fraTid: '2025-09-10T09:00:00+02:00',
    tilTid: '2025-09-10T12:00:00+02:00',
    svarfrist: '2025-09-09T23:59:00+02:00',
    status: RekrutteringstreffStatus.FULLFØRT,
    opprettetAvPersonNavident: 'X999999',
    eiere: ['X999999'],
    antallArbeidsgivere: 3,
    antallJobbsøkere: 10,
    opprettetAvTidspunkt: '2025-08-15T08:00:00+02:00',
    sistEndret: '2025-09-10T13:00:00+02:00',
  },
  'ikke-eier-avlyst': {
    ...baseTreff,
    id: 'ikke-eier-avlyst',
    tittel: 'Avlyst treff – noen andre sitt',
    beskrivelse: 'Et avlyst treff du ikke eier.',
    fraTid: '2025-10-05T10:00:00+02:00',
    tilTid: '2025-10-05T13:00:00+02:00',
    svarfrist: '2025-10-04T23:59:00+02:00',
    status: RekrutteringstreffStatus.AVLYST,
    opprettetAvPersonNavident: 'X999999',
    eiere: ['X999999'],
    antallArbeidsgivere: 1,
    antallJobbsøkere: 3,
    opprettetAvTidspunkt: '2025-09-01T08:00:00+02:00',
    sistEndret: '2025-10-03T14:00:00+02:00',
  },
};

export const rekrutteringstreffMock = (id: string): RekrutteringstreffDTO => {
  const mockFraStatus = Object.values(rekrutteringstreffMockPerStatus).find(
    (m) => m.id === id,
  );
  if (mockFraStatus) return mockFraStatus;

  const ikkeEier = ikkeEierTreffMock[id];
  if (ikkeEier) return ikkeEier;

  const sokTreff = alleSokTreff.find((t) => t.id === id);
  if (sokTreff) {
    const statusMap: Record<string, string> = {
      utkast: 'UTKAST',
      publisert: 'PUBLISERT',
      fullfort: 'FULLFØRT',
      avlyst: 'AVLYST',
    };
    return {
      ...baseTreff,
      id: sokTreff.id,
      tittel: sokTreff.tittel,
      beskrivelse: sokTreff.beskrivelse,
      fraTid: sokTreff.fraTid,
      tilTid: sokTreff.tilTid,
      svarfrist: sokTreff.svarfrist,
      gateadresse: sokTreff.gateadresse,
      postnummer: sokTreff.postnummer,
      poststed: sokTreff.poststed,
      status: (statusMap[sokTreff.status] ??
        'PUBLISERT') as RekrutteringstreffDTO['status'],
      opprettetAvTidspunkt: sokTreff.opprettetAvTidspunkt,
      sistEndret: sokTreff.sistEndret,
      eiere: sokTreff.eiere,
      kontorer: sokTreff.kontorer,
      antallArbeidsgivere:
        sokTreff.status === 'utkast' ? 0 : baseTreff.antallArbeidsgivere,
      antallJobbsøkere:
        sokTreff.status === 'utkast' ? 0 : baseTreff.antallJobbsøkere,
    };
  }

  if (id === '1231-1234-1234-1234') {
    return rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.UTKAST];
  }

  if (id === 'ingen-svart-ja') {
    return {
      ...rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.PUBLISERT],
      id: 'ingen-svart-ja',
      tittel: 'Treff uten ja-svar',
    };
  }

  if (id === 'publisert-tidspunkt-passert') {
    return {
      ...rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.PUBLISERT],
      id: 'publisert-tidspunkt-passert',
      tittel: 'Publisert treff der treff-tidspunktet har passert',
      fraTid: `${gårsdagensÅr}-${gårsdagensMåned}-${gårsdagensDag}T08:00:00+02:00`,
      tilTid: `${gårsdagensÅr}-${gårsdagensMåned}-${gårsdagensDag}T10:00:00+02:00`,
      svarfrist: `${gårsdagensÅr}-${gårsdagensMåned}-${gårsdagensDag}T07:00:00+02:00`,
    };
  }

  return rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.PUBLISERT];
};
