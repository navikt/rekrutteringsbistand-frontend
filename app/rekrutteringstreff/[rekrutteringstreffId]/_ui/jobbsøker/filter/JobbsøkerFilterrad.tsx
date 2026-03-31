'use client';

import JobbsøkerSøkChips from '../JobbsøkerSøkChips';
import InnsatsgruppeFilter from './InnsatsgruppeFilter';
import { useJobbsøkerFilterContext } from './JobbsøkerFilterContext';
import StatusFilter from './StatusFilter';
import AlleFilterKomponent from '@/components/filter/AlleFilterKomponent';
import FilterKomponent from '@/components/filter/FilterKomponent';
import { Search } from '@navikt/ds-react';
import { useEffect, useState } from 'react';

export default function JobbsøkerFilterrad() {
  const { fritekst, setFritekst } = useJobbsøkerFilterContext();
  const [localFritekst, setLocalFritekst] = useState<string>(fritekst);

  useEffect(() => {
    setLocalFritekst(fritekst);
  }, [fritekst]);

  const utførSøk = () => {
    setFritekst(localFritekst);
  };

  const nullstillSøk = () => {
    setLocalFritekst('');
    setFritekst('');
  };

  return (
    <div>
      <div className='flex flex-wrap items-center gap-4'>
        <div className='w-full md:w-[15rem]'>
          <Search
            placeholder='Søk i jobbsøkerne'
            label='Jobbsøkersøk'
            hideLabel
            variant='secondary'
            size='small'
            value={localFritekst}
            onChange={(val) => setLocalFritekst(val)}
            onSearchClick={utførSøk}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                utførSøk();
              } else if (e.key === 'Escape') {
                nullstillSøk();
              }
            }}
          />
        </div>

        <div className='hidden md:flex md:items-center md:gap-4'>
          <FilterKomponent tittel='Status'>
            <StatusFilter />
          </FilterKomponent>
          <FilterKomponent tittel='Innsatsgruppe'>
            <InnsatsgruppeFilter />
          </FilterKomponent>
        </div>

        <div className='ml-auto md:hidden'>
          <AlleFilterKomponent>
            <StatusFilter />
            <InnsatsgruppeFilter />
          </AlleFilterKomponent>
        </div>
      </div>
      <JobbsøkerSøkChips />
    </div>
  );
}
