'use client';
import { ArrowForwardIcon, PencilIcon } from '@navikt/aksel-icons';
import { Button, Tabs } from '@navikt/ds-react';
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
        <Tabs.List className='flex mb-2 w-full justify-between'>
          <div>
            <Tabs.Tab value='stilling' label='Om stillingen' />
            {kandidatlisteId && erEier && (
              <Tabs.Tab value='kandidater' label='Kandidater' />
            )}
          </div>
          <div className='items-center'>
            <Button
              disabled
              variant='tertiary'
              icon={<PencilIcon title='Rediger' />}
            >
              Rapporter personvernsbrudd
            </Button>
            <Button
              disabled
              className='mr-2'
              variant='secondary'
              icon={<ArrowForwardIcon aria-hidden />}
            >
              Finn kandidater
            </Button>
            <Button
              disabled
              variant='secondary'
              className='mr-2'
              icon={<ArrowForwardIcon aria-hidden />}
            >
              Legg til kandidat
            </Button>
          </div>
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
