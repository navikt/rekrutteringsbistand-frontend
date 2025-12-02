import { JobbsøkerHendelserDTO } from './useJobbsøkerHendelser';
import { Faker, nb_NO } from '@faker-js/faker';
import navfaker from 'nav-faker/dist/index';

const faker = new Faker({ locale: [nb_NO] });

export const jobbsøkerHendelserMock = (): JobbsøkerHendelserDTO => {
  const personTreffId = faker.string.uuid();
  const fnr = navfaker.personIdentifikator.fødselsnummer();
  const fornavn = faker.person.firstName();
  const etternavn = faker.person.lastName();
  const baseDate = new Date();

  return [
    {
      id: faker.string.uuid(),
      tidspunkt: new Date(baseDate.getTime()).toISOString(),
      hendelsestype: 'OPPRETTET',
      opprettetAvAktørType: 'ARRANGØR',
      aktørIdentifikasjon: 'testperson',
      fødselsnummer: fnr,
      kandidatnummer: 'PAM016jg9faeo',
      fornavn,
      etternavn,
      personTreffId,
    },
    {
      id: faker.string.uuid(),
      tidspunkt: new Date(baseDate.getTime() + 1000).toISOString(),
      hendelsestype: 'INVITERT',
      opprettetAvAktørType: 'ARRANGØR',
      aktørIdentifikasjon: 'testperson',
      fødselsnummer: fnr,
      kandidatnummer: 'PAM016jg9faeo',
      fornavn,
      etternavn,
      personTreffId,
    },
    {
      id: faker.string.uuid(),
      tidspunkt: new Date(baseDate.getTime() + 2000).toISOString(),
      hendelsestype: 'MOTTATT_SVAR_FRA_MINSIDE',
      opprettetAvAktørType: 'ARRANGØR',
      aktørIdentifikasjon: undefined,
      fødselsnummer: fnr,
      kandidatnummer: 'PAM016jg9faeo',
      fornavn,
      etternavn,
      personTreffId,
    },
  ];
};
