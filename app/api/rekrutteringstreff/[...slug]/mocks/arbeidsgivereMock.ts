import { faker } from '@faker-js/faker/locale/nb_NO';

faker.seed(1337);
export const arbeidsgivereMock = [
  {
    organisasjonsnummer: faker.string.numeric(9),
    navn: faker.company.name(),
    status: 'Foreslått',
  },
];
