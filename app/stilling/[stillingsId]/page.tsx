'use client';
import { Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import StillingsKandidater from './kandidater/StillingsKandidater';
import { StillingsKandidaterFilterProvider } from './kandidater/StillingsKandidaterFilterContext';
import OmStillingen from './omStillingen/OmStillingen';
import { useStillingsContext } from './StillingsContext';

export default function StillingSide() {
  const { erEier, kandidatlisteId, stillingsData } = useStillingsContext();

  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: 'stilling',
    clearOnDefault: true,
  });

  return (
    <div
      className={
        stillingsData?.stilling?.status === 'DELETED'
          ? 'relative opacity-50 pointer-events-none'
          : ''
      }
    >
      {stillingsData?.stilling?.status === 'DELETED' && (
        <div className='absolute inset-0 flex justify-center bg-white/60 pointer-events-none pt-4'>
          <span className='text-red-500 font-bold text-5xl'>
            Stillingen er slettet
          </span>
        </div>
      )}
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
    </div>
  );
}
