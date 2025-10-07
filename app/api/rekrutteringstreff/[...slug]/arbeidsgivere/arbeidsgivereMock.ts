import type { ArbeidsgivereDTO } from './useArbeidsgivere';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { faker } from '@faker-js/faker/locale/nb_NO';

export const arbeidsgivereMock = (): ArbeidsgivereDTO => {
  return [
    {
      arbeidsgiverTreffId: faker.string.uuid(),
      organisasjonsnummer: faker.string.numeric(9),
      navn: faker.company.name(),
      hendelser: [
        {
          id: faker.string.uuid(),
          tidspunkt: new Date().toISOString(),
          hendelsestype: 'OPPRETT',
          opprettetAvAktørType: 'ARRANGØR',
          aktøridentifikasjon: 'testperson',
          orgnr: faker.string.numeric(9),
          orgnavn: faker.company.name(),
        },
        {
          id: faker.string.uuid(),
          tidspunkt: new Date().toISOString(),
          hendelsestype: 'OPPRETT',
          opprettetAvAktørType: 'ARRANGØR',
          aktøridentifikasjon: 'testperson',
          orgnr: faker.string.numeric(9),
          orgnavn: faker.company.name(),
        },
      ],
    },
  ];
};

export const rekrutteringstreffArbeidsgivereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/arbeidsgiver`;

export const rekrutteringstreffArbeidsgivereMirage = (server: any) => {
  return server.get(rekrutteringstreffArbeidsgivereEndepunkt('*'), () =>
    arbeidsgivereMock(),
  );
};
