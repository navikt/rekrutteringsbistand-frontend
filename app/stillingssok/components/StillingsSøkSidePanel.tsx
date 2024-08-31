import { Button, Search } from '@navikt/ds-react';
import * as React from 'react';
import GeografiFilter from './StillingsSøkFilter/GeografiFilter';
import InkluderingFilter from './StillingsSøkFilter/InkluderingFilter';
import KategoriFilter from './StillingsSøkFilter/KategoriFilter';
import StatusFilter from './StillingsSøkFilter/StatusFilter';
import SynlighetFilter from './StillingsSøkFilter/SynlighetFilter';

const StillingsSøkSidePanel: React.FC = () => {
  return (
    <div className='grid gap-4'>
      <Search hideLabel={false} label='Søk i stillinger' variant='primary' />
      <Button variant='secondary' className='w-full'>
        Bruk mitt standardsøk
      </Button>
      <StatusFilter />
      <GeografiFilter />
      <InkluderingFilter />
      <KategoriFilter />
      <SynlighetFilter />
    </div>
  );
};

export default StillingsSøkSidePanel;
