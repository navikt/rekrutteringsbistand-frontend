import type { ArbeidsgivereDTO } from './useArbeidsgivere';
import { faker } from '@faker-js/faker/locale/nb_NO';

export const arbeidsgivereMock = (): ArbeidsgivereDTO => {
  return [
    {
      arbeidsgiverTreffId: faker.string.uuid(),
      organisasjonsnummer: faker.string.numeric(9),
      navn: faker.company.name(),
      status: 'AKTIV',
    },
  ];
};
