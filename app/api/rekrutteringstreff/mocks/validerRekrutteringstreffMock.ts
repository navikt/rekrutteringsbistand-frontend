import { faker } from '@faker-js/faker';

export const validerRekrutteringstreffMock = () => ({
  loggId: faker.string.uuid(),
  bryterRetningslinjer: true,
  begrunnelse:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu urna a ex bibendum ultricies at nec mi. In rutrum nulla at nisi molestie, nec tempor orci commodo.',
});
