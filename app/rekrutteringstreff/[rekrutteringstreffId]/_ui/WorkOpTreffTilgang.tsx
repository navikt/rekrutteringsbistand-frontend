'use client';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import WorkOpPilottilgang from '@/app/rekrutteringstreff/WorkOpPilottilgang';
import { ManglendeTreffFeilmelding } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/ManglendeTreffFeilmelding';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import Sidelaster from '@/components/layout/Sidelaster';
import { ReactNode } from 'react';

export default function WorkOpTreffTilgang({
  children,
}: {
  children: ReactNode;
}) {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff, error } = useRekrutteringstreff(rekrutteringstreffId);

  if (!treff) {
    return error ? <ManglendeTreffFeilmelding /> : <Sidelaster />;
  }

  if (treff.kategori === RekrutteringstreffKategori.WORKOP) {
    return <WorkOpPilottilgang>{children}</WorkOpPilottilgang>;
  }
  return children;
}
