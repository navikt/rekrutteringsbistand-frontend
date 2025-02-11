import { GeografiDTO } from '../app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import {
  FylkeDTO,
  KommuneDTO,
  LandDTO,
} from '../app/stillings-sok/components/StillingsSøkFilter/GeografiFilter';

export const mapKommuneTilGeografiDTO = (kommune: KommuneDTO): GeografiDTO => {
  return {
    address: null,
    postalCode: null,
    county: null,
    municipal: kommune.name,
    municipalCode: kommune.code,
    city: null,
    country: null,
  };
};

export const mapFylkeTilGeografiDTO = (fylke: FylkeDTO): GeografiDTO => {
  return {
    address: null,
    postalCode: null,
    county: fylke.name,
    municipal: null,
    municipalCode: null,
    city: null,
    country: null,
  };
};

export const mapLandTilGeografiDTO = (land: LandDTO): GeografiDTO => {
  return {
    address: null,
    postalCode: null,
    county: null,
    municipal: null,
    municipalCode: null,
    city: null,
    country: land.name,
  };
};
