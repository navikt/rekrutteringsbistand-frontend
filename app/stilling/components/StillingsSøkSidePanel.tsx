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

const StillingsSøkSidePanel: React.FC<{
  formidlinger?: boolean;
  kandidatId?: string;
}> = ({ formidlinger, kandidatId }) => {
  const { fritekst, setFritekstListe } = useStillingsSøkFilter();
  const [searchValue, setSearchValue] = React.useState<string>('');
  const { harRolle } = useApplikasjonContext();

  const harArbeidsgiverrettetRolle = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  ]);
  return (
    <div className='grid gap-4'>
      <Search
        onKeyDownCapture={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const nyListe = [...fritekst, searchValue];
            setFritekstListe(nyListe);
            setSearchValue('');
          }
        }}
        hideLabel={true}
        label='Søk i stillinger'
        placeholder='Søk i stillinger'
        variant='primary'
        value={searchValue}
        onChange={(e) => setSearchValue(e)}
        onSearchClick={() => {
          const nyListe = [...fritekst, searchValue];
          setFritekstListe(nyListe);
          setSearchValue('');
        }}
      />
      {!formidlinger && !kandidatId && <StandardsøkKnapp />}
      {(harArbeidsgiverrettetRolle || formidlinger) && <StatusFilter />}
      <GeografiFilter />
      {!formidlinger && <InkluderingFilter />}
      {!formidlinger && <KategoriFilter />}
      {!formidlinger && <SynlighetFilter />}
    </div>
  );
};

export default StillingsSøkSidePanel;
