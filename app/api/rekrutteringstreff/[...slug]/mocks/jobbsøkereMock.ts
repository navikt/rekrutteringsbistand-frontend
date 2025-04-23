import { JobbsøkerDTO } from '../useJobbsøkere';
import { Faker, en_NG, nb_NO } from '@faker-js/faker';
import navfaker from 'nav-faker/dist/index';

const faker = new Faker({ locale: [nb_NO] });
const fakerEN = new Faker({ locale: [en_NG] });

export const jobbsøkerMock = (): JobbsøkerDTO => {
  return {
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
        tidspunkt: new Date().toISOString(),
        hendelsestype: 'OPPRETT',
        opprettetAvAktørType: 'ARRANGØR',
        aktørIdentifikasjon: 'testperson',
      },
    ],
  };
};

export const jobbsøkereMock = [jobbsøkerMock()];
