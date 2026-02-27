import { ArbeidsgiverHendelserDTO } from './useArbeidsgiverHendelser';
import { Faker, nb_NO } from '@faker-js/faker';

const faker = new Faker({ locale: [nb_NO] });

export const arbeidsgiverHendelserMock = (): ArbeidsgiverHendelserDTO => {
  faker.seed(456);

  const baseDate = new Date('2025-10-11T10:00:00+02:00');

  return [
    {
      id: faker.string.uuid(),
      tidspunkt: baseDate.toISOString(),
      hendelsestype: 'OPPRETTET',
      opprettetAvAktørType: 'ARRANGØR',
      aktøridentifikasjon: 'testperson',
      orgnr: faker.string.numeric(9),
      orgnavn: faker.company.name(),
    },
  ];
};
