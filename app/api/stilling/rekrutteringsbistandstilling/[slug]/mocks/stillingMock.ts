import { GeografiDTO, StillingsDataDTO } from '../stilling.dto';
import { faker } from '@faker-js/faker/locale/nb_NO';

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
        applicationdue: 'Snarest',
        starttime: '10.04.2025',
        employerdescription: faker.lorem.paragraph(),
        extent: faker.helpers.arrayElement(['Heltid', 'Deltid']),
        workhours: JSON.stringify([
          faker.helpers.arrayElement(['Dagtid', 'Kveld', 'Natt']),
        ]),
        workday: JSON.stringify(['Ukedager']),
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
  },
};
