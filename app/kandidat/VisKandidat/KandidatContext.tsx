'use client';

import { RekbisError } from '../../../util/rekbisError';
import { KandidatDataSchemaDTO } from '../../api/kandidat-sok/schema/cvSchema.zod';
import { useKandidatinformasjon } from '../../api/kandidat-sok/useKandidatinformasjon';
import SWRLaster from '../../components/SWRLaster';
import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import React from 'react';

interface KandidatContextType {
  kandidatId: string;
  kandidatData: KandidatDataSchemaDTO;
}

const KandidatContext = React.createContext<KandidatContextType | undefined>(
  undefined,
);

interface KandidatContextProviderProps {
  kandidatId: string;
  children: React.ReactNode;
}
export const KandidatContextProvider: React.FC<
  KandidatContextProviderProps
> = ({ kandidatId, children }) => {
  const kandidatInformasjonHook = useKandidatinformasjon(kandidatId);

  const { setValgtFnr } = useApplikasjonContext();

  React.useEffect(() => {
    if (kandidatInformasjonHook?.data?.fodselsnummer) {
      setValgtFnr(kandidatInformasjonHook?.data?.fodselsnummer);
    } else {
      setValgtFnr(null);
    }
  }, [setValgtFnr]);

  return (
    <SWRLaster hooks={[kandidatInformasjonHook]}>
      {(kandidatData) => {
        if (!kandidatData) {
          return null;
        }

        return (
          <KandidatContext.Provider
            value={{
              kandidatId: kandidatId,
              kandidatData: kandidatData as KandidatDataSchemaDTO,
            }}
          >
            {children}
          </KandidatContext.Provider>
        );
      }}
    </SWRLaster>
  );
};

export const useKandidatContext = () => {
  const context = React.useContext(KandidatContext);

  if (context === undefined) {
    throw new RekbisError({
      beskrivelse:
        'useKandidatContext må være i scope: KandidatContextProvider',
    });
  }
  return context;
};
