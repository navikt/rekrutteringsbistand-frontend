'use client';

import RekrutteringstreffForm from './_ui/RekrutteringstreffForm';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import Rekrutteringstreff from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import { useErTreffEier } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useErTreffEier';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { ReactNode } from 'react';

export default function RedigerLayout({ children }: { children: ReactNode }) {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const erTreffEier = useErTreffEier();

  if (
    !treff ||
    (treff.kategori === RekrutteringstreffKategori.WORKOP && !erTreffEier)
  ) {
    return <Rekrutteringstreff />;
  }

  return <RekrutteringstreffForm>{children}</RekrutteringstreffForm>;
}
