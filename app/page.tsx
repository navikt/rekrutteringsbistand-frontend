import Sidelaster from './components/Sidelaster';
import Forside from './forside/Forside';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <Suspense fallback={<Sidelaster />}>
      <Forside />
    </Suspense>
  );
}
