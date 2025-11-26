import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { storForbokstav } from '@/app/kandidat/util';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { Tag, TagProps } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface StatusTagProps {
  status: RekrutteringstreffStatusType;
  className?: string;
}

const getTagVariant = (
  status: RekrutteringstreffStatusType,
): TagProps['variant'] => {
  switch (status) {
    case RekrutteringstreffStatus.PUBLISERT:
      return 'success';
    case RekrutteringstreffStatus.FULLFØRT:
      return 'neutral';
    case RekrutteringstreffStatus.KLADD:
      return 'warning';
    case RekrutteringstreffStatus.AVLYST:
    case RekrutteringstreffStatus.SLETTET:
      return 'error';
    default:
      return 'neutral';
  }
};

const StatusTag: FunctionComponent<StatusTagProps> = ({
  status,
  className,
}) => {
  return (
    <Tag size='small' variant={getTagVariant(status)} className={className}>
      {storForbokstav(status)}
    </Tag>
  );
};

export default StatusTag;
