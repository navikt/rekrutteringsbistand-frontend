import { LeggTilNyJobbsøkerDTO } from '../../ny-jobbsøker/leggTilNyjobbsøker';
import { Faker, en_NG, nb_NO } from '@faker-js/faker';
import navfaker from 'nav-faker/dist/index';

const faker = new Faker({ locale: [nb_NO] });
const fakerEN = new Faker({ locale: [en_NG] });

export const jobbsøkerMock = (): LeggTilNyJobbsøkerDTO => {
  return {
    fødselsnummer: navfaker.personIdentifikator.fødselsnummer(),
    fornavn: faker.person.firstName(),
    etternavn: faker.person.lastName(),
    kandidatnummer: 'PAM016jg9faeo',
    navkontor: 'Nav Grorud',
    veilederNavn: faker.person.firstName() + ' ' + fakerEN.person.lastName(),
    veilederNavIdent: faker.string.alpha(1) + faker.string.numeric(6),
  };
};

export const jobbsøkereMock = [jobbsøkerMock()];
