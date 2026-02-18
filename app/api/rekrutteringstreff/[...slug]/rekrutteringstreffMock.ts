import { RekrutteringstreffDTO } from './useRekrutteringstreff';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';

const baseTreff: RekrutteringstreffDTO = {
  id: 'd6a587cd-8797-4b9a-a68b-575373f16d65',
  tittel: 'Treff med navn',
  beskrivelse: null,
  fraTid: '2025-11-01T08:00:00+02:00',
  tilTid: '2025-11-01T10:00:00+02:00',
  svarfrist: '2025-11-01T07:00:00+02:00',
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
    beskrivelse: 'Et utkast som ikke er publisert ennå.',
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

export const rekrutteringstreffMock = (id: string): RekrutteringstreffDTO => {
  const mockFraStatus = Object.values(rekrutteringstreffMockPerStatus).find(
    (m) => m.id === id,
  );
  if (mockFraStatus) return mockFraStatus;

  if (id === '1231-1234-1234-1234') {
    return rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.UTKAST];
  }

  return rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.PUBLISERT];
};
