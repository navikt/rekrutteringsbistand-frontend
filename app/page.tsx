import Forside from './forside/Forside';
import Sidelaster from '@/components/layout/Sidelaster';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<Sidelaster />}>
      <Forside />
    </Suspense>
  );
}
