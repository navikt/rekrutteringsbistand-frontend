import type { JobbsøkerDTO } from './useJobbsøkere';
import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_types/constants';
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
    kandidatnummer: 'PAM016jg9faeo',
    navkontor: faker.helpers.arrayElement([
      'Nav Grorud',
      'Nav Bærum',
      'Nav Kongsberg',
    ]),
    veilederNavn: faker.person.firstName() + ' ' + fakerEN.person.lastName(),
    veilederNavIdent:
      faker.string.alpha(1).toUpperCase() + faker.string.numeric(6),
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

export const jobbsøkereMock = () => [jobbsøkerMock(), jobbsøkerMock()];
