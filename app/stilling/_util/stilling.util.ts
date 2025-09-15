import { ArbeidsgiverAdresseDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { GeografiDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export const arbeidsgiverLokasjonTilLokasjon = (
  arbeidsgiverLokasjon: ArbeidsgiverAdresseDTO,
): GeografiDTO => {
  const geografi: GeografiDTO = {
    address: arbeidsgiverLokasjon?.adresse,
    postalCode: arbeidsgiverLokasjon?.postnummer,
    municipal: arbeidsgiverLokasjon?.kommune,
    municipalCode: arbeidsgiverLokasjon?.kommunenummer,
    country: arbeidsgiverLokasjon?.land,
    city: arbeidsgiverLokasjon?.poststed,
  };

  return geografi;
};
