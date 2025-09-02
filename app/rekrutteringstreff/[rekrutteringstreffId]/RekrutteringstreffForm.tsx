'use client';

import {
  OppdaterRekrutteringstreffDTO,
  OppdaterRekrutteringstreffSchema,
} from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseISO, format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function RekrutteringstreffForm({
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

  return {
    tittel: treff.tittel,
    gateadresse: treff.gateadresse,
    postnummer: treff.postnummer,
    poststed: treff.poststed,

    fraDato: fra,
    fraTid: fra ? format(fra, 'HH:mm') : '',
    tilDato: til,
    tilTid: til ? format(til, 'HH:mm') : '',

    svarfristDato: svarfrist,
    svarfristTid: svarfrist ? format(svarfrist, 'HH:mm') : '',
  } as any;
}
