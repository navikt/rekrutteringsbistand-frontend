import UtløptSesjon from './_ui/UtløptSesjon';
import { skalMocke } from '@/util/env';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: sidetittel('Simulert utløpt sesjon'),
};

export default function UtløptSesjonPage() {
  if (!skalMocke) {
    notFound();
  }
  return <UtløptSesjon />;
}
