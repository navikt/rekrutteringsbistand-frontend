import { NyhetDTO } from '../../nyheter';
import { logger } from '@navikt/next-logger';
import { useEffect, useState } from 'react';

const hentAntallUlesteNyheter = (
  nyheter: NyhetDTO[],
  antallLesteNyheter: number,
) => {
  if (nyheter.length === 0) {
    return 0;
  }

  return nyheter.length - antallLesteNyheter;
};

const LOCAL_STORAGE_KEY = 'antallLesteNyheter';

const useAntallUlesteNyheter = (
  nyheter: NyhetDTO[],
  onFørsteBesøk: () => void,
): [number, number, () => void] => {
  const [antallUlesteNyheter, setAntallUlesteNyheter] = useState<number>(0);
  const [antallUlesteVedSidelast, setAntallUlesteVedSidelast] =
    useState<number>(0);

  useEffect(() => {
    try {
      const localStorageValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);

      if (localStorageValue) {
        const antallLesteFraLocalStorage = Number.parseInt(
          JSON.parse(localStorageValue),
        );
        const antallUlesteNyheter = hentAntallUlesteNyheter(
          nyheter,
          antallLesteFraLocalStorage,
        );

        setAntallUlesteNyheter(antallUlesteNyheter);
        setAntallUlesteVedSidelast(antallUlesteNyheter);
      } else {
        onFørsteBesøk();
        setAntallUlesteNyheter(1);
        setAntallUlesteVedSidelast(1);
      }
    } catch (error) {
      logger.error(error, 'Kunne ikke hente fra local storage');
    }
  }, [nyheter, onFørsteBesøk]);

  const markerSomLest = () => {
    setAntallUlesteNyheter(0);

    try {
      const antallLesteNyheter = JSON.stringify(nyheter.length);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, antallLesteNyheter);
    } catch (error) {
      logger.error(error, 'Kunne ikke lagre til local storage');
    }
  };

  return [antallUlesteNyheter, antallUlesteVedSidelast, markerSomLest];
};

export default useAntallUlesteNyheter;
