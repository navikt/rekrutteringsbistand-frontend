import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { AktivtSteg } from '@/app/rekrutteringstreff/_types/constants';
import { getActiveStepFromHendelser } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
import { Loader, Tag } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface StatusTagProps {
  id: string;
  className?: string;
}

const StatusTag: FunctionComponent<StatusTagProps> = ({ id, className }) => {
  const { data, isLoading, error } = useRekrutteringstreff(id);

  if (isLoading) {
    return <Loader size='xsmall' title='Laster status' />;
  }

  if (error) {
    return null;
  }

  const step = getActiveStepFromHendelser(data?.hendelser);
  const erPublisert =
    step === AktivtSteg.INVITERE || step === AktivtSteg.FULLFØRE;

  return (
    <Tag
      size='small'
      variant={erPublisert ? 'success' : 'warning'}
      className={className}
    >
      {erPublisert ? 'Publisert' : 'Ikke publisert'}
    </Tag>
  );
};

export default StatusTag;
