import { faker } from '@faker-js/faker';

const validerRekrutteringstreffEndepunkt = '/api/rekrutteringstreff/ki/valider';

export const validerRekrutteringstreffMock = () => ({
  loggId: faker.string.uuid(),
  bryterRetningslinjer: true,
  begrunnelse:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu urna a ex bibendum ultricies at nec mi. In rutrum nulla at nisi molestie, nec tempor orci commodo.',
});

export const validerRekrutteringstreffMirage = (server: any): void => {
  server.post(validerRekrutteringstreffEndepunkt, () => {
    return validerRekrutteringstreffMock();
  });
};
