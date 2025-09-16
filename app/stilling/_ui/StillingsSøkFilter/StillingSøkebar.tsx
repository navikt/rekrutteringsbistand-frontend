import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Box, Button, Search } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export interface StillingSøkebarProps {
  alltidÅpen: boolean;
}

export default function StillingSøkebar({ alltidÅpen }: StillingSøkebarProps) {
  const { fritekst, setFritekstListe } = useStillingsSøkFilter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [showStandardsøk, setShowStandardsøk] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    if (!alltidÅpen && showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [alltidÅpen, showSearch]);

  useEffect(() => {
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
      {/* 
      
      Midlertidig kommentert ut responsivt søkefelt
      
      {!alltidÅpen && !showSearch ? (
        <Button
          variant='tertiary'
          size='small'
          icon={<MagnifyingGlassIcon />}
          onClick={() => setShowSearch(true)}
        >
          Søk
        </Button>
      ) : ( */}
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
      {/* )} */}
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
}
