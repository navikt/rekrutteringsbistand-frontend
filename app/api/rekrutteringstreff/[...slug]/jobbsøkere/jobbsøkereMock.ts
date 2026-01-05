import type { JobbsøkerDTO } from './useJobbsøkere';
import {
  JobbsøkerHendelsestype,
  JobbsøkerStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { Faker, en_NG, nb_NO } from '@faker-js/faker';
import navfaker from 'nav-faker/dist/index';

const faker = new Faker({ locale: [nb_NO] });
const fakerEN = new Faker({ locale: [en_NG] });

const jobbsøkerMock = (): JobbsøkerDTO => {
  const baseDate = new Date();
  return {
    personTreffId: faker.string.uuid(),
    fødselsnummer: navfaker.personIdentifikator.fødselsnummer(),
    fornavn: faker.person.firstName(),
    etternavn: faker.person.lastName(),
    navkontor: faker.helpers.arrayElement([
      'Nav Grorud',
      'Nav Bærum',
      'Nav Kongsberg',
    ]),
    veilederNavn: faker.person.firstName() + ' ' + fakerEN.person.lastName(),
    veilederNavIdent:
      faker.string.alpha(1).toUpperCase() + faker.string.numeric(6),
    status: JobbsøkerStatus.LAGT_TIL,
    hendelser: [
      {
        id: faker.string.uuid(),
        tidspunkt: new Date(baseDate.getTime()).toISOString(),
        hendelsestype: JobbsøkerHendelsestype.OPPRETTET,
        opprettetAvAktørType: 'ARRANGØR',
        aktørIdentifikasjon: 'testperson',
      },
      {
        id: faker.string.uuid(),
        tidspunkt: new Date(baseDate.getTime() + 1000).toISOString(),
        hendelsestype: JobbsøkerHendelsestype.INVITERT,
        opprettetAvAktørType: 'ARRANGØR',
        aktørIdentifikasjon: 'testperson',
      },
      {
        id: faker.string.uuid(),
        tidspunkt: new Date(baseDate.getTime() + 2000).toISOString(),
        hendelsestype: JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
        opprettetAvAktørType: 'ARRANGØR',
        aktørIdentifikasjon: 'testperson',
      },
    ],
  };
};

const jobbsøkerMedMinsideSvarMock = (): JobbsøkerDTO => {
  const baseDate = new Date();
  const fnr = navfaker.personIdentifikator.fødselsnummer();
  return {
    personTreffId: faker.string.uuid(),
    fødselsnummer: fnr,
    fornavn: faker.person.firstName(),
    etternavn: faker.person.lastName(),
    navkontor: faker.helpers.arrayElement([
      'Nav Grorud',
      'Nav Bærum',
      'Nav Kongsberg',
    ]),
    veilederNavn: faker.person.firstName() + ' ' + fakerEN.person.lastName(),
    veilederNavIdent:
      faker.string.alpha(1).toUpperCase() + faker.string.numeric(6),
    status: 'INVITERT',
    hendelser: [
      {
        id: faker.string.uuid(),
        tidspunkt: new Date(baseDate.getTime()).toISOString(),
        hendelsestype: JobbsøkerHendelsestype.OPPRETTET,
        opprettetAvAktørType: 'ARRANGØR',
        aktørIdentifikasjon: 'testperson',
      },
      {
        id: faker.string.uuid(),
        tidspunkt: new Date(baseDate.getTime() + 1000).toISOString(),
        hendelsestype: JobbsøkerHendelsestype.INVITERT,
        opprettetAvAktørType: 'ARRANGØR',
        aktørIdentifikasjon: 'testperson',
      },
      {
        id: faker.string.uuid(),
        tidspunkt: new Date(baseDate.getTime() + 2000).toISOString(),
        hendelsestype: JobbsøkerHendelsestype.MOTTATT_SVAR_FRA_MINSIDE,
        opprettetAvAktørType: 'SYSTEM',
        aktørIdentifikasjon: null,
        hendelseData: {
          varselId: faker.string.uuid(),
          avsenderReferanseId: faker.string.uuid(),
          fnr: fnr,
          eksternStatus: 'FERDIGSTILT',
          minsideStatus: 'AKTIV',
          opprettet: new Date(baseDate.getTime() + 1500).toISOString(),
          avsenderNavident: 'Z123456',
          eksternFeilmelding: null,
          eksternKanal: 'SMS',
          mal: 'KANDIDAT_INVITERT_TREFF',
          flettedata: null,
        },
      },
      {
        id: faker.string.uuid(),
        tidspunkt: new Date(baseDate.getTime() + 5000).toISOString(),
        hendelsestype: JobbsøkerHendelsestype.MOTTATT_SVAR_FRA_MINSIDE,
        opprettetAvAktørType: 'SYSTEM',
        aktørIdentifikasjon: null,
        hendelseData: {
          varselId: faker.string.uuid(),
          avsenderReferanseId: faker.string.uuid(),
          fnr: fnr,
          eksternStatus: 'FERDIGSTILT',
          minsideStatus: 'AKTIV',
          opprettet: new Date(baseDate.getTime() + 4500).toISOString(),
          avsenderNavident: 'Z123456',
          eksternFeilmelding: null,
          eksternKanal: 'SMS',
          mal: 'KANDIDAT_INVITERT_TREFF_ENDRET',
          flettedata: ['tidspunkt', 'sted'],
        },
      },
    ],
  };
};

export const jobbsøkereMock = () => [
  jobbsøkerMock(),
  jobbsøkerMedMinsideSvarMock(),
];
