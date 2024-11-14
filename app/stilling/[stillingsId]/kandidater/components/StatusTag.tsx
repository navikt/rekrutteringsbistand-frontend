import { Tag } from '@navikt/ds-react';
import * as React from 'react';
import { Kandidatstatus } from '../KandidatIKandidatlisteTyper';

export const statusToDisplayName = (status: Kandidatstatus) => {
  switch (status) {
    case Kandidatstatus.Vurderes:
      return <Tag variant='neutral'>Vurderes</Tag>;
    case Kandidatstatus.Kontaktet:
      return <Tag variant='alt1'>Kontaktet</Tag>;
    case Kandidatstatus.Aktuell:
      return <Tag variant='success'>Aktuell</Tag>;
    case Kandidatstatus.TilIntervju:
      return <Tag variant='alt3'>Til intervju</Tag>;
    case Kandidatstatus.Uaktuell:
      return <Tag variant='error'>Ikke aktuell</Tag>;
    case Kandidatstatus.Uinteressert:
      return <Tag variant='warning'>Ikke interessert</Tag>;
  }
};

export interface StatusTagProps {
  status: Kandidatstatus;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  return <>{statusToDisplayName(status)}</>;
};

export default StatusTag;
