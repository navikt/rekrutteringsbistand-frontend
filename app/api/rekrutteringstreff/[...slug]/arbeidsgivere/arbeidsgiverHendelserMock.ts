import { ArbeidsgiverHendelserDTO } from './useArbeidsgiverHendelser';
import { faker } from '@faker-js/faker/locale/nb_NO';

export const arbeidsgiverHendelserMock = (): ArbeidsgiverHendelserDTO => {
  return [
    {
      id: faker.string.uuid(),
      tidspunkt: new Date().toISOString(),
      hendelsestype: 'OPPRETTET',
      opprettetAvAktørType: 'ARRANGØR',
      aktøridentifikasjon: 'testperson',
      orgnr: faker.string.numeric(9),
      orgnavn: faker.company.name(),
    },
  ];
};
