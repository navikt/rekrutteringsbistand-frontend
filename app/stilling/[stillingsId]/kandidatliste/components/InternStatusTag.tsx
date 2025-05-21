import { InternKandidatstatus } from '../KandidatTyper';
import {
  CircleSlashIcon,
  MagnifyingGlassIcon,
  PersonChatIcon,
  ReceptionIcon,
  SealCheckmarkIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import { Tag } from '@navikt/ds-react';
import * as React from 'react';

export interface InternStatusTagProps {
  status: InternKandidatstatus;
}

export const internStatusTekst = (status: string): string => {
  switch (status) {
    case InternKandidatstatus.VURDERES:
      return 'Vurderes';
    case InternKandidatstatus.KONTAKTET:
      return 'Kontaktet';
    case InternKandidatstatus.AKTUELL:
      return 'Aktuell';
    case InternKandidatstatus.TIL_INTERVJU:
      return 'Til intervju';
    case InternKandidatstatus.UAKTUELL:
      return 'Ikke aktuell';
    case InternKandidatstatus.UINTERESSERT:
      return 'Ikke interessert';
    default:
      return '-';
  }
};

export const internStatusIcon = (status: InternKandidatstatus) => {
  switch (status) {
    case InternKandidatstatus.VURDERES:
      return <MagnifyingGlassIcon />;
    case InternKandidatstatus.KONTAKTET:
      return <PersonChatIcon />;
    case InternKandidatstatus.AKTUELL:
      return <SealCheckmarkIcon />;
    case InternKandidatstatus.TIL_INTERVJU:
      return <ReceptionIcon />;
    case InternKandidatstatus.UAKTUELL:
      return <XMarkOctagonIcon />;
    case InternKandidatstatus.UINTERESSERT:
      return <CircleSlashIcon />;
    default:
      return '';
  }
};

const internStatusVariant = (status: InternKandidatstatus) => {
  switch (status) {
    case InternKandidatstatus.VURDERES:
      return 'neutral';
    case InternKandidatstatus.KONTAKTET:
      return 'alt1';
    case InternKandidatstatus.AKTUELL:
      return 'success';
    case InternKandidatstatus.TIL_INTERVJU:
      return 'alt3';
    case InternKandidatstatus.UAKTUELL:
      return 'error';
    case InternKandidatstatus.UINTERESSERT:
      return 'warning';
    default:
      return 'neutral';
  }
};

const InternStatusTag: React.FC<InternStatusTagProps> = ({ status }) => {
  return (
    <Tag size='small' variant={internStatusVariant(status)}>
      <div className='flex gap-1'>
        {internStatusIcon(status)} {internStatusTekst(status)}
      </div>
    </Tag>
  );
};

export default InternStatusTag;
