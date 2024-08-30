import { Button, Search } from '@navikt/ds-react';
import * as React from 'react';
import StatusFilter from './StillingsSøkFilter/StatusFilter';
import GeografiFilter from './StillingsSøkFilter/GeografiFilter';

export interface IStillingsSøkSidePanel {
  children?: React.ReactNode | undefined;
}

const StillingsSøkSidePanel: React.FC<IStillingsSøkSidePanel> = ({
  children,
}) => {
  return (
    <div className='grid gap-4'>
      <Search hideLabel={false} label='Søk i stillinger' variant='primary' />
      <Button variant='secondary' className='w-full'>
        Bruk mitt standardsøk
      </Button>
      <StatusFilter />
      <GeografiFilter />
    </div>
  );
};

export default StillingsSøkSidePanel;
