import AlleFilterKomponent from '../../components/AlleFilterKomponent';
import { Roller } from '../../components/tilgangskontroll/roller';
import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import { useStillingsSøkFilter } from '../StillingsSøkContext';
import GeografiFilter from './StillingsSøkFilter/GeografiFilter';
import InkluderingFilter from './StillingsSøkFilter/InkluderingFilter';
import KategoriFilter from './StillingsSøkFilter/KategoriFilter';
import StatusFilter from './StillingsSøkFilter/StatusFilter';
import StillingsSøkNavigasjon from './StillingsSøkNavigasjon';
import StillingsSøkSortering from './StillingsSøkSortering';
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
    <div className='flex flex-row  items-center justify-between '>
      <StillingsSøkNavigasjon />
      <div className='flex gap-2'>
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
        <div className='whitespace-nowrap'>
          <AlleFilterKomponent>
            <StillingsSøkSortering />
            {(harArbeidsgiverrettetRolle || formidlinger) && <StatusFilter />}
            <GeografiFilter />
            {!formidlinger && (
              <>
                <InkluderingFilter />
                <KategoriFilter />
                {/* <SynlighetFilter /> */}
              </>
            )}
          </AlleFilterKomponent>
        </div>
      </div>
    </div>
  );
};

export default StillingsSøkFilter;
