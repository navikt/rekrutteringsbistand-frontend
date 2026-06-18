import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { storForbokstav } from '@/app/kandidat/util';
import {
  PublisertStatus,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { Tag, TagProps } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

type StatusTagResultat = {
  label: string;
  color: 'warning' | 'info' | 'success' | 'danger' | 'neutral';
};

function lagPublisertStatusLabel(
  publisertStatus?: PublisertStatus | null,
): string {
  switch (publisertStatus) {
    case PublisertStatus.SVARFRIST_PASSERT:
      return 'Publisert – svarfrist passert';
    case PublisertStatus.ÅPEN_FOR_SØKERE:
      return 'Publisert – åpen for søkere';
    default:
      return 'Publisert';
  }
}

export function statusTag(
  status: RekrutteringstreffStatus,
  publisertStatus?: PublisertStatus | null,
): StatusTagResultat {
  switch (status) {
    case RekrutteringstreffStatus.UTKAST:
      return { label: 'Utkast', color: 'warning' };
    case RekrutteringstreffStatus.PUBLISERT:
      return { label: lagPublisertStatusLabel(publisertStatus), color: 'info' };
    case RekrutteringstreffStatus.FULLFØRT:
      return { label: 'Fullført', color: 'success' };
    case RekrutteringstreffStatus.AVLYST:
      return { label: 'Avlyst', color: 'danger' };
    default:
      return { label: status, color: 'neutral' };
  }
}

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
    case RekrutteringstreffStatus.UTKAST:
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
