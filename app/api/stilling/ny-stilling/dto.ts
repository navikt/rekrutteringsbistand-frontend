export interface OpprettNyStillingDTO {
  stilling: NyStillingStillingDTO;
  kategori: string;
}

interface NyStillingStillingDTO {
  createdBy: string;
  updatedBy: string;
  source: string;
  privacy: string;
  employer: NyEmployerDTO;
  medium: string;
  businessName: string;
}

interface NyEmployerDTO {
  orgnr: string;
  name: string;
  location: NyLocationDTO;
}

interface NyLocationDTO {
  address: string;
  postalCode: string;
  city: string;
  municipal: string;
  country: string;
  county: any;
  latitude: any;
  longitude: any;
}
