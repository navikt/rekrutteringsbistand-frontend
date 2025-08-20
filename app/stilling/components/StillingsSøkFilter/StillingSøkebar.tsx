import { useUseBrukerStandardSøk } from '../../../api/stilling/standardsok/useBrukersStandardsøk';
import { useStillingsSøkFilter } from '../../StillingsSøkContext';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Box, Button, Search } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface StillingSøkebarProps {
  children?: React.ReactNode | undefined;
}

const StillingSøkebar: React.FC<StillingSøkebarProps> = ({ children }) => {
  const { fritekst, setFritekstListe } = useStillingsSøkFilter();
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [showStandardsøk, setShowStandardsøk] = React.useState<boolean>(false);
  const [showSearch, setShowSearch] = React.useState<boolean>(false);
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const searchRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleStandardsøkClick = () => {
    setShowStandardsøk(false);
    setShowSearch(false);
    router.push('/stilling?brukStandardsok=true');
  };

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      const nyListe = [...fritekst, searchValue];
      setFritekstListe(nyListe);
      setSearchValue('');
    }
    setShowStandardsøk(false);
    setShowSearch(false);
  };

  React.useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

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
    <div className='relative' ref={searchRef}>
      {!showSearch ? (
        <Button
          variant='tertiary'
          size='small'
          icon={<MagnifyingGlassIcon />}
          onClick={() => setShowSearch(true)}
        >
          Søk
        </Button>
      ) : (
        <Search
          ref={searchInputRef}
          onKeyDownCapture={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearchSubmit();
            } else if (e.key === 'Escape') {
              setShowSearch(false);
              setSearchValue('');
              setShowStandardsøk(false);
            }
          }}
          onFocus={() => setShowStandardsøk(true)}
          onBlur={() => {
            // Slight delay to allow click on standardsøk button
            setTimeout(() => {
              if (!searchValue.trim()) {
                setShowSearch(false);
              }
              setShowStandardsøk(false);
            }, 150);
          }}
          size='small'
          hideLabel={true}
          label='Søk i stillinger'
          placeholder='Søk i stillinger'
          variant='secondary'
          value={searchValue}
          onChange={(e) => setSearchValue(e)}
          onSearchClick={handleSearchSubmit}
        />
      )}

      {showStandardsøk && brukerStandardSøkData.data && showSearch && (
        <Box.New
          background='neutral-moderate'
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
  );
};

export default StillingSøkebar;
