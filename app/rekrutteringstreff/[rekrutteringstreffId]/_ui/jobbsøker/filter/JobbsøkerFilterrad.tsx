'use client';

import JobbsøkerSøkChips from '../JobbsøkerSøkChips';
import { useJobbsøkerSøkContext } from './JobbsøkerSøkContext';
import StatusFilter from './StatusFilter';
import AlleFilterKomponent from '@/components/filter/AlleFilterKomponent';
import FilterPopoverKomponent from '@/components/filter/FilterPopoverKomponent';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { Search } from '@navikt/ds-react';
import { useEffect, useState } from 'react';

interface JobbsøkerFilterradProps {
  antallPerStatus?: Record<string, number>;
}

export default function JobbsøkerFilterrad({
  antallPerStatus,
}: JobbsøkerFilterradProps) {
  const { fritekst, setFritekst } = useJobbsøkerSøkContext();
  const [lokalFritekst, setLokalFritekst] = useState(fritekst);
  const debouncetFritekst = useDebouncedValue(lokalFritekst, 600);

  useEffect(() => {
    setLokalFritekst(fritekst);
  }, [fritekst]);

  useEffect(() => {
    if (debouncetFritekst !== fritekst) {
      setFritekst(debouncetFritekst);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncetFritekst]);

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
            value={lokalFritekst}
            onChange={(val) => setLokalFritekst(val)}
            onSearchClick={() => setFritekst(lokalFritekst)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setFritekst(lokalFritekst);
              }
            }}
          />
        </div>

        <div className='hidden md:flex md:items-center md:gap-4'>
          <FilterPopoverKomponent tittel='Status'>
            <StatusFilter antallPerStatus={antallPerStatus} />
          </FilterPopoverKomponent>
        </div>

        <div className='ml-auto md:hidden'>
          <AlleFilterKomponent>
            <StatusFilter antallPerStatus={antallPerStatus} />
          </AlleFilterKomponent>
        </div>
      </div>
      <JobbsøkerSøkChips />
    </div>
  );
}
