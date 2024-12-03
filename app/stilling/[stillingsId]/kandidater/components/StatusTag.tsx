import { Tag } from '@navikt/ds-react';
import * as React from 'react';
import { Kandidatstatus } from '../KandidatIKandidatlisteTyper';

export const statusToDisplayName = (status: Kandidatstatus) => {
  switch (status) {
    case Kandidatstatus.Vurderes:
      return (
        <Tag variant='neutral' size='small'>
          Vurderes
        </Tag>
      );
    case Kandidatstatus.Kontaktet:
      return (
        <Tag variant='alt1' size='small'>
          Kontaktet
        </Tag>
      );
    case Kandidatstatus.Aktuell:
      return (
        <Tag variant='success' size='small'>
          Aktuell
        </Tag>
      );
    case Kandidatstatus.TilIntervju:
      return (
        <Tag variant='alt3' size='small'>
          Til intervju
        </Tag>
      );
    case Kandidatstatus.Uaktuell:
      return (
        <Tag variant='error' size='small'>
          Ikke aktuell
        </Tag>
      );
    case Kandidatstatus.Uinteressert:
      return (
        <Tag variant='warning' size='small'>
          Ikke interessert
        </Tag>
      );
  }
};

export interface StatusTagProps {
  status: Kandidatstatus;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  return <>{statusToDisplayName(status)}</>;
};

export default StatusTag;
