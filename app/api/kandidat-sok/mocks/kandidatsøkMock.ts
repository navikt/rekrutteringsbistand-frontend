import { Innsatsgruppe } from '../../../kandidat/components/innsatsgrupper';
import { faker } from '@faker-js/faker/locale/nb_NO';

faker.seed(123);

const createCandidate = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fnr = faker.string.numeric(11);

  const arenaKandidatnr = faker.helpers.arrayElement([
    `PAM${faker.string.numeric(3)}${faker.string.alphanumeric(6).toLowerCase()}`,
    faker.string.numeric(13),
  ]);

  const jobInterests = [
    {
      styrkBeskrivelse: 'Sykepleier',
      sokeTitler: ['Sykepleier', 'Hjemmesykepleier', 'Spesialsykepleier'],
      primaertJobbonske: faker.datatype.boolean(),
      styrkKode: null,
    },
    {
      styrkBeskrivelse: 'Butikkmedarbeider',
      sokeTitler: ['Butikkmedarbeider', 'Salgsmedarbeider', 'Butikkbetjent'],
      primaertJobbonske: faker.datatype.boolean(),
      styrkKode: null,
    },
    {
      styrkBeskrivelse: 'Lærer',
      sokeTitler: ['Lærer', 'Grunnskolelærer', 'Barneskole'],
      primaertJobbonske: faker.datatype.boolean(),
      styrkKode: null,
    },
  ];

  const numberOfInterests = faker.number.int({ min: 1, max: 3 });
  const selectedInterests = faker.helpers.arrayElements(
    jobInterests,
    numberOfInterests,
  );

  const geoInterests = [
    {
      geografiKodeTekst: 'Oslo',
      geografiKode: 'NO03.0301',
    },
    {
      geografiKodeTekst: 'Bergen',
      geografiKode: 'NO46.4601',
    },
    {
      geografiKodeTekst: 'Trondheim',
      geografiKode: 'NO50.5001',
    },
    {
      geografiKodeTekst: 'Stavanger',
      geografiKode: 'NO11.1103',
    },
    {
      geografiKodeTekst: 'Tromsø',
      geografiKode: 'NO54.5401',
    },
  ];

  // Pick random geo interests (1-3)
  const numberOfGeoInterests = faker.number.int({ min: 1, max: 3 });
  const selectedGeoInterests = faker.helpers.arrayElements(
    geoInterests,
    numberOfGeoInterests,
  );

  return {
    yrkeJobbonskerObj: selectedInterests,
    etternavn: lastName,
    postnummer: faker.location.zipCode('####'),
    arenaKandidatnr,
    kommuneNavn: faker.location.city(),
    geografiJobbonsker: selectedGeoInterests,
    fornavn: firstName,
    fodselsnummer: fnr,
    innsatsgruppe: faker.helpers.arrayElement([
      Innsatsgruppe.STANDARD_INNSATS,
      Innsatsgruppe.SITUASJONSBESTEMT_INNSATS,
      Innsatsgruppe.SPESIELT_TILPASSET_INNSATS,
      Innsatsgruppe.VARIG_TILPASSET_INNSATS,
    ]),
  };
};

const candidates = Array.from({ length: 25 }, createCandidate);

const kandidatnumre = candidates.map((candidate) => candidate.arenaKandidatnr);

export const kandidatSøkMock = {
  kandidater: candidates,
  navigering: {
    kandidatnumre,
  },
  antallTotalt: 1335,
};
