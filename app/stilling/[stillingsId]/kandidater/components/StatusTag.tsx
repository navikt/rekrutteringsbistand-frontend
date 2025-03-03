import { InternKandidatstatus } from './KandidatTyper';
import { Tag } from '@navikt/ds-react';
import * as React from 'react';

const mapStatusTilTag = (
  status: InternKandidatstatus | string,
  liten?: boolean,
) => {
  switch (status) {
    case InternKandidatstatus.VURDERES:
      return (
        <Tag variant='neutral' size={liten ? 'xsmall' : 'small'}>
          Vurderes
        </Tag>
      );
    case InternKandidatstatus.KONTAKTET:
      return (
        <Tag variant='alt1' size={liten ? 'xsmall' : 'small'}>
          Kontaktet
        </Tag>
      );
    case InternKandidatstatus.AKTUELL:
      return (
        <Tag variant='success' size={liten ? 'xsmall' : 'small'}>
          Aktuell
        </Tag>
      );
    case InternKandidatstatus.TIL_INTERVJU:
      return (
        <Tag variant='alt3' size={liten ? 'xsmall' : 'small'}>
          Til intervju
        </Tag>
      );
    case InternKandidatstatus.UAKTUELL:
      return (
        <Tag variant='error' size={liten ? 'xsmall' : 'small'}>
          Ikke aktuell
        </Tag>
      );
    case InternKandidatstatus.UINTERESSERT:
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
  status: InternKandidatstatus | string;
  liten?: boolean;
}

const InternKandidatstatusTag: React.FC<StatusTagProps> = ({
  status,
  liten,
}) => {
  return <>{mapStatusTilTag(status, liten)}</>;
};

export default InternKandidatstatusTag;
