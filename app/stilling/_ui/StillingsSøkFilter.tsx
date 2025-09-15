import GeografiFilter from './StillingsSøkFilter/GeografiFilter';
import KategoriFilter from './StillingsSøkFilter/KategoriFilter';
import StatusFilter from './StillingsSøkFilter/StatusFilter';
import StillingSøkebar from './StillingsSøkFilter/StillingSøkebar';
import StillingsSøkNavigasjon from './StillingsSøkNavigasjon';
import StillingsSøkSortering from './StillingsSøkSortering';
import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import InkluderingFilter from '@/app/stilling/_ui/StillingsSøkFilter/InkluderingFilter';
import MittStandardsøk from '@/app/stilling/_ui/standardsøk/MittStandardsøk';
import AlleFilterKomponent from '@/components/felles/filter/AlleFilterKomponent';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Box, Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type FC } from 'react';

const StillingsSøkFilter: FC<{
  formidlinger?: boolean;
  stillingForKandidat?: string;
}> = ({ formidlinger }) => {
  const [showStandardsøk, setShowStandardsøk] = useState<boolean>(false);
  const { harRolle } = useApplikasjonContext();
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const harArbeidsgiverrettetRolle = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  ]);

  const handleStandardsøkClick = () => {
    setShowStandardsøk(false);
    router.push('/stilling?brukStandardsok=true');
  };

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
    <div className='@container flex flex-row items-center justify-between'>
      <StillingsSøkNavigasjon />
      <div className='flex gap-2'>
        <div className='relative' ref={searchRef}>
          <StillingSøkebar />
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
        <div className='block @[720px]:hidden'>
          <div className='whitespace-nowrap'>
            <AlleFilterKomponent>
              <MittStandardsøk />
              <StillingsSøkSortering />
              {harArbeidsgiverrettetRolle && !formidlinger && <StatusFilter />}
              <GeografiFilter />
              {!formidlinger && <KategoriFilter />}
              <InkluderingFilter />
            </AlleFilterKomponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StillingsSøkFilter;
