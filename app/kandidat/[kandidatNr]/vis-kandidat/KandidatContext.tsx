'use client';

import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';
import { useKandidatinformasjon } from '@/app/api/kandidat-sok/useKandidatinformasjon';
import SWRLaster from '@/components/SWRLaster';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { createContext, FC, ReactNode, useContext, useEffect } from 'react';

interface KandidatContextType {
  kandidatId: string;
  kandidatData: KandidatDataSchemaDTO;
}

const KandidatContext = createContext<KandidatContextType | undefined>(
  undefined,
);

interface KandidatContextProviderProps {
  kandidatId: string;
  children: ReactNode;
}
export const KandidatContextProvider: FC<KandidatContextProviderProps> = ({
  kandidatId,
  children,
}) => {
  const kandidatInformasjonHook = useKandidatinformasjon(kandidatId);

  const { setValgtFnr } = useApplikasjonContext();

  useEffect(() => {
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

export const useNullableKandidatContext = () => {
  const context = useContext(KandidatContext);

  if (context === undefined) {
    return null;
  }
  return context;
};

export const useKandidatContext = () => {
  const context = useContext(KandidatContext);

  if (context === undefined) {
    throw new RekbisError({
      message: 'useKandidatContext må være i scope: KandidatContextProvider',
    });
  }
  return context;
};
