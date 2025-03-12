import LeggTilArbeidsgiverModal from './LeggTilArbeidsgiverModal';
import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { BodyShort, Box, Heading } from '@navikt/ds-react';
import * as React from 'react';

export interface RekrutteringstreffDetaljerKortProps {
  overskrift: string;
  tittel: string;
  beskrivelse: string;
  ikon: React.ReactNode;
  onLeggTilArbeidsgiver: (arbeidsgiver: ArbeidsgiverDTO | null) => void;
}

const RekrutteringstreffDetaljerKort: React.FC<
  RekrutteringstreffDetaljerKortProps
> = ({ overskrift, tittel, beskrivelse, ikon, onLeggTilArbeidsgiver }) => {
  return (
    <div>
      <Heading level='2' size='medium' className='mb-4'>
        {overskrift}
      </Heading>
      <Box.New
        background='raised'
        className='mb-4 p-6 rounded-lg border border-gray-900'
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
          <LeggTilArbeidsgiverModal
            onLeggTilArbeidsgiver={onLeggTilArbeidsgiver}
          />
        </div>
      </Box.New>
    </div>
  );
};

export default RekrutteringstreffDetaljerKort;
