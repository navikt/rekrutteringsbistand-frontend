import Forside from './forside/Forside';
import Sidelaster from '@/components/layout/Sidelaster';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: sidetittel('Oversikt'),
};

export default function Home() {
  return (
    <Suspense fallback={<Sidelaster />}>
      <Forside />
    </Suspense>
  );
}
