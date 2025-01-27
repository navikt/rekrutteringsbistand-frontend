import { Tag } from '@navikt/ds-react';
import * as React from 'react';
import { Kandidatstatus } from '../KandidatIKandidatlisteTyper';

const mapStatusTilTag = (status: Kandidatstatus | string, liten?: boolean) => {
  switch (status) {
    case Kandidatstatus.Vurderes:
      return (
        <Tag variant='neutral' size={liten ? 'xsmall' : 'small'}>
          Vurderes
        </Tag>
      );
    case Kandidatstatus.Kontaktet:
      return (
        <Tag variant='alt1' size={liten ? 'xsmall' : 'small'}>
          Kontaktet
        </Tag>
      );
    case Kandidatstatus.Aktuell:
      return (
        <Tag variant='success' size={liten ? 'xsmall' : 'small'}>
          Aktuell
        </Tag>
      );
    case Kandidatstatus.TilIntervju:
      return (
        <Tag variant='alt3' size={liten ? 'xsmall' : 'small'}>
          Til intervju
        </Tag>
      );
    case Kandidatstatus.Uaktuell:
      return (
        <Tag variant='error' size={liten ? 'xsmall' : 'small'}>
          Ikke aktuell
        </Tag>
      );
    case Kandidatstatus.Uinteressert:
      return (
        <Tag variant='warning' size={liten ? 'xsmall' : 'small'}>
          Ikke interessert
        </Tag>
      );
    default:
      return '-';
  }
};

export interface StatusTagProps {
  status: Kandidatstatus | string;
  liten?: boolean;
}

const KandidatStatusTag: React.FC<StatusTagProps> = ({ status, liten }) => {
  return <>{mapStatusTilTag(status, liten)}</>;
};

export default KandidatStatusTag;
