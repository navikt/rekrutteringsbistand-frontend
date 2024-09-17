import { Alert } from '@navikt/ds-react';
import { format } from 'date-fns';
import * as React from 'react';
import { useStillingsContext } from '../StillingsContext';

export enum Status {
  Aktiv = 'ACTIVE',
  Inaktiv = 'INACTIVE',
  Stoppet = 'STOPPED',
  Avslått = 'REJECTED',
  Slettet = 'DELETED',
}

const StillingStatus: React.FC = () => {
  const { stillingsData } = useStillingsContext();

  const stillingStatus = stillingsData.stilling.status as Status;
  const stillingUtgått = stillingsData.stilling.deactivatedByExpiry;

  const dato = format(new Date(stillingsData.stilling.published), 'dd.MM.yyyy');

  const stillingenBlirPubliserDato =
    stillingsData.stilling.activationOnPublishingDate;

  const stillingErIkkePublisert =
    !stillingUtgått &&
    !stillingenBlirPubliserDato &&
    stillingStatus === Status.Inaktiv;

  const stillingErUtløpt = stillingStatus === Status.Inaktiv && stillingUtgått;
  const stillingErStoppet = stillingStatus === Status.Stoppet;

  const stillingenBlirPublisert =
    stillingStatus === Status.Inaktiv && stillingenBlirPubliserDato;

  const publisertPåNav =
    stillingStatus === Status.Aktiv &&
    stillingsData.stilling.privacy === 'INTERNAL_NOT_SHOWN';

  const publisertPåArbeidsplassen =
    stillingStatus === Status.Aktiv &&
    stillingsData.stilling.privacy === 'SHOW_ALL';

  if (stillingErStoppet) {
    return (
      <Alert fullWidth variant='error'>
        Stillingen er stoppet
      </Alert>
    );
  }

  if (stillingErUtløpt) {
    return (
      <Alert fullWidth variant='warning'>
        Stillingen er utløpt
      </Alert>
    );
  }
  if (stillingenBlirPublisert) {
    return (
      <Alert fullWidth variant='warning'>
        Blir publisert dato
      </Alert>
    );
  }
  if (stillingErIkkePublisert) {
    return (
      <Alert fullWidth variant='warning'>
        Ikke publisert
      </Alert>
    );
  }
  if (publisertPåNav) {
    return (
      <Alert fullWidth variant='success'>
        Publisert på internt
      </Alert>
    );
  }
  if (publisertPåArbeidsplassen) {
    return (
      <Alert fullWidth variant='success'>
        Publisert på Arbeidsplassen
      </Alert>
    );
  }

  return null;
};

export default StillingStatus;
