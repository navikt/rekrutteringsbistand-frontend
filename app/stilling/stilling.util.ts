import { ArbeidsgiverAdresseDTO } from '../api/pam-search/underenhet/useArbeidsgiver';
import { GeografiDTO } from '../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export const arbeidsgiverLokasjonTilLokasjon = (
  arbeidsgiverLokasjon: ArbeidsgiverAdresseDTO,
): GeografiDTO => {
  const geografi: GeografiDTO = {
    address: arbeidsgiverLokasjon?.adresse,
    postalCode: arbeidsgiverLokasjon?.postnummer,
    municipal: arbeidsgiverLokasjon?.kommune,
    municipalCode: arbeidsgiverLokasjon?.kommunenummer,
    country: arbeidsgiverLokasjon?.land,
  };

  return geografi;
};
