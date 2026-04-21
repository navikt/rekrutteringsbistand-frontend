import HendelseTypeFilter from './HendelseTypeFilter';
import InternStatusFilter from './InternStatusFilter';
import KandidatListeChip from './KandidatlisteChips';
import { useKandidatlisteFilterContext } from './KandidatlisteFilterContext';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import AlleFilterKomponent from '@/components/filter/AlleFilterKomponent';
import FilterKomponent from '@/components/filter/FilterKomponent';
import { Search, Switch } from '@navikt/ds-react';

export default function KandidatlisteFilterrad() {
  const { fritekstSøk, setFritekstSøk, visSlettede, setVisSlettede } =
    useKandidatlisteFilterContext();
  const { antallPerKategoriPerFilter } = useKandidatlisteContext();
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
            value={fritekstSøk}
            onChange={(val) => setFritekstSøk(val)}
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
