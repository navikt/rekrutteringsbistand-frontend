import { AktuellForTreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import {
  MagnifyingGlassIcon,
  PersonChatIcon,
  SealCheckmarkIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import { Tag, type TagProps } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

export const aktuellForTreffStatusTekst: Record<AktuellForTreffStatus, string> =
  {
    VURDERES: 'Vurderes',
    KONTAKTET: 'Kontaktet',
    AKTUELL: 'Aktuell',
    IKKE_AKTUELL: 'Ikke aktuell',
  };

export const aktuellForTreffStatusIkon: Record<
  AktuellForTreffStatus,
  ReactNode
> = {
  VURDERES: <MagnifyingGlassIcon aria-hidden />,
  KONTAKTET: <PersonChatIcon aria-hidden />,
  AKTUELL: <SealCheckmarkIcon aria-hidden />,
  IKKE_AKTUELL: <XMarkOctagonIcon aria-hidden />,
};

const variant: Record<AktuellForTreffStatus, TagProps['variant']> = {
  VURDERES: 'neutral',
  KONTAKTET: 'alt1',
  AKTUELL: 'success',
  IKKE_AKTUELL: 'error',
};

interface Props {
  status: AktuellForTreffStatus | null;
}

const AktuellForTreffStatusTag: FC<Props> = ({ status }) => {
  if (!status) {
    return (
      <Tag size='small' variant='neutral'>
        Ikke valgt
      </Tag>
    );
  }
  return (
    <Tag size='small' variant={variant[status]}>
      <div className='flex gap-1'>
        {aktuellForTreffStatusIkon[status]} {aktuellForTreffStatusTekst[status]}
      </div>
    </Tag>
  );
};

export default AktuellForTreffStatusTag;
