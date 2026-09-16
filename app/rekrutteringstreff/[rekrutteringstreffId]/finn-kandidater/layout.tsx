'use client';

import Rekrutteringstreff from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import { useKanLeggeTilJobbsøkere } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useKanLeggeTilJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import type { ReactNode } from 'react';

export default function FinnKandidaterLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const kanLeggeTil = useKanLeggeTilJobbsøkere(rekrutteringstreffId);

  return kanLeggeTil ? children : <Rekrutteringstreff />;
}
