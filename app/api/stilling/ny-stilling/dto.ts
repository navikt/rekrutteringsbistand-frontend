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
  administration: NyAdministrationDTO;
}

interface NyAdministrationDTO {
  status: string;
  reportee: string;
  navIdent: string;
}

interface NyEmployerDTO {
  orgnr: string;
  name: string;
  parentOrgnr: string;
  orgform: string;
  employees: number | null;
  location: NyLocationDTO;
}

interface NyLocationDTO {
  address: string;
  postalCode: string;
  city: string;
  municipal: string;
  municipalCode: string;
  country: string;
  county: any;
}
