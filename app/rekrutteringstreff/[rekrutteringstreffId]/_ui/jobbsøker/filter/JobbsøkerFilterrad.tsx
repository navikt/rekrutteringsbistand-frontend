'use client';

import JobbsøkerSøkChips from './JobbsøkerSøkChips';
import { useJobbsøkerSøkContext } from './JobbsøkerSøkContext';
import StatusFilter from './StatusFilter';
import AldersgruppeFilter from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/filter/AldersgruppeFilter';
import KontorFilter from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/filter/KontorFilter';
import AlleFilterKomponent from '@/components/filter/AlleFilterKomponent';
import FilterPopoverKomponent from '@/components/filter/FilterPopoverKomponent';
import { SidepanelTrigger } from '@/components/layout/SidepanelTrigger';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useLatestRef } from '@/hooks/useLatestRef';
import { SidebarRightIcon } from '@navikt/aksel-icons';
import { Search } from '@navikt/ds-react';
import { useEffect, useState } from 'react';

interface JobbsøkerFilterradProps {
  antallPerStatus?: Record<string, number>;
  antallPerAldersgruppe?: Record<string, number>;
  antallPerKontor?: Record<string, number>;
}

export default function JobbsøkerFilterrad({
  antallPerStatus,
  antallPerAldersgruppe,
  antallPerKontor,
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
          <FilterPopoverKomponent tittel='Aldersgruppe'>
            <AldersgruppeFilter antallPerAldersgruppe={antallPerAldersgruppe} />
          </FilterPopoverKomponent>
          <FilterPopoverKomponent tittel='Kontor'>
            <KontorFilter antallPerKontor={antallPerKontor} />
          </FilterPopoverKomponent>
        </div>

        <div className='ml-auto flex items-center gap-2'>
          <div className='md:hidden'>
            <AlleFilterKomponent>
              <StatusFilter antallPerStatus={antallPerStatus} />
              <AldersgruppeFilter
                antallPerAldersgruppe={antallPerAldersgruppe}
              />
              <KontorFilter antallPerKontor={antallPerKontor} />
            </AlleFilterKomponent>
          </div>
          <SidepanelTrigger skjulOver='1280px' icon={<SidebarRightIcon />}>
            Vis sidepanel
          </SidepanelTrigger>
        </div>
      </div>
      <JobbsøkerSøkChips />
    </div>
  );
}
