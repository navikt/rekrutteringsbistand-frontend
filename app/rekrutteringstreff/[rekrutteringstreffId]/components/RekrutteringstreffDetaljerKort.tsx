import LeggTilArbeidsgiverModal from './LeggTilArbeidsgiverModal';
import { BodyShort, Box, Heading } from '@navikt/ds-react';
import * as React from 'react';

export interface RekrutteringstreffDetaljerKortProps {
  overskrift: string;
  tittel: string;
  beskrivelse: string;
  ikon: React.ReactNode;
}

const RekrutteringstreffDetaljerKort: React.FC<
  RekrutteringstreffDetaljerKortProps
> = ({ overskrift, tittel, beskrivelse, ikon }) => {
  return (
    <div>
      <Heading level='2' size='medium' className='mb-4'>
        {overskrift}
      </Heading>
      <Box.New
        background='raised'
        className='mb-4'
        borderColor='neutral-subtleA'
        borderRadius='xlarge'
        borderWidth='1'
        padding='4'
      >
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center justify-start'>
            <Box.New background='raised' className='rounded-full'>
              {ikon}
            </Box.New>
            <div className='mx-4 justify-start'>
              <Heading level='3' size='small'>
                {tittel}
              </Heading>
              <BodyShort>{beskrivelse}</BodyShort>
            </div>
          </div>
          <LeggTilArbeidsgiverModal />
        </div>
      </Box.New>
    </div>
  );
};

export default RekrutteringstreffDetaljerKort;
