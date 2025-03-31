import LeggTilArbeidsgiverModal from './LeggTilArbeidsgiverModal';
import { BriefcaseIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading } from '@navikt/ds-react';
import * as React from 'react';

const ArbeidsgivereOversiktKort = () => {
  return (
    <div>
      <Box.New
        background='neutral-softA'
        className='mb-4 max-w-[30rem] flex flex-col items-center justify-center'
        borderColor='neutral-subtleA'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
      >
        <div>
          <Heading level='2' size='medium' className='mb-4 text-left'>
            Arbeidsgivere
          </Heading>
          <div className='p-4 mb-12 flex flex-col items-center'>
            <Box.New
              background='raised'
              className='rounded-full mb-2 flex items-center justify-center'
            >
              <BriefcaseIcon className='w-8 h-8 text-gray-600 m-2' />
            </Box.New>
            <BodyShort className='text-center'>
              <span className='block'>
                Finn og legg til en arbeidsgiver så dukker aktivitetene deres
                opp her.
              </span>
            </BodyShort>
          </div>
          <LeggTilArbeidsgiverModal />
        </div>
      </Box.New>
    </div>
  );
};

export default ArbeidsgivereOversiktKort;
