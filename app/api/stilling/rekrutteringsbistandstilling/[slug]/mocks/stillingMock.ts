import {
  GeografiDTO,
  StillingsDataDTO,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { faker } from '@faker-js/faker/locale/nb_NO';

interface MockStilling {
  id?: string;
  navIdent?: string;
  seed?: number;
  ekstern?: boolean;
  utenStillingsinfo?: boolean;
  erFormidling?: boolean;
  status?: string;
  adminStatus?: string;
  publishedByAdmin?: string | null;
  expires?: string;
  privacy?: string;
  tittel?: string;
  updated?: string;
  positioncount?: number;
}

// Felles datoer brukt på tvers av mocks
const now = new Date();
const fremtidigDato = new Date(
  now.getTime() + 30 * 24 * 60 * 60 * 1000,
).toISOString();
const forbiDato = new Date(
  now.getTime() - 30 * 24 * 60 * 60 * 1000,
).toISOString();

const createMockStilling = (props?: MockStilling): StillingsDataDTO => {
  faker.seed(props?.seed || 1337);

  const status = props?.status ?? 'ACTIVE';
  const adminStatus = props?.adminStatus ?? 'DONE';
  const publishedByAdmin =
    props?.publishedByAdmin !== undefined
      ? props.publishedByAdmin
      : faker.date.past().toISOString();
  const expires = props?.expires ?? fremtidigDato;
  const privacy = props?.privacy ?? 'INTERNAL_NOT_SHOWN';

  return {
    stillingsinfo: props?.utenStillingsinfo
      ? null
      : {
          stillingsid: props?.id || faker.string.uuid(),
          stillingsinfoid: faker.string.uuid(),
          eierNavident: props?.navIdent || null,
          eierNavn: props?.navIdent ? 'Tester' : null,
          stillingskategori: props?.erFormidling ? 'FORMIDLING' : 'STILLING',
        },
    stilling: {
      annonsenr: `R${faker.number.int({ min: 100000, max: 999999 })}`,
      uuid: props?.id || faker.string.uuid(),
      created: faker.date.past().toISOString(),
      createdBy: props?.ekstern ? 'import-api' : 'pam-rekrutteringsbistand',
      updated: props?.updated ?? faker.date.recent().toISOString(),
      updatedBy: props?.ekstern ? 'import-api' : 'pam-rekrutteringsbistand',
      title: props?.tittel ?? faker.person.jobTitle(),
      status,
      administration: {
        id: faker.number.int({ min: 100000, max: 999999 }),
        status: adminStatus,
        comments: faker.lorem.sentence(),
        reportee: faker.person.fullName(),
        remarks: [],
        navIdent:
          props?.navIdent ||
          `Z${faker.number.int({ min: 100000, max: 999999 })}`,
      },
      mediaList: [],
      contactList: [
        {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          title: faker.person.jobTitle(),
        },
      ],
      privacy,
      source: props?.ekstern ? 'EKSTERN' : 'DIR',
      medium: props?.ekstern ? 'EKSTERN' : 'DIR',
      reference: faker.string.alphanumeric(10),
      published: faker.date.past().toISOString(),
      expires,
      employer: {
        id: faker.number.int({ min: 100000, max: 999999 }),
        uuid: faker.string.uuid(),
        created: faker.date.past().toISOString(),
        createdBy: 'pam-rekrutteringsbistand',
        updated: faker.date.recent().toISOString(),
        updatedBy: 'pam-ad',
        mediaList: [],
        contactList: [],
        location: createLocation(),
        locationList: [createLocation()],
        properties: null,
        name: faker.company.name(),
        orgnr: '312113341',
        status: 'ACTIVE',
        parentOrgnr: null,
        publicName: faker.company.name(),
        deactivated: null,
        orgform: 'BEDR',
        employees: faker.number.int({ min: 1, max: 1000 }),
      },
      location: null,
      locationList: [createLocation()],
      categoryList: createCategories(),
      properties: {
        applicationdue: '2025-05-31T10:00:00.000Z',
        starttime: '2025-05-31T10:00:00.000Z',
        employerdescription: faker.lorem.paragraph(),
        extent: faker.helpers.arrayElement(['Heltid', 'Deltid']),
        workhours: JSON.stringify([
          faker.helpers.arrayElement(['Dagtid', 'Kveld', 'Natt']),
        ]),
        workday: JSON.stringify(['Ukedager']),
        jobtitle: faker.person.jobTitle(),
        positioncount: (
          props?.positioncount ?? faker.number.int({ min: 1, max: 10 })
        ).toString(),
        engagementtype: faker.helpers.arrayElement([
          'Fast',
          'Midlertidig',
          'Vikariat',
        ]),
        classification_styrk08_score: faker.number
          .float({ min: 0, max: 1 })
          .toString(),
        adtext: `<p>${faker.lorem.paragraphs(3)}</p>`,
        classification_styrk08_code: faker.number
          .int({ min: 1000, max: 9999 })
          .toString(),
        searchtags: JSON.stringify([
          {
            label: faker.person.jobType(),
            score: 0,
          },
          {
            label: faker.person.jobType(),
            score: 0,
          },
        ]),
        classification_esco_code: `http://data.europa.eu/esco/isco/c${faker.number.int({ min: 1000, max: 9999 })}`,
        classification_input_source: 'jobtitle',
        sector: faker.helpers.arrayElement(['Privat', 'Offentlig']),
      },
      publishedByAdmin,
      businessName: faker.company.name(),
      firstPublished: faker.datatype.boolean(),
      deactivatedByExpiry: faker.datatype.boolean(),
      activationOnPublishingDate: faker.datatype.boolean(),
      versjon: 1,
    },
  };
};

const createLocation = (): GeografiDTO => ({
  address: faker.location.streetAddress(),
  postalCode: faker.location.zipCode(),
  county: faker.location.county(),
  municipal: faker.location.state(),
  municipalCode: '1337',
  city: faker.location.city(),
  country: 'NORGE',
  // countyCode: '1337',
});

const createCategories = () => [
  {
    id: faker.number.int({ min: 1000000, max: 9999999 }),
    code: faker.number.int({ min: 100000, max: 999999 }).toString(),
    categoryType: 'JANZZ',
    name: faker.person.jobType(),
    description: null,
    parentId: null,
  },
  {
    id: faker.number.int({ min: 1000000, max: 9999999 }),
    code: `http://data.europa.eu/esco/isco/c${faker.number.int({ min: 1000, max: 9999 })}`,
    categoryType: 'ESCO',
    name: faker.person.jobTitle(),
    description: null,
    parentId: null,
  },
  {
    id: faker.number.int({ min: 1000000, max: 9999999 }),
    code: faker.number.int({ min: 1000, max: 9999 }).toString(),
    categoryType: 'STYRK08',
    name: faker.person.jobTitle(),
    description: null,
    parentId: null,
  },
];

// ────────────────────────────────────────────────────────
// Publisert stilling – åpen for søkere (intern)
// status: ACTIVE, publishedByAdmin: satt, expires: fremtid
// ────────────────────────────────────────────────────────
export const mockPublisertStilling = createMockStilling({
  id: 'publisertStilling',
  navIdent: 'TestIdent',
  seed: 10,
  tittel: 'Publisert stilling (intern)',
  status: 'ACTIVE',
  adminStatus: 'DONE',
  expires: fremtidigDato,
});

// ────────────────────────────────────────────────────────
// Publisert stilling – åpen for søkere fra arbeidsplassen.no
// status: ACTIVE, privacy: SHOW_ALL, publishedByAdmin: satt
// ────────────────────────────────────────────────────────
export const mockPublisertEksternStilling = createMockStilling({
  id: 'publisertEksternStilling',
  navIdent: 'TestIdent',
  seed: 11,
  tittel: 'Publisert stilling (arbeidsplassen.no)',
  status: 'ACTIVE',
  adminStatus: 'DONE',
  privacy: 'SHOW_ALL',
  expires: fremtidigDato,
});

// ────────────────────────────────────────────────────────
// Utløpt stilling – siste visningsdato passert
// status: INACTIVE, publishedByAdmin: satt, expires: forbi
// ────────────────────────────────────────────────────────
export const mockUtløptStilling = createMockStilling({
  id: 'utloptStilling',
  navIdent: 'TestIdent',
  seed: 12,
  tittel: 'Utløpt stilling',
  status: 'INACTIVE',
  adminStatus: 'DONE',
  expires: forbiDato,
});

// ────────────────────────────────────────────────────────
// Stengt for søkere (pauset)
// status: INACTIVE, publishedByAdmin: satt, expires: fremtid, adminStatus: PENDING
// ────────────────────────────────────────────────────────
export const mockStengtForSøkereStilling = createMockStilling({
  id: 'stengtStilling',
  navIdent: 'TestIdent',
  seed: 13,
  tittel: 'Stengt for søkere',
  status: 'INACTIVE',
  adminStatus: 'PENDING',
  expires: fremtidigDato,
});

// ────────────────────────────────────────────────────────
// Slettet stilling
// status: DELETED
// ────────────────────────────────────────────────────────
export const mockSlettetStilling = createMockStilling({
  id: 'slettetStilling',
  navIdent: 'TestIdent',
  seed: 14,
  tittel: 'Slettet stilling',
  status: 'DELETED',
  adminStatus: 'DONE',
});

// ────────────────────────────────────────────────────────
// Fullført stilling (oppdrag avsluttet)
// status: STOPPED, publishedByAdmin: satt
// ────────────────────────────────────────────────────────
export const mockFullførtStilling = createMockStilling({
  id: 'fullfortStilling',
  navIdent: 'TestIdent',
  seed: 15,
  tittel: 'Fullført stilling',
  status: 'STOPPED',
  adminStatus: 'DONE',
});

// ────────────────────────────────────────────────────────
// StillingsBanner-spesifikke mocks
// ────────────────────────────────────────────────────────
export const mockBannerForlengOppdrag = createMockStilling({
  id: 'bannerForlengOppdrag',
  navIdent: 'TestIdent',
  seed: 20,
  tittel: 'Stillingsbanner (Forleng oppdrag)',
  status: 'INACTIVE',
  adminStatus: 'DONE',
  expires: forbiDato,
});

export const mockBannerÅpneSøkeforslag = createMockStilling({
  id: 'bannerApneSokeforslag',
  navIdent: 'TestIdent',
  seed: 21,
  tittel: 'Stillingsbanner (Åpne søkeforslag)',
  status: 'INACTIVE',
  adminStatus: 'PENDING',
  expires: fremtidigDato,
});

export const mockBannerGjenåpne = createMockStilling({
  id: 'bannerGjenapne',
  navIdent: 'TestIdent',
  seed: 22,
  tittel: 'Stillingsbanner (Gjenåpne banner)',
  status: 'STOPPED',
  adminStatus: 'DONE',
});

// ────────────────────────────────────────────────────────
// Fullført-banner – tre states
// ────────────────────────────────────────────────────────

// State 1: Besatt + Låst (fullført forrige måned → låst)
export const mockFullførtBesattLåst = createMockStilling({
  id: 'fullfortBesattLast',
  navIdent: 'TestIdent',
  seed: 30,
  tittel: 'Fullført banner (Besatt + Låst)',
  status: 'STOPPED',
  adminStatus: 'DONE',
  positioncount: 1,
  updated: '2025-08-24T10:00:00.000Z',
});

// State 2: Ikke besatt + Ikke låst (fullført denne måneden → kan ennå gjenåpnes)
export const mockFullførtIkkeBesattIkkeLåst = createMockStilling({
  id: 'fullfortIkkeBesattIkkeLast',
  navIdent: 'TestIdent',
  seed: 31,
  tittel: 'Fullført banner (Ikke besatt + Ikke låst)',
  status: 'STOPPED',
  adminStatus: 'DONE',
  positioncount: 1,
  updated: new Date().toISOString(),
});

// State 3: Ikke besatt + Låst (fullført forrige måned → låst)
export const mockFullførtIkkeBesattLåst = createMockStilling({
  id: 'fullfortIkkeBesattLast',
  navIdent: 'TestIdent',
  seed: 32,
  tittel: 'Fullført banner (Ikke besatt + Låst)',
  status: 'STOPPED',
  adminStatus: 'DONE',
  positioncount: 1,
  updated: '2025-08-24T10:00:00.000Z',
});

// ────────────────────────────────────────────────────────
// Legacy-eksporter for bakoverkompatibilitet
// ────────────────────────────────────────────────────────
export const mockBaseStilling = createMockStilling({
  seed: 1337,
  status: 'ACTIVE',
  adminStatus: 'DONE',
  expires: fremtidigDato,
});

export const mockMinStilling = createMockStilling({
  id: 'minStilling',
  navIdent: 'TestIdent',
  seed: 1,
  status: 'ACTIVE',
  adminStatus: 'DONE',
  expires: fremtidigDato,
});

export const mockMinEksternStilling = createMockStilling({
  id: 'minEksternStilling',
  navIdent: 'TestIdent',
  ekstern: true,
  seed: 2,
  status: 'ACTIVE',
  adminStatus: 'DONE',
  privacy: 'SHOW_ALL',
  expires: fremtidigDato,
});

export const mockEksternStilling = createMockStilling({
  id: 'eksternStilling',
  ekstern: true,
  utenStillingsinfo: true,
  seed: 3,
  status: 'ACTIVE',
  adminStatus: 'DONE',
  privacy: 'SHOW_ALL',
  expires: fremtidigDato,
});

export const mockFormidling = createMockStilling({
  erFormidling: true,
  id: 'minFormidling',
  navIdent: 'TestIdent',
  seed: 4,
});

export const internStillingMock = createMockStilling({
  id: 'internStilling',
  seed: 5,
  status: 'ACTIVE',
  adminStatus: 'DONE',
  expires: fremtidigDato,
});
export const nyStillingMock = {
  stillingsinfo: {
    stillingsid: 'nyStilling',
    stillingsinfoid: '88559d01-8019-4d6c-8cb4-12cf015086e4',
    eierNavident: null,
    eierNavn: null,
    stillingskategori: 'STILLING',
  },
  stilling: {
    id: 997524,
    annonsenr: 'R997524',
    uuid: 'nyStilling',
    created: '2025-02-21T22:42:20.197827',
    createdBy: 'pam-rekrutteringsbistand',
    updated: '2025-02-21T22:42:20.197827',
    updatedBy: 'pam-rekrutteringsbistand',
    title: 'Stilling uten valgt jobbtittel',
    status: 'INACTIVE',
    administration: {
      id: 767140,
      status: 'PENDING',
      comments: null,
      reportee: 'F_Z993141 E_Z993141',
      remarks: [],
      navIdent: 'Z993141',
    },
    mediaList: [],
    contactList: [],
    privacy: 'INTERNAL_NOT_SHOWN',
    source: 'DIR',
    medium: 'DIR',
    reference: 'nyStilling',
    published: '2025-02-21T22:42:20.193601',
    expires: '2025-02-21T22:42:20.193604',
    employer: {
      id: 769294,
      uuid: '31c42c49-f6bf-4152-8eda-baf57b14e7b0',
      created: '2022-11-30T13:24:08.526224',
      createdBy: 'pam-rekrutteringsbistand',
      updated: '2025-02-11T11:53:09.656573',
      updatedBy: 'pam-ad',
      mediaList: [],
      contactList: [],
      location: {
        address: 'Nordre Kvervet',
        postalCode: '1410',
        county: 'AKERSHUS',
        municipal: 'NORDRE FOLLO',
        municipalCode: '3207',
        city: 'KOLBOTN',
        country: 'NORGE',
        latitude: null,
        longitude: null,
      },

      properties: {
        nace2: '[]',
      },
      name: 'TEST ORGANISASJON',
      orgnr: '312113341',
      status: 'ACTIVE',
      parentOrgnr: '311185268',
      publicName: 'TEST ORGANISASJON',
      deactivated: null,
      orgform: 'BEDR',
      employees: 4,
    },
    location: null,
    locationList: [],
    categoryList: [],
    properties: {},
    publishedByAdmin: null,
    businessName: 'TEST ORGANISASJON AS',
    firstPublished: false,
    deactivatedByExpiry: false,
    activationOnPublishingDate: false,
    versjon: 1,
  },
};
