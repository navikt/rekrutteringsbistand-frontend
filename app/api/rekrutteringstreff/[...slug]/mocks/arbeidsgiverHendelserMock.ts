import { ArbeidsgiverHendelserDTO } from '@/app/api/rekrutteringstreff/[...slug]/hendelser/useArbeidsgiverHendelser';
import { faker } from '@faker-js/faker/locale/nb_NO';

export const arbeidsgiverHendelserMock = (): ArbeidsgiverHendelserDTO => {
  return [
    {
      id: faker.string.uuid(),
      tidspunkt: new Date().toISOString(),
      hendelsestype: 'OPPRETT',
      opprettetAvAktørType: 'ARRANGØR',
      aktøridentifikasjon: 'testperson',
      orgnr: faker.string.numeric(9),
      orgnavn: faker.company.name(),
    },
  ];
};
