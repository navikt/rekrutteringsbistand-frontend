export interface NyStillingDTO {
  stilling: Stilling;
  kategori: string;
}

interface Stilling {
  createdBy: string;
  updatedBy: string;
  source: string;
  privacy: string;
  administration: Administration;
  employer: Employer;
}

interface Administration {
  status: string;
  reportee: string;
  navIdent: string;
}

interface Employer {
  orgnr: string;
  name: string;
  location: Location;
}

interface Location {
  address: string;
  postalCode: string;
  city: string;
  municipal: string;
  country: string;
  county: any;
  latitude: any;
  longitude: any;
}
