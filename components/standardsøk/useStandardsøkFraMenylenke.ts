'use client';

import type { StandardsøkDTO } from '@/app/api/bruker/standardsok/standardsøkTyper';
import { useEffect, useRef } from 'react';
import type { SWRResponse } from 'swr';

interface UseStandardsøkFraMenylenkeProps {
  brukStandardsok: boolean | null;
  setBrukStandardsok: (verdi: boolean | null) => void;
  liste: Pick<
    SWRResponse<StandardsøkDTO[], Error>,
    'data' | 'error' | 'isLoading' | 'isValidating'
  >;
  brukLagretSøk: (søk: StandardsøkDTO) => Promise<boolean>;
  onSøkBrukt: () => void;
  onFeil: () => void;
}

export const useStandardsøkFraMenylenke = ({
  brukStandardsok,
  setBrukStandardsok,
  liste,
  brukLagretSøk,
  onSøkBrukt,
  onFeil,
}: UseStandardsøkFraMenylenkeProps) => {
  const behandlerStandardsøk = useRef(false);
  const { data, error, isLoading, isValidating } = liste;

  useEffect(() => {
    if (!brukStandardsok) {
      behandlerStandardsøk.current = false;
      return;
    }

    if (behandlerStandardsøk.current || isLoading || isValidating) {
      return;
    }

    behandlerStandardsøk.current = true;

    const standardsøk = data?.find((søk) => søk.erStandard);
    if (!standardsøk) {
      if (error) onFeil();
      setBrukStandardsok(null);
      return;
    }

    void brukLagretSøk(standardsøk).then((brukt) => {
      if (brukt) {
        onSøkBrukt();
      } else {
        setBrukStandardsok(null);
      }
    });
  }, [
    brukStandardsok,
    data,
    error,
    isLoading,
    isValidating,
    onFeil,
    onSøkBrukt,
    setBrukStandardsok,
    brukLagretSøk,
  ]);
};
