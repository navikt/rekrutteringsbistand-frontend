'use client';
import { Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import StillingsKandidater from './kandidater/StillingsKandidater';
import { StillingsKandidaterFilterProvider } from './kandidater/StillingsKandidaterFilterContext';
import OmStillingen from './omStillingen/OmStillingen';
import { useStillingsContext } from './StillingsContext';

export default function StillingSide() {
  const { erEier, kandidatlisteId } = useStillingsContext();

  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: 'stilling',
    clearOnDefault: true,
  });

  return (
    <Tabs defaultValue={fane} onChange={(val) => setFane(val)}>
      <Tabs.List>
        <Tabs.Tab value='stilling' label='Om stillingen' />
        {kandidatlisteId && erEier && (
          <Tabs.Tab value='kandidater' label='Kandidater' />
        )}
      </Tabs.List>
      <Tabs.Panel value='stilling'>
        <OmStillingen />
      </Tabs.Panel>
      {kandidatlisteId && erEier && (
        <Tabs.Panel value='kandidater'>
          <StillingsKandidaterFilterProvider>
            <StillingsKandidater />
          </StillingsKandidaterFilterProvider>
        </Tabs.Panel>
      )}
    </Tabs>
  );
}
