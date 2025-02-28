'use client';
import { Tabs } from '@navikt/ds-react';
import * as React from 'react';
import OmStillingen from '../../stilling/[stillingsId]/omStillingen/OmStillingen';
import { useStillingsContext } from '../../stilling/[stillingsId]/StillingsContext';
import FormidlingKandidater from './FormidlingKandidater';
// import OmStillingen from '../../stilling/[stillingsId]/omStillingen/OmStillingen';

const VisFormidling: React.FC = () => {
  const { erEier } = useStillingsContext();

  return (
    <Tabs defaultValue='omStillingen'>
      <Tabs.List>
        <Tabs.Tab value='omStillingen' label='Om stillingen' />
        {erEier && <Tabs.Tab value='kandidater' label='Kandidater' />}
      </Tabs.List>
      <Tabs.Panel value='omStillingen'>
        <OmStillingen />
      </Tabs.Panel>
      {erEier && (
        <Tabs.Panel value='kandidater'>
          <FormidlingKandidater />
        </Tabs.Panel>
      )}
    </Tabs>
  );
};

export default VisFormidling;
