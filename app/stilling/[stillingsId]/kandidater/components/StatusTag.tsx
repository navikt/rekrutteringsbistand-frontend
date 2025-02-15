import { Tag } from '@navikt/ds-react';
import * as React from 'react';
import { Kandidatstatus } from './KandidatTyper';

const mapStatusTilTag = (status: Kandidatstatus | string, liten?: boolean) => {
  switch (status) {
    case Kandidatstatus.VURDERES:
      return (
        <Tag variant='neutral' size={liten ? 'xsmall' : 'small'}>
          Vurderes
        </Tag>
      );
    case Kandidatstatus.KONTAKTET:
      return (
        <Tag variant='alt1' size={liten ? 'xsmall' : 'small'}>
          Kontaktet
        </Tag>
      );
    case Kandidatstatus.AKTUELL:
      return (
        <Tag variant='success' size={liten ? 'xsmall' : 'small'}>
          Aktuell
        </Tag>
      );
    case Kandidatstatus.TIL_INTERVJU:
      return (
        <Tag variant='alt3' size={liten ? 'xsmall' : 'small'}>
          Til intervju
        </Tag>
      );
    case Kandidatstatus.UAKTUELL:
      return (
        <Tag variant='error' size={liten ? 'xsmall' : 'small'}>
          Ikke aktuell
        </Tag>
      );
    case Kandidatstatus.UINTERESSERT:
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
