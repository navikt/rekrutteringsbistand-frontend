'use client';

import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';
import { useKandidatinformasjon } from '@/app/api/kandidat-sok/useKandidatinformasjon';
import SWRLaster from '@/components/SWRLaster';
import Feilmelding from '@/components/feilhåndtering/Feilmelding';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { createContext, FC, ReactNode, useContext, useEffect } from 'react';

interface JobbsøkerContextType {
  kandidatId: string;
  kandidatData: KandidatDataSchemaDTO;
}

const JobbsøkerContext = createContext<JobbsøkerContextType | undefined>(
  undefined,
);

interface JobbsøkerContextProviderProps {
  kandidatId: string;
  children: ReactNode;
}
export const JobbsøkerContextProvider: FC<JobbsøkerContextProviderProps> = ({
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
  }, [setValgtFnr, kandidatInformasjonHook?.data?.fodselsnummer]);

  return (
    <SWRLaster
      egenFeilmelding={(error) => (
        <Feilmelding
          error={error}
          message={'Fant ikke jobbsøker, er jobbsøker blitt inaktiv?'}
        />
      )}
      hooks={[kandidatInformasjonHook]}
    >
      {(kandidatData) => {
        if (!kandidatData) {
          return null;
        }

        return (
          <JobbsøkerContext.Provider
            value={{
              kandidatId: kandidatId,
              kandidatData: kandidatData as KandidatDataSchemaDTO,
            }}
          >
            {children}
          </JobbsøkerContext.Provider>
        );
      }}
    </SWRLaster>
  );
};

export const useNullableJobbsøkerContext = () => {
  const context = useContext(JobbsøkerContext);

  if (context === undefined) {
    return null;
  }
  return context;
};

export const useJobbsøkerContext = () => {
  const context = useContext(JobbsøkerContext);

  if (context === undefined) {
    throw new RekbisError({
      message: 'useJobbsøkerContext må være i scope: JobbsøkerContextProvider',
    });
  }
  return context;
};
