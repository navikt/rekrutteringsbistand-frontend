'use client';

import JobbsøkerSøkChips from '../JobbsøkerSøkChips';
import { useJobbsøkerSøkContext } from './JobbsøkerSøkContext';
import StatusFilter from './StatusFilter';
import AlleFilterKomponent from '@/components/filter/AlleFilterKomponent';
import FilterPopoverKomponent from '@/components/filter/FilterPopoverKomponent';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useLatestRef } from '@/hooks/useLatestRef';
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
  const debouncedFritekst = useDebouncedValue(lokalFritekst, 600);
  const fritekstRef = useLatestRef(fritekst);

  useEffect(() => {
    setLokalFritekst(fritekst);
  }, [fritekst]);

  useEffect(() => {
    if (debouncedFritekst !== fritekstRef.current) {
      setFritekst(debouncedFritekst);
    }
  }, [debouncedFritekst, setFritekst, fritekstRef]);

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
              } else if (e.key === 'Escape') {
                setLokalFritekst('');
                setFritekst('');
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
