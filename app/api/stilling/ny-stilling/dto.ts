import { GeografiDTO } from '../rekrutteringsbistandstilling/[slug]/stilling.dto';

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
  location: GeografiDTO[];
}

interface NyAdministrationDTO {
  status: string;
  reportee: string;
  navIdent: string;
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
}
