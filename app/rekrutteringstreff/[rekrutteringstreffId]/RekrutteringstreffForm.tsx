'use client';

import {
  OppdaterRekrutteringstreffDTO,
  OppdaterRekrutteringstreffSchema,
} from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseISO } from 'date-fns';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

function RekrutteringstreffForm({
  rekrutteringstreffId,
  children,
}: {
  rekrutteringstreffId: string;
  children: React.ReactNode;
}) {
  const { data } = useRekrutteringstreff(rekrutteringstreffId);

  const methods = useForm<OppdaterRekrutteringstreffDTO>({
    resolver: zodResolver(OppdaterRekrutteringstreffSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (data) {
      methods.reset(toDefaults(data));
    }
  }, [data, methods]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}

function toDefaults(treff: any | undefined): OppdaterRekrutteringstreffDTO {
  if (!treff) return {} as any;

  return {
    tittel: treff.tittel,
    gateadresse: treff.gateadresse,
    postnummer: treff.postnummer,
    poststed: treff.poststed,
    fraDato: treff.fraDato ? parseISO(treff.fraDato) : null,
    fraTid: treff.fraDato ? format(parseISO(treff.fraDato), 'HH:mm') : '08:00',
    tilDato: treff.tilDato ? parseISO(treff.tilDato) : null,
    tilTid: treff.tilDato ? format(parseISO(treff.tilDato), 'HH:mm') : '10:00',
    svarfristDato: treff.svarfrist ? parseISO(treff.svarfrist) : null,
    svarfristTid: treff.svarfrist
      ? format(parseISO(treff.svarfrist), 'HH:mm')
      : '',
  } as any;
}

export default RekrutteringstreffForm;
