import { Suspense } from 'react';
import Sidelaster from './components/Sidelaster';
import Forside from './forside/Forside';

export default function Home() {
  return (
    <Suspense fallback={<Sidelaster />}>
      <Forside />
    </Suspense>
  );
}
