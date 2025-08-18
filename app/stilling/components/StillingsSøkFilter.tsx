import { useUseBrukerStandardSøk } from '../../api/stilling/standardsok/useBrukersStandardsøk';
import AlleFilterKomponent from '../../components/AlleFilterKomponent';
import { Roller } from '../../components/tilgangskontroll/roller';
import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import { useStillingsSøkFilter } from '../StillingsSøkContext';
import GeografiFilter from './StillingsSøkFilter/GeografiFilter';
import InkluderingFilter from './StillingsSøkFilter/InkluderingFilter';
import KategoriFilter from './StillingsSøkFilter/KategoriFilter';
import StatusFilter from './StillingsSøkFilter/StatusFilter';
import SynlighetFilter from './StillingsSøkFilter/SynlighetFilter';
import StillingsSøkNavigasjon from './StillingsSøkNavigasjon';
import StillingsSøkSortering from './StillingsSøkSortering';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Box, Button, Search } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const StillingsSøkFilter: React.FC<{
  formidlinger?: boolean;
  stillingForKandidat?: string;
}> = ({ formidlinger, stillingForKandidat }) => {
  const { fritekst, setFritekstListe } = useStillingsSøkFilter();
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [showStandardsøk, setShowStandardsøk] = React.useState<boolean>(false);
  const { harRolle } = useApplikasjonContext();
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const searchRef = React.useRef<HTMLDivElement>(null);

  const router = useRouter();

  const harArbeidsgiverrettetRolle = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  ]);

  const handleStandardsøkClick = () => {
    setShowStandardsøk(false);
    router.push('/stilling?brukStandardsok=true');
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowStandardsøk(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex flex-row items-center justify-between'>
      <StillingsSøkNavigasjon />
      <div className='flex gap-2'>
        <div className='relative' ref={searchRef}>
          <Search
            onKeyDownCapture={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const nyListe = [...fritekst, searchValue];
                setFritekstListe(nyListe);
                setSearchValue('');
                setShowStandardsøk(false);
              }
            }}
            onFocus={() => setShowStandardsøk(true)}
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
              setShowStandardsøk(false);
            }}
          />

          {showStandardsøk && brukerStandardSøkData.data && (
            <Box.New
              background='default'
              className='absolute top-full left-0 right-0 mt-1 rounded-md shadow-lg z-50'
            >
              <div className='p-2'>
                <Button
                  variant='tertiary'
                  size='small'
                  icon={<MagnifyingGlassIcon />}
                  onClick={handleStandardsøkClick}
                  className='w-full justify-start'
                >
                  Standardssøk
                </Button>
              </div>
            </Box.New>
          )}
        </div>

        <div className='whitespace-nowrap'>
          <AlleFilterKomponent>
            <StillingsSøkSortering />
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
    </div>
  );
};

export default StillingsSøkFilter;
