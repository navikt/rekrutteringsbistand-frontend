'use client';

import { useKandidatnummer } from '@/app/api/rekrutteringstreff/[...slug]/utils/useKandidatnummer';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { createContext, ReactNode, useContext } from 'react';

interface PersonTreffProviderProps {
  personTreffId: string;
  children: ReactNode;
}

type PersonTreffContextType = {
  personTreffId: string;
  rekrutteringstreffId: string;
  kandidatnummer: string | null;
  isLoading: boolean;
};

const PersonTreffContext = createContext<PersonTreffContextType | undefined>(
  undefined,
);

export const usePersonTreffContext = () => {
  const context = useContext(PersonTreffContext);

  if (!context) {
    throw new RekbisError({
      message: 'usePersonTreffContext må være i scope: PersonTreffProvider',
    });
  }

  return context;
};

export default function PersonTreffProvider({
  personTreffId,
  children,
}: PersonTreffProviderProps) {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const kandidatnummerHook = useKandidatnummer(
    personTreffId || null,
    rekrutteringstreffId || null,
  );

  const kandidatnummer = kandidatnummerHook.data?.kandidatnummer ?? null;
  const isLoading = kandidatnummerHook.isLoading;

  return (
    <PersonTreffContext.Provider
      value={{ personTreffId, rekrutteringstreffId, kandidatnummer, isLoading }}
    >
      {children}
    </PersonTreffContext.Provider>
  );
}
