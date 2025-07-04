'use client';

import { RekbisError } from '../../util/rekbisError';
import Sidelaster from './Sidelaster';
import Feilmelding from './feilhåndtering/Feilmelding';
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
  if (hooks.some((hook) => !hook)) {
    return <>{skeleton ? skeleton : <Sidelaster />}</>;
  }

  if (
    hooks.some(
      (hook) =>
        hook?.isLoading || (visLoaderUnderValidering && hook?.isValidating),
    )
  ) {
    return <>{skeleton ? skeleton : <Sidelaster />}</>;
  }

  const error = hooks.find((hook) => hook?.error)?.error;
  if (error && egenFeilmelding) {
    return <>{egenFeilmelding(error)}</>;
  }

  if (error && !skjulFeilmelding) {
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
  }

  if (allowPartialData) {
    const hasAnyData = hooks.some((hook) => hook?.data);
    const isAnyLoading = hooks.some(
      (hook) =>
        hook?.isLoading || (visLoaderUnderValidering && hook?.isValidating),
    );

    if (hasAnyData && !isAnyLoading) {
      const data = hooks.map((hook) => hook?.data) as T;
      return <>{children(...data)}</>;
    }
  } else {
    if (hooks.every((hook) => hook?.data)) {
      const data = hooks.map((hook) => hook?.data) as T;
      return <>{children(...data)}</>;
    }
  }

  return null;
};

export default SWRLaster;
