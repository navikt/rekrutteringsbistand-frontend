import { BriefcaseIcon, PlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Heading } from '@navikt/ds-react';
import * as React from 'react';

export interface RekrutteringstreffDetaljerKortProps {
  overskrift: string;
  tittel: string;
  beskrivelse: string;
  ikon: React.ReactNode;
  onLeggTil?: () => void;
}

const RekrutteringstreffDetaljerKort: React.FC<RekrutteringstreffDetaljerKortProps> = ({
  overskrift,
  tittel,
  beskrivelse,
  ikon,
  onLeggTil,
}) => {
  return (
    <div>
      <Heading level='2' size='medium' className='mb-4'>
        {overskrift}
      </Heading>
      <Box.New background='raised' className='mb-4 p-6 rounded-lg border border-gray-900'>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center justify-start'>
            {ikon}
            <div className='mx-4 justify-start'>
              <Heading level='3' size='small'>
                {tittel}
              </Heading>
              <BodyShort>{beskrivelse}</BodyShort>
            </div>
          </div>
          <Button variant='tertiary' icon={<PlusIcon />} onClick={onLeggTil}>
            Legg til
          </Button>
        </div>
      </Box.New>
    </div>
  );
};

export default RekrutteringstreffDetaljerKort;
