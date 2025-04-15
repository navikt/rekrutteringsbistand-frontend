import { JobbsøkerHendelserDTO } from '../useJobbsøkerHendelser';
import { Faker, nb_NO } from '@faker-js/faker';

const faker = new Faker({ locale: [nb_NO] });

export const jobbsøkerHendelserMock = (): JobbsøkerHendelserDTO => {
  return [
    {
      id: faker.string.uuid(),
      tidspunkt: new Date().toISOString(),
      hendelsestype: 'LEGG_TIL',
      opprettetAvAktørType: 'ARRANGØR',
      aktørIdentifikasjon: 'testperson',
    },
  ];
};
