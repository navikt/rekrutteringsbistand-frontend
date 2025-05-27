/*import RekrutteringstreffDetalj from '../../RekrutteringstreffDetalj';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { LocationPinIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { PlusIcon } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export type StedFormFields = {
  gateadresse: string;
  postnummer: string;
};

export interface StedProps {
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;

  className?: string;
}

const Sted: React.FC<StedProps> = ({
  rekrutteringstreff,
  className,
  onUpdated,
}) => {
  const methods = useForm<StedFormFields>({
    defaultValues: {
      gateadresse: rekrutteringstreff.gateadresse || '',
      postnummer: rekrutteringstreff.postnummer || '',
    },
    mode: 'onChange',
  });
  return (
    <RekrutteringstreffDetalj
      tittelIkon={<LocationPinIcon fontSize='1.5rem' />}
      tittel='Sted'
      knapp={
        <Button icon={<PlusIcon />} variant='tertiary' size='small'>
          Legg til
        </Button>
      }
      className={className}
    >
      <BodyShort size='small'>TODO</BodyShort>
    </RekrutteringstreffDetalj>
  );
};

export default Sted;
*/
