'use client';

import {
  OppdaterRekrutteringstreffDTO,
  OppdaterRekrutteringstreffSchema,
  toOppdaterRekrutteringstreffDto,
} from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

function RekrutteringstreffForm({
  rekrutteringstreffId,
  children,
}: {
  rekrutteringstreffId: string;
  children: React.ReactNode;
}) {
  const { data } = useRekrutteringstreff(rekrutteringstreffId);

  const form = useForm<OppdaterRekrutteringstreffDTO>({
    resolver: zodResolver(OppdaterRekrutteringstreffSchema),
    defaultValues: toDefaults(data),
    mode: 'onBlur',
  });

  React.useEffect(() => {
    if (data) form.reset(toDefaults(data));
  }, [data, form]);

  return <FormProvider {...form}>{children}</FormProvider>;
}

function toDefaults(treff: any | undefined): OppdaterRekrutteringstreffDTO {
  if (!treff) {
    return {
      tittel: '',
      beskrivelse: null,
      fraTid: null,
      tilTid: null,
      svarfrist: null,
      gateadresse: null,
      postnummer: null,
      poststed: null,
    };
  }
  return toOppdaterRekrutteringstreffDto(treff);
}

export default RekrutteringstreffForm;
