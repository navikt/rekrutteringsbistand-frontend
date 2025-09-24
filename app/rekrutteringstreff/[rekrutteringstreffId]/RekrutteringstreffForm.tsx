'use client';

import {
  OppdaterRekrutteringstreffDTO,
  OppdaterRekrutteringstreffSchema,
} from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parseISO } from 'date-fns';
import { ReactNode, useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function RekrutteringstreffForm({
  rekrutteringstreffId,
  children,
}: {
  rekrutteringstreffId: string;
  children: ReactNode;
}) {
  const { data } = useRekrutteringstreff(rekrutteringstreffId);

  const methods = useForm<OppdaterRekrutteringstreffDTO>({
    resolver: zodResolver(OppdaterRekrutteringstreffSchema),
    defaultValues: {},
  });

  const hydratedRef = useRef(false);

  useEffect(() => {
    if (!data || hydratedRef.current) return;
    methods.reset(toDefaults(data));
    hydratedRef.current = true;
  }, [data, methods]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}

function toDefaults(treff: any): OppdaterRekrutteringstreffDTO {
  const fra = treff.fraTid ? parseISO(treff.fraTid) : null;
  const til = treff.tilTid ? parseISO(treff.tilTid) : null;
  const svarfrist = treff.svarfrist ? parseISO(treff.svarfrist) : null;

  const dateOnly = (d: Date | null) =>
    d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()) : null;

  const fraDato = dateOnly(fra);
  const tilDato = dateOnly(til);
  const svarfristDato = dateOnly(svarfrist);

  return {
    tittel: treff.tittel,
    gateadresse: treff.gateadresse,
    postnummer: treff.postnummer,
    poststed: treff.poststed,

    fraDato,
    fraTid: fra ? format(fra, 'HH:mm') : '08:00',
    tilDato,
    tilTid: til ? format(til, 'HH:mm') : '08:00',

    svarfristDato,
    svarfristTid: svarfrist ? format(svarfrist, 'HH:mm') : '08:00',
  } as any;
}
