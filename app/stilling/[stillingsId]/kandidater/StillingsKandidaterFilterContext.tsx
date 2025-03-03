'use client';

import { rekbisError } from '../../../../util/rekbisError';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import * as React from 'react';

export enum KandidatFilterQueryparam {
  Status = 'status',
  Hendelse = 'hendelse',
}

interface IStillingsKandidaterContext {
  status: string[];
  setStatus: (val: string[]) => void;
  hendelse: string[];
  setHendelse: (val: string[]) => void;
}

const StillingsKandidaterFilterContext = React.createContext<
  IStillingsKandidaterContext | undefined
>(undefined);

export const StillingsKandidaterFilterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [status, setStatus] = useQueryState<string[]>(
    KandidatFilterQueryparam.Status,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [hendelse, setHendelse] = useQueryState<string[]>(
    KandidatFilterQueryparam.Hendelse,
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  return (
    <StillingsKandidaterFilterContext.Provider
      value={{
        status,
        setStatus,
        hendelse,
        setHendelse,
      }}
    >
      {children}
    </StillingsKandidaterFilterContext.Provider>
  );
};

export const useStillingsKandidaterFilter = () => {
  const context = React.useContext(StillingsKandidaterFilterContext);
  if (context === undefined) {
    throw new rekbisError({
      beskrivelse:
        'Context cannot be undefined. Ensure that useStillingsKandidaterFilter is used within StillingsKandidaterFilterProvider.',
    });
  }
  return context;
};
