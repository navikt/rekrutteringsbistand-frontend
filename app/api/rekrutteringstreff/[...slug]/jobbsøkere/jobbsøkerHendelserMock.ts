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
      fornavn,
      etternavn,
      personTreffId,
      hendelseData: {
        fnr: '23833348965',
        mal: 'KANDIDAT_INVITERT_TREFF_ENDRET',
        varselId: 'A400',
        opprettet: '2025-12-22T09:50:29.76371+01:00',
        eksternKanal: 'SMS',
        eksternStatus: 'FERDIGSTILT',
        minsideStatus: 'OPPRETTET',
        avsenderNavident: 'Z994886',
        eksternFeilmelding: null,
        avsenderReferanseId: '7647c336-cb7e-4918-83eb-cc5fc3442d8c',
      },
    },
    {
      id: faker.string.uuid(),
      tidspunkt: '2025-12-22T09:50:27+01:00',
      hendelsestype: 'TREFF_ENDRET_ETTER_PUBLISERING_NOTIFIKASJON',
      opprettetAvAktørType: 'ARRANGØR',
      aktørIdentifikasjon: 'Z994886',
      fødselsnummer: fnr,
      fornavn,
      etternavn,
      personTreffId,
      hendelseData: {
        navn: null,
        sted: {
          nyVerdi: 'Malmøgata 23, 5555, Førde i Hordaland',
          skalVarsle: true,
          gammelVerdi: 'Malmøgata 2j, 5555, Førde i Hordaland',
        },
        svarfrist: null,
        tidspunkt: null,
        introduksjon: null,
      },
    },
  ];
};
