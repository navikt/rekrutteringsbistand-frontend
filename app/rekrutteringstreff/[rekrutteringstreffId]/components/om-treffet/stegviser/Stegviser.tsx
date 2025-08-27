'use client';

import StegviserContent from './StegviserContent';
import { StegviserProvider } from './StegviserContext';
import StegviserHeader from './StegviserHeader';
import { Box } from '@navikt/ds-react';
import * as React from 'react';

const stepDetails = [
  { id: 1, stepLabel: 'Publisere', header: 'Gjør klar til publisering' },
  { id: 2, stepLabel: 'Invitere', header: 'Send ut invitasjoner' },
  {
    id: 3,
    stepLabel: 'Følge opp',
    header: 'Følg opp påmeldte og gjennomfør treffet',
  },
  {
    id: 4,
    stepLabel: 'Avslutte',
    header: 'Avslutt og evaluer rekrutteringstreffet',
  },
];

const Stegviser = () => {
  return (
    <StegviserProvider>
      <Box.New
        background='raised'
        borderColor='neutral-subtleA'
        borderWidth='1'
        padding='6'
        className='rounded-xl'
      >
        <StegviserHeader stepDetails={stepDetails} />
        <div className='mt-4'>
          <StegviserContent />
        </div>
      </Box.New>
    </StegviserProvider>
  );
};

export default Stegviser;
