import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { SidepanelTrigger } from '@/components/layout/SidepanelTrigger';
import { FilterIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Box, Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type FC } from 'react';

const StillingsSøkFilter: FC<{
  formidlinger?: boolean;
  stillingForKandidat?: string;
}> = ({ formidlinger }) => {
  const [showStandardsøk, setShowStandardsøk] = useState<boolean>(false);
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const searchRef = useRef<HTMLDivElement>(null);
  // Når pekeren trykkes ned inne og slippes utenfor, får click target på felles forelder.
  const pekerStartetInnenforRef = useRef(false);
  const router = useRouter();

  const handleStandardsøkClick = () => {
    setShowStandardsøk(false);
    router.push('/stilling?brukStandardsok=true');
  };

  useEffect(() => {
    const lukkVedKlikkUtenfor = (event: MouseEvent) => {
      const startetInnenfor = pekerStartetInnenforRef.current;
      pekerStartetInnenforRef.current = false;
      if (startetInnenfor) return;
      if (
        searchRef.current &&
        event.target instanceof Node &&
        !searchRef.current.contains(event.target)
      ) {
        setShowStandardsøk(false);
      }
    };
    document.addEventListener('click', lukkVedKlikkUtenfor);
    return () => {
      document.removeEventListener('click', lukkVedKlikkUtenfor);
    };
  }, []);

  return (
    <div className='@container flex flex-row items-center justify-end contain-layout'>
      <div className='flex gap-2'>
        <div
          className='relative'
          ref={searchRef}
          onPointerDownCapture={() => {
            pekerStartetInnenforRef.current = true;
          }}
        >
          {!formidlinger && showStandardsøk && brukerStandardSøkData.data && (
            <Box
              background='default'
              className='absolute top-full right-0 left-0 z-50 mt-1 rounded-md shadow-lg'
            >
              <div className='p-2'>
                <Button
                  variant='tertiary'
                  size='small'
                  icon={<MagnifyingGlassIcon aria-hidden />}
                  onClick={handleStandardsøkClick}
                  className='w-full justify-start'
                >
                  Standardssøk
                </Button>
              </div>
            </Box>
          )}
        </div>
        <SidepanelTrigger skjulOver='1024px' icon={<FilterIcon aria-hidden />}>
          Filtrer
        </SidepanelTrigger>
      </div>
    </div>
  );
};

export default StillingsSøkFilter;
