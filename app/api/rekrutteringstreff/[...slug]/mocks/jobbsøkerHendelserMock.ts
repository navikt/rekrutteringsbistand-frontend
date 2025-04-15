import { JobbsøkerHendelserDTO } from '../useJobbsøkerHendelser';
import { Faker, nb_NO } from '@faker-js/faker';
import navfaker from 'nav-faker/dist/index';

const faker = new Faker({ locale: [nb_NO] });

export const jobbsøkerHendelserMock = (): JobbsøkerHendelserDTO => {
  return [
    {
      id: faker.string.uuid(),
      tidspunkt: new Date().toISOString(),
      hendelsestype: 'LEGG_TIL',
      opprettetAvAktørType: 'ARRANGØR',
      aktørIdentifikasjon: 'testperson',
      fødselsnummer: navfaker.personIdentifikator.fødselsnummer(),
      kandidatnummer: 'PAM016jg9faeo',
      fornavn: faker.person.firstName(),
      etternavn: faker.person.lastName(),
    },
  ];
};
