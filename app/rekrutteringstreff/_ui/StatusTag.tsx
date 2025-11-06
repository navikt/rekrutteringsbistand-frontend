import { RekrutteringstreffStatus } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { storForbokstav } from '@/app/kandidat/util';
import { Tag, TagProps } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface StatusTagProps {
  status: RekrutteringstreffStatus;
  className?: string;
}

const getTagVariant = (
  status: RekrutteringstreffStatus,
): TagProps['variant'] => {
  switch (status) {
    case 'PUBLISERT':
      return 'success';
    case 'FULLFØRT':
      return 'neutral';
    case 'UTKAST':
      return 'warning';
    case 'AVLYST':
    case 'SLETTET':
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
