import { RekrutteringstreffStaus } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { Tag, TagProps } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface StatusTagProps {
  status: RekrutteringstreffStaus;
  className?: string;
}

const getTagVariant = (
  status: RekrutteringstreffStaus,
): TagProps['variant'] => {
  switch (status) {
    case 'PUBLISERT':
    case 'FULLFØRT':
      return 'success';
    case 'UTKAST':
      return 'warning';
    case 'AVLYST':
    case 'SLETTET':
      return 'error';
    default:
      return 'neutral';
  }
};

const formatStatus = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

const StatusTag: FunctionComponent<StatusTagProps> = ({
  status,
  className,
}) => {
  return (
    <Tag size='small' variant={getTagVariant(status)} className={className}>
      {formatStatus(status)}
    </Tag>
  );
};

export default StatusTag;
