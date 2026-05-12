import HendelseTypeFilter from './HendelseTypeFilter';
import InternStatusFilter from './InternStatusFilter';
import KandidatListeChip from './KandidatlisteChips';
import { useKandidatlisteFilterContext } from './KandidatlisteFilterContext';
import AlleFilterKomponent from '@/components/filter/AlleFilterKomponent';
import FilterKomponent from '@/components/filter/FilterKomponent';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useLatestRef } from '@/hooks/useLatestRef';
import { Search, Switch } from '@navikt/ds-react';
import { useEffect, useState } from 'react';

export default function KandidatlisteFilterrad() {
  const {
    fritekstSøk,
    setFritekstSøk,
    visSlettede,
    setVisSlettede,
    antallPerKategoriPerFilter,
  } = useKandidatlisteFilterContext();
  const [lokalFritekst, setLokalFritekst] = useState(fritekstSøk);
  const debouncedFritekst = useDebouncedValue(lokalFritekst, 600);
  const fritekstSøkRef = useLatestRef(fritekstSøk);

  useEffect(() => {
    setLokalFritekst(fritekstSøk);
  }, [fritekstSøk]);

  useEffect(() => {
    if (debouncedFritekst !== fritekstSøkRef.current) {
      setFritekstSøk(debouncedFritekst);
    }
  }, [debouncedFritekst, setFritekstSøk, fritekstSøkRef]);

  const antallSlettede =
    (antallPerKategoriPerFilter.visSlettede['true'] ?? 0) -
    (antallPerKategoriPerFilter.visSlettede['false'] ?? 0);
  return (
    <div>
      <div className='flex flex-wrap items-center gap-4'>
        <div className='w-full md:w-[15rem]'>
          <Search
            placeholder='Søk i kandidatene'
            label='Kandidatsøk'
            hideLabel
            variant='secondary'
            size='small'
            value={lokalFritekst}
            onChange={(val) => setLokalFritekst(val)}
            onSearchClick={() => setFritekstSøk(lokalFritekst)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setFritekstSøk(lokalFritekst);
              } else if (e.key === 'Escape') {
                setLokalFritekst('');
                setFritekstSøk('');
              }
            }}
          />
        </div>

        <div className='hidden md:flex md:items-center md:gap-4'>
          <FilterKomponent tittel='Hendelse'>
            <HendelseTypeFilter />
          </FilterKomponent>
          <FilterKomponent tittel='Intern status'>
            <InternStatusFilter />
          </FilterKomponent>
          <Switch
            value={visSlettede}
            checked={visSlettede === 'true'}
            onChange={() =>
              setVisSlettede(visSlettede === 'true' ? 'false' : 'true')
            }
          >
            Vis slettede ({antallSlettede})
          </Switch>
        </div>

        <div className='ml-auto md:hidden'>
          <AlleFilterKomponent>
            <HendelseTypeFilter />
            <InternStatusFilter />
            <Switch
              value={visSlettede}
              checked={visSlettede === 'true'}
              onChange={() =>
                setVisSlettede(visSlettede === 'true' ? 'false' : 'true')
              }
            >
              Vis slettede ({antallSlettede})
            </Switch>
          </AlleFilterKomponent>
        </div>
      </div>
      <KandidatListeChip />
    </div>
  );
}
