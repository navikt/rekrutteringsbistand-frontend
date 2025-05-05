import { FormidlingDataForm } from '../../../etterregistrering/ny-etterregistrering/redigerFormidlingFormType';
import { Stillingskategori } from '../../../stilling/stilling-typer';
import { OpprettNyStillingDTO } from '../../stilling/ny-stilling/dto';

export const opprettStillingForFormidlingMapper = (
  formidlingData: FormidlingDataForm,
): OpprettNyStillingDTO => {
  return {
    kategori: Stillingskategori.Formidling,
    stilling: {
      administration: {
        status: 'PENDING',
        reportee: formidlingData.reportee,
        navIdent: formidlingData.navIdent,
      },
      createdBy: 'pam-rekrutteringsbistand',
      updatedBy: 'pam-rekrutteringsbistand',
      source: 'DIR',
      medium: 'DIR',
      businessName: formidlingData.omFormidlingen?.organisasjon?.navn ?? '',
      privacy: 'INTERNAL_NOT_SHOWN',
      location: formidlingData.omFormidlingen.adresser ?? [],
      employer: {
        orgnr:
          formidlingData.omFormidlingen?.organisasjon?.organisasjonsnummer ??
          '',
        name: formidlingData.omFormidlingen?.organisasjon?.navn ?? '',
        location: {
          address:
            formidlingData.omFormidlingen?.organisasjon?.adresse?.adresse ?? '',
          postalCode:
            formidlingData.omFormidlingen?.organisasjon?.adresse?.postnummer ??
            '',
          county:
            formidlingData.omFormidlingen?.organisasjon?.adresse?.kommune ?? '',
          country:
            formidlingData.omFormidlingen?.organisasjon?.adresse?.land ?? '',
          municipal:
            formidlingData.omFormidlingen?.organisasjon?.adresse
              ?.kommunenummer ?? '',
          city:
            formidlingData.omFormidlingen?.organisasjon?.adresse?.poststed ??
            '',
        },
      },
    },
  };
};
