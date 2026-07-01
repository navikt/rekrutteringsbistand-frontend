import { RekrutteringstreffDTO } from './useRekrutteringstreff';
import { alleSokTreff } from '@/app/api/rekrutteringstreff/sok/rekrutteringstreffSokMock';
import {
  RekrutteringstreffKategori,
  RekrutteringstreffStatus,
  RekrutteringstreffStatusLabel,
} from '@/app/rekrutteringstreff/_types/constants';
import { addDays, subDays } from 'date-fns';

const iso = (date: Date, time: string) => {
  const år = date.getFullYear();
  const måned = String(date.getMonth() + 1).padStart(2, '0');
  const dag = String(date.getDate()).padStart(2, '0');
  return `${år}-${måned}-${dag}T${time}+02:00`;
};

const morgendagensDato = addDays(new Date(), 1);
const gårsdagensDato = subDays(new Date(), 1);

const TEST_EIER = 'TestIdent';
const STANDARD_EIERE = ['A123456', 'B654321', 'C654321', TEST_EIER];

const baseTreff: RekrutteringstreffDTO = {
  id: 'd6a587cd-8797-4b9a-a68b-575373f16d65',
  tittel: 'Treff med navn',
  beskrivelse: null,
  fraTid: iso(morgendagensDato, '08:00:00'),
  tilTid: iso(morgendagensDato, '10:00:00'),
  svarfrist: iso(morgendagensDato, '07:00:00'),
  gateadresse: 'Malmøgata 1',
  postnummer: '5555',
  poststed: 'Kristiansand S',
  kommune: 'Kristiansand',
  kommunenummer: '4204',
  fylke: 'Agder',
  fylkesnummer: '42',
  kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
  status: RekrutteringstreffStatus.UTKAST,
  opprettetAvPersonNavident: 'A123456',
  opprettetAvNavkontorEnhetId: '0318',
  opprettetAvTidspunkt: '2025-10-08T09:35:42+02:00',
  antallArbeidsgivere: 3,
  antallJobbsøkere: 4,
  antallJobbsøkereSvartJa: 2,
  antallJobbsøkereFåttJobb: 0,
  eiere: STANDARD_EIERE,
  kontorer: ['0318'],
  sistEndret: '2025-10-11T10:37:28+02:00',
  sistEndretAv: 'A123456',
};

const tomtUtkast: Pick<
  RekrutteringstreffDTO,
  | 'beskrivelse'
  | 'fraTid'
  | 'tilTid'
  | 'svarfrist'
  | 'gateadresse'
  | 'postnummer'
  | 'poststed'
  | 'kommune'
  | 'kommunenummer'
  | 'fylke'
  | 'fylkesnummer'
  | 'antallArbeidsgivere'
  | 'antallJobbsøkere'
  | 'antallJobbsøkereSvartJa'
> = {
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
  antallArbeidsgivere: 0,
  antallJobbsøkere: 0,
  antallJobbsøkereSvartJa: 0,
};

export const rekrutteringstreffMockPerStatus: Record<
  RekrutteringstreffStatus,
  RekrutteringstreffDTO
> = {
  [RekrutteringstreffStatus.UTKAST]: {
    ...baseTreff,
    ...tomtUtkast,
    id: 'utkast',
    tittel: RekrutteringstreffStatusLabel.UTKAST,
    status: RekrutteringstreffStatus.UTKAST,
  },
  [RekrutteringstreffStatus.PUBLISERT]: {
    ...baseTreff,
    id: 'publisert',
    tittel: RekrutteringstreffStatusLabel.PUBLISERT,
    beskrivelse:
      'Møt arbeidsgivere innen bygg og anlegg. Alle jobbsøkere er velkommen!',
    status: RekrutteringstreffStatus.PUBLISERT,
    antallArbeidsgivere: 5,
    antallJobbsøkere: 12,
  },
  [RekrutteringstreffStatus.FULLFØRT]: {
    ...baseTreff,
    id: 'fullfort',
    tittel: RekrutteringstreffStatusLabel.FULLFØRT,
    beskrivelse: 'Treffet ble gjennomført med godt oppmøte.',
    fraTid: '2025-09-15T09:00:00+02:00',
    tilTid: '2025-09-15T12:00:00+02:00',
    svarfrist: '2025-09-14T23:59:00+02:00',
    status: RekrutteringstreffStatus.FULLFØRT,
    antallArbeidsgivere: 4,
    antallJobbsøkere: 18,
    antallJobbsøkereSvartJa: 10,
    antallJobbsøkereFåttJobb: 2,
    opprettetAvTidspunkt: '2025-08-20T10:00:00+02:00',
    sistEndret: '2025-09-15T13:00:00+02:00',
  },
  [RekrutteringstreffStatus.AVLYST]: {
    ...baseTreff,
    id: 'avlyst',
    tittel: RekrutteringstreffStatusLabel.AVLYST,
    beskrivelse: 'Treffet ble avlyst grunnet manglende påmeldinger.',
    fraTid: '2025-10-20T10:00:00+02:00',
    tilTid: '2025-10-20T13:00:00+02:00',
    svarfrist: '2025-10-19T23:59:00+02:00',
    status: RekrutteringstreffStatus.AVLYST,
    antallArbeidsgivere: 1,
    antallJobbsøkere: 0,
    antallJobbsøkereSvartJa: 0,
    opprettetAvTidspunkt: '2025-09-25T08:00:00+02:00',
    sistEndret: '2025-10-18T14:30:00+02:00',
  },
  [RekrutteringstreffStatus.SLETTET]: {
    ...baseTreff,
    ...tomtUtkast,
    id: 'slettet',
    tittel: RekrutteringstreffStatusLabel.SLETTET,
    status: RekrutteringstreffStatus.SLETTET,
    opprettetAvTidspunkt: '2025-10-01T11:00:00+02:00',
    sistEndret: '2025-10-01T11:05:00+02:00',
  },
};

const ikkeEierBase = (
  status: RekrutteringstreffStatus,
): Pick<
  RekrutteringstreffDTO,
  'opprettetAvPersonNavident' | 'eiere' | 'sistEndretAv' | 'status'
> => ({
  status,
  opprettetAvPersonNavident: 'X999999',
  eiere: ['X999999'],
  sistEndretAv: 'X999999',
});

export const ikkeEierTreffMock: Record<string, RekrutteringstreffDTO> = {
  'ikke-eier-utkast': {
    ...rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.UTKAST],
    ...ikkeEierBase(RekrutteringstreffStatus.UTKAST),
    id: 'ikke-eier-utkast',
    tittel: 'Utkast – noen andre sitt',
  },
  'ikke-eier-publisert': {
    ...rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.PUBLISERT],
    ...ikkeEierBase(RekrutteringstreffStatus.PUBLISERT),
    id: 'ikke-eier-publisert',
    tittel: 'Publisert – noen andre sitt',
    antallArbeidsgivere: 2,
    antallJobbsøkere: 5,
    antallJobbsøkereSvartJa: 3,
  },
  'ikke-eier-fullfort': {
    ...rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.FULLFØRT],
    ...ikkeEierBase(RekrutteringstreffStatus.FULLFØRT),
    id: 'ikke-eier-fullfort',
    tittel: 'Fullført – noen andre sitt',
  },
  'ikke-eier-avlyst': {
    ...rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.AVLYST],
    ...ikkeEierBase(RekrutteringstreffStatus.AVLYST),
    id: 'ikke-eier-avlyst',
    tittel: 'Avlyst – noen andre sitt',
  },
  'formidling-alle-forbudt': {
    ...rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.PUBLISERT],
    ...ikkeEierBase(RekrutteringstreffStatus.PUBLISERT),
    id: 'formidling-alle-forbudt',
    tittel: 'Publisert – uten formidlingstilgang',
    antallArbeidsgivere: 0,
    antallJobbsøkere: 0,
    antallJobbsøkereSvartJa: 0,
  },
};

const fraSokTreff = (id: string): RekrutteringstreffDTO | null => {
  const sokTreff = alleSokTreff.find((t) => t.id === id);
  if (!sokTreff) return null;
  const status = sokTreff.status;
  const erUtkast = status === RekrutteringstreffStatus.UTKAST;
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
    status,
    opprettetAvTidspunkt: sokTreff.opprettetAvTidspunkt,
    sistEndret: sokTreff.sistEndret,
    eiere: sokTreff.eiere,
    kontorer: sokTreff.kontorer,
    antallArbeidsgivere: erUtkast ? 0 : baseTreff.antallArbeidsgivere,
    antallJobbsøkere: erUtkast ? 0 : baseTreff.antallJobbsøkere,
    antallJobbsøkereSvartJa: erUtkast ? 0 : baseTreff.antallJobbsøkereSvartJa,
  };
};

export const rekrutteringstreffMock = (id: string): RekrutteringstreffDTO => {
  const fraStatus = Object.values(rekrutteringstreffMockPerStatus).find(
    (m) => m.id === id,
  );
  if (fraStatus) return fraStatus;

  const ikkeEier = ikkeEierTreffMock[id];
  if (ikkeEier) return ikkeEier;

  // Spesial-ID-er må sjekkes før `fraSokTreff` siden de også finnes i søke-mocken,
  // men trenger fullstendig data (eiere, adresse osv.) fra detaljmocken.
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

  if (id === 'formidling-uten-jobbsokere') {
    return {
      ...rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.PUBLISERT],
      id: 'formidling-uten-jobbsokere',
      tittel: 'Publisert treff uten jobbsøkere',
      antallJobbsøkere: 0,
      antallJobbsøkereSvartJa: 0,
    };
  }

  if (id === 'publisert-tidspunkt-passert') {
    return {
      ...rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.PUBLISERT],
      id: 'publisert-tidspunkt-passert',
      tittel: 'Publisert treff der treff-tidspunktet har passert',
      fraTid: iso(gårsdagensDato, '08:00:00'),
      tilTid: iso(gårsdagensDato, '10:00:00'),
      svarfrist: iso(gårsdagensDato, '07:00:00'),
    };
  }

  if (id === 'for-faa-svart-ja') {
    return {
      ...rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.PUBLISERT],
      id: 'for-faa-svart-ja',
      tittel: 'Publisert treff – for få jobbsøkere svart ja',
      beskrivelse: 'Testtreff for varselbanner',
      fraTid: iso(morgendagensDato, '08:00:00'),
      tilTid: iso(morgendagensDato, '10:00:00'),
      svarfrist: iso(morgendagensDato, '07:00:00'),
      antallArbeidsgivere: 2,
      antallJobbsøkere: 5,
      antallJobbsøkereSvartJa: 1,
    };
  }

  const fraSok = fraSokTreff(id);
  if (fraSok) return fraSok;

  return rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.PUBLISERT];
};
