'use client';

import Feilmelding from './feilhåndtering/Feilmelding';
import Sidelaster from '@/components/layout/Sidelaster';
import { RekbisError } from '@/util/rekbisError';
import { SWRLaster as PakkeSWRLaster } from '@navikt/toi-next-frontend/swr';
import * as React from 'react';
import { SWRResponse } from 'swr';
import { ZodError } from 'zod';

type SWRHookResponse<T> = SWRResponse<T, Error> | undefined;

export interface ISWRLasterProps<T extends any[]> {
  visLoaderUnderValidering?: boolean;
  skjulFeilmelding?: boolean;
  hooks: { [K in keyof T]: SWRHookResponse<T[K]> };
  skeleton?: React.ReactNode;
  egenFeilmelding?: (error: Error) => React.ReactNode;
  allowPartialData?: boolean;
  children: (...data: T) => React.ReactNode;
}

function isZodError(error: any): error is ZodError {
  return error instanceof ZodError;
}

function isRekbisError(error: any): error is RekbisError {
  return error instanceof RekbisError;
}

const SWRLaster = <T extends any[]>({
  hooks,
  skeleton,
  children,
  skjulFeilmelding = false,
  egenFeilmelding,
  visLoaderUnderValidering = false,
  allowPartialData = false,
}: ISWRLasterProps<T>): React.ReactElement | null => {
  const renderFeil = skjulFeilmelding
    ? undefined
    : (error: Error): React.ReactNode => {
        if (egenFeilmelding) {
          return egenFeilmelding(error);
        }
        if (isRekbisError(error)) {
          return <Feilmelding error={error} />;
        }
        return (
          <Feilmelding
            {...error}
            message='Feil ved henting av data'
            zodError={isZodError(error) ? error : undefined}
          />
        );
      };

  return (
    <PakkeSWRLaster<T>
      hooks={hooks}
      laster={skeleton ? skeleton : <Sidelaster />}
      renderFeil={renderFeil}
      visLoaderUnderValidering={visLoaderUnderValidering}
      tillatDelvisData={allowPartialData}
      feilSkjulerInnhold={!allowPartialData && !skjulFeilmelding}
    >
      {children}
    </PakkeSWRLaster>
  );
};

export default SWRLaster;
