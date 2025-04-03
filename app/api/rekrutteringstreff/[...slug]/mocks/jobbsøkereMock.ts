import { LeggTilNyJobbsøkerDTO } from '../../ny-arbeidssøker/leggTilNyjobbsøker';
import { faker } from '@faker-js/faker/locale/nb_NO';
import navfaker from 'nav-faker/dist/index';

export const jobbsøkerMock = (): LeggTilNyJobbsøkerDTO => {
  return {
    fødselsnummer: navfaker.personIdentifikator.fødselsnummer(),
    fornavn: faker.person.firstName(),
    etternavn: faker.person.lastName(),
    kandidatnummer: 'PAM016jg9faeo',
  };
};

export const jobbsøkereMock = [jobbsøkerMock()];
