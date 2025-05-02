import FilterKomponent from '../../../../../components/FilterKomponent';
import InternStatusFilter from './InternStatusFilter';
import { useKandidatlisteFilterContext } from './KandidatlisteFilterContext';
import { Search, Switch } from '@navikt/ds-react';
import * as React from 'react';

const KandidatlisteFilterrad: React.FC = () => {
  const { fritekstSøk, setFritekstSøk, visSlettede, setVisSlettede } =
    useKandidatlisteFilterContext();
  return (
    <div className='mt-2 flex gap-4 items-center'>
      <div className='md:w-[15rem]'>
        <Search
          placeholder='Søk i kandidatene'
          label='Kandidatsøk'
          hideLabel
          variant='secondary'
          size='small'
          value={fritekstSøk}
          onChange={(val) => setFritekstSøk(val)}
        />
      </div>
      <Switch
        value={visSlettede}
        checked={visSlettede === 'true'}
        onChange={() =>
          setVisSlettede(visSlettede === 'true' ? 'false' : 'true')
        }
      >
        Vis slettede kandidater
      </Switch>
      <FilterKomponent tittel='Intern status'>
        <InternStatusFilter />
      </FilterKomponent>
    </div>
  );
};

export default KandidatlisteFilterrad;
