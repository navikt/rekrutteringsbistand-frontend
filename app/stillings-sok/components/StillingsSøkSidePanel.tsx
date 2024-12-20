import { Button, Search } from '@navikt/ds-react';
import * as React from 'react';
import { useStillingsSøkFilter } from '../StillingsSøkContext';
import GeografiFilter from './StillingsSøkFilter/GeografiFilter';
import InkluderingFilter from './StillingsSøkFilter/InkluderingFilter';
import KategoriFilter from './StillingsSøkFilter/KategoriFilter';
import StatusFilter from './StillingsSøkFilter/StatusFilter';
import SynlighetFilter from './StillingsSøkFilter/SynlighetFilter';

const StillingsSøkSidePanel: React.FC<{ formidlinger?: boolean }> = ({
  formidlinger,
}) => {
  const { fritekst, setFritekst } = useStillingsSøkFilter();
  const [searchValue, setSearchValue] = React.useState(fritekst);
  return (
    <div className='grid gap-4'>
      <Search
        hideLabel={true}
        label='Søk i stillinger'
        placeholder='Søk i stillinger'
        variant='primary'
        value={searchValue}
        onChange={(e) => setSearchValue(e)}
        onSearchClick={(e) => setFritekst(e)}
      />
      {!formidlinger && (
        <Button variant='secondary' className='w-full'>
          Bruk mitt standardsøk
        </Button>
      )}
      <StatusFilter />
      <GeografiFilter />
      {!formidlinger && <InkluderingFilter />}
      {!formidlinger && <KategoriFilter />}
      {!formidlinger && <SynlighetFilter />}
    </div>
  );
};

export default StillingsSøkSidePanel;
