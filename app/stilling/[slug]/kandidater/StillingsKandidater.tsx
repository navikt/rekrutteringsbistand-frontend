import { ArrowForwardIcon } from '@navikt/aksel-icons';
import { Button, Search } from '@navikt/ds-react';
import * as React from 'react';
import StillingsKandidaterTabell from './StillingsKandidaterTabell';
const StillingsKandidater: React.FC = () => {
  return (
    <div className='mt-10'>
      <div className='flex justify-between'>
        <div className=' md:w-[15rem]'>
          <form role='search'>
            <Search
              placeholder='Søk i kandidatene'
              label='Kandidatsøk'
              hideLabel
              variant='primary'
            />
          </form>
        </div>
        <div>
          <Button
            className='mr-2'
            variant='secondary'
            icon={<ArrowForwardIcon aria-hidden />}
          >
            Finn kandidater
          </Button>
          <Button
            variant='secondary'
            className='mr-2'
            icon={<ArrowForwardIcon aria-hidden />}
          >
            Legg til kandidat
          </Button>
          <Button variant='secondary' icon={<ArrowForwardIcon aria-hidden />}>
            Del med kandidat
          </Button>
        </div>
      </div>

      <div className='mt-8 flex'>
        <aside className='sidebar w-full md:w-[20rem]'>kake</aside>
        <StillingsKandidaterTabell />
      </div>
    </div>
  );
};

export default StillingsKandidater;
