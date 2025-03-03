import Sidelaster from './components/Sidelaster';
import Forside from './forside/Forside';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<Sidelaster />}>
      <Forside />
    </Suspense>
  );
}
