import { faker } from '@faker-js/faker/locale/nb_NO';
import { GeografiDTO, StillingsDataDTO } from '../stilling.dto';
interface MockStilling {
  id?: string;
  navIdent?: string;
  seed?: number;
  ekstern?: boolean;
  utenStillingsinfo?: boolean;

  erFormidling?: boolean;
}

const createMockStilling = (props?: MockStilling): StillingsDataDTO => {
  faker.seed(props?.seed || 1337);
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
      id: faker.number.int({ min: 100000, max: 999999 }),
      uuid: props?.id || faker.string.uuid(),
      created: faker.date.past().toISOString(),
      createdBy: props?.ekstern ? 'import-api' : 'pam-rekrutteringsbistand',
      updated: faker.date.recent().toISOString(),
      updatedBy: props?.ekstern ? 'import-api' : 'pam-rekrutteringsbistand',
      title: faker.person.jobTitle(),
      status: 'ACTIVE',
      administration: {
        id: faker.number.int({ min: 100000, max: 999999 }),
        status: 'DONE',
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
      privacy: 'INTERNAL_NOT_SHOWN',
      source: props?.ekstern ? 'EKSTERN' : 'DIR',
      medium: props?.ekstern ? 'EKSTERN' : 'DIR',
      reference: faker.string.alphanumeric(10),
      published: faker.date.future().toISOString(),
      expires: faker.date.future().toISOString(),
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
        orgnr: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
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
        employerdescription: faker.lorem.paragraph(),
        extent: faker.helpers.arrayElement(['Heltid', 'Deltid']),
        workhours: JSON.stringify([
          faker.helpers.arrayElement(['Dagtid', 'Kveld', 'Natt']),
        ]),
        workday: JSON.stringify(['Ukedager']),
        applicationdue: 'Snarest',
        jobtitle: faker.person.jobTitle(),
        positioncount: faker.number.int({ min: 1, max: 10 }).toString(),
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
      publishedByAdmin: faker.date.future().toISOString(),
      businessName: faker.company.name(),
      firstPublished: faker.datatype.boolean(),
      deactivatedByExpiry: faker.datatype.boolean(),
      activationOnPublishingDate: faker.datatype.boolean(),
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
  countyCode: '1337',
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

export const mockBaseStilling = createMockStilling();

export const mockMinStilling = createMockStilling({
  id: 'minStilling',
  navIdent: 'TestIdent',
  seed: 1,
});
export const mockMinEksternStilling = createMockStilling({
  id: 'minEksternStilling',
  navIdent: 'TestIdent',
  ekstern: true,
  seed: 2,
});
export const mockEksternStilling = createMockStilling({
  id: 'eksternStilling',
  ekstern: true,
  utenStillingsinfo: true,
  seed: 3,
});

export const mockFormidling = createMockStilling({
  erFormidling: true,
  id: 'minFormidling',
  navIdent: 'TestIdent',
  seed: 4,
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
      properties: {
        nace2: '[]',
      },
      name: 'ORDKNAPP BLOMSTRETE TIGER AS',
      orgnr: '312113341',
      status: 'ACTIVE',
      parentOrgnr: '311185268',
      publicName: 'ORDKNAPP BLOMSTRETE TIGER AS',
      deactivated: null,
      orgform: 'BEDR',
      employees: 4,
    },
    location: null,
    locationList: [],
    categoryList: [],
    properties: {},
    publishedByAdmin: null,
    businessName: 'ORDKNAPP BLOMSTRETE TIGER AS',
    firstPublished: false,
    deactivatedByExpiry: false,
    activationOnPublishingDate: false,
  },
};

export const testMockStilling = {
  stillingsinfo: {
    stillingsid: 'f864d2cd-a0b6-478d-8f0b-96fb7587b315',
    stillingsinfoid: '1428ce6e-2858-4791-b6ec-6461aacba109',
    eierNavident: null,
    eierNavn: null,
    stillingskategori: 'STILLING',
  },
  stilling: {
    id: 997957,
    uuid: 'f864d2cd-a0b6-478d-8f0b-96fb7587b315',
    created: '2025-02-24T12:25:07.488085',
    createdBy: 'pam-rekrutteringsbistand',
    updated: '2025-02-24T12:29:09.307249',
    updatedBy: 'pam-rekrutteringsbistand',
    title: 'Tester',
    status: 'ACTIVE',
    administration: {
      id: 767552,
      status: 'DONE',
      comments: null,
      reportee: 'F_993141 E_993141',
      remarks: [],
      navIdent: 'TestIdent',
    },
    mediaList: [],
    contactList: [
      {
        name: 'Per Arnt',
        email: 'test@nav.no',
        phone: '',
        role: null,
        title: 'Ansetter',
      },
    ],
    privacy: 'INTERNAL_NOT_SHOWN',
    source: 'DIR',
    medium: 'DIR',
    reference: 'f864d2cd-a0b6-478d-8f0b-96fb7587b315',
    published: '2025-02-24T00:00:00',
    expires: '2025-02-28T00:00:00',
    employer: {
      id: 997956,
      uuid: 'aeeb7fc7-6e0b-45fa-81e8-04c57e03cb0c',
      created: '2025-02-24T12:25:07.48326',
      createdBy: 'pam-ad',
      updated: '2025-02-24T12:25:07.48326',
      updatedBy: 'pam-ad',
      mediaList: [],
      contactList: [],
      location: {
        address: 'Brynsveien 16B',
        postalCode: '0667',
        county: 'OSLO',
        municipal: 'OSLO',
        municipalCode: '0301',
        city: 'OSLO',
        country: 'NORGE',
        latitude: '59.912481210775105',
        longitude: '10.809819907746563',
      },
      locationList: [
        {
          address: 'Brynsveien 16B',
          postalCode: '0667',
          county: 'OSLO',
          municipal: 'OSLO',
          municipalCode: '0301',
          city: 'OSLO',
          country: 'NORGE',
          latitude: '59.912481210775105',
          longitude: '10.809819907746563',
        },
      ],
      properties: {
        nace2:
          '[{"code":"78.100","name":"Rekruttering og formidling av arbeidskraft"}]',
      },
      name: 'TESTHUSET AS',
      orgnr: '932246023',
      status: 'ACTIVE',
      parentOrgnr: '932196123',
      publicName: 'TESTHUSET AS',
      deactivated: null,
      orgform: 'BEDR',
      employees: null,
    },
    location: null,
    locationList: [
      {
        address: null,
        postalCode: null,
        county: 'AGDER',
        municipal: 'KRISTIANSAND',
        municipalCode: '4204',
        city: null,
        country: 'NORGE',
        latitude: null,
        longitude: null,
      },
    ],
    categoryList: [
      {
        id: 2491596,
        code: '109237',
        categoryType: 'JANZZ',
        name: 'Tester',
        description: null,
        parentId: null,
      },
      {
        id: 2491597,
        code: 'http://data.europa.eu/esco/isco/C7543',
        categoryType: 'ESCO',
        name: 'Produkttestere (ikke matprodukter)',
        description: null,
        parentId: null,
      },
      {
        id: 2491598,
        code: '7543',
        categoryType: 'STYRK08',
        name: 'Produkttestere (ikke matprodukter)',
        description: null,
        parentId: null,
      },
    ],
    properties: {
      extent: 'Heltid',
      employerhomepage: 'http://testdeg.no',
      workhours: '["Dagtid"]',
      applicationdue: 'Snarest',
      workday: '["Ukedager"]',
      positioncount: '2',
      engagementtype: 'Fast',
      facebookpage: 'TestDeg',
      starttime: 'Etter avtale',
      employerdescription: '<p>Dette er en test tekst om virksomheten</p>',
      adtext: '<p>Beskrivelse av stilling</p>',
      tags: '["INKLUDERING__ARBEIDSTID"]',
      linkedinpage: 'TessstDeg',
      searchtags:
        '[{"label":"Tester","score":1.0},{"label":"Testleder","score":0.8}]',
      sector: 'Privat',
    },
    publishedByAdmin: '2025-02-24T12:26:25.487221',
    businessName: 'TESTHUSET AS',
    firstPublished: true,
    deactivatedByExpiry: false,
    activationOnPublishingDate: false,
  },
};
