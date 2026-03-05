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
  erJobbmesse?: boolean;
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
const fremtidigDato = '2050-01-01T00:00:00.000Z';
const forbiDato = '2020-01-01T00:00:00.000Z';

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
          stillingskategori: props?.erJobbmesse
            ? 'JOBBMESSE'
            : props?.erFormidling
              ? 'FORMIDLING'
              : 'STILLING',
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
        reportee: null,
        remarks: [],
        navIdent: null,
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
// Utløpt ekstern stilling – fra arbeidsplassen.no, utløpt
// status: INACTIVE, ekstern: true, privacy: SHOW_ALL, expires: forbi
// ────────────────────────────────────────────────────────
export const mockUtløptEksternStilling = createMockStilling({
  id: 'utloptEksternStilling',
  navIdent: 'TestIdent',
  seed: 50,
  tittel: 'Utløpt stilling (arbeidsplassen.no)',
  ekstern: true,
  status: 'INACTIVE',
  adminStatus: 'DONE',
  privacy: 'SHOW_ALL',
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
// Utkast (draft) – ikke publisert ennå
// status: INACTIVE, publishedByAdmin: null, source: DIR
// ────────────────────────────────────────────────────────
export const mockUtkastStilling = createMockStilling({
  id: 'utkastStilling',
  navIdent: 'TestIdent',
  seed: 16,
  tittel: 'Utkast stilling',
  status: 'INACTIVE',
  adminStatus: 'PENDING',
  publishedByAdmin: null,
});

// ────────────────────────────────────────────────────────
// Legacy-eksporter for bakoverkompatibilitet
// ────────────────────────────────────────────────────────
export const mockBaseStilling = createMockStilling({
  id: 'baseStilling',
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

// ────────────────────────────────────────────────────────
// Jobbmesse – publisert jobbmesse
// ────────────────────────────────────────────────────────
export const mockJobbmesse = createMockStilling({
  erJobbmesse: true,
  id: 'jobbmesse',
  navIdent: 'TestIdent',
  seed: 40,
  tittel: 'NAV Jobbmesse Lillestrøm',
  status: 'ACTIVE',
  adminStatus: 'DONE',
  expires: fremtidigDato,
});

export const mockEtterregistreringFormidling = {
  stillingsinfo: {
    stillingsid: 'etterregistrering',
    stillingsinfoid: '3a9b27c2-32ec-4075-ba31-d15e8f695966',
    eierNavident: 'TestIdent',
    eierNavn: 'Tester',
    stillingskategori: 'FORMIDLING',
    eierNavKontorEnhetId: '0403',
  },
  stilling: {
    annonsenr: 'R17356',
    uuid: 'etterregistrering',
    created: '2026-02-10T10:30:15.951069',
    createdBy: 'pam-rekrutteringsbistand',
    updated: '2026-02-10T10:30:56.453916',
    updatedBy: 'pam-rekrutteringsbistand',
    title: 'Etterregistrering',
    status: 'STOPPED',
    administration: {
      id: 0,
      status: 'DONE',
      comments: null,
      reportee: null,
      remarks: [],
      navIdent: null,
    },
    mediaList: [],
    contactList: [
      {
        name: 'Meg Navn',
        email: '',
        phone: '23456789',
        role: null,
        title: 'Leder',
      },
    ],
    privacy: 'INTERNAL_NOT_SHOWN',
    source: 'DIR',
    medium: 'DIR',
    reference: 'etterregistrering',
    published: '2026-02-10T10:30:56',
    expires: '2026-02-10T10:30:56',
    employer: {
      id: null,
      uuid: null,
      created: null,
      createdBy: null,
      updated: null,
      updatedBy: null,
      mediaList: [],
      contactList: [],
      location: {
        address: 'Nordre Kvervet',
        postalCode: '1410',
        county: '',
        municipal: 'NORDRE FOLLO',
        municipalCode: '3207',
        city: 'KOLBOTN',
        country: 'NORGE',
        latitude: null,
        longitude: null,
      },
      locationList: [],
      properties: {
        nace2:
          '[{"code":"95.310","name":"Reparasjon og vedlikehold av motorvogner"}]',
      },
      name: 'ORDKNAPP BLOMSTRETE TIGER AS',
      orgnr: '312113341',
      status: null,
      parentOrgnr: '311185268',
      publicName: null,
      deactivated: null,
      orgform: 'BEDR',
      employees: 4,
    },
    location: null,
    locationList: [
      {
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
    ],
    categoryList: [
      {
        id: null,
        code: '55845',
        categoryType: 'JANZZ',
        name: 'Hundefører',
        description: null,
        parentId: null,
      },
      {
        id: null,
        code: 'http://data.europa.eu/esco/occupation/2662ed6c-a705-4895-8e9d-0a85c08ad908',
        categoryType: 'ESCO',
        name: 'hundetrener',
        description: null,
        parentId: null,
      },
      {
        id: null,
        code: '5164',
        categoryType: 'STYRK08',
        name: 'Dyrepassere og - trenere mv.',
        description: null,
        parentId: null,
      },
    ],
    properties: {
      extent: 'Heltid',
      sector: 'Privat',
      starttime: '2026-02-10T10:30:56',
      applicationdue: '2026-02-10T10:30:56',
      engagementtype: 'Vikariat',
      employerdescription: 'Etterregistrering',
    },
    publishedByAdmin: '2026-02-10T10:30:56.453374332',
    businessName: 'ORDKNAPP BLOMSTRETE TIGER AS',
    firstPublished: true,
    deactivatedByExpiry: false,
    activationOnPublishingDate: false,
    versjon: 2,
  },
};

export const mockEtterregistreringFormidlingÅpen = {
  stillingsinfo: {
    ...mockEtterregistreringFormidling.stillingsinfo,
    stillingsid: 'etterregistreringApen',
  },
  stilling: {
    ...mockEtterregistreringFormidling.stilling,
    uuid: 'etterregistreringApen',
    title: 'Etterregistrering Formidling Åpen',
    status: 'ACTIVE',
    reference: 'etterregistreringApen',
  },
};

export const mockIkkePublisertStilling = {
  stillingsinfo: {
    stillingsid: 'ikkePublisertStilling',
    stillingsinfoid: null,
    eierNavident: null,
    eierNavn: null,
    stillingskategori: 'STILLING',
  },
  stilling: {
    annonsenr: null,
    uuid: 'ikkePublisertStilling',
    created: '2026-02-11T10:00:00.000000',
    createdBy: 'pam-rekrutteringsbistand',
    updated: '2026-02-11T10:00:00.000000',
    updatedBy: 'pam-rekrutteringsbistand',
    title: 'Stilling uten valgt jobbtittel',
    status: 'INACTIVE',
    administration: {
      id: null,
      status: 'PENDING',
      comments: null,
      reportee: null,
      remarks: [],
      navIdent: null,
    },
    mediaList: [],
    contactList: [],
    privacy: 'INTERNAL_NOT_SHOWN',
    source: 'DIR',
    medium: 'DIR',
    reference: null,
    published: null,
    expires: null,
    employer: null,
    location: null,
    locationList: [],
    categoryList: [],
    properties: {},
    publishedByAdmin: null,
    businessName: null,
    firstPublished: false,
    deactivatedByExpiry: false,
    activationOnPublishingDate: false,
    versjon: 1,
  },
};

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
      reportee: null,
      remarks: [],
      navIdent: null,
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
