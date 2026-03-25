import type {
  JobbsøkerSøkTreffDTO,
  JobbsøkerSøkResponsDTO,
} from './useJobbsøkere';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { Faker, nb_NO } from '@faker-js/faker';

const faker = new Faker({ locale: [nb_NO] });
faker.seed(123);

const lagId = () => faker.string.uuid();

const jobbsøkerLagtTil = (): JobbsøkerSøkTreffDTO => ({
  personTreffId: 'js-lagt-til',
  fornavn: 'Marius',
  etternavn: 'Johnsen',
  innsatsgruppe: 'STANDARD_INNSATS',
  fylke: 'Viken',
  kommune: 'Bærum',
  poststed: 'Sandvika',
  navkontor: 'Nav Bærum',
  veilederNavn: 'Fredrik Agboola',
  veilederNavident: 'L174111',
  status: JobbsøkerStatus.LAGT_TIL,
  invitertDato: null,
});

const jobbsøkerInvitertSmsOgEpost = (): JobbsøkerSøkTreffDTO => ({
  personTreffId: 'js-invitert-sms-epost',
  fornavn: 'Håkon',
  etternavn: 'Pettersen',
  innsatsgruppe: 'SITUASJONSBESTEMT_INNSATS',
  fylke: 'Viken',
  kommune: 'Bærum',
  poststed: 'Bekkestua',
  navkontor: 'Nav Bærum',
  veilederNavn: 'Marie Oluwanisola',
  veilederNavident: 'A479484',
  status: JobbsøkerStatus.INVITERT,
  invitertDato: '2026-02-12T11:00:00Z',
});

const jobbsøkerSvartJa = (): JobbsøkerSøkTreffDTO => ({
  personTreffId: 'js-svart-ja',
  fornavn: 'Jonathan',
  etternavn: 'Huseby',
  innsatsgruppe: 'SPESIELT_TILPASSET_INNSATS',
  fylke: 'Viken',
  kommune: 'Kongsberg',
  poststed: 'Kongsberg',
  navkontor: 'Nav Kongsberg',
  veilederNavn: 'Eline Bello',
  veilederNavident: 'J370702',
  status: JobbsøkerStatus.SVART_JA,
  invitertDato: '2026-02-12T11:00:00Z',
});

const jobbsøkerSvartNei = (): JobbsøkerSøkTreffDTO => ({
  personTreffId: 'js-svart-nei',
  fornavn: 'Lise',
  etternavn: 'Andersen',
  innsatsgruppe: 'STANDARD_INNSATS',
  fylke: 'Oslo',
  kommune: 'Oslo',
  poststed: 'Grorud',
  navkontor: 'Nav Grorud',
  veilederNavn: 'Per Hansen',
  veilederNavident: 'P123456',
  status: JobbsøkerStatus.SVART_NEI,
  invitertDato: '2026-02-12T11:00:00Z',
});

const jobbsøkerKunMinside = (): JobbsøkerSøkTreffDTO => ({
  personTreffId: 'js-minside',
  fornavn: 'Stor',
  etternavn: 'Test',
  innsatsgruppe: null,
  fylke: 'Oslo',
  kommune: 'Oslo',
  poststed: 'Grorud',
  navkontor: 'Nav Grorud',
  veilederNavn: 'Ole Vansen',
  veilederNavident: 'Z999888',
  status: JobbsøkerStatus.INVITERT,
  invitertDato: '2026-02-12T11:00:00Z',
});

const jobbsøkerFeiletVarsel = (): JobbsøkerSøkTreffDTO => ({
  personTreffId: 'js-feilet',
  fornavn: 'Teoretisk',
  etternavn: 'Skade',
  innsatsgruppe: 'VARIG_TILPASSET_INNSATS',
  fylke: 'Oslo',
  kommune: 'Oslo',
  poststed: 'Stovner',
  navkontor: 'Nav Stovner',
  veilederNavn: 'Kari Nordmann',
  veilederNavident: 'Z990248',
  status: JobbsøkerStatus.INVITERT,
  invitertDato: '2026-02-12T11:00:00Z',
});

const jobbsøkerAvlystSvartJa = (): JobbsøkerSøkTreffDTO => ({
  personTreffId: 'js-avlyst-svart-ja',
  fornavn: 'Kristine',
  etternavn: 'Bakken',
  innsatsgruppe: 'STANDARD_INNSATS',
  fylke: 'Oslo',
  kommune: 'Oslo',
  poststed: 'Sagene',
  navkontor: 'Nav Sagene',
  veilederNavn: 'Thomas Berg',
  veilederNavident: 'T456789',
  status: JobbsøkerStatus.SVART_JA,
  invitertDato: '2026-02-12T11:00:00Z',
});

const jobbsøkerEndretTreff = (): JobbsøkerSøkTreffDTO => ({
  personTreffId: 'js-endret-treff',
  fornavn: 'Anders',
  etternavn: 'Holm',
  innsatsgruppe: 'SITUASJONSBESTEMT_INNSATS',
  fylke: 'Oslo',
  kommune: 'Oslo',
  poststed: 'Grünerløkka',
  navkontor: 'Nav Grünerløkka',
  veilederNavn: 'Siri Dahl',
  veilederNavident: 'S789012',
  status: JobbsøkerStatus.SVART_JA,
  invitertDato: '2026-02-12T11:00:00Z',
});

const jobbsøkerLagtTil2 = (): JobbsøkerSøkTreffDTO => ({
  personTreffId: 'js-lagt-til-2',
  fornavn: 'Emilie',
  etternavn: 'Berg',
  innsatsgruppe: 'STANDARD_INNSATS',
  fylke: 'Oslo',
  kommune: 'Oslo',
  poststed: 'Frogner',
  navkontor: 'Nav Frogner',
  veilederNavn: 'Jonas Berger',
  veilederNavident: 'J112233',
  status: JobbsøkerStatus.LAGT_TIL,
  invitertDato: null,
});

const jobbsøkerLagtTil3 = (): JobbsøkerSøkTreffDTO => ({
  personTreffId: 'js-lagt-til-3',
  fornavn: 'Oscar',
  etternavn: 'Haugen',
  innsatsgruppe: 'SITUASJONSBESTEMT_INNSATS',
  fylke: 'Oslo',
  kommune: 'Oslo',
  poststed: 'Majorstuen',
  navkontor: 'Nav Majorstuen',
  veilederNavn: 'Ida Kvam',
  veilederNavident: 'I445566',
  status: JobbsøkerStatus.LAGT_TIL,
  invitertDato: null,
});

const wrapResponse = (
  jobbsøkere: JobbsøkerSøkTreffDTO[],
): JobbsøkerSøkResponsDTO => ({
  totalt: jobbsøkere.length,
  side: 1,
  antallPerSide: 20,
  jobbsøkere,
});

export const jobbsøkerePublisertMock = (): JobbsøkerSøkResponsDTO =>
  wrapResponse([
    jobbsøkerLagtTil(),
    jobbsøkerLagtTil2(),
    jobbsøkerLagtTil3(),
    jobbsøkerInvitertSmsOgEpost(),
    jobbsøkerSvartJa(),
    jobbsøkerSvartNei(),
    jobbsøkerKunMinside(),
    jobbsøkerFeiletVarsel(),
    jobbsøkerEndretTreff(),
    ...lagJobbsøkereMock(21).jobbsøkere,
  ]);

export const jobbsøkereUtkastMock = (): JobbsøkerSøkResponsDTO =>
  wrapResponse([jobbsøkerLagtTil()]);

export const jobbsøkereAvlystMock = (): JobbsøkerSøkResponsDTO =>
  wrapResponse([jobbsøkerAvlystSvartJa(), jobbsøkerSvartNei()]);

export const jobbsøkereFullførtMock = (): JobbsøkerSøkResponsDTO =>
  wrapResponse([
    jobbsøkerSvartJa(),
    jobbsøkerSvartNei(),
    jobbsøkerInvitertSmsOgEpost(),
  ]);

export const jobbsøkereIngenSvartJaMock = (): JobbsøkerSøkResponsDTO =>
  wrapResponse([
    jobbsøkerLagtTil(),
    jobbsøkerInvitertSmsOgEpost(),
    jobbsøkerSvartNei(),
    jobbsøkerKunMinside(),
  ]);

export const jobbsøkereTomtMock = (): JobbsøkerSøkResponsDTO =>
  wrapResponse([]);

export const lagJobbsøkereMock = (antall: number): JobbsøkerSøkResponsDTO => {
  const statuser = [
    JobbsøkerStatus.LAGT_TIL,
    JobbsøkerStatus.INVITERT,
    JobbsøkerStatus.SVART_JA,
    JobbsøkerStatus.SVART_NEI,
  ] as const;
  const innsatsgrupper = [
    'STANDARD_INNSATS',
    'SITUASJONSBESTEMT_INNSATS',
    'SPESIELT_TILPASSET_INNSATS',
  ];
  const fylker = ['Oslo', 'Viken', 'Vestland'];
  const kommuner = ['Oslo', 'Bærum', 'Bergen', 'Drammen', 'Sandnes', 'Tromsø'];
  const navkontorer = [
    'Nav Grorud',
    'Nav Bærum',
    'Nav Bergenhus',
    'Nav Drammen',
    'Nav Frogner',
    'Nav Sagene',
  ];
  const veiledere = [
    { navn: 'Fredrik Agboola', ident: 'F100001' },
    { navn: 'Marie Oluwanisola', ident: 'M200002' },
    { navn: 'Eline Bello', ident: 'E300003' },
    { navn: 'Per Hansen', ident: 'P400004' },
    { navn: 'Kari Nordmann', ident: 'K500005' },
    { navn: 'Jonas Berger', ident: 'J600006' },
  ];
  const fornavn = [
    'Ada',
    'Bo',
    'Cato',
    'Dag',
    'Eva',
    'Finn',
    'Gro',
    'Hans',
    'Ida',
    'Jan',
    'Kari',
    'Lars',
    'Mona',
    'Nils',
    'Oda',
    'Per',
    'Rita',
    'Siv',
    'Tor',
    'Ulf',
    'Vera',
    'Willy',
    'Xena',
    'Yngve',
    'Zara',
    'Amalie',
    'Bjorn',
    'Camilla',
    'Daniel',
    'Eirik',
  ];
  const etternavn = [
    'Aas',
    'Berg',
    'Dahl',
    'Enger',
    'Foss',
    'Gran',
    'Holm',
    'Iver',
    'Johansen',
    'Knutsen',
    'Lie',
    'Moe',
    'Nilsen',
    'Olsen',
    'Pettersen',
    'Ronning',
    'Strand',
    'Tangen',
    'Ulven',
    'Vik',
    'Wang',
    'Xander',
    'Ystad',
    'Zimmer',
    'Aasen',
    'Bakken',
    'Carlsen',
    'Dybdahl',
    'Ellingsen',
    'Fredriksen',
  ];

  const jobbsøkere: JobbsøkerSøkTreffDTO[] = Array.from(
    { length: antall },
    (_, i) => {
      const status = statuser[i % statuser.length];
      const veileder = veiledere[i % veiledere.length];
      return {
        personTreffId: `js-mock-${i}`,
        fornavn: fornavn[i % fornavn.length],
        etternavn: etternavn[i % etternavn.length],
        innsatsgruppe: innsatsgrupper[i % innsatsgrupper.length],
        fylke: fylker[i % fylker.length],
        kommune: kommuner[i % kommuner.length],
        poststed: kommuner[i % kommuner.length],
        navkontor: navkontorer[i % navkontorer.length],
        veilederNavn: veileder.navn,
        veilederNavident: veileder.ident,
        status,
        invitertDato:
          status !== JobbsøkerStatus.LAGT_TIL
            ? `2026-02-${String((i % 19) + 10).padStart(2, '0')}T11:00:00Z`
            : null,
      };
    },
  );

  return wrapResponse(jobbsøkere);
};

export const jobbsøkereMangeMock = (): JobbsøkerSøkResponsDTO => {
  return lagJobbsøkereMock(30);
};

export const jobbsøkereMock = jobbsøkerePublisertMock;
