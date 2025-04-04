import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

const JobbsøkerTeller = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const {
    data: jobbsøkere,
    isLoading,
    error,
  } = useJobbsøkere(rekrutteringstreffId);

  if (isLoading) return <BodyShort>Laster antall...</BodyShort>;
  if (error) return <BodyShort>Feil ved telling av jobbsøkere</BodyShort>;

  return <BodyShort>Antall jobbsøkere: {jobbsøkere?.length ?? 0}</BodyShort>;
};

export default JobbsøkerTeller;
