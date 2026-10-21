import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import {
  CircleSlashIcon,
  MagnifyingGlassIcon,
  PersonChatIcon,
  ReceptionIcon,
  SealCheckmarkIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import { Tag } from '@navikt/ds-react';
import { FC } from 'react';

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
      return <MagnifyingGlassIcon aria-hidden />;
    case InternKandidatstatus.KONTAKTET:
      return <PersonChatIcon aria-hidden />;
    case InternKandidatstatus.AKTUELL:
      return <SealCheckmarkIcon aria-hidden />;
    case InternKandidatstatus.TIL_INTERVJU:
      return <ReceptionIcon aria-hidden />;
    case InternKandidatstatus.UAKTUELL:
      return <XMarkOctagonIcon aria-hidden />;
    case InternKandidatstatus.UINTERESSERT:
      return <CircleSlashIcon aria-hidden />;
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

const InternStatusTag: FC<InternStatusTagProps> = ({ status }) => {
  return (
    <Tag size='small' variant={internStatusVariant(status)}>
      <div className='flex gap-1'>
        {internStatusIcon(status)} {internStatusTekst(status)}
      </div>
    </Tag>
  );
};

export default InternStatusTag;
