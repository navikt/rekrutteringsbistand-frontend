import { faker } from '@faker-js/faker/locale/nb_NO';

export const arbeidsgivereMock = [
  {
    organisasjonsnummer: faker.string.numeric(9),
    navn: faker.company.name(),
  },
];
