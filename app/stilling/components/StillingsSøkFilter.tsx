import AlleFilterKomponent from '../../components/AlleFilterKomponent';
import FilterKomponent from '../../components/FilterKomponent';
import { Roller } from '../../components/tilgangskontroll/roller';
import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import { useStillingsSøkFilter } from '../StillingsSøkContext';
import StandardsøkKnapp from './StandardsøkKnapp';
import GeografiFilter from './StillingsSøkFilter/GeografiFilter';
import InkluderingFilter from './StillingsSøkFilter/InkluderingFilter';
import KategoriFilter from './StillingsSøkFilter/KategoriFilter';
import StatusFilter from './StillingsSøkFilter/StatusFilter';
import SynlighetFilter from './StillingsSøkFilter/SynlighetFilter';
import { Search } from '@navikt/ds-react';
import * as React from 'react';

const StillingsSøkFilter: React.FC<{
  formidlinger?: boolean;
  stillingForKandidat?: string;
}> = ({ formidlinger, stillingForKandidat }) => {
  const { fritekst, setFritekstListe } = useStillingsSøkFilter();
  const [searchValue, setSearchValue] = React.useState<string>('');
  const { harRolle } = useApplikasjonContext();

  const harArbeidsgiverrettetRolle = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  ]);
  return (
    <div className='flex flex-row gap-4'>
      <div className='flex gap-4 items-center'>
        <div>
          <Search
            onKeyDownCapture={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const nyListe = [...fritekst, searchValue];
                setFritekstListe(nyListe);
                setSearchValue('');
              }
            }}
            size='small'
            hideLabel={true}
            label='Søk i stillinger'
            placeholder='Søk i stillinger'
            variant='secondary'
            value={searchValue}
            onChange={(e) => setSearchValue(e)}
            onSearchClick={() => {
              const nyListe = [...fritekst, searchValue];
              setFritekstListe(nyListe);
              setSearchValue('');
            }}
          />
        </div>

        {!formidlinger && !stillingForKandidat && (
          <div>
            <StandardsøkKnapp />
          </div>
        )}
      </div>
      <div className='flex flex-wrap '>
        {(harArbeidsgiverrettetRolle || formidlinger) && (
          <FilterKomponent tittel='Status'>
            <StatusFilter />
          </FilterKomponent>
        )}
        <FilterKomponent tittel='Område'>
          <GeografiFilter />
        </FilterKomponent>
        {!formidlinger && (
          <>
            <FilterKomponent tittel='Inkludering'>
              <InkluderingFilter />
            </FilterKomponent>

            <FilterKomponent tittel='Kategori'>
              <KategoriFilter />
            </FilterKomponent>

            <FilterKomponent tittel='Synlighet'>
              <SynlighetFilter />
            </FilterKomponent>
          </>
        )}
        <AlleFilterKomponent>
          {(harArbeidsgiverrettetRolle || formidlinger) && <StatusFilter />}
          <GeografiFilter />
          {!formidlinger && (
            <>
              <InkluderingFilter />
              <KategoriFilter />
              <SynlighetFilter />
            </>
          )}
        </AlleFilterKomponent>
      </div>
    </div>
  );
};

export default StillingsSøkFilter;
