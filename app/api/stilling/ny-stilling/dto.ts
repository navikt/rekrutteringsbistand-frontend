export interface OpprettNyStillingDTO {
  stilling: NyStillingStillingDTO;
  kategori: string;
  eierNavKontorEnhetId: string;
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

export interface NaringskodeDTO {
  kode: string | null;
  beskrivelse: string | null;
}

interface NyEmployerPropertiesDTO {
  nace2: NaringskodeDTO[] | null;
}

interface NyEmployerDTO {
  orgnr: string;
  name: string;
  parentOrgnr: string;
  orgform: string;
  employees: number | null;
  location: NyLocationDTO;
  properties: NyEmployerPropertiesDTO | null;
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
