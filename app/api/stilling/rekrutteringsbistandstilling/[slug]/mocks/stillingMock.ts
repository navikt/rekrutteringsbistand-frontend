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
  if (props?.seed) {
    faker.seed(props.seed);
  }
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

faker.seed(1337);

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
