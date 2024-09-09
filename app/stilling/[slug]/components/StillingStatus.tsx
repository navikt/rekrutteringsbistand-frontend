import { Alert } from '@navikt/ds-react';
import * as React from 'react';
import { stillingsDataDTO } from '../../stilling-typer';

export enum Status {
  Aktiv = 'ACTIVE',
  Inaktiv = 'INACTIVE',
  Stoppet = 'STOPPED',
  Avslått = 'REJECTED',
  Slettet = 'DELETED',
}

export interface IStillingStatus {
  stillingsData: stillingsDataDTO;
  kandidatListeId?: string;
}

const StillingStatus: React.FC<IStillingStatus> = ({ stillingsData }) => {
  const stillingStatus = stillingsData.stilling.status as Status;
  const stillingUtgått = stillingsData.stilling.deactivatedByExpiry;
  const stillingenBlirPubliser =
    stillingsData.stilling.activationOnPublishingDate;

  const stillingErUtløpt = stillingStatus === Status.Inaktiv && stillingUtgått;
  const stillingenBlirPublisert =
    stillingStatus === Status.Inaktiv && stillingenBlirPubliser;

  if (stillingErUtløpt) {
    return (
      <Alert fullWidth variant='warning'>
        Stillingen er utløpt
      </Alert>
    );
  }

  return null;
};

export default StillingStatus;
