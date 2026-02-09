import { faker } from '@faker-js/faker/locale/nb_NO';

interface MockHit {
  id?: string;
  eier?: string;
  status?: string;
  adStatus?: string;
  published?: string | null;
  expires?: string;
  privacy?: string;
  source?: string;
  erFormidling?: boolean;
  tittel?: string;
}

const createMockHit = (props: MockHit) => ({
  _index: 'stilling_5',
  _type: '_doc',
  _id: faker.string.uuid(),
  _score: null,
  _source: {
    stilling: {
      uuid: props.id ?? faker.string.uuid(),
      annonsenr: `R${faker.number.int({ min: 1000, max: 9999 })}`,
      status: props.status || 'ACTIVE',
      privacy: props.privacy || 'INTERNAL_NOT_SHOWN',
      published: props.published || faker.date.past().toISOString(),
      publishedByAdmin: faker.date.future().toISOString(),
      expires: props.expires || faker.date.future().toISOString(),
      created: faker.date.recent().toISOString(),
      updated: faker.date.recent().toISOString(),
      employer: {
        name: faker.company.name(),
        publicName: faker.company.name(),
        orgnr: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
        parentOrgnr: faker.number
          .int({ min: 100000000, max: 999999999 })
          .toString(),
        orgform: 'BEDR',
      },
      categories: [],
      source: props.source || 'DIR',
      medium: props.source || 'DIR',
      businessName: faker.company.name(),
      locations: [
        {
          address: faker.location.streetAddress(),
          postalCode: faker.location.zipCode(),
          city: faker.location.city(),
          county: faker.location.county(),
          // countyCode: '1337',
          municipal: faker.location.state(),
          municipalCode: '1337',
          latitue: faker.location.latitude(),
          longitude: faker.location.longitude(),
          country: 'NORGE',
        },
      ],
      reference: faker.string.uuid(),
      administration: {
        status: props.adStatus || 'DONE',
        remarks: [],
        comments: faker.lorem.sentence(),
        reportee: faker.person.fullName(),
        navIdent:
          props.eier || `Z${faker.number.int({ min: 100000, max: 999999 })}`,
      },
      properties: {
        extent: faker.helpers.arrayElement(['Heltid', 'Deltid']),
        workhours: [faker.helpers.arrayElement(['Dagtid', 'Kveld', 'Natt'])],
        workday: ['Ukedager'],
        applicationdue: 'Snarest',
        jobtitle: faker.person.jobTitle(),
        positioncount: faker.number.int({ min: 1, max: 10 }),
        engagementtype: faker.helpers.arrayElement([
          'Fast',
          'Midlertidig',
          'Vikariat',
        ]),
        classification_styrk08_score: faker.number.float({ min: 0, max: 1 }),
        adtext: `<p>${faker.lorem.paragraphs(3)}</p>`,
        classification_styrk08_code: faker.number.int({ min: 1000, max: 9999 }),
        searchtags: [
          {
            label: faker.person.jobType(),
            score: 0,
          },
          {
            label: faker.person.jobType(),
            score: 0,
          },
        ],
        classification_esco_code: `http://data.europa.eu/esco/isco/c${faker.number.int({ min: 1000, max: 9999 })}`,
        classification_input_source: 'jobtitle',
        sector: faker.helpers.arrayElement(['Privat', 'Offentlig']),
      },
      contacts: [
        {
          name: faker.person.fullName(),
          role: faker.person.jobTitle(),
          title: faker.person.jobType(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
        },
      ],
      tittel: props.tittel ?? faker.person.jobTitle(),
    },
    stillingsinfo: {
      eierNavident: null,
      eierNavn: null,
      notat: null,
      stillingsid: faker.string.uuid(),
      stillingsinfoid: faker.string.uuid(),
      stillingskategori: props.erFormidling ? 'FORMIDLING' : 'STILLING',
    },
  },
  sort: [faker.number.int({ min: 1000000000000, max: 9999999999999 })],
});

faker.seed(1337);

// Felles datoer – konsistent med stillingMock.ts
const now = new Date();
const fremtidigDato = new Date(
  now.getTime() + 30 * 24 * 60 * 60 * 1000,
).toISOString();
const forbiDato = new Date(
  now.getTime() - 30 * 24 * 60 * 60 * 1000,
).toISOString();

// ──────────────────────────────────────────────────────────
// 6 konsistente tilstander (matcher stillingMock.ts-IDer)
// ──────────────────────────────────────────────────────────
const publisertStilling = createMockHit({
  id: 'publisertStilling',
  eier: 'TestIdent',
  tittel: 'Publisert stilling (intern)',
  status: 'ACTIVE',
  adStatus: 'DONE',
  expires: fremtidigDato,
});

const publisertEksternStilling = createMockHit({
  id: 'publisertEksternStilling',
  eier: 'TestIdent',
  tittel: 'Publisert stilling (arbeidsplassen.no)',
  status: 'ACTIVE',
  adStatus: 'DONE',
  privacy: 'SHOW_ALL',
  expires: fremtidigDato,
});

const utløptStilling = createMockHit({
  id: 'utloptStilling',
  eier: 'TestIdent',
  tittel: 'Utløpt stilling',
  status: 'INACTIVE',
  adStatus: 'DONE',
  expires: forbiDato,
});

const stengtForSøkereStilling = createMockHit({
  id: 'stengtStilling',
  eier: 'TestIdent',
  tittel: 'Stengt for søkere',
  status: 'INACTIVE',
  adStatus: 'PENDING',
  expires: fremtidigDato,
});

const slettetStilling = createMockHit({
  id: 'slettetStilling',
  eier: 'TestIdent',
  tittel: 'Slettet stilling',
  status: 'DELETED',
  adStatus: 'DONE',
});

const fullførtStilling = createMockHit({
  id: 'fullfortStilling',
  eier: 'TestIdent',
  tittel: 'Fullført stilling',
  status: 'STOPPED',
  adStatus: 'DONE',
});

// ──────────────────────────────────────────────────────────
// StillingsBanner-spesifikke hits
// ──────────────────────────────────────────────────────────
const bannerForlengOppdrag = createMockHit({
  id: 'bannerForlengOppdrag',
  eier: 'TestIdent',
  tittel: 'Stillingsbanner (Forleng oppdrag)',
  status: 'INACTIVE',
  adStatus: 'DONE',
  expires: forbiDato,
});

const bannerÅpneSøkeforslag = createMockHit({
  id: 'bannerApneSokeforslag',
  eier: 'TestIdent',
  tittel: 'Stillingsbanner (Åpne søkeforslag)',
  status: 'INACTIVE',
  adStatus: 'PENDING',
  expires: fremtidigDato,
});

const bannerGjenåpne = createMockHit({
  id: 'bannerGjenapne',
  eier: 'TestIdent',
  tittel: 'Stillingsbanner (Gjenåpne banner)',
  status: 'STOPPED',
  adStatus: 'DONE',
});

// ──────────────────────────────────────────────────────────
// Legacy-hits for bakoverkompatibilitet
// ──────────────────────────────────────────────────────────
const minStilling = createMockHit({
  eier: 'TestIdent',
  id: 'minStilling',
  status: 'ACTIVE',
  adStatus: 'DONE',
  expires: fremtidigDato,
});

const minStillingEkstern = createMockHit({
  eier: 'TestIdent',
  privacy: 'SHOW_ALL',
  source: 'minEksternStilling',
  id: 'minEksternStilling',
  status: 'ACTIVE',
  adStatus: 'DONE',
  expires: fremtidigDato,
});

const eksternStilling = createMockHit({
  privacy: 'SHOW_ALL',
  source: 'eksternStilling',
  id: 'eksternStilling',
  status: 'ACTIVE',
  adStatus: 'DONE',
  expires: fremtidigDato,
});

const formidling = createMockHit({
  id: 'minFormidling',
  erFormidling: true,
  eier: 'TestIdent',
});

const ekstraStillinger = Array.from({ length: 10 }, (_, i) =>
  createMockHit({ id: `ekstraStilling${i + 1}` }),
);

const hits = [
  publisertStilling,
  publisertEksternStilling,
  utløptStilling,
  stengtForSøkereStilling,
  slettetStilling,
  fullførtStilling,
  bannerForlengOppdrag,
  bannerÅpneSøkeforslag,
  bannerGjenåpne,
  minStilling,
  minStillingEkstern,
  eksternStilling,
  formidling,
  ...ekstraStillinger,
];

export const mockStillingssøk = {
  took: 35,
  timed_out: false,
  _shards: {
    total: 3,
    successful: 3,
    skipped: 0,
    failed: 0,
  },
  hits: {
    total: {
      value: hits.length,
      relation: 'eq',
    },
    max_score: null,
    hits: hits,
  },
  aggregations: {
    globalAggregering: {
      doc_count: 639154,
      felter: {
        buckets: {
          annonsenummer: {
            doc_count: 1,
          },
          annonsetekst: {
            doc_count: 0,
          },
          arbeidsgiver: {
            doc_count: 0,
          },
          tittel: {
            doc_count: 0,
          },
        },
      },
    },
  },
};
