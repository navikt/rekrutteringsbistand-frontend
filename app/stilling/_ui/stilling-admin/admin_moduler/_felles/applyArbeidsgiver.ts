import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

type StillingEmployer = NonNullable<StillingsDataDTO['stilling']['employer']>;
type EmployerLocation = NonNullable<StillingEmployer['location']>;
type StillingLocation = NonNullable<
  NonNullable<StillingsDataDTO['stilling']['locationList']>[number]
>;

const employerStandardverdier: Pick<
  StillingEmployer,
  | 'id'
  | 'uuid'
  | 'created'
  | 'createdBy'
  | 'updated'
  | 'updatedBy'
  | 'mediaList'
  | 'contactList'
  | 'publicName'
  | 'deactivated'
  | 'status'
> = {
  id: null,
  uuid: null,
  created: null,
  createdBy: null,
  updated: null,
  updatedBy: null,
  mediaList: null,
  contactList: null,
  publicName: null,
  deactivated: null,
  status: null,
};

/**
 * Fyller inn skjemaverdier for arbeidsgiver basert på en pam-search ArbeidsgiverDTO.
 * Speiler logikken i `OmVirksomheten.setArbeidsgiver`.
 */
export const applyArbeidsgiverTilForm = (
  arbeidsgiver: ArbeidsgiverDTO,
  getValues: UseFormGetValues<StillingAdminDTO>,
  setValue: UseFormSetValue<StillingAdminDTO>,
) => {
  const eksisterende: Partial<StillingEmployer> =
    getValues('stilling.employer') ?? {};
  setValue('stilling.businessName', arbeidsgiver.navn ?? null, {
    shouldDirty: true,
  });

  const eksisterendeLocation: Partial<EmployerLocation> =
    eksisterende.location ?? {};

  const nyEmployer: StillingEmployer = {
    ...employerStandardverdier,
    ...eksisterende,
    orgnr: arbeidsgiver.organisasjonsnummer ?? '',
    name: arbeidsgiver.navn ?? '',
    parentOrgnr: arbeidsgiver.overordnetEnhet ?? '',
    orgform: arbeidsgiver.organisasjonsform ?? '',
    employees: arbeidsgiver.antallAnsatte ?? null,
    location: {
      ...eksisterendeLocation,
      municipalCode: arbeidsgiver.adresse?.kommunenummer ?? '',
      address: arbeidsgiver.adresse?.adresse ?? '',
      postalCode: arbeidsgiver.adresse?.postnummer ?? '',
      county: '',
      country:
        arbeidsgiver.adresse?.land === 'Norge'
          ? 'NORGE'
          : (arbeidsgiver.adresse?.land ?? 'NORGE'),
      municipal: arbeidsgiver.adresse?.kommune ?? '',
      city: arbeidsgiver.adresse?.poststed ?? '',
    },
    properties: {
      nace2:
        (arbeidsgiver.naringskoder &&
          JSON.stringify(
            arbeidsgiver.naringskoder.map((naringskode) => ({
              code: naringskode.kode,
              name: naringskode.beskrivelse,
            })),
          )) ??
        null,
    },
  };

  setValue('stilling.employer', nyEmployer, { shouldDirty: true });

  const locationList = getValues('stilling.locationList') ?? [];
  if (locationList.length === 0 && arbeidsgiver.adresse) {
    const nyLocation: StillingLocation = {
      address: arbeidsgiver.adresse.adresse ?? '',
      postalCode: arbeidsgiver.adresse.postnummer ?? '',
      city: arbeidsgiver.adresse.poststed ?? '',
      county: '',
      municipal: arbeidsgiver.adresse.kommune ?? '',
      municipalCode: arbeidsgiver.adresse.kommunenummer ?? '',
      country: arbeidsgiver.adresse.land ?? 'Norge',
    };
    setValue('stilling.locationList', [nyLocation], { shouldDirty: true });
  }
};
