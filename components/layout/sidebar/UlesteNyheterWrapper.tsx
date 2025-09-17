import { useNyheter } from '@/app/api/bruker/nyheter/useNyheter';
import { RekbisError } from '@/util/rekbisError';
import { ReactNode, useEffect, useState } from 'react';

export interface UlesteNyheterWrapperProps {
  children: ReactNode;
}

export default function UlesteNyheterWrapper({
  children,
}: UlesteNyheterWrapperProps) {
  const nyheter = useNyheter();

  const [harUlestNyhet, setHarUlestNyhet] = useState<boolean>(false);

  useEffect(() => {
    if (nyheter.data) {
      try {
        const localStorageValue =
          window.localStorage.getItem('antallLesteNyheter');

        if (localStorageValue) {
          const antallLesteFraLocalStorage = Number.parseInt(
            JSON.parse(localStorageValue),
          );
          const ulesteNyheter =
            antallLesteFraLocalStorage !== nyheter.data.length;

          setHarUlestNyhet(ulesteNyheter);
        }
      } catch (error) {
        new RekbisError({
          error,
          message: 'Kunne ikke hente fra local storage',
        });
      }
    }
  }, [nyheter]);
  return (
    <>
      {harUlestNyhet && (
        <div className='absolute top-2 left-9 w-3 h-3 bg-red-500 rounded-full'></div>
      )}
      {children}
    </>
  );
}
