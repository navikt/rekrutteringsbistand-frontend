export type Enhetsregistertreff = {
  location?: EnhetsregistertreffGeografi;
  name: string;
  orgnr?: string;
};

export type EnhetsregistertreffGeografi = {
  address: string | null;
  postalCode: string | null;
  county: string | null;
  country: string | null;
  municipal: string | null;
  municipalCode?: string | null;

  city: string | null;
};

const devVirksomheter: Enhetsregistertreff[] = [
  {
    orgnr: '312113341',
    name: 'ORDKNAPP BLOMSTRETE TIGER AS',
    location: {
      address: 'Nordre Kvervet',
      postalCode: '1410',
      city: 'KOLBOTN',
      municipal: 'NORDRE FOLLO',
      country: 'Norge',
      county: null,
    },
  },
  {
    orgnr: '312328712',
    name: 'OMTENKSOM LOJAL STRUTS PLC',
    location: {
      address: 'Hansmarka 22',
      postalCode: '6017',
      city: 'ÅLESUND',
      municipal: 'ÅLESUND',
      country: 'Norge',
      county: null,
    },
  },
  {
    orgnr: '311904043',
    name: 'UKJENT MOBIL FJELLREV',
    location: {
      address: 'Grinibråten 25',
      postalCode: '1339',
      city: 'VØYENENGA',
      municipal: 'BÆRUM',
      country: 'Norge',
      county: null,
    },
  },
  {
    orgnr: '215271242',
    name: 'KUNNSKAPSRIK FANTASTISK TIGER AS',
    location: {
      address: 'Vardeveien 60',
      postalCode: '2020',
      city: 'SKEDSMOKORSET',
      municipal: 'LILLESTRØM',
      country: 'Norge',
      county: null,
    },
  },
  {
    orgnr: '315090334',
    name: 'STRENG KRITISK TIGER AS',
    location: {
      address: 'Strandalivegen 255',
      postalCode: '3570',
      city: 'ÅL',
      municipal: 'ÅL',
      country: 'Norge',
      county: null,
    },
  },
  {
    orgnr: '315414822',
    name: 'ALFABETISK PLUTSELIG KATT OVERSKRIFT',
    location: {
      address: 'Okstadbrinken 18',
      postalCode: '7075',
      city: 'TILLER',
      municipal: 'TRONDHEIM',
      country: 'Norge',
      county: null,
    },
  },
  {
    orgnr: '315595320',
    name: 'UPRESIS VELDIG TIGER AS',
    location: {
      address: 'Kvamsvegen 142',
      postalCode: '6791',
      city: 'OLDEDALEN',
      municipal: 'STRYN',
      country: 'Norge',
      county: null,
    },
  },
  {
    orgnr: '315024420',
    name: 'DYKTIG ANSVARSFULL FJELLREV',
    location: {
      address: 'Løvjomåsveien 168',
      postalCode: '4820',
      city: 'FROLAND',
      municipal: 'FROLAND',
      country: 'Norge',
      county: null,
    },
  },
  {
    orgnr: '311493523',
    name: 'BARMHJERTIG EFFEKTIV TIGER AS',
    location: {
      address: 'Stedetutsiktspunktet',
      postalCode: '5075',
      city: 'BERGEN',
      municipal: 'BERGEN',
      country: 'Norge',
      county: null,
    },
  },
];
export default devVirksomheter;
