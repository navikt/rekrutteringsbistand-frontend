import InternStatusFilter from './InternStatusFilter';
import { Search } from '@navikt/ds-react';
import * as React from 'react';

const KandidatlisteFilterrad: React.FC = () => {
  const [search, setSearch] = React.useState('');
  return (
    <div className='mt-2 flex gap-4 items-center'>
      <div className='md:w-[15rem]'>
        <Search
          placeholder='Søk i kandidatene'
          label='Kandidatsøk'
          hideLabel
          variant='secondary'
          size='small'
          value={search}
          onChange={(val) => setSearch(val)}
        />
      </div>
      <InternStatusFilter />
    </div>
  );
};

export default KandidatlisteFilterrad;
